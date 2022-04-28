import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './shared/Navbar';
import { appRoutePaths, appRoutes } from './_constants/Routes';
import { IRoute } from './_interfaces/Interfaces';
import { AppProps } from './_interfaces/Props';
import { AuthContext } from './_store/AuthContext';

const isAuthenticated = false;

const App = (props: AppProps) => {
	const user = useContext(AuthContext);
	console.log(user);

	return (
		<div className="app">
			<header className={`app-header`}>
				<h1>TravelBudget</h1>
			</header>
			<div className="main-content-container">
				<Routes>
					{appRoutes.map((route: IRoute) => ((route.isProtected === !!user) &&
						<Route key={route.path} path={route.path} element={route.element} />
					))}
					<Route	
						path="*"
						element={!!user ? <Navigate to={appRoutePaths.home} /> : <Navigate to={appRoutePaths.signIn} />}
					/>
				</Routes>
			</div>
			<Navbar />
		</div>
	);
};

export default App;
