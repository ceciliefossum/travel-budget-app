import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../firebaseSetup';
import { IUserState } from '../_interfaces/interfaces';

const initiaUserState = {
	user: auth.currentUser,
	isLoading: auth.currentUser ? false : true,
	error: null
};

export const AuthContext = React.createContext<IUserState>(initiaUserState);

export const AuthProvider = (props: { children: JSX.Element }) => {
	const [userState, setUserState] = useState<IUserState>(initiaUserState);

	useEffect(() => {
		const onChange = (user: User | null) => {
			setUserState({ user, isLoading: false, error: null });
		};
		const onError = () => {
			setUserState({
				user: null,
				isLoading: false,
				error: 'Authentication failed.'
			});
		};
		const unsubscribe = auth.onIdTokenChanged(onChange, onError);

		return unsubscribe;
	}, []);

	return <AuthContext.Provider value={userState}>{props.children}</AuthContext.Provider>;
};
