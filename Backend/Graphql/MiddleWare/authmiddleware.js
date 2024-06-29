const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
const Users = require("../User/schema");
const { mongo, default: mongoose } = require("mongoose");

// Note: Verify by jwt token with cookie token

const authMiddleware = (next) => async (parent, args, context, info) => {
  try {





    return next(parent, args, context, info);
  } catch (error) {
    throw new AuthenticationError("Authentication failed: " + error.message);
  }
};


module.exports = authMiddleware;
