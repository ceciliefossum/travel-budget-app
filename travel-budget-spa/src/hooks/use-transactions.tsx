import { useEffect, useState } from 'react';
import { getRoundedNumber } from '../helpers/utilities';
import { TransactionType } from '../_interfaces/enums';
import { ITransaction, ITransactionDB, ITransactionForCreate } from '../_interfaces/interfaces';
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
	 * @param transaction the transaction
	 * @param successHandler function to run after successful completion
	 */
	const addTransactions = (transaction: ITransactionForCreate, successHandler: () => void) => {
		let transactions = null;
		const amountDivided = getRoundedNumber(transaction.amount / transaction.numberOfDays);
		transactions = Array.from(Array(transaction.numberOfDays)).map((value, index: number) => {
			const date = new Date();
			date.setDate(date.getDate() + index);
			const amount =
				transaction.type === TransactionType.Income ? amountDivided : -amountDivided;
			return {
				amount,
				date,
				type: transaction.type,
				valuta: transaction.valuta,
				accountId: transaction.accountId,
				budgetPeriodId: transaction.budgetPeriodId
			};
		});

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
