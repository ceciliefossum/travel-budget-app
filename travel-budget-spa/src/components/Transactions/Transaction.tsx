import './Transaction.css';
import { ITransaction } from '../../_interfaces/interfaces';

const Transaction = (props: { transaction: ITransaction }) => (
	<div className="transaction-container">
		<div className="information">
			<h2>{props.transaction.type.toLowerCase()}</h2>
			<p>{props.transaction.date.toDateString()}</p>
		</div>
		<p className="amount">{props.transaction.amount}</p>
	</div>
);

export default Transaction;
