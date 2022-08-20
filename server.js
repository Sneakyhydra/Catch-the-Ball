const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

/**
 * Database
 */

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/game', require('./routes/game'));

/**
 * Serve static assets in production
 */
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	);
}

app.listen(port, () => console.log(`Listening on port ${port}`));
