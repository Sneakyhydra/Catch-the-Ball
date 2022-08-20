import { useEffect } from 'react';

const Endscreen = ({
	setScreen,
	score,
	hscore,
	updateHighScore,
	addRecentScore,
}) => {
	useEffect(() => {
		if (score > hscore) {
			updateHighScore({ score });
		}
		addRecentScore({ score });
		// eslint-disable-next-line
	}, []);

	const onClick = () => {
		setScreen('ready');
	};

	return (
		<div className='flex flex-col items-center mt-10'>
			<h1 className='text-center text-4xl'>Score: {score}</h1>
			<div className='flex my-auto mt-8'>
				<button
					onClick={onClick}
					className='rounded bg-blue-500 w-fit py-2 px-5 h-fit'
				>
					Restart
				</button>
			</div>
		</div>
	);
};

export default Endscreen;
