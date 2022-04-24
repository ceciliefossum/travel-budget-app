import { BalanceType, StatementCategory, StatementType } from "../_Interfaces/Enums"
import { IBalance, IStatement } from "../_Interfaces/Interfaces";

export const balancesTemp: IBalance[] = [
    { type: BalanceType.TodaysBalance, amount: 100 },
    { type: BalanceType.AccountBalance, amount: 1000 },
    { type: BalanceType.PastDaysBalance, amount: -50 },
];

export const statementsTemp: IStatement[] = [
    { title: "Campingplass", type: StatementType.Expence, amount: 125, valuta: "NOK", category: StatementCategory.CampingSpot },
    { title: "Campingplass", type: StatementType.Expence, amount: 125, valuta: "NOK", category: StatementCategory.CampingSpot },
    { title: "Campingplass", type: StatementType.Expence, amount: 125, valuta: "NOK", category: StatementCategory.CampingSpot },
    { title: "Campingplass", type: StatementType.Expence, amount: 125, valuta: "NOK", category: StatementCategory.CampingSpot },
    { title: "Campingplass", type: StatementType.Expence, amount: 125, valuta: "NOK", category: StatementCategory.CampingSpot },
    { title: "Campingplass", type: StatementType.Expence, amount: 125, valuta: "NOK", category: StatementCategory.CampingSpot },
    { title: "Campingplass", type: StatementType.Expence, amount: 125, valuta: "NOK", category: StatementCategory.CampingSpot },
    { title: "Campingplass", type: StatementType.Expence, amount: 125, valuta: "NOK", category: StatementCategory.CampingSpot },
];
