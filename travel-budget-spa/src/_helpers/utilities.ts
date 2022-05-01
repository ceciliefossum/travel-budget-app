import { TransactionType } from "../_interfaces/Enums";
import { IBudgetPeriod, ITransaction } from "../_interfaces/Interfaces";

const getBudget = (total: number, fromDate: Date, untilDate: Date): number => {
    return total / (getDayDifference(fromDate, untilDate) + 1);
};

/**
 * Returns the number up/ down to a whole number
 * @param {number} number 
 * @returns The number rounded up/ down to a whole number
 */
export const getRoundedNumber = (number: number): number => {
    return Number(number.toFixed());
}

const getSummarizedAmount = (transactions: ITransaction[], fromDate?: Date, untilDate?: Date, types?: TransactionType[],

): number => {
    return transactions
        .filter((transaction: ITransaction) => !fromDate || transaction.date > fromDate)
        .filter((transactions: ITransaction) => !untilDate || transactions.date < untilDate)
        .filter((transactions: ITransaction) => !types || types.includes(transactions.type))
        .reduce((prevAmount: number, currentTransaction: ITransaction) => currentTransaction.amount + prevAmount, 0);
};

/** 
 * Returns the number of days between fromDate and untilDate
 * @param {Date} fromDate
 * @param {Date} untilDate
 * @returns the number of days between fromDate and untilDate
 * */
export const getDayDifference = (fromDate: Date, untilDate: Date): number  => {
    untilDate.setHours(0, 0, 0);
    fromDate.setHours(0, 0, 0);
    const numberOfDays = (untilDate.getTime() - fromDate.getTime()) / ((1000 * 3600 * 24));
    return getRoundedNumber(numberOfDays);
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
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(23, 59, 59);
    const totalIncome = getSummarizedAmount(transactions, budgetPeriod.startDate, new Date(), [TransactionType.Income]);
    const totalExpenses = getSummarizedAmount(transactions, budgetPeriod.startDate, yesterday, [TransactionType.DailyExpence]);
    const total = totalIncome + totalExpenses;
    const budget = getBudget(total, new Date(), budgetPeriod.endDate);
    return getRoundedNumber(budget);
}

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
    const total = budget + getSummarizedAmount(transactions, startOfDay, endOfDay, [TransactionType.DailyExpence]);
    return getRoundedNumber(total);
}

// fuel budget = money planned to spend on fuel


// fuel balance = fuel budget - fuel transactions