import { useEffect, useState } from 'react';
import { getRoundedNumber } from '../helpers/utilities';
import { TransactionType } from '../_interfaces/enums';
import { ITransaction, ITransactionDB } from '../_interfaces/interfaces';
import useFirestore from './use-firestore';

const useTransactions = (budgetPeriodId: string | null) => {
	const [transactions, setTransactions] = useState<ITransaction[]>();

	const { loadingMessage, errorMessage, addTransactionsBatch, getTransactions } = useFirestore();

	useEffect(() => {
		if (budgetPeriodId) {
			const unsub = getTransactions(budgetPeriodId, transactionsHandler);
			if (unsub) return () => unsub();
		}
	}, [budgetPeriodId]);

	/**
	 * Adds a new transaction to the database
	 * @param amount amount for the whole transaction
	 * @param numberOfDays number of days the transaction should be spread over
	 * @param transactionType type of transaction
	 * @param valuta valuta of transaction
	 * @param accountId account ID for the transaction
	 * @param budgetPeriodId budget period for the transaction
	 * @param successHandler function to run after successful completion
	 */
	const addTransactions = (
		amount: number,
		numberOfDays: number,
		transactionType: TransactionType | undefined,
		valuta: string,
		accountId: string | null,
		budgetPeriodId: string | null,
		successHandler: () => void
	) => {
		let transactions = null;
		if (
			transactionType &&
			amount &&
			valuta &&
			numberOfDays > 0 &&
			accountId &&
			budgetPeriodId
		) {
			const amountDivided = getRoundedNumber(amount / numberOfDays);
			transactions = Array.from(Array(numberOfDays)).map((value, index: number) => {
				const date = new Date();
				date.setDate(date.getDate() + index);
				return {
					type: transactionType,
					amount: transactionType === TransactionType.Income ? amountDivided : -amountDivided,
					valuta,
					date,
					accountId,
					budgetPeriodId
				};
			});
		}
		addTransactionsBatch(transactions, successHandler);
	};

	const transactionsHandler = (transactionsDB: ITransactionDB[]): void => {
		if (transactionsDB) {
			const transactions: ITransaction[] = transactionsDB
				.map((transaction: ITransactionDB) => ({
					...transaction,
					date: transaction.date.toDate()
				}))
				.reverse();
			setTransactions(transactions);
		}
	};

	return { transactions, addTransactions, loadingMessage, errorMessage };
};

export default useTransactions;
