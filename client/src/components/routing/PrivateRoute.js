// Routing
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ children }) => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, loading } = authContext;

	// If user is authenticated, render children
	return isAuthenticated && !loading ? children : <Navigate to='/' />;
};

export default PrivateRoute;
