const Users = require("./schema.js");
const bcrypt = require("bcrypt");

const UserMutations = {
  createUser: async (_, { input }) => {
    // Check if the user already exists with the given mobile number
    const existingUser = await Users.findOne({
      mobileNumber: input.mobileNumber,
    });
    if (existingUser) {
      throw new Error("User with this mobile number already exists");
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(input.password, 10); // 10 is the salt rounds
    const newUser = new Users({
      ...input,
      password: hashedPassword,
    });

    await newUser.save();
    return newUser;
  },

  login: async (_, { mobileNumber, password }) => {
    const user = await Users.findOne({ mobileNumber: mobileNumber });
    if (!user) {
      throw new Error("User not found");
    }

    // Compare the hashed password in the database with the provided password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }

    return user;
  },

  updateUser: async (_, { ID, input }) => {
    return await Users.findByIdAndUpdate(ID, input, {
      new: true,
    });
  },
  deactivateUser: async (_, { ID }) => {
    return await Users.findOneAndUpdate(
      ID,
      { Is_Active: false },
      { new: true }
    );
  },
};

module.exports = UserMutations;
