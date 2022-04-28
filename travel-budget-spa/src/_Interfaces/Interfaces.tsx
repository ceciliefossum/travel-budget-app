import { BalanceType, TransactionCategory, TransactionType } from "./Enums";

export interface IBalance {
    amount: number,
    type: BalanceType,
}

export interface ITransaction {
    type: TransactionType,
    title: string,
    amount: number,
    valuta: string,
    category: TransactionCategory,
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