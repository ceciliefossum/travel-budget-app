import { TransactionCategory, TransactionType } from "../_interfaces/Enums";
import { IBudgetPeriod, ITransaction } from "../_interfaces/Interfaces";


const getAddedValue = (transaction: ITransaction, currentAmount: number): number => {
    return transaction.type === TransactionType.Expence ? currentAmount - transaction.amount : currentAmount + transaction.amount;
};

const getDayDifference = (fromDate: Date, untilDate: Date): number  => {
    untilDate.setHours(0, 0, 0);
    fromDate.setHours(0, 0, 0);
    return (untilDate.getTime() - fromDate.getTime()) / ((1000 * 3600 * 24));
};

const getBudget = (total: number, fromDate: Date, untilDate: Date): number => {
    return total / (getDayDifference(fromDate, untilDate) + 1);
};

const getRoundedNumber = (number: number): number => {
    return Number(number.toFixed());
}

const getSummarizedAmount = (
    transactions: ITransaction[],
    fromDate?: Date,
    untilDate?: Date,
    categories?: TransactionCategory[],

): number => {
    return transactions
        .filter((transaction: ITransaction) => !fromDate || transaction.date > fromDate)
        .filter((transactions: ITransaction) => !untilDate || transactions.date < untilDate)
        .filter((transactions: ITransaction) => !categories || categories.includes(transactions.category))
        .reduce((prevAmount: number, currentTransaction: ITransaction) => getAddedValue(currentTransaction, prevAmount), 0);
};

/** 
 * Returns the total account balance, all transactions summarized
 * @param {ITransaction[]} transactions
 * @returns Account balance
 * */
export const getAccountBalance = (transactions: ITransaction[]): number => {
    const total = getSummarizedAmount(transactions);
    return getRoundedNumber(total);
}

/** 
 * Returns daily budget, income and daily expences summarized, and divided on the remaining days of the budget period.
 * Daily expenses of current day is not subtracted from the budget.
 * @param {ITransaction[]} transactions
 * @param {IBudgetPeriod} budgetPeriod
 * @returns Daily budget
 * */
export const getDailyBudget = (transactions: ITransaction[], budgetPeriod: IBudgetPeriod): number => {
    const yesterday = new Date();
    yesterday.setDate(-1);
    yesterday.setHours(0, 0, 0);
    const totalIncome = getSummarizedAmount(transactions, budgetPeriod.startDate, new Date(), [TransactionCategory.Income]);
    const totalExpenses = getSummarizedAmount(transactions, budgetPeriod.startDate, yesterday, [TransactionCategory.DailyExpence]);
    const total = totalIncome + totalExpenses;
    const budget = getBudget(total, new Date(), budgetPeriod.endDate);
    return getRoundedNumber(budget);
}

// todays balance = daily budget - all daily expence transactions current day
/** 
 * Returns todays balance, all daily expences subtracted from the budget 
 * @param {ITransaction[]} transactions
 * @param {number} budget
 * @returns Todays balance
 * */
export const getTodaysBalance = (transactions: ITransaction[], budget: number): number => {
    const startOfDay = new Date();
    const endOfDay = new Date();
    startOfDay.setHours(0, 0, 0);
    endOfDay.setHours(23, 59, 59);
    const total = budget + getSummarizedAmount(transactions, startOfDay, endOfDay, [TransactionCategory.DailyExpence]);
    return getRoundedNumber(total);
}

// fuel budget = money planned to spend on fuel


// fuel balance = fuel budget - fuel transactions