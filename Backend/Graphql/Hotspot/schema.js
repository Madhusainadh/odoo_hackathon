const mongoose = require("mongoose");
const { type } = require("os");

const hotspotSchema = new mongoose.Schema(
  {
    address: String,
    latitude: String,
    longitude: String,
    description: String,
    Pincode: Number,
    Image_one: String,
    Image_Two: String,
    Image_Three: String,
    Status: String,
    Created_By: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    assigned_collector: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
  },
  { timestamps: true }
);

const Hotspot = mongoose.model("Hotspot", hotspotSchema);
module.exports = Hotspot;
