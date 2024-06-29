const UserMutations = {
  createUser: async (_, { input }) => {
    const newUser = new Users(input);
    await newUser.save();
    return newUser;
  },
  updateUser: async (_, { uniqueId, input }) => {
    return await Users.findOneAndUpdate({ Unique_Id: uniqueId }, input, {
      new: true,
    });
  },
  deactivateUser: async (_, { uniqueId }) => {
    return await Users.findOneAndUpdate(
      { Unique_Id: uniqueId },
      { Is_Active: false },
      { new: true }
    );
  },
};
