import { TransactionCategory, TransactionType } from "../_interfaces/Enums";
import { IBudgetPeriod, ITransaction } from "../_interfaces/Interfaces";

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
        category: TransactionCategory.Income,
        date: today
    },
    {
        type: TransactionType.Expence,
        amount: 50,
        valuta: 'NOK',
        category: TransactionCategory.DailyExpence,
        date: today
    },
];


export const transactionsMockAccountBalanceNegative50: ITransaction[] = [
    {
        type: TransactionType.Expence,
        amount: 100,
        valuta: 'NOK',
        category: TransactionCategory.DailyExpence,
        date: today
    },
    {
        type: TransactionType.Income,
        amount: 50,
        valuta: 'NOK',
        category: TransactionCategory.Income,
        date: today
    },
];

export const transactionsMockAccountBalanceWithFuelExpence50: ITransaction[] = [
    {
        type: TransactionType.Expence,
        amount: 100,
        valuta: 'NOK',
        category: TransactionCategory.DailyExpence,
        date: today
    },
    {
        type: TransactionType.Income,
        amount: 1000,
        valuta: 'NOK',
        category: TransactionCategory.Income,
        date: today
    },
    {
        type: TransactionType.Expence,
        amount: 200,
        valuta: 'NOK',
        category: TransactionCategory.Fuel,
        date: today
    },
];

export const budgetPeriodDailyBudgetFourDaysTwoDaysLeft: IBudgetPeriod = {
    startDate: twoDaysAgo,
    endDate: tomorrow,
}

export const transactionsMockDailyBudget250: ITransaction[] = [
    {
        type: TransactionType.Income,
        amount: 1000,
        valuta: 'NOK',
        category: TransactionCategory.Income,
        date: oneDayAgo
    },
    {
        type: TransactionType.Expence,
        amount: 250,
        valuta: 'NOK',
        category: TransactionCategory.DailyExpence,
        date: oneDayAgo
    },
    {
        type: TransactionType.Expence,
        amount: 250,
        valuta: 'NOK',
        category: TransactionCategory.DailyExpence,
        date: oneDayAgo
    },
];

export const transactionsMockTodaysBalance150: ITransaction[] = [
    {
        type: TransactionType.Income,
        amount: 1000,
        valuta: 'NOK',
        category: TransactionCategory.Income,
        date: oneDayAgo
    },
    {
        type: TransactionType.Expence,
        amount: 250,
        valuta: 'NOK',
        category: TransactionCategory.DailyExpence,
        date: oneDayAgo
    },
    {
        type: TransactionType.Expence,
        amount: 250,
        valuta: 'NOK',
        category: TransactionCategory.DailyExpence,
        date: oneDayAgo
    },
    {
        type: TransactionType.Expence,
        amount: 100,
        valuta: 'NOK',
        category: TransactionCategory.DailyExpence,
        date: today
    },
];