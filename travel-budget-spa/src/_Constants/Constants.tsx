import { BalanceType, TransactionCategory, TransactionType } from "../_interfaces/Enums"
import { IBalance, ITransaction } from "../_interfaces/Interfaces";

export const balancesTemp: IBalance[] = [
    { type: BalanceType.TodaysBalance, amount: 100 },
    { type: BalanceType.PastDaysBalance, amount: -50 },
];

export const transactionsTemp: ITransaction[] = [
    { type: TransactionType.Expence, amount: 125, valuta: "NOK", category: TransactionCategory.DailyExpence, date: new Date() },
    { type: TransactionType.Expence, amount: 125, valuta: "NOK", category: TransactionCategory.DailyExpence, date: new Date() },
    { type: TransactionType.Expence, amount: 125, valuta: "NOK", category: TransactionCategory.DailyExpence, date: new Date() },
    { type: TransactionType.Expence, amount: 125, valuta: "NOK", category: TransactionCategory.DailyExpence, date: new Date() },
    { type: TransactionType.Expence, amount: 125, valuta: "NOK", category: TransactionCategory.DailyExpence, date: new Date() },
    { type: TransactionType.Expence, amount: 125, valuta: "NOK", category: TransactionCategory.DailyExpence, date: new Date() },
    { type: TransactionType.Expence, amount: 125, valuta: "NOK", category: TransactionCategory.DailyExpence, date: new Date() },
    { type: TransactionType.Expence, amount: 125, valuta: "NOK", category: TransactionCategory.DailyExpence, date: new Date() },
    { type: TransactionType.Expence, amount: 125, valuta: "NOK", category: TransactionCategory.DailyExpence, date: new Date() },
    { type: TransactionType.Income, amount: 2000, valuta: "NOK", category: TransactionCategory.Income, date: new Date() },
];
