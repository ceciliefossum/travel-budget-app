import Transaction from "../../shared/Transaction";
import './Dashboard.css';
import { transactionsTemp, balancesTemp } from "../../_constants/Constants";
import Balance from "../../shared/Balance";
import { IBalance, ITransaction } from "../../_interfaces/Interfaces";
import { BalanceType, TransactionType } from "../../_interfaces/Enums";

const Dashboard = () => {
    const money = transactionsTemp.reduce((amount: number, statement: ITransaction) =>
        statement.type === TransactionType.Expence ? amount - statement.amount : amount + statement.amount, 0
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
                {transactionsTemp.map((statement: ITransaction, index: number) => (
                    <Transaction key={index.toString()} statement={statement} />
                ))}
            </div>
        </div>
    )
}

export default Dashboard;