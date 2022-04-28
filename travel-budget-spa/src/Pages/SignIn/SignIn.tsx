import Button from "../../Shared/Button";
import GoogleIcon from "../../_Icons/GoogleIcon";

const SignIn = () => (
    <div className="sign-in-container">
        <h2>Sign in to start tracking your travel budget!</h2>
        <Button
            text="Sign in with Google"
            icon={<GoogleIcon />}
            className="text-icon-success-button"
            onClick={() => null}
        />
    </div>
);

export default SignIn;