const { default: mongoose } = require("mongoose");
const ApplyMiddlewares = require("../MiddleWare/ApplyMiddleware.js");
const authMiddleware = require("../MiddleWare/authmiddleware.js");
const Hotspot = require("./schema.js");

const HotspotQuery = {
  getHotspots: async () => {
    return await Hotspot.find({});
  },
  getHotspotsPostedMyUser: async (_, { assigned_collector }) => {
    return await Hotspot.find({ assigned_collector });
  },
  getHotspot: async (_, { id }) => {
    return await Hotspot.findById(id);
  },
  getMyPostedHotspot: ApplyMiddlewares(
    [authMiddleware],
    async (_, args, context) => {
      return await Hotspot.find({
        Created_By: mongoose.Types.ObjectId(context.UserId),
      });
    }
  ),
  getPostedHotspotForAdmin: ApplyMiddlewares(
    [authMiddleware],
    async (_, { limit = 10, page = 1 }, context) => {
      const totalCount = await Hotspot.countDocuments();
      const totalPages = Math.ceil(totalCount / limit);
      const skip = (page - 1) * limit;

      const items = await Hotspot.find({}).limit(limit).skip(skip);
      return {
        items,
        pageInfo: {
          currentPage: page,
          totalPages,
          limit,
          totalCount,
        },
      };
    }
  ),
};

module.exports = HotspotQuery;
