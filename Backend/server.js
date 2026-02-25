require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/db");



const projectRoutes =require("./routes/project.routes") ;


const teamRoutes = require("./routes/team.routes");

require("./config/passport");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());





app.use("/api/projects", projectRoutes);
app.use("/api/auth", require("./routes/auth.routes"));

app.use("/api/team", teamRoutes);

app.get("/", (_, res) => res.send("API Running"));

app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);