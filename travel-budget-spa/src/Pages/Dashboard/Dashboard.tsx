import Statement from "../../Shared/Statement";
import './Dashboard.css';
import { statementsTemp, balancesTemp } from "../../_Constants/Constants";
import Balance from "../../Shared/Balance";
import { IBalance, IStatement } from "../../_Interfaces/Interfaces";

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