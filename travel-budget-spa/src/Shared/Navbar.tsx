import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../_Constants/Routes';
import { IRoute } from '../_Interfaces/Interfaces';
import Button from './Button';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className="navbar-container">
            {appRoutes.map((route: IRoute) => (
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
