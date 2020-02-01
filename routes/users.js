const router = require("express").Router();

const { generateJWT } = require("../modules/functions");

const Users = require("../models/users");

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ email })
    .exec()
    .then(user => {
      if (user) {
        return res.status(409).json({ message: "Email Exists" });
      }

      const newUser = new Users({ email, password });
      newUser.save().then(() => {
        res.redirect("/login");
      });
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ $and: [{ email }, { password }] })
    .exec()
    .then(user => {
      if (user) {
        res.cookie(...generateJWT({ username: email })).redirect("/");
      } else {
        res.status(404).json({ message: "no user" });
      }
    });
});

router.get("/logout", (req, res) => {
  res.clearCookie(process.env.PROJECT_NAME, {
    domain: process.env.DOMAIN_NAME,
    secure: JSON.parse(process.env.DEPLOYMENT),
    httpOnly: true,
    sameSite: true,
    path: "/"
  });
  res.redirect("/");
});

module.exports = router;
