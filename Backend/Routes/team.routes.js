const express = require("express");
const router = express.Router();

const {
  createTeam,
  getTeams,
  getMyTeams,
  joinTeam,
  addMember,
  getTeamsCount,
} = require("../controllers/team.controller");

const { protect } = require("../middleware/auth.middleware");
const { allowRoles } = require("../middleware/role.middleware");

/* Create team */
router.post(
  "/create",
  protect,
  allowRoles("admin", "team-lead"),
  createTeam
);

/* All teams */
router.get("/", protect, getTeams);

/* My teams */
router.get("/my", protect, getMyTeams);

/* Join team */
router.post("/join/:id", protect, joinTeam);
router.post("/add-member", protect, addMember);

// new route for total teams
router.get("/count", protect,getTeamsCount );

module.exports = router;