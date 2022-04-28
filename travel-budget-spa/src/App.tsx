import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Shared/Navbar';
import { appRoutePaths, appRoutes } from './_Constants/Routes';
import { IRoute } from './_Interfaces/Interfaces';
import { AppProps } from './_Interfaces/Props';

const isAuthenticated = false;

const App = (props: AppProps) => (
    <div className="app">
		<header className={`app-header`}>
			<h1>TravelBudget</h1>
		</header>
		<div className="main-content-container">
			<Routes>
				{appRoutes.map((route: IRoute) => ((route.isProtected === isAuthenticated) &&
					<Route key={route.path} path={route.path} element={route.element} />
				))}
				<Route	
					path="*"
					element={isAuthenticated ? <Navigate to={appRoutePaths.home} /> : <Navigate to={appRoutePaths.signIn} />}
				/>
			</Routes>
		</div>
		<Navbar />
    </div>
);

export default App;
