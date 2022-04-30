import { TransactionCategory, TransactionType } from "../_interfaces/Enums";
import { ITransaction } from "../_interfaces/Interfaces";

export const transactionsMock: ITransaction[] = [
    {
        type: TransactionType.Income,
        amount: 100,
        valuta: 'NOK',
        category: TransactionCategory.Income,
        date: new Date()
    },
    {
        type: TransactionType.Expence,
        amount: 50,
        valuta: 'NOK',
        category: TransactionCategory.DailyExpence,
        date: new Date()
    },
];