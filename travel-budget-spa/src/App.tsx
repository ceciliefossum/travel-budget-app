import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './Shared/Navbar';
import { AppProps } from './_Interfaces/Props';

const App = (props: AppProps) => (
    <div className="app">
		<header className={`app-header ${!props.isAuthenticated && 'header-expanded'}`}>
			<h1>TravelBudget</h1>
			{!props.isAuthenticated && (
				<p>Sign in to start!</p>
			)}
		</header>
		<div className="main-content-container">
			<Outlet />
		</div>
		<Navbar />
    </div>
);

export default App;
