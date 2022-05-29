import './Dashboard.css';
import React, { useContext, useState } from 'react';
import Loading from '../../components/Loading';
import { AuthContext } from '../../store/AuthContext';
import useBudgetPeriod from '../../hooks/use-budget-period';
import useTransactions from '../../hooks/use-transactions';
import useBalance from '../../hooks/use-balance';
import BalanceSummary from '../../components/Balance/BalanceSummary';
import CurrentBudget from '../../components/Budget/CurrentBudget';
import User from '../../components/User';
import { auth } from '../../helpers/firebase';
import NoBudgetPeriod from '../../components/Budget/NoBudgetPeriod';
import Button from '../../components/Button';
import InvoiceIcon from '../../components/Icons/InvoiceIcon';
import styles from '../../components/Button.module.css';
import Transactions from '../../components/Transactions/Transactions';

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
	};

	return (
		<div className="dashboard-container">
			{!!loadingMessage && <Loading text={loadingMessage} />}
			{!loadingMessage && !!errorMessage && <p className="error-message">{errorMessage}</p>}
			{!loadingMessage && !errorMessage && (
				<React.Fragment>
					{!!user && <User user={user} onSignOut={signOutHandler} />}
					{!budgetPeriod && <NoBudgetPeriod />}
					{!!budgetPeriod && !!transactions && (
						<BalanceSummary balanceSummary={balanceSummary} />
					)}
					{!!budgetPeriod && <CurrentBudget budgetPeriod={budgetPeriod} />}
					{!!transactions && (
						<Button
							className={styles['text-icon-button']}
							text={
								showTransactions ? 'Hide all transactions' : 'See all transactions'
							}
							icon={<InvoiceIcon />}
							onClick={toggleShowTransactions}
						/>
					)}
					{!!transactions && showTransactions && (
						<Transactions transactions={transactions} />
					)}
				</React.Fragment>
			)}
		</div>
	);
};

export default Dashboard;
