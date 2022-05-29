import './Dashboard.css';
import React, { useContext, useState } from 'react';
import Loading from '../../components/Loading';
import { AuthContext } from '../../store/AuthContext';
import useBudgetPeriod from '../../hooks/use-budget-period';
import useTransactions from '../../hooks/use-transactions';
import useBalance from '../../hooks/use-balance';
import BalanceSummary from '../../components/BalanceSummary';
import CurrentBudget from '../../components/CurrentBudget';
import User from '../../components/User';
import { auth } from '../../helpers/firebase';
import NoBudgetPeriod from '../../components/NoBudgetPeriod';
import Button from '../../components/Button';
import InvoiceIcon from '../../components/Icons/InvoiceIcon';
import styles from '../../components/Button.module.css';
import Transactions from '../../components/Transactions';

const Dashboard = () => {
	const { user } = useContext(AuthContext);
	const { budgetPeriod, loadingMessage, errorMessage } = useBudgetPeriod(user?.accountId ?? null);
	const { transactions } = useTransactions(budgetPeriod?.id ?? null);
	const { balanceSummary } = useBalance(transactions, budgetPeriod);

	const [showTransactions, setShowTransactions] = useState<boolean>(false);

	const signOutHandler = () => {
		auth.signOut();
	};

	const toggleShowTransactions = () => {
		setShowTransactions((prevValue: boolean) => !prevValue);
	}

	return (
		<div className="dashboard-container">
			{!!loadingMessage && <Loading text={loadingMessage} />}
			{!loadingMessage && !!errorMessage && <p className="error-message">{errorMessage}</p>}
			{!loadingMessage && !!user && !budgetPeriod && (
				<React.Fragment>
					<User user={user} onSignOut={signOutHandler} />
					<NoBudgetPeriod />
				</React.Fragment>
			)}
			{!loadingMessage && !!user && !!budgetPeriod && !!transactions && !errorMessage && (
				<React.Fragment>
					<User user={user} onSignOut={signOutHandler} />
					<BalanceSummary balanceSummary={balanceSummary} />
					<div className="dashboard-details">
						<CurrentBudget budgetPeriod={budgetPeriod} />
						<Button
							className={styles['text-icon-button']}
							text={
								showTransactions ? 'Hide all transactions' : 'See all transactions'
							}
							icon={<InvoiceIcon />}
							onClick={toggleShowTransactions}
						/>
					</div>
					{showTransactions && <Transactions transactions={transactions} />}
				</React.Fragment>
			)}
		</div>
	);
};

export default Dashboard;
