const UserTypes = `
type User {
  id: ID!
  Unique_Id: String!
  accType: String!
  FullName: String
  Role: String!
  mobileNumber: BigInt!
  email: String
  password: String
  Is_Active: Boolean!
  createdAt: String!
  updatedAt: String!
}

input CreateUserInput {
  Unique_Id: String!
  accType: String!
  FullName: String
  Role: String
  mobileNumber: BigInt!
  email: String
  password: String
  Is_Active: Boolean
}

input UpdateUserInput {
  Unique_Id: String
  accType: String
  FullName: String
  Role: String
  mobileNumber: BigInt
  email: String
  password: String
  Is_Active: Boolean
}
`;

const Userqueries = `
  getUser(uniqueId: String!): User
  listUsers: [User]
   `;

const Usermutations = `
    createUser(input: CreateUserInput!): User
    updateUser(uniqueId: ID!, input: UpdateUserInput!): User
    deactivateUser(uniqueId: ID!): User
    login(mobileNumber: String!, password: String!): User
  `;

module.exports = { Usermutations, Userqueries, UserTypes };
