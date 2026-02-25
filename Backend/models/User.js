const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: String,

  role: {
    type: String,
    enum: ["admin", "judge", "team-lead", "team-member"],
    default: "team-member"
  },

  googleId: String
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);