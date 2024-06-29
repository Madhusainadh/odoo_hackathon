const UserTypes = `
  type User{
      id: ID
      _id:ID
      Unique_Id:BigInt,
      firstName: String
      FullName: String
      mobileNumber: BigInt
      email: String
      Type_Of_User:String
      Is_Active:Boolean
      Root_User:ID
      password: String
      createdAt: String!
      lastName:String
      message:String
      EXPO_Token:[String]
      Search_Value:String
      Is_Closed:Boolean
    }

  type UserWithPopulate{
    _id: ID
    Unique_Id:BigInt,
    firstName: String
    FullName: String
    mobileNumber: BigInt
    email: String
    Type_Of_User:String
    Is_Active:Boolean
    password: String
    createdAt: String!
  }

  type SignupUser{
    _id: ID!
    Unique_Id:BigInt,
    FullName: String
    mobileNumber: BigInt
    email: String
    Is_Active:Boolean
    password: String
    createdAt: String!
    message:String
  }

  input SubUserInput {
    accType: String
    firstName: String
    mobileNumber: BigInt
    FullName: String
    Company_Name: String
    Root_User:ID
    Is_Active:Boolean
    Type_Of_User:String
    lastName:String
    email: String
    password: String
  }


  enum ProfileType{
   Transporter
   Logistics
   Transporter_Logistics
  }

  input RootUserInput {
    accType: String
    Profile_Type: ProfileType
    Transporter_Type: String
    No_Of_Vehicle_Owned:BigInt
    Own_Vehicle_No:String
    firstName: String
    FullName: String
    Company_Name: String
    mobileNumber: BigInt
    lastName:String
    Type_Of_User:String
    Pan_Number: String
    email: String
    password: String
    Is_Mobile_Number_Verified:Boolean
    Referral_Code:String
    EXPO_Token:[String]
    Is_Closed:Boolean
  }
  
  input LoginInput {
    email: String
    mobileNumber: BigInt
    password: String
    accType:String
    email_or_mobilenumber:String
    EXPO_Token:String
  }
  
    type LoginOutput {
    token: String
    user: User
    AccountData:[AddAccountSchema]
    message:String
  }
  
  type RootUserOutput{
    token:String
    user:SignupUser
    AccountData:AddAccountSchema
    message:String
  }

  type message{
    message:String
    sessionId:String
    otp_id:String
  }`;
const Userqueries = `
   user(ID: ID!): User!
   getusers(amount: Int): [User]
   getAllSubUsersForRootUser(Root_User_Id:ID,Status:Boolean):[User]
   getallusers: [User]
   getUserWithArrayofId(ArrayOfIds:[ID]):[User]
   sendLoginOtp(emailOrNumber: String!, accType: String!): message
   verifyLoginOtp(otp:Int!,sessionId:String): LoginOutput!
   getUserByAccountType(AccountType:String):[User]
   AddFullNameToAllUsers:message
   CS_SearchAndRetrieveSubUsersGetAccountManagers(keyword: String,Root_User_Id:ID): [User]
   GetAllRootUser:message
   GetUserWithContactNumber(Mobile_Number:BigInt):User
   `;

const Usermutations = `
    signupRootUser(signupInputRootUser: RootUserInput!,UserInputOtp:BigInt): RootUserOutput
    createUserWithoutCreatingAccount(userInput:RootUserInput):RootUserOutput
    CreateSubUser(SubUserInput: SubUserInput!): User!
    deleteUser(idsToDelete: [ID]!): message!
    login(loginInput: LoginInput!): LoginOutput!
    editRootUser(id: ID!, userInput: RootUserInput!): User!
    editSubUser(id: ID!, userInput: SubUserInput!): User!
    logout: message!
    DeleteAllExpoTokensOfAllUsers:message
    storeClientInfo:message
    deleteUserData(id:ID):message
    FindUserWithNoAccount:message
    AddIsClosedToAlluser:message

  `;
module.exports = { Usermutations, Userqueries, UserTypes };
