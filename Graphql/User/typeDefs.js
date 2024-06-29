const UserTypes = `
type CsUser {
  id: ID!
  Unique_Id: String!
  accType: String!
  FullName: String
  Role: String!
  mobileNumber: Int!
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
  mobileNumber: Int!
  email: String
  password: String
  Is_Active: Boolean
}

input UpdateUserInput {
  Unique_Id: String
  accType: String
  FullName: String
  Role: String
  mobileNumber: Int
  email: String
  password: String
  Is_Active: Boolean
}

`;
const Userqueries = `
  getUser(uniqueId: String!): CsUser
  listUsers: [CsUser]
   `;

const Usermutations = `
   createUser(input: CreateUserInput!): CsUser
  updateUser(uniqueId: String!, input: UpdateUserInput!): CsUser
  deactivateUser(uniqueId: String!): CsUser

  `;
module.exports = { Usermutations, Userqueries, UserTypes };
