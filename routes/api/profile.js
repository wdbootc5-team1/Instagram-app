const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");
// Load Validation
const validateProfileInput = require("../../validation/profile");

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const errors = {};

		Profile.findOne({ user: req.user.id })
			.populate("user", ["name", "avatar"])
			.then(profile => {
				if (!profile) {
					errors.noprofile = "There is no profile for this user";
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
router.get("/all", (req, res) => {
	const errors = {};

	Profile.find()
		.populate("user", ["name", "avatar"])
		.then(profiles => {
			if (!profiles) {
				errors.noprofile = "There are no profiles";
				return res.status(404).json(errors);
			}

			res.json(profiles);
		})
		.catch(err =>
			res.status(404).json({ profile: "There are no profiles" })
		);
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get("/handle/:handle", (req, res) => {
	const errors = {};

	Profile.findOne({ handle: req.params.handle })
		.populate("user", ["name", "avatar"])
		.then(profile => {
			if (!profile) {
				errors.noprofile = "There is no profile for this user";
				res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get("/user/:user_id", (req, res) => {
	const errors = {};

	Profile.findOne({ user: req.params.user_id })
		.populate("user", ["name", "avatar"])
		.then(profile => {
			if (!profile) {
				errors.noprofile = "There is no profile for this user";
				res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch(err =>
			res
				.status(404)
				.json({ profile: "There is no profile for this user" })
		);
});
