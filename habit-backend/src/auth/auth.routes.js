const express = require("express");
const { register, login } = require("../auth/auth.controller");
const auth = require("../auth/auth.middleware");

const router = express.Router();

// Kullanıcı kayıt
router.post("/register", register);

router.post("/login", login);

router.get("/profile", auth, (req, res) => {
  res
    .status(200)
    .json({ message: "Profile accessed successfully", user: req.user });
});

module.exports = router;
