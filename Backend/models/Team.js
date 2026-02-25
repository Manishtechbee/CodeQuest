const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
  },

  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      role: {
        type: String,
        default: "member",
      },
    },
  ],

  maxMembers: {
    type: Number,
    default: 4,
  },
  projects: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  }
],
},
{ timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);