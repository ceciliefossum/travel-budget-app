import './Dashboard.css';
import React, { useContext } from 'react';
import Loading from '../../components/Loading';
import { AuthContext } from '../../store/AuthContext';
import Transactions from '../../components/Transactions';
import useBudgetPeriod from '../../hooks/use-budget-period';
import useTransactions from '../../hooks/use-transactions';
import useBalance from '../../hooks/use-balance';
import BalanceSummary from '../../components/BalanceSummary';

const Dashboard = () => {
	const { userData } = useContext(AuthContext);
	const { budgetPeriod, loadingMessage, errorMessage } = useBudgetPeriod(
		userData?.accountId ?? null
	);
	const { transactions } = useTransactions(budgetPeriod?.id ?? null);
	const { balanceSummary } = useBalance(transactions, budgetPeriod);

	return (
		<div className="dashboard-container">
			{!!errorMessage && <p className="error-message">{errorMessage}</p>}
			{!!loadingMessage && <Loading text={loadingMessage} />}
			{!loadingMessage && !budgetPeriod && <p>No budget period. Please add one.</p>}
			{!loadingMessage && (
				<React.Fragment>
					<BalanceSummary balanceSummary={balanceSummary} />
					{!!transactions && <Transactions transactions={transactions} />}
				</React.Fragment>
			)}
		</div>
	);
};

export default Dashboard;
