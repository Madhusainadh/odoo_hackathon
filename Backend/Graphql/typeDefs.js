const { gql } = require("apollo-server");
const { Usermutations, Userqueries, UserTypes } = require("./User/typeDefs");
const { Hotspotqueries, Hotspotmutations, HotspotTypes } = require("./Hotspot/typeDefs");

const typeDefs = gql`
scalar BigInt


${UserTypes}
${HotspotTypes}
  type Query {
${Userqueries}
${Hotspotqueries}
   }
  
  type Mutation {
${Usermutations} 
${Hotspotmutations}

}
`;

module.exports = { typeDefs };
