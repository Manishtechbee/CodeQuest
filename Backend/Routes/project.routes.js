const express = require("express");
const { saveProject, getProjectByTeam, uploadFile } = require("../controllers/project.controller.js");
const { upload } = require("../utils/upload.js");

const router = express.Router();

router.post("/", saveProject);
router.get("/team/:teamId", getProjectByTeam);
router.post("/upload", upload.single("file"), uploadFile);

module.exports=router;