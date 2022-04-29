import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import Button from "../../shared/Button";
import GoogleIcon from "../../shared/Icons/GoogleIcon";
import styles from "../../shared/Button.module.css";
import "./SignIn.css";
import { auth } from '../../firebaseSetup';

const SignIn = () => {
    const provider = new GoogleAuthProvider();

    const googleSignInHandler = async () => {
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