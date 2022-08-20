import { ItemTypes } from './Constants';
import { useDrop } from 'react-dnd';

const Bucket = ({ increaseScore }) => {
	const [, drop] = useDrop(() => ({
		accept: ItemTypes.BALL,
		drop: () => {
			increaseScore();
			// reset ball to starting position
			document.getElementById('ball').style.animation = 'none';

			setTimeout(() => {
				document.getElementById('ball').style.animation = '';
			}, 50);
		},
	}));

	return (
		<div
			className='absolute bottom-2 flex justify-center left-0'
			style={{
				width: '100%',
			}}
		>
			<div
				ref={drop}
				className={`border-2 border-black decoration-white text-white border-t-0 w-20 h-16 moveBucket`}
			></div>
		</div>
	);
};

export default Bucket;
