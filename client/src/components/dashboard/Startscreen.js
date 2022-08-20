import { useEffect } from 'react';

const Startscreen = ({ setScreen, setScore }) => {
	useEffect(() => {
		setScore(0);

		// eslint-disable-next-line
	}, []);

	const onClick = () => {
		setScreen('game');
	};

	return (
		<div className='flex mt-10 justify-center'>
			<button
				className='bg-blue-500 rounded py-2 px-5 h-fit my-auto'
				onClick={onClick}
			>
				Start
			</button>
		</div>
	);
};

export default Startscreen;
