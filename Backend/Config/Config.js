const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
function connect() {
  return mongoose.connect(
    "mongodb+srv://emt_admin:emt_admin@cluster0.gwkrqor.mongodb.net/dev?retryWrites=true&w=majority/"
  );
}

module.exports = connect;
