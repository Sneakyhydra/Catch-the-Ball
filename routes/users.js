const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const db = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

/** Endpoints **\
 * Register a user
 * Change High Score
 */

/**
 * @route POST api/users
 * @desc Register a user
 * @access Public
 */
router.post(
	'/',
	[
		// Validate input
		check('name', 'Please enter name').notEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 3 or more characters'
		).isLength({ min: 3 }),
	],
	async (req, res) => {
		// Validation errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).send({ errors: errors.array() });
		}

		// Destructure request body
		const { name, email, password } = req.body;

		try {
			// Find user by email
			const user = await db.querySingle(
				`select User { id } filter .email = '${email}'`
			);

			// If user already exists
			if (user) {
				return res
					.status(400)
					.send({ errors: [{ msg: 'User already exists' }] });
			}

			// Hash Password
			const salt = await bcrypt.genSalt(10);
			const en_password = await bcrypt.hash(password, salt);

			await db.query(
				`insert User { name := "${name}", email := "${email}", password := "${en_password}" };`
			);

			const result = await db.querySingle(
				`select User { id } filter .email = '${email}'`
			);
			const id = result.id;

			// Payload for JWT
			const payload = {
				id: id,
			};

			// Sign JWT
			const token = jwt.sign(payload, config.get('jwtSecret'), {
				expiresIn: 21600,
			});

			// Create an httpOnly cookie
			res.cookie('token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV !== 'development',
				secure: false,
				maxAge: 6 * 60 * 60 * 1000,
			});

			// Send success message to client
			return res.send('Registered');
		} catch (err) {
			// Return error
			return res.status(500).send({ errors: [{ msg: err.message }] });
		}
	}
);

/**
 * @route POST api/users/score
 * @desc Change high score of a user
 * @access Private
 */
router.post(
	'/score',
	[
		// Validate input
		check('score', 'Please give a score').exists(),
		auth,
	],
	async (req, res) => {
		// Validation errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).send({ errors: errors.array() });
		}

		// Extract user id from request
		const user_id = req.user_id;

		// Destructure request body
		const { score } = req.body;

		try {
			// Find user by id
			const user = await db.querySingle(
				`select User { high_score } filter .id = <uuid>'${user_id}'`
			);

			// If user not found
			if (!user) {
				return res.status(400).send({ errors: [{ msg: 'User not found' }] });
			}

			if (user.high_score < score) {
				// Update high score
				await db.query(
					`update User filter .id = <uuid>'${user_id}' set { high_score := ${score} };`
				);

				// Send success message to client
				return res.send('High Score Updated');
			}

			return res.send('High Score Not Updated');
		} catch (err) {
			// Return error
			return res.status(500).send({ errors: [{ msg: err.message }] });
		}
	}
);

module.exports = router;
