import { useEffect } from "react";
import { signInWithRedirect, getRedirectResult, GoogleAuthProvider, UserCredential } from "firebase/auth";
import Button from "../../shared/Button";
import GoogleIcon from "../../shared/Icons/GoogleIcon";
import styles from "../../shared/Button.module.css";
import "./SignIn.css";
import { auth } from '../../firebaseSetup';

const SignIn = () => {

    const provider = new GoogleAuthProvider();

    useEffect(() => {
        getRedirectResult(auth)
            .then((result: UserCredential | null) => {})
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log(errorCode);
                console.log(errorMessage)
                console.log(email)
                console.log(credential)
            });
    });

    const googleSignInHandler = () => {
        signInWithRedirect(auth, provider);
    }

    return (
        <div className="sign-in-container">
            <h2>Sign in to start tracking your travel budget!</h2>
            <Button
                text="Sign in with Google"
                icon={<GoogleIcon />}
                className={styles['text-icon-success-button']}
                onClick={() => googleSignInHandler()}
            />
        </div>
    );
};

export default SignIn;