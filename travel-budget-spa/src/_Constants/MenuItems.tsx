import CalculatorIcon from '../components/Icons/CalculatorIcon';
import PlusIcon from '../components/Icons/PlusIcon';
import ScaleBalancedSolidIcon from '../components/Icons/ScaleBalancedSolidIcon';
import { IMenyItem, IRoute } from '../_interfaces/interfaces';
import styles from '../components/Button.module.css';
import { appRoutePaths, appRoutes } from './routes';

const menuItemPaths = [appRoutePaths.home, appRoutePaths.addStatement, appRoutePaths.budget];

const menuItemIcons = {
	[appRoutePaths.home]: <ScaleBalancedSolidIcon />,
	[appRoutePaths.addStatement]: <PlusIcon />,
	[appRoutePaths.budget]: <CalculatorIcon />
};

const menuItemButtonStyles = {
	[appRoutePaths.home]: styles['icon-primary-button'],
	[appRoutePaths.addStatement]: styles['icon-success-button'],
	[appRoutePaths.budget]: styles['icon-primary-button']
};

export const appMenuItems: IMenyItem[] = appRoutes
	.filter((route: IRoute) => menuItemPaths.includes(route.path))
	.map((route: IRoute) => ({
		...route,
		icon: menuItemIcons[route.path],
		buttonStyle: menuItemButtonStyles[route.path]
	}));
