const HotspotTypes = `
 type Hotspot {
    id: ID
    _id: ID
    address: String
    Created_By: ID
    assigned_collector: ID
    latitude: BigInt
    longitude: BigInt
    description: String
    createdAt: String
    updatedAt: String
  }

  type message{
  message:String
  }
`;

const Hotspotqueries = `
    getHotspots: [Hotspot]
    getHotspot(id: ID!): Hotspot
    getMyPostedHotspot: [Hotspot]
    getHotspotsPostedMyUser(assigned_collector: ID!): Hotspot
    getPostedHotspotForAdmin(limit: Int ,page:Int ): Hotspot
   `;

const Hotspotmutations = `
    createHotspot(address: String!, latitude: BigInt!, longitude: BigInt!, description: String!): Hotspot
    AssignCollectorToHotspot(Hotspot_ID:ID,assigned_collector:ID):message
  `;

module.exports = { Hotspotmutations, Hotspotqueries, HotspotTypes };
