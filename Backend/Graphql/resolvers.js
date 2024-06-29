const UserQuery = require("../Graphql/User/query");
const UserMutations = require("../Graphql/User/mutation");
const HotspotMutations = require("./Hotspot/mutation");
const HotspotQuery = require("./Hotspot/query");

const resolvers = {
  Query: {
    ...UserQuery,
    ...HotspotQuery
  },
  Mutation: {
    ...UserMutations,
    ...HotspotMutations
  },
};

module.exports = { resolvers };
