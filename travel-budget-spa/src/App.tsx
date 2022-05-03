import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import { appRoutePaths, appRoutes } from './_constants/routes';
import { IRoute } from './_interfaces/interfaces';
import { AuthContext } from './store/AuthContext';

const App = () => {
	const userState = useContext(AuthContext);

	return (
		<div className="app">
			<header className={`app-header`}>
				<h1>TravelBudget</h1>
			</header>
			{userState.isLoading && <Loading text={'Checking sign in status...'} />}
			{!userState.isLoading && (
				<React.Fragment>
					<div className="main-content-container">
						<Routes>
							{appRoutes.map(
								(route: IRoute) =>
									route.isProtected === !!userState.user && (
										<Route
											key={route.path}
											path={route.path}
											element={route.element}
										/>
									)
							)}
							<Route
								path="*"
								element={
									userState.user ? (
										<Navigate to={appRoutePaths.home} />
									) : (
										<Navigate to={appRoutePaths.signIn} />
									)
								}
							/>
						</Routes>
					</div>
					<Navbar />
				</React.Fragment>
			)}
		</div>
	);
};

export default App;
