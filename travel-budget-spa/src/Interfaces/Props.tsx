import { StatementType, StatementCategory } from "./Enums"

export type AppProps = {
    isAuthenticated: boolean,
}

export type StatementProps = {
    type: StatementType,
    title: string,
    amount: number,
    valuta: string,
    category: StatementCategory
}