const express = require('express');
const { check, validationResult } = require('express-validator');
const db = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

/** Endpoints **\
 * Add Recent Score and Player
 * Get Recent Scores and Players
 */

/**
 * @route POST api/game/recent
 * @desc Add Recent Score and Player
 * @access Private
 */
router.post(
	'/recent',
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
				`select User { email } filter .id = <uuid>'${user_id}'`
			);

			// If user not found
			if (!user) {
				return res.status(400).send({ errors: [{ msg: 'User not found' }] });
			}

			// Add Recent score
			await db.query(
				`insert Recent { score := ${score}, player:=(select User filter .email = "${user.email}")};`
			);

			return res.send('Updated recent scores and players');
		} catch (err) {
			// Return error
			return res.status(500).send({ errors: [{ msg: err.message }] });
		}
	}
);

/**
 * @route GET api/game/recent
 * @desc Get Recent Scores and Players
 * @access Private
 */
router.get('/recent', auth, async (req, res) => {
	// Extract user id from request
	const user_id = req.user_id;

	try {
		// Find user by id
		const user = await db.querySingle(
			`select User { name } filter .id = <uuid>'${user_id}'`
		);

		// If user not found
		if (!user) {
			return res.status(400).send({ errors: [{ msg: 'User not found' }] });
		}

		// Get Recent scores
		const scores = await db.query(
			`select Recent { score, player, time } ORDER BY .time DESC limit 10;`
		);

		for (let i = 0; i < scores.length; i++) {
			const name = await db.querySingle(
				`select User { name } filter .id = <uuid>'${scores[i].player.id}'`
			);
			scores[i].name = name.name;
		}

		return res.send(scores);
	} catch (err) {
		// Return error
		return res.status(500).send({ errors: [{ msg: err.message }] });
	}
});

module.exports = router;
