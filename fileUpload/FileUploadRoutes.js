const { Router } = require("express");
const fileUpload = Router();
const multer = require("multer");
const { s3Uploadv2, s3Uploadv3 } = require("./seService");
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { decryptCookie } = require("../Common/GenerateUniqueID.js");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000, files: 4 },
});
const s3client = new S3Client();
const CsUser = require("../Graphql/User/Schema.js");
const Account = require("../Graphql/AddAccountData/schema.js");
const AccountBalance = require("../Graphql/AccountBalance/schema.js");
const { default: mongoose } = require("mongoose");

async function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const pageName = req.headers["pageName"] || req.headers["pagename"];
  console.log(
    req,

    req.headers,
    req.headers["usertype"],
    // req,
    // req.files,
    req.UserId,
    "req.body.req.body.req.body.req.body.req.body.req.body."
  );

  if (req.headers["usertype"] == "erp") {
    let UserData = await CsUser.findById(req.body.UserId);

    let accountData = await Account.find({ UserId: req.body.UserId });

    let AccountBalanceData = await AccountBalance.find({
      Account_Type_Id: mongoose.Types.ObjectId(accountData[0]._id),
    });

    req.UserId = UserData._id;
    req.accType = UserData.accType;
    req.pageName = pageName;
    req.Account_UniqueID = accountData[0].Unique_Id;
    req.User_Name = accountData[0].Proprietor_Name;
    req.AccountID = accountData[0]._id;
    req.Type_Of_User = UserData.Type_Of_User;
    console.log(
      AccountBalanceData,
      accountData,
      "Oooooooooooooooooooooooooooooooooooooooooooo"
    );

    next();
  } else if (req.headers["usertype"] == "Driver") {
    req.UserId = req.body.UserId;
    req.accType = req.body.UserId;
    req.pageName = req.body.UserId;
    req.Account_UniqueID = req.body.UserId;
    req.User_Name = req.body.UserId;
    req.AccountID = req.body.UserId;
    req.Type_Of_User = "Driver";

    next();
  } else {
    if (authHeader) {
      let token = await decryptCookie(authHeader);

      if (!token) {
        throw new AuthenticationError(
          "You must be logged in to perform this action"
        );
      }

      const decodedToken = jwt.verify(token, "process.env.JWT_SECRET");
      req.UserId = decodedToken.userId || decodedToken.UserId;
      req.accType = decodedToken.accType;
      req.pageName = pageName;
      req.Account_UniqueID = decodedToken.Account_UniqueID;
      req.User_Name = decodedToken.User_Name;
      req.AccountID = decodedToken.AccountID;
      req.Type_Of_User = decodedToken.Type_Of_User;

      if (decodedToken) {
        next();
      } else {
        res.status(401).json({ status: "error", message: "Invalid token." });
      }
    } else {
      console.log("JHbbbbbbbbbbbbbbbbbbbb");
      res
        .status(401)
        .json({ status: "error", message: "Authorization header not found." });
    }
  }
}

fileUpload.post("/mulitiple", upload.array("file"), async (req, res) => {
  let path = req.headers.path;
  try {
    const results = await s3Uploadv3(path, req.files);
    const fileURLs = results.map((result) => result.fileURL);
    return res.json({ status: "success", fileURLs });
  } catch (err) {
    console.log(err);
  }
});

// fileUpload.post(
//   "/single",
//   upload.single("file"),
//   authMiddleware,
//   async (req, res) => {
//     console.log(req.body,req.file,"pppppppppppppppppppppppppppppppppppppppppppppppppp")
//     let path = req.headers.path;
//     try {
//       console.log("nndsdfjnsdkj")
//       const results = await s3Uploadv3([req.file], req);
//       console.log("---------------------")
//       const fileURL = results[0].fileURL;
//       console.log(fileURL,"-===========================---------------------")
//       return res.json({ status: "success", fileURL });
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

fileUpload.post(
  "/single",
  upload.single("file"),
  authMiddleware,
  async (req, res) => {
    try {
      const results = await s3Uploadv3([req.file], req);
      const fileURL = results[0].fileURL;
      return res.json({ status: "success", fileURL });
    } catch (err) {
      console.error(err);
      // Send an error response
      return res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  }
);

fileUpload.delete("/file/delete", async (req, res) => {
  const fileUrl = req.body.url;
  const key = fileUrl.split(".com/")[1];

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };
  try {
    await s3client.send(new DeleteObjectCommand(params));
    res.sendStatus(204);
  } catch (error) {
    console.log(`Error deleting file ${key} from S3 bucket: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = fileUpload;
