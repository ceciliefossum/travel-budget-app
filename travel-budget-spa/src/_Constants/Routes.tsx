import Budget from "../Pages/Budget/Budget";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AddStatement from "../Pages/AddStatement/AddStatement";
import CalculatorIcon from "../_Icons/CalculatorIcon";
import PlusIcon from "../_Icons/PlusIcon";
import ScaleBalancedSolidIcon from "../_Icons/ScaleBalancedSolidIcon";
import { IRoute } from "../_Interfaces/Interfaces";
import styles from '../Shared/Button.module.css';

export const appRoutes: IRoute[] = [
    { 
        path: '/',
        title: 'Home',
        element: <Dashboard />,
        isProtected: true,
        icon: <ScaleBalancedSolidIcon />,
        buttonStyle: styles['icon-primary-button'],
    },
    { 
        path: '/add',
        title: 'Add statement',
        element: <AddStatement />,
        isProtected: true,
        icon: <PlusIcon />,
        buttonStyle: styles['icon-success-button'],
    },
    {
        path: '/budget',
        title: 'Budget',
        element: <Budget />,
        isProtected: true,
        icon: <CalculatorIcon />,
        buttonStyle: styles['icon-primary-button'],
    },
]