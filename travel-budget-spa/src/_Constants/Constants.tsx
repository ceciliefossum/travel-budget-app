import { BalanceType } from "../_interfaces/Enums"
import { IBalance } from "../_interfaces/Interfaces";

export const balancesTemp: IBalance[] = [
    { type: BalanceType.TodaysBalance, amount: 100 },
    { type: BalanceType.PastDaysBalance, amount: -50 },
];

export const databaseCollectionNames = {
    transactions: 'transactions',
};
