const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {

 
    FullName: {
      type: String,
      required: false,
    },
    Role: {
      type: String,
      required: true,
      default: "residents",
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    Is_Active: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("UserCollection", UsersSchema);

module.exports = Users;
