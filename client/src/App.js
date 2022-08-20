// Routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';

// Pages
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';

// States
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import GameState from './context/game/GameState';

// Layout
import Alerts from './components/layout/Alert/Alerts';

// CSS
import './App.css';

const App = () => {
	return (
		<AuthState>
			<AlertState>
				<GameState>
					<Router>
						<Alerts />
						<Routes>
							<Route exact path='/' element={<Homepage />} />
							<Route
								exact
								path='/dashboard'
								element={
									<PrivateRoute>
										<Dashboard />
									</PrivateRoute>
								}
							/>
						</Routes>
					</Router>
				</GameState>
			</AlertState>
		</AuthState>
	);
};

export default App;
