import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Loading from './shared/Loading';
import Navbar from './shared/Navbar';
import { appRoutePaths, appRoutes } from './_constants/Routes';
import { IRoute } from './_interfaces/Interfaces';
import { AuthContext } from './_store/AuthContext';

const App = () => {
	const userState = useContext(AuthContext);

	return (
		<div className="app">
			<header className={`app-header`}>
				<h1>TravelBudget</h1>
			</header>
			{userState.isLoading && (
				<Loading text={'Checking sign in status...'} />
			)}
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
