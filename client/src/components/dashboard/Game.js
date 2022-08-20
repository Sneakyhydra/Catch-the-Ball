import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Bucket from '../game/Bucket';
import Ball from '../game/Ball';
import { useEffect, useState } from 'react';

const Game = ({ score, increaseScore, setScreen }) => {
	const [counter, setCounter] = useState(60);

	useEffect(() => {
		setTimeout(() => {
			setScreen('endScreen');
		}, 60000);
	}, []);

	useEffect(() => {
		counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
	}, [counter]);

	return (
		<DndProvider backend={HTML5Backend}>
			<div className='ml-5 mt-2'>
				<h1>Score: {score}</h1>
				<h1>Time Left: {counter}</h1>
				<Bucket increaseScore={increaseScore} />
				<Ball />
			</div>
		</DndProvider>
	);
};

export default Game;
