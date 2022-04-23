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
