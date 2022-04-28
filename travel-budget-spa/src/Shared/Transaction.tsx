import { TransactionType } from "../_interfaces/Enums";
import './Transaction.css'
import { ITransaction } from "../_interfaces/Interfaces";

const Transaction = (props: { transaction: ITransaction }) => (
    <div className="transaction-container">
        <div className="information">
            <h2>{(props.transaction.category.toLowerCase())}</h2>
            <p>{props.transaction.date.toDateString()}</p>
        </div>
        <p className="amount">{props.transaction.type === TransactionType.Expence && '-'} {props.transaction.amount}</p>
    </div>
);

export default Transaction;