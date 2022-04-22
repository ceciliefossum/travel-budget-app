import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import { AppProps } from './Interfaces/Props';

const App = (props: AppProps) => (
    <div className="app">
      <header className={`app-header ${!props.isAuthenticated && 'header-expanded'}`}>
        <h1>TravelBudget</h1>
		{!props.isAuthenticated && (
			<p>Sign in to start!</p>
		)}
      </header>
      <Outlet />
    </div>
);

export default App;
