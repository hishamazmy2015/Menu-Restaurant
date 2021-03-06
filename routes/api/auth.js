// const { Router } = require("express");
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

//@route    GET api/auth
//@desc     Test Auth
//@access   Public
router.post(
  "/",
  [
    check("email", "Please include a valid email ").isEmail(),
    check("password", "password is required").exists(),
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ err: err.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      //See if user is exist
      if (!user) {
        return res.status(400).json({ err: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ err: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      ); 
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server errror ");
    }

    console.log(req.body);
    // res.send("user route");
  }
);
//@route    GET api/users
//@desc     Test route  
//@access   Public
router.get("/", auth, async (req, res) => {
  //   res.send("Auth route");
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.send(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
