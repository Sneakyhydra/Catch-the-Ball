// Imports
import { useContext } from 'react';
import AlertContext from '../../../context/alert/alertContext';

const Alerts = () => {
	const alertContext = useContext(AlertContext);

	return (
		alertContext.alerts.length > 0 &&
		alertContext.alerts.map((alert) => (
			<div key={alert.id} className={`alert alert-${alert.type}`}>
				<span
					className='material-icons'
					style={{
						paddingBottom: '0.5rem',
					}}
				>
					info
				</span>
				{alert.msg}
			</div>
		))
	);
};

export default Alerts;
