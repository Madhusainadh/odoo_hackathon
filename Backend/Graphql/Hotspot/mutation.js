const ApplyMiddlewares = require("../MiddleWare/ApplyMiddleware.js");
const authMiddleware = require("../MiddleWare/authmiddleware.js");
const Hotspot = require("./schema.js");

const HotspotMutations = {
  createHotspot: ApplyMiddlewares(
    [authMiddleware],
    async (_, { address, latitude, longitude, description }, context) => {
      const newHotspot = new Hotspot({
        address,
        latitude,
        longitude,
        description,
        Created_By: context.UserId
      });
      await newHotspot.save();
      return newHotspot;
    }
  ),
  AssignCollectorToHotspot: ApplyMiddlewares(
    [authMiddleware],
    async (_, { assigned_collector, Hotspot_ID }, context) => {
      const newHotspot = Hotspot.findByIdAndUpdate(Hotspot_ID, {
        assigned_collector,
      });
      return { message: "Updated Assigned Collector" };
    }
  ),
};

module.exports = HotspotMutations;
