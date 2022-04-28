import { BalanceType, StatementCategory, StatementType } from "../_interfaces/Enums"
import { IBalance, IStatement } from "../_interfaces/Interfaces";

export const balancesTemp: IBalance[] = [
    { type: BalanceType.TodaysBalance, amount: 100 },
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
    { title: "Campingplass", type: StatementType.Expence, amount: 125, valuta: "NOK", category: StatementCategory.CampingSpot },
    { title: "Campingplass", type: StatementType.Income, amount: 2000, valuta: "NOK", category: StatementCategory.Income },
];
