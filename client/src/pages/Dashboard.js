// Hooks
import { useEffect, useContext, useState } from 'react';

// Routing
import { useNavigate } from 'react-router';

// Contexts
import AuthContext from '../context/auth/authContext';

// Screens
import Startscreen from '../components/dashboard/Startscreen';
import Game from '../components/dashboard/Game';
import Endscreen from '../components/dashboard/Endscreen';

const Dashboard = () => {
	const authContext = useContext(AuthContext);

	const { isAuthenticated, user, validate, loadUser, logout } = authContext;

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
			<div className='flex justify-between border-b-2 border-black items-center py-1'>
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
				<Startscreen setScreen={setScreen} />
			) : screen === 'game' ? (
				<Game setScreen={setScreen} />
			) : (
				<Endscreen setScreen={setScreen} />
			)}
		</>
	);
};

export default Dashboard;
