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
		title: 'Home'
	},
	{
		path: appRoutePaths.addStatement,
		title: 'Add transaction'
	},
	{
		path: appRoutePaths.budget,
		title: 'Budget'
	},
	{
		path: appRoutePaths.signIn,
		title: 'Sign In'
	}
];
