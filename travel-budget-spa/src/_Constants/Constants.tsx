import DollarSackIcon from '../components/Icons/DollarSackIcon';
import FuelIcon from '../components/Icons/FuelIcon';
import ShoppingBasketIcon from '../components/Icons/ShoppingBasketIcon';
import { TransactionType } from '../_interfaces/enums';
import { ITransactionTypeChoice } from '../_interfaces/interfaces';

export const databaseCollectionNames = {
	transactions: 'transactions',
	budgetPeriods: 'budget-periods'
};

export const transactionTypeChoices: ITransactionTypeChoice[] = [
	{
		text: 'Add Income',
		icon: <DollarSackIcon />,
		transactionType: TransactionType.Income
	},
	{
		text: 'Add Daily Expence',
		icon: <ShoppingBasketIcon />,
		transactionType: TransactionType.DailyExpence
	},
	{
		text: 'Add Fuel Expence',
		icon: <FuelIcon />,
		transactionType: TransactionType.Fuel
	}
];
