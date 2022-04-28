import Budget from "../Pages/Budget/Budget";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AddStatement from "../Pages/AddStatement/AddStatement";
import { IRoute } from "../_Interfaces/Interfaces";
import SignIn from "../Pages/SignIn/SignIn";

export const appRoutePaths = {
    home: '/',
    addStatement: '/add',
    budget: '/budget',
    signIn: '/signin',
}

export const appRoutes: IRoute[] = [
    { 
        path: appRoutePaths.home,
        title: 'Home',
        element: <Dashboard />,
        isProtected: true,
    },
    { 
        path: appRoutePaths.addStatement,
        title: 'Add statement',
        element: <AddStatement />,
        isProtected: true,
    },
    {
        path: appRoutePaths.budget,
        title: 'Budget',
        element: <Budget />,
        isProtected: true,
    },
    {
        path: appRoutePaths.signIn,
        title: 'Sign In',
        element: <SignIn />,
        isProtected: false,
    }
]
