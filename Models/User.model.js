const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    gender: { type: String, enum: ["male", "female"], require: true },
    password: { type: String, require: true },
  },
  { versionKey: false }
);

const UserModel = mongoose.model("social_user", userSchema);

module.exports = { UserModel };
