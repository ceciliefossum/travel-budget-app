import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { appRoutes } from './_Constants/Routes';
import { IRoute } from './_Interfaces/Interfaces';

const isAuthenticated = true;

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
    	<BrowserRouter>
    		<Routes>
				<Route path="/" element={<App isAuthenticated={isAuthenticated} />} >
					{appRoutes.map((route: IRoute) => ((!route.isProtected || isAuthenticated) &&
						<Route key={route.path} path={route.path} element={route.element} />
					))}
				</Route>
			</Routes>
    	</BrowserRouter>
  	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
