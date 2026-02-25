const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  githubUrl: { type: String },
  demoUrl: { type: String },
  presentationUrl: { type: String }, // cloud storage URL
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", ProjectSchema);