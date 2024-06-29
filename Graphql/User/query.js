
const Users = require("./schema.js");



const UserQuery = {
    user: async (_, { ID }) => {
        return await Users.findById(ID)
          .then((res) => {
            return res;
          })
          .catch((err) => {
            console.log(err.message);
            return err.message;
          });
      },


}

module.exports = UserQuery;
