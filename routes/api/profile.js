const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');
// Load Validation
const validateProfileInput = require('../../validation/profile');

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (typeof req.body !== 'undefined') {
      if (typeof req.body.handle !== 'undefined')
        profileFields.handle = req.body.handle;
      if (typeof req.body.website !== 'undefined')
        profileFields.website = req.body.website;
      if (typeof req.body.location !== 'undefined')
        profileFields.location = req.body.location;
      if (typeof req.body.status !== 'undefined')
        profileFields.status = req.body.status;
      if (typeof req.body.bio !== 'undefined')
        profileFields.bio = req.body.bio;
      if (typeof req.body.phone !== 'undefined')
        profileFields.phone = req.body.phone;

      // Social
      profileFields.social = {};
      if (req.body.youtube)
        profileFields.social.youtube = req.body.youtube;
      if (req.body.twitter)
        profileFields.social.twitter = req.body.twitter;
      if (req.body.facebook)
        profileFields.social.facebook = req.body.facebook;
      if (req.body.linkedin)
        profileFields.social.linkedin = req.body.linkedin;
      if (req.body.instagram)
        profileFields.social.instagram = req.body.instagram;
    }
    

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile));

        } else {
          // Create
          // Check if handle exists
          Profile.findOne({ handle: profileFields.handle })
            .then(profile => {
              if (profile) {
                errors.handle = 'That handle already exists';
                res.status(400).json(errors);
              }
              // Save Profile
              new Profile(profileFields)
                .save()
                .then(profile => res.json(profile));
            });
        }
      });
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => { User.findOneAndRemove({ _id: req.user.id }).then(() =>
      res.json({ success: true })
      );
    });
  }
);

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }

);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};
    Profile.find()
      .populate('user', ['name', 'avatar'])
      .then(profiles => {
        if (!profiles) {
	  errors.noprofile = 'There are no profiles';
	  return res.status(404).json(errors);
        }
          res.json(profiles);
	})
	.catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
	if (!profile) {
	  errors.noprofile = 'There is no profile for this user';
	  res.status(404).json(errors);
	}

	res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
	errors.noprofile = 'There is no profile for this user';
	res.status(404).json(errors);
      }

      res.json(profile);
  })
  .catch(err => res.status(404).json({ profile: 'There is no profile for this user' })
  );
});


// @route   POST api/favorite
// @desc    Add following/follower
// @access  Private
router.post('/favorite/:follower',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.find({
      "$or": [{
          "user": req.user.id // following add friend
      }, {
          "user": req.params.follower // follower
      }]
    })
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        // count record; found both following and follower user
        if (profile.length == 2 ) {
          for (var i = 0; i < profile.length; i++) {
            
           if (profile[i].user == req.user.id) {
             const newFollowing = {
               user: req.params.follower
             };
             // Add to comments array
             profile[i].following.unshift(newFollowing);
           } else if (profile[i].user == req.params.follower) {
             const newFollowing = {
               user: req.user.id
             };
             // Add to comments array
             profile[i].follower.unshift(newFollowing);
          }
        }}
        

        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
