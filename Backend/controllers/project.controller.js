const Project = require("../models/Project.model.js");
const { uploadToS3 } = require("../utils/upload.js");

// Save project info
const saveProject = async (req, res) => {
  try {
    const { teamId, title, description, githubUrl, demoUrl } = req.body;

    let project = await Project.findOne({ teamId });
    if (project) {
      // Update
      project.title = title;
      project.description = description;
      project.githubUrl = githubUrl;
      project.demoUrl = demoUrl;
      await project.save();
    } else {
      // Create new
      project = await Project.create({
        teamId,
        title,
        description,
        githubUrl,
        demoUrl,
      });
    }

    res.status(200).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to save project" });
  }
};

// Get project by team
const getProjectByTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const project = await Project.findOne({ teamId });
    if (!project) return res.status(404).json({ msg: "Project not found" });
    res.status(200).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch project" });
  }
};

// Upload file
const uploadFile = async (req, res) => {
  try {
    const { teamId, type } = req.body;
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    const url = await uploadToS3(req.file);

    const project = await Project.findOne({ teamId });
    if (!project) return res.status(404).json({ msg: "Project not found" });

    if (type === "presentation") project.presentationUrl = url;

    await project.save();

    res.status(200).json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "File upload failed" });
  }
};
module.exports={uploadFile,getProjectByTeam,saveProject};