import { Link } from 'react-router-dom';
import { appRoutes } from '../_Constants/Routes';
import { IRoute } from '../_Interfaces/Interfaces';
import IconButton from './IconButton';
import './Navbar.css';

const Navbar = () => (
    <div className="navbar-container">
        {appRoutes.map((route: IRoute) => (
            <Link key={route.path} to={route.path} >
                <IconButton icon={route.icon} style={route.buttonStyle} color={route.buttonColor} />
            </Link>
        ))}
    </div>
);

export default Navbar;
