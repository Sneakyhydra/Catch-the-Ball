import { useEffect } from 'react';

const Recentscores = ({ getRecentScores, recent }) => {
	useEffect(() => {
		getRecentScores();
		// eslint-disable-next-line
	}, []);

	if (!recent) return <div>Loading...</div>;
	return (
		<div className='place-content-center flex mt-5'>
			<table className='border-collapse border border-slate-600'>
				<thead>
					<tr>
						<th className='border border-slate-600 py-2 px-3'>Player</th>
						<th className='border border-slate-600 py-2 px-3'>Score</th>
					</tr>
				</thead>
				<tbody>
					{recent.map((obj, idx) => (
						<tr key={idx}>
							<td className='border border-slate-600 py-2 px-3'>{obj.name}</td>
							<td className='border border-slate-600 py-2 px-3'>{obj.score}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Recentscores;
