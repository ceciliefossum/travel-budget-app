import Budget from '../pages/Budget/Budget';
import Dashboard from '../pages/Dashboard/Dashboard';
import AddTransaction from '../pages/AddTransaction/AddTransaction';
import { IRoute } from '../_interfaces/Interfaces';
import SignIn from '../pages/SignIn/SignIn';

export const appRoutePaths = {
	home: '/',
	addStatement: '/add',
	budget: '/budget',
	signIn: '/signin'
};

export const appRoutes: IRoute[] = [
	{
		path: appRoutePaths.home,
		title: 'Home',
		element: <Dashboard />,
		isProtected: true
	},
	{
		path: appRoutePaths.addStatement,
		title: 'Add statement',
		element: <AddTransaction />,
		isProtected: true
	},
	{
		path: appRoutePaths.budget,
		title: 'Budget',
		element: <Budget />,
		isProtected: true
	},
	{
		path: appRoutePaths.signIn,
		title: 'Sign In',
		element: <SignIn />,
		isProtected: false
	}
];
