const { S3 } = require("aws-sdk");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const uuid = require("uuid").v4;

exports.s3Uploadv2 = async (files) => {
  const s3 = new S3();

  const params = files.map((file) => {
    const fileName = `CS_Uploaded_files/${uuid()}-${file.originalname}`;
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
    };
  });

  const uploadResults = await Promise.all(
    params.map((param) => s3.upload(param).promise())
  );

  return uploadResults.map((result) => ({
    ...result,
    fileURL: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${result.Key}`,
  }));
};

exports.s3Uploadv3 = async (files, req) => {
  const s3client = new S3Client();
  let { Account_UniqueID, User_Name, accType, Type_Of_User, UserId, pageName } = req;

  let userdetails = `${UserId}-${Account_UniqueID}`;

  const params = files.map((file) => {
    let key = `dev_emt_files/${accType}/${userdetails}/${pageName}/${uuid()}-${file.originalname}`;

    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key || `dev_emt_files/emt_Uploads/${uuid()}-${file.originalname}`,
      Body: file.buffer,
      ContentDisposition: "inline",
    };
  });

  const results = await Promise.all(
    params.map(async (param) => {
      await s3client.send(new PutObjectCommand(param));
      const fileURL = `https://${param.Bucket}.s3.amazonaws.com/${param.Key}`;
      return { fileURL };
    })
  );

  return results;
};
