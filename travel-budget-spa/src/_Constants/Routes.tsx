import { IRoute } from '../_interfaces/interfaces';

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
		isProtected: true
	},
	{
		path: appRoutePaths.addStatement,
		title: 'Add transaction',
		isProtected: true
	},
	{
		path: appRoutePaths.budget,
		title: 'Budget',
		isProtected: true
	},
	{
		path: appRoutePaths.signIn,
		title: 'Sign In',
		isProtected: false
	}
];
