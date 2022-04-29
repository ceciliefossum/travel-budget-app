import React, { useState, useEffect } from "react";
import { User } from "firebase/auth"
import { auth } from "../firebaseSetup";

export const AuthContext = React.createContext<User | null | undefined>(undefined);

export const AuthProvider = (props: { children: JSX.Element }) => {
    const [user, setUser] = useState<User | null>(null);
  
    useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
			setUser(user);
		});
	
		return unsubscribe;
    }, [user]);

    
    return <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>;
  };