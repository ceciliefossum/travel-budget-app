import CalculatorIcon from "../shared/Icons/CalculatorIcon";
import PlusIcon from "../shared/Icons/PlusIcon";
import ScaleBalancedSolidIcon from "../shared/Icons/ScaleBalancedSolidIcon";
import { IMenyItem, IRoute } from "../_interfaces/Interfaces";
import { appRoutePaths, appRoutes } from "./Routes";
import styles from '../shared/Button.module.css';

const menuItemPaths = [
    appRoutePaths.home,
    appRoutePaths.addStatement,
    appRoutePaths.budget,
]

const menuItemIcons = {
    [appRoutePaths.home]: <ScaleBalancedSolidIcon />,
    [appRoutePaths.addStatement]: <PlusIcon />,
    [appRoutePaths.budget]: <CalculatorIcon />,
}

const menuItemButtonStyles = {
    [appRoutePaths.home]: styles['icon-primary-button'],
    [appRoutePaths.addStatement]: styles['icon-success-button'],
    [appRoutePaths.budget]:styles['icon-primary-button'],
}

export const appMenuItems: IMenyItem[] = appRoutes
    .filter((route: IRoute) => menuItemPaths.includes(route.path))
    .map((route: IRoute) => ({
        ...route,
        icon: menuItemIcons[route.path],
        buttonStyle: menuItemButtonStyles[route.path]
    }));