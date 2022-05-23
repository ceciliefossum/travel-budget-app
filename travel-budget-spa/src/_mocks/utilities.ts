import { TransactionType } from '../_interfaces/enums';
import { IBudgetPeriod, ITransaction } from '../_interfaces/interfaces';

const today = new Date();

const oneDayAgo = new Date();
oneDayAgo.setDate(oneDayAgo.getDate() - 1);

const twoDaysAgo = new Date();
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const accountId = 'account-1';
const budgetPeriodId = 'budget-period-1';

export const transactionsMockAccountBalance50: ITransaction[] = [
	{
		type: TransactionType.Income,
		amount: 100,
		valuta: 'NOK',
		date: today,
		accountId,
		budgetPeriodId
	},
	{
		type: TransactionType.DailyExpence,
		amount: -50,
		valuta: 'NOK',
		date: today,
		accountId,
		budgetPeriodId
	}
];

export const transactionsMockAccountBalanceNegative50: ITransaction[] = [
	{
		type: TransactionType.DailyExpence,
		amount: -100,
		valuta: 'NOK',
		date: today,
		accountId,
		budgetPeriodId
	},
	{
		type: TransactionType.Income,
		amount: 50,
		valuta: 'NOK',
		date: today,
		accountId,
		budgetPeriodId
	}
];

export const transactionsMockAccountBalanceWithFuelExpence50: ITransaction[] = [
	{
		type: TransactionType.DailyExpence,
		amount: -100,
		valuta: 'NOK',
		date: today,
		accountId,
		budgetPeriodId
	},
	{
		type: TransactionType.Income,
		amount: 1000,
		valuta: 'NOK',
		date: today,
		accountId,
		budgetPeriodId
	},
	{
		type: TransactionType.Fuel,
		amount: -200,
		valuta: 'NOK',
		date: today,
		accountId,
		budgetPeriodId
	}
];

export const budgetPeriodDailyBudgetFourDaysTwoDaysLeft: IBudgetPeriod = {
	id: budgetPeriodId,
	accountId,
	startDate: twoDaysAgo,
	endDate: tomorrow
};

export const transactionsMockDailyBudget250: ITransaction[] = [
	{
		type: TransactionType.Income,
		amount: 1000,
		valuta: 'NOK',
		date: oneDayAgo,
		accountId,
		budgetPeriodId
	},
	{
		type: TransactionType.DailyExpence,
		amount: -250,
		valuta: 'NOK',
		date: oneDayAgo,
		accountId,
		budgetPeriodId
	},
	{
		type: TransactionType.DailyExpence,
		amount: -250,
		valuta: 'NOK',
		date: oneDayAgo,
		accountId,
		budgetPeriodId
	}
];

export const transactionsMockTodaysBalance150: ITransaction[] = [
	{
		type: TransactionType.Income,
		amount: 1000,
		valuta: 'NOK',
		date: oneDayAgo,
		accountId,
		budgetPeriodId
	},
	{
		type: TransactionType.DailyExpence,
		amount: -250,
		valuta: 'NOK',
		date: oneDayAgo,
		accountId,
		budgetPeriodId
	},
	{
		type: TransactionType.DailyExpence,
		amount: -250,
		valuta: 'NOK',
		date: oneDayAgo,
		accountId,
		budgetPeriodId
	},
	{
		type: TransactionType.DailyExpence,
		amount: -100,
		valuta: 'NOK',
		date: today,
		accountId,
		budgetPeriodId
	}
];
