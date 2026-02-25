const Team = require("../models/Team");
const User = require("../models/User");


/* ================= ADD TEAM MEMBER ================= */

exports.addMember = async (req, res) => {
  try {
    const { email } = req.body;

    const team = await Team.findById(req.params.teamid);
    if (!team) return res.status(404).json({ msg: "Team not found" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const exists = team.members.some(m =>
      m.user?.equals(user._id)
    );

    if (exists)
      return res.status(400).json({ msg: "Already member" });

    team.members.push({
      user: user._id,
      role: "member",
    });

    await team.save();

    res.json(await team.populate("members.user", "name email"));
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


/*
CREATE TEAM
Only admin or team-lead
*/
exports.createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;

    const exists = await Team.findOne({ name });
    if (exists)
      return res.status(400).json({ msg: "Team already exists" });

    const team = await Team.create({
      name,
      description,
      createdBy: req.user._id,
      members: [
        {
          user: req.user._id,
          role: req.user.role,
        },
      ],
    });

    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/*
GET ALL TEAMS
*/
exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate("leader", "name email") // changed from createdBy to leader
      .populate("members.user", "name email role");
       // optional: populate project details if needed

    res.json(teams);
  } catch (err) {
    console.error("Error fetching teams:", err); // log full error
    res.status(500).json({ msg: err.message });
  }
};


/*
GET MY TEAMS
*/
exports.getMyTeams = async (req, res) => {
  try {
    const teams = await Team.find({
      "members.user": req.user._id,
    });

    res.json(teams);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/*
JOIN TEAM
*/
exports.joinTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team)
      return res.status(404).json({ msg: "Team not found" });

    const alreadyMember = team.members.find(
      m => m.user.toString() === req.user._id.toString()
    );

    if (alreadyMember)
      return res.status(400).json({ msg: "Already joined" });

    team.members.push({
      user: req.user._id,
      role: "member",
    });

    await team.save();

    res.json({ msg: "Joined team successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};



/* ================= GET TOTAL TEAMS COUNT ================= */
exports.getTeamsCount = async (req, res) => {
  try {
    const count = await Team.countDocuments(); // counts all teams in DB
    console.log(count);
    res.json({ totalTeams: count }); // send as JSON
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};