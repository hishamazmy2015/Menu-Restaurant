// const { Router } = require("express");
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const user = require('../../models/User');
const { check, validationResult } = require('express-validator');

//@route    Delete api/profile/
//@desc     Delete profile,user & posts
//@access   private
router.delete('/', auth, async (req, res) => {
  try {
    await Profile.findOneAndDelete({
      user: req.user.id,
    });
    await User.findOneAndDelete({
      _id: req.user.id,
    });
    res.json({ messageeee: 'User deleted' });
  } catch (err) {
    if (err.kind == 'ObjectId')
      return res
        .status(400)
        .json({ msg: 'There is no profile for this user ...' });

    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 *
 *
 *
 */
//@route    GET api/profile/user/:user_id
//@desc     Get profile by user ID
//@access   public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    if (!profile)
      return res.status(400).json({ msg: 'There is no profile for this user' });
    res.json(profile);
  } catch (err) {
    if (err.kind == 'ObjectId')
      return res
        .status(400)
        .json({ msg: 'There is no profile for this user ...' });

    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 *
 *
 *
 */
//@route    GET api/profile/all
//@desc     Get All profile
//@access   public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/profile/me
//@desc     Get current users profile
//@access   private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avater']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    GPOST  api/profile
//@desc     Create or Update user Profile
//@access   private
router.post(
  '/',
  [
    auth,
    check('status', 'Status is required ').not().isEmpty(),
    check('skills', 'Skills is required ').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const err = validationResult(req);
      if (!err.isEmpty()) {
        console.log('err is ', err.message);
        return res.status(400).json({ err: err.array() });
      }

      const {
        company,
        webiste,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
      } = req.body;

      //build the object
      const profileFields = {};
      profileFields.user = req.user.id;
      if (company) profileFields.company = company;
      if (webiste) profileFields.webiste = webiste;
      if (location) profileFields.location = location;
      if (status) profileFields.status = status;
      if (githubusername) profileFields.githubusername = githubusername;
      if (bio) profileFields.bio = bio;
      if (skills) {
        profileFields.skills = skills.split(',').map((skill) => skill.trim());
      }

      //Build social object
      profileFields.social = {};
      if (youtube) profileFields.social.youtube = youtube;
      if (twitter) profileFields.social.twitter = twitter;
      if (facebook) profileFields.social.facebook = facebook;
      if (linkedin) profileFields.social.linkedin = linkedin;
      if (instagram) profileFields.social.instagram = instagram;

      try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
          //Update
          let profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            {
              $set: profileFields,
            },
            { new: true }
          );

          return res.json(profile);
        }
        //Create
        profile = new Profile(profileFields);
        await profile.save();
        console.log(
          'profile after save <==========================>   ',
          profile
        );
        res.json(profile);
      } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
