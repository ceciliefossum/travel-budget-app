import Transaction from './Transaction';
import { ITransaction } from '../../_interfaces/interfaces';
import { TransactionsProps } from '../../_interfaces/props';
import './Transactions.css';

const Transactions = ({ transactions }: TransactionsProps) => (
	<div className="transactions-container">
		<div className="header">
			<h3>Transactions</h3>
		</div>
		{transactions &&
			transactions.map((transaction: ITransaction, index: number) => (
				<Transaction key={index.toString()} transaction={transaction} />
			))}
		{!transactions && <p>No transactions</p>}
	</div>
);

export default Transactions;
