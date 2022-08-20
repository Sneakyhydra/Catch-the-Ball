// Hooks
import { useState, useContext, useEffect } from 'react';

// Contexts
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const RegisterForm = ({ setIsLogin }) => {
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);

	const { regUser, error, clearErrors } = authContext;
	const { setAlert } = alertContext;

	// Initialize state
	const [regStart, setRegStart] = useState(false);
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
	});

	// Destructure regUser state
	const { name, email, password } = user;

	useEffect(() => {
		// Set state before unmount
		return () => {
			setRegStart(false);
		};

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		// Set state
		setRegStart(false);
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
		setRegStart(true);
		// Data to send
		const data = {
			name,
			email,
			password,
		};

		// Validation
		if (name === '' || email === '' || password === '') {
			// Set state
			setRegStart(false);
			setAlert('Please fill in all fields', 'danger');
		} else {
			// Signup user
			await regUser(data);
		}
	};

	return (
		<form className='w-fit mx-auto border-black rounded border-2 mt-4'>
			<div className='p-2'>
				<label htmlFor='name'>Name</label>
				<br />
				<input
					id='name'
					name='name'
					type='text'
					className='bg-indigo-100 w-80 p-2 rounded text-sm'
					placeholder='Enter your name...'
					value={name}
					onChange={onChange}
					required
				/>
			</div>

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
					value='SignUp'
					disabled={regStart}
					style={
						regStart
							? {
									backgroundColor: 'grey',
							  }
							: { backgroundColor: '#00ff00' }
					}
					onClick={onSubmit}
				>
					SignUp
				</button>

				<div
					className='w-full text-center text-xs mt-2 text-blue-600 cursor-pointer'
					onClick={() => setIsLogin(true)}
				>
					Switch to Login
				</div>
			</div>
		</form>
	);
};

export default RegisterForm;
