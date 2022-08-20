// Hooks
import { useState, useContext, useEffect } from 'react';

// Contexts
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const LoginForm = ({ setIsLogin }) => {
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
			setAlert('Please fill in all fields', 'danger');
		} else {
			// Login user
			await login(data);
		}
	};

	return (
		<form className='w-fit mx-auto border-black rounded border-2 mt-4'>
			<div className='p-2'>
				<label htmlFor='email'>Email</label>
				<br />
				<input
					id='email'
					name='email'
					type='email'
					className='bg-indigo-100 w-80 p-2 rounded text-sm'
					placeholder='Enter your email...'
					value={email}
					onChange={onChange}
					required
				/>
			</div>

			<div className='p-2'>
				<label htmlFor='password'>Password</label>
				<br />
				<input
					id='password'
					name='password'
					type='password'
					className='bg-indigo-100 w-80 p-2 rounded text-sm'
					placeholder='Enter your password...'
					value={password}
					onChange={onChange}
					required
				/>
			</div>

			<div className='p-2 flex justify-center flex-col'>
				<button
					className='m-auto py-1 px-3 rounded'
					type='submit'
					value='Login'
					disabled={logStart}
					style={
						logStart
							? {
									backgroundColor: 'grey',
							  }
							: { backgroundColor: '#00ff00' }
					}
					onClick={onSubmit}
				>
					Login
				</button>

				<div
					className='w-full text-center text-xs mt-2 text-blue-600 cursor-pointer'
					onClick={() => setIsLogin(false)}
				>
					Switch to SignUp
				</div>
			</div>
		</form>
	);
};

export default LoginForm;
