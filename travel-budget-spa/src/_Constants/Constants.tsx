import DollarSackIcon from '../shared/Icons/DollarSackIcon';
import FuelIcon from '../shared/Icons/FuelIcon';
import ShoppingBasketIcon from '../shared/Icons/ShoppingBasketIcon';
import { TransactionType } from '../_interfaces/Enums';
import { ITransactionTypeChoice } from '../_interfaces/Interfaces';

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
