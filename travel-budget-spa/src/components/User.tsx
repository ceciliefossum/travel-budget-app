import { UserProps } from '../_interfaces/props';
import './User.css';
import styles from '../components/Button.module.css';
import Button from './Button';
import SignOutIcon from './Icons/SignOutIcon';

const User = ({ user, onSignOut }: UserProps) => (
	<div className="user-container">
		<img src={user.photoURL ?? ''} alt="User profile image" />
		<div className="info">
			<h3>Signed in as</h3>
			<p>{user.displayName}</p>
		</div>
		<Button
			className={styles['icon-danger-button']}
			text="Sign out"
			icon={<SignOutIcon />}
			onClick={onSignOut}
		/>
	</div>
);

export default User;
