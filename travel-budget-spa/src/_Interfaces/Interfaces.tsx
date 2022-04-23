import { BalanceType, ButtonColor, ButtonStyle, StatementCategory, StatementType } from "./Enums";

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
    icon: JSX.Element,
    buttonStyle: ButtonStyle,
    buttonColor: ButtonColor,
}