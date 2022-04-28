import Statement from "../../shared/Statement";
import './Dashboard.css';
import { statementsTemp, balancesTemp } from "../../_constants/Constants";
import Balance from "../../shared/Balance";
import { IBalance, IStatement } from "../../_interfaces/Interfaces";

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="balances-container">
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