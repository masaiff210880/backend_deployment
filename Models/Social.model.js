const mongoose = require("mongoose");
const socialSchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    body: { type: String, require: true },
    device: { type: String, enum: ["PC", "TABLET", "MOBILE"], require: true },
    userId : { type: String, require: true }
  },
  { versionKey: false }
);

const SocialModel = mongoose.model("social_post", socialSchema);

module.exports = { SocialModel };
