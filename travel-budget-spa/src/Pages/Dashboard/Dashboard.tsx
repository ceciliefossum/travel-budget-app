import Transaction from '../../components/Transaction';
import './Dashboard.css';
import Balance from '../../components/Balance';
import {
	IBudgetPeriod,
	IBudgetPeriodDB,
	ITransaction,
	ITransactionDB
} from '../../_interfaces/interfaces';
import { BalanceType } from '../../_interfaces/enums';
import {
	getDocs,
	onSnapshot,
	query,
	QueryDocumentSnapshot,
	QuerySnapshot,
	Unsubscribe,
	where
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { budgetPeriodCollection, transactionsCollection } from '../../firebaseSetup';
import Loading from '../../components/Loading';
import {
	getAccountBalance,
	getDailyBudget,
	getDayDifference,
	getTodaysBalance
} from '../../helpers/utilities';

const Dashboard = () => {
	const [budgetPeriod, setBudgetPeriod] = useState<IBudgetPeriod>();
	const [daysLeft, setDaysLeft] = useState<number>(0);
	const [transactions, setTransactions] = useState<ITransaction[]>();
	const [accountBalance, setAccountBalance] = useState<number>(0);
	const [dailyBudget, setDailyBudget] = useState<number>(0);
	const [todaysBalance, setTodaysBalance] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const getLatestBudgetPeriod = async () => {
		const q = query(budgetPeriodCollection, where('endDate', '>', new Date()));
		const querySnapshot: QuerySnapshot<IBudgetPeriodDB> = await getDocs(q);
		querySnapshot.forEach((doc: QueryDocumentSnapshot<IBudgetPeriodDB>) => {
			const budgetPeriodTemp: IBudgetPeriod = {
				startDate: doc.data().startDate.toDate(),
				endDate: doc.data().endDate.toDate()
			};
			setBudgetPeriod(budgetPeriodTemp);
		});
	};

	useEffect(() => {
		try {
			const getTransactionUnsubscription = (): Unsubscribe | null => {
				if (budgetPeriod) {
					const q = query(
						transactionsCollection,
						where('date', '>', budgetPeriod.startDate)
					);
					const unsub = onSnapshot(q, (snapshot: QuerySnapshot<ITransactionDB>) => {
						const transactionsTemp: ITransaction[] = snapshot.docs.map(
							(doc: QueryDocumentSnapshot<ITransactionDB>) => ({
								...doc.data(),
								date: doc.data().date.toDate()
							})
						);
						setTransactions(transactionsTemp.reverse());
						setAccountBalance(getAccountBalance(transactionsTemp));
						const dailyBudget = getDailyBudget(transactionsTemp, budgetPeriod);
						setDailyBudget(dailyBudget);
						setTodaysBalance(getTodaysBalance(transactionsTemp, dailyBudget));
						setDaysLeft(getDayDifference(new Date(), budgetPeriod.endDate) + 1);
						setIsLoading(false);
					});

					return unsub;
				}

				return null;
			};

			if (!budgetPeriod) getLatestBudgetPeriod();

			const unsubTransations = getTransactionUnsubscription();

			if (unsubTransations) return () => unsubTransations();
		} catch (error) {
			console.log(error);
		}
	}, [budgetPeriod]);

	return (
		<div className="dashboard-container">
			{!!isLoading && <Loading text="Fetching transactions..." />}
			{!isLoading && (
				<React.Fragment>
					<div className="balances-container">
						{!!budgetPeriod && (
							<React.Fragment>
								<Balance
									balance={{
										amount: todaysBalance,
										type: BalanceType.TodaysBalance
									}}
								/>
								<Balance
									balance={{
										amount: dailyBudget,
										type: BalanceType.DailyBudget
									}}
								/>
								<Balance
									balance={{
										amount: accountBalance,
										type: BalanceType.AccountBalance
									}}
								/>
								<Balance
									balance={{
										amount: daysLeft,
										type: BalanceType.DaysLeft
									}}
								/>
							</React.Fragment>
						)}
					</div>
					<div className="transactions-container">
						{transactions &&
							transactions.map((transaction: ITransaction, index: number) => (
								<Transaction key={index.toString()} transaction={transaction} />
							))}
					</div>
				</React.Fragment>
			)}
		</div>
	);
};

export default Dashboard;
