import { TransactionType } from "../_interfaces/Enums";
import './Transaction.css'
import { ITransaction } from "../_interfaces/Interfaces";

const Transaction = (props: { statement: ITransaction }) => (
    <div className="transaction-container">
        <div className="information">
            <h2>{props.statement.title}</h2>
            <p>{props.statement.category}</p>
        </div>
        <p className="amount">{props.statement.type === TransactionType.Expence && '-'} {props.statement.amount}</p>
    </div>
);

export default Transaction;