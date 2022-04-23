import Budget from "../Budget/Budget";
import Dashboard from "../Dashboard/Dashboard";
import AddStatement from "../Shared/AddStatement";
import CalculatorIcon from "../_Icons/CalculatorIcon";
import PlusIcon from "../_Icons/PlusIcon";
import ScaleBalancedSolidIcon from "../_Icons/ScaleBalancedSolidIcon";
import { ButtonColor, ButtonStyle } from "../_Interfaces/Enums";
import { IRoute } from "../_Interfaces/Interfaces";

export const appRoutes: IRoute[] = [
    { 
        path: '/',
        title: 'Home',
        element: <Dashboard />,
        isProtected: true,
        icon: <ScaleBalancedSolidIcon />,
        buttonStyle: ButtonStyle.Border,
        buttonColor: ButtonColor.MainColor 
    },
    { 
        path: '/add',
        title: 'Add statement',
        element: <AddStatement />,
        isProtected: true,
        icon: <PlusIcon />,
        buttonStyle: ButtonStyle.Solid,
        buttonColor: ButtonColor.SuccessColor 
    },
    {
        path: '/budget',
        title: 'Budget',
        element: <Budget />,
        isProtected: true,
        icon: <CalculatorIcon />,
        buttonStyle: ButtonStyle.Border,
        buttonColor: ButtonColor.MainColor 
    },
]