import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './_store/AuthContext';
import { firebaseConfig } from './_firebase/Firebase';
import { initializeApp } from "firebase/app";

const isAuthenticated = false;

// Initialize Firebase
// initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<App isAuthenticated={isAuthenticated} />
			</BrowserRouter>
		</AuthProvider>
  	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
