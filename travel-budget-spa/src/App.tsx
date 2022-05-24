import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import { appRoutePaths } from './_constants/routes';
import { AuthContext } from './store/AuthContext';
import Dashboard from './pages/Dashboard/Dashboard';
import AddTransaction from './pages/AddTransaction/AddTransaction';
import Budget from './pages/Budget/Budget';
import SignIn from './pages/SignIn/SignIn';

const App = () => {
	const userState = useContext(AuthContext);

	return (
		<div className="app">
			<header className={`app-header`}>
				<h1>TravelBudget</h1>
			</header>
			{userState.isLoading && <Loading text={'Checking sign in status...'} />}
			{!userState.isLoading && userState.error && <p>{userState.error}</p>}
			{!userState.isLoading && !userState.error && (
				<React.Fragment>
					<div className="main-content-container">
						<Routes>
							{!!userState.user && (
								<React.Fragment>
									<Route path={appRoutePaths.home} element={<Dashboard />} />
									<Route
										path={appRoutePaths.addStatement}
										element={<AddTransaction />}
									/>
									<Route path={appRoutePaths.budget} element={<Budget />} />
								</React.Fragment>
							)}
							{!userState.user && (
								<Route path={appRoutePaths.signIn} element={<SignIn />} />
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
