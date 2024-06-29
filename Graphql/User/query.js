const Users = require("./schema.js");

const UserQuery = {
  getUser: async (_, { uniqueId }) => {
    return await Users.findOne({ Unique_Id: uniqueId });
  },
  listUsers: async () => {
    return await Users.find({});
  },
};

module.exports = UserQuery;
