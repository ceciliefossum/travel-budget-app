import { BalanceType, StatementCategory, StatementType } from "./Enums";

export interface IBalance {
    amount: number,
    type: BalanceType,
}

export interface IStatement {
    type: StatementType,
    title: string,
    amount: number,
    valuta: string,
    category: StatementCategory,
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