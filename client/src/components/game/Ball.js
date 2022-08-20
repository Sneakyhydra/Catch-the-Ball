import { ItemTypes } from './Constants';
import { useDrag } from 'react-dnd';

const Ball = () => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: ItemTypes.BALL,
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	return (
		<div
			ref={drag}
			style={{
				opacity: isDragging ? 0.5 : 1,
				fontSize: 25,
				fontWeight: 'bold',
				cursor: 'move',
				height: '50px',
				width: '50px',
				backgroundColor: 'black',
				borderRadius: '50%',
				right: '2rem',
				top: '5rem',
				position: 'absolute',
			}}
			className='moveBall'
			id='ball'
		></div>
	);
};

export default Ball;
