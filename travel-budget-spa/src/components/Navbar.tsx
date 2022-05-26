import { useLocation, useNavigate } from 'react-router-dom';
import { activeButtonStyle, appMenuItems } from '../_constants/menuItems';
import { IMenyItem } from '../_interfaces/interfaces';
import Button from './Button';
import './Navbar.css';

const Navbar = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	return (
		<div className="navbar-container">
			{appMenuItems.map((route: IMenyItem) => (
				<Button
					key={route.path}
					text={route.title}
					icon={route.icon}
					className={`${route.buttonStyle} ${
						pathname === route.path ? activeButtonStyle : ''
					}`}
					onClick={() => navigate(route.path)}
				/>
			))}
		</div>
	);
};

export default Navbar;
