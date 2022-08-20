// Hooks
import { useState, useContext, useEffect } from 'react';

// Contexts
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const LoginForm = () => {
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);

	const { login, error, clearErrors } = authContext;
	const { setAlert } = alertContext;

	// Initialize state
	const [logStart, setLogStart] = useState(false);
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	// Destructure logUser state
	const { email, password } = user;

	useEffect(() => {
		// Set state before unmount
		return () => {
			setLogStart(false);
		};

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		// Set state
		setLogStart(false);
		// Clear errors
		clearErrors();

		// eslint-disable-next-line
	}, [error]);

	// Handle input change
	const onChange = (e) => {
		const updateUser = (prevState) => {
			return {
				...prevState,
				[e.target.name]: e.target.value,
			};
		};

		setUser(updateUser(user));
	};

	// Handle form submit
	const onSubmit = async (e) => {
		e.preventDefault();
		// Set state
		setLogStart(true);
		// Data to send
		const data = {
			email,
			password,
		};

		// Validation
		if (email === '' || password === '') {
			// Set state
			setLogStart(false);
			setAlert('Please fill in all fields');
		} else {
			// Login user
			await login(data);
		}
	};

	return (
		<form>
			<label htmlFor='email'>Email</label>
			<input
				id='email'
				name='email'
				type='email'
				value={email}
				onChange={onChange}
				required
			/>
			<br />
			<label htmlFor='password'>Password</label>
			<input
				id='password'
				name='password'
				type='password'
				value={password}
				onChange={onChange}
				required
			/>
			<br />
			{logStart ? (
				<button
					className=''
					type='button'
					value='Login'
					onClick={onSubmit}
					disabled
					style={{
						borderRadius: '2em',
						marginTop: '2em',
						width: '10em',
					}}
				>
					Logging in...
					<span className='material-icons'>send</span>
				</button>
			) : (
				<button
					className=''
					type='button'
					value='Login'
					onClick={onSubmit}
					style={{
						borderRadius: '2em',
						marginTop: '2em',
						width: '10em',
					}}
				>
					Login
					<span className='material-icons'>send</span>
				</button>
			)}
		</form>
	);
};

export default LoginForm;
