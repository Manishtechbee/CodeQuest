const router = require("express").Router();
const passport = require("passport");
const { register, login } = require("../controllers/auth.controller");
const jwt = require("jsonwebtoken");

router.post("/register", register);
router.post("/login", login);

// Google Login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {

    const token = jwt.sign(
      { id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET
    );

    res.redirect(`http://localhost:5173/google-success?token=${token}`);
  }
);

module.exports = router;