import { BalanceType, TransactionCategory, TransactionType } from "./Enums";

export interface IBalance {
    amount: number,
    type: BalanceType,
}

export interface ITransaction {
    type: TransactionType,
    amount: number,
    valuta: string,
    category: TransactionCategory,
    date: Date,
}

export interface IRoute {
    path: string,
    title: string,
    element: JSX.Element,
    isProtected: boolean,
}

export interface IMenyItem extends IRoute {
    icon: JSX.Element,
    buttonStyle: string,
}