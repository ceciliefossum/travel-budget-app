import { useNavigate } from 'react-router-dom';
import { appMenuItems } from '../_constants/menuItems';
import { IMenyItem } from '../_interfaces/interfaces';
import Button from './Button';
import './Navbar.css';

const Navbar = () => {
	const navigate = useNavigate();

	return (
		<div className="navbar-container">
			{appMenuItems.map((route: IMenyItem) => (
				<Button
					key={route.path}
					text={route.title}
					icon={route.icon}
					className={route.buttonStyle}
					onClick={() => navigate(route.path)}
				/>
			))}
		</div>
	);
};

export default Navbar;