// Hooks
import { useEffect, useContext, useState } from 'react';

// Routing
import { useNavigate } from 'react-router';

// Contexts
import AuthContext from '../context/auth/authContext';
import GameContext from '../context/game/gameContext';

// Screens
import Startscreen from '../components/dashboard/Startscreen';
import Game from '../components/dashboard/Game';
import Endscreen from '../components/dashboard/Endscreen';

// Components
import Recentscores from '../components/dashboard/Recentscores';

const Dashboard = () => {
	const authContext = useContext(AuthContext);
	const gameContext = useContext(GameContext);

	const { isAuthenticated, user, validate, loadUser, logout } = authContext;
	const {
		updateHighScore,
		addRecentScore,
		getRecentScores,
		recent,
		score,
		increaseScore,
		resetScore,
	} = gameContext;

	// Initialize navigate
	const navigate = useNavigate();
	// Initialize state
	const [screen, setScreen] = useState('ready');

	useEffect(() => {
		// Validate user
		validate();
		// Load user
		loadUser();

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		// If user is not authenticated, redirect to login page
		if (!isAuthenticated) {
			navigate('/');
		}

		// eslint-disable-next-line
	}, [isAuthenticated]);

	// Handle logout
	const handleLogout = async () => await logout();

	// If user not loaded, show nothing
	if (!user) return <div>Loading...</div>;

	return (
		<>
			<div className='flex justify-between border-b-2 border-black items-center py-1 bg-slate-300'>
				<h1 className='ml-5 text-lg font-bold my-auto'>
					High Score: {user.high_score}
				</h1>
				<button
					onClick={handleLogout}
					className='bg-red-500 py-1 px-2 rounded my-auto mr-5'
				>
					Logout
				</button>
			</div>

			{screen === 'ready' ? (
				<Startscreen setScreen={setScreen} resetScore={resetScore} />
			) : screen === 'game' ? (
				<Game
					setScreen={setScreen}
					score={score}
					increaseScore={increaseScore}
				/>
			) : (
				<>
					<Endscreen
						setScreen={setScreen}
						score={score}
						hscore={user.high_score}
						updateHighScore={updateHighScore}
						addRecentScore={addRecentScore}
					/>
					<Recentscores getRecentScores={getRecentScores} recent={recent} />
				</>
			)}
		</>
	);
};

export default Dashboard;
