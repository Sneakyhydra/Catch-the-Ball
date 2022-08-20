// Hooks
import { useEffect, useContext } from 'react';

// Routing
import { useNavigate } from 'react-router';

// Components
import LoginForm from '../components/homepage/LoginForm';

// Contexts
import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';

// CSS
// import styles from './CSS/Homepage.module.css';

const Homepage = () => {
	// Destructure auth from props
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const { setAlert } = alertContext;

	const { error, clearErrors, validate, isAuthenticated } = authContext;
	// Initialize navigate
	const navigate = useNavigate();

	useEffect(() => {
		// Validate user on mount
		validate();

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		// If user is authenticated, redirect to dashboard
		if (isAuthenticated) {
			navigate('/dashboard');
		}
		// If error is not null, display error
		if (error) {
			if (error.errors.length > 0) {
				setAlert(error.errors[0].msg);
			}
		}
		// Clear errors
		clearErrors();

		// eslint-disable-next-line
	}, [error, isAuthenticated]);

	return (
		<div>
			<div>
				<LoginForm />
			</div>
		</div>
	);
};

export default Homepage;
