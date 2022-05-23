import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../helpers/firebase';
import { IUserState } from '../_interfaces/interfaces';
import useFirestore from '../hooks/use-firestore';

const initiaUserState: IUserState = {
	user: auth.currentUser,
	userData: null,
	isLoading: auth.currentUser ? false : true,
	error: null
};

export const AuthContext = React.createContext<IUserState>(initiaUserState);

export const AuthProvider = (props: { children: JSX.Element }) => {
	const [userState, setUserState] = useState<IUserState>(initiaUserState);
	const { getUserData } = useFirestore();

	useEffect(() => {
		const onChange = async (user: User | null) => {
			if (user) {
				const userData = await getUserData(user.uid);
				if (userData) {
					setUserState({ user, userData, isLoading: false, error: null });
				} else {
					setUserState({
						user,
						userData: null,
						isLoading: false,
						error: 'No account found.'
					});
				}
			}
		};

		const onError = () => {
			setUserState({
				user: null,
				userData: null,
				isLoading: false,
				error: 'Authentication failed.'
			});
		};

		const unsubscribe = auth.onIdTokenChanged(onChange, onError);

		return unsubscribe;
	}, []);

	return <AuthContext.Provider value={userState}>{props.children}</AuthContext.Provider>;
};
