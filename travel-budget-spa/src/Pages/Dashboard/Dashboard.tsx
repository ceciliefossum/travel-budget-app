import Statement from "../../shared/Statement";
import './Dashboard.css';
import { statementsTemp, balancesTemp } from "../../_constants/Constants";
import Balance from "../../shared/Balance";
import { IBalance, IStatement } from "../../_interfaces/Interfaces";
import { BalanceType, StatementType } from "../../_interfaces/Enums";

const Dashboard = () => {
    const money = statementsTemp.reduce((amount: number, statement: IStatement) =>
        statement.type === StatementType.Expence ? amount - statement.amount : amount + statement.amount, 0
    );

    return (
        <div className="dashboard-container">
            <div className="balances-container">
                <Balance balance={{amount: money, type: BalanceType.AccountBalance}} />
                {balancesTemp.map((balance: IBalance, index: number) => (
                    <Balance key={index.toString()} balance={balance} />
                ))}
            </div>
            <div className="statements-container">
                {statementsTemp.map((statement: IStatement, index: number) => (
                    <Statement key={index.toString()} statement={statement} />
                ))}
            </div>
        </div>
    )
}

export default Dashboard;