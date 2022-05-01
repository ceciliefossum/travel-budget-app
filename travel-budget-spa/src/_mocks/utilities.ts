import { TransactionType } from '../_interfaces/Enums';
import { IBudgetPeriod, ITransaction } from '../_interfaces/Interfaces';

const today = new Date();

const oneDayAgo = new Date();
oneDayAgo.setDate(oneDayAgo.getDate() - 1);

const twoDaysAgo = new Date();
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export const transactionsMockAccountBalance50: ITransaction[] = [
	{
		type: TransactionType.Income,
		amount: 100,
		valuta: 'NOK',
		date: today
	},
	{
		type: TransactionType.DailyExpence,
		amount: -50,
		valuta: 'NOK',
		date: today
	}
];

export const transactionsMockAccountBalanceNegative50: ITransaction[] = [
	{
		type: TransactionType.DailyExpence,
		amount: -100,
		valuta: 'NOK',
		date: today
	},
	{
		type: TransactionType.Income,
		amount: 50,
		valuta: 'NOK',
		date: today
	}
];

export const transactionsMockAccountBalanceWithFuelExpence50: ITransaction[] = [
	{
		type: TransactionType.DailyExpence,
		amount: -100,
		valuta: 'NOK',
		date: today
	},
	{
		type: TransactionType.Income,
		amount: 1000,
		valuta: 'NOK',
		date: today
	},
	{
		type: TransactionType.Fuel,
		amount: -200,
		valuta: 'NOK',
		date: today
	}
];

export const budgetPeriodDailyBudgetFourDaysTwoDaysLeft: IBudgetPeriod = {
	startDate: twoDaysAgo,
	endDate: tomorrow
};

export const transactionsMockDailyBudget250: ITransaction[] = [
	{
		type: TransactionType.Income,
		amount: 1000,
		valuta: 'NOK',
		date: oneDayAgo
	},
	{
		type: TransactionType.DailyExpence,
		amount: -250,
		valuta: 'NOK',
		date: oneDayAgo
	},
	{
		type: TransactionType.DailyExpence,
		amount: -250,
		valuta: 'NOK',
		date: oneDayAgo
	}
];

export const transactionsMockTodaysBalance150: ITransaction[] = [
	{
		type: TransactionType.Income,
		amount: 1000,
		valuta: 'NOK',
		date: oneDayAgo
	},
	{
		type: TransactionType.DailyExpence,
		amount: -250,
		valuta: 'NOK',
		date: oneDayAgo
	},
	{
		type: TransactionType.DailyExpence,
		amount: -250,
		valuta: 'NOK',
		date: oneDayAgo
	},
	{
		type: TransactionType.DailyExpence,
		amount: -100,
		valuta: 'NOK',
		date: today
	}
];
