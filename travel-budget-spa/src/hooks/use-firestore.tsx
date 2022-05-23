import {
	collection,
	doc,
	DocumentData,
	DocumentReference,
	DocumentSnapshot,
	getDoc,
	getFirestore,
	onSnapshot,
	query,
	QueryDocumentSnapshot,
	QuerySnapshot,
	setDoc,
	Unsubscribe,
	where,
	writeBatch
} from 'firebase/firestore';
import { useState } from 'react';
import app, { getCollection } from '../helpers/firebase';
import { dbCollectionNames } from '../_constants/constants';
import {
	IAccount,
	IBudgetPeriodDB,
	ITransaction,
	ITransactionDB,
	IUserData
} from '../_interfaces/interfaces';

const useFirestore = () => {
	const [loadingMessage, setLoadingMessage] = useState<string | null>();
	const [errorMessage, setErrorMessage] = useState<string | null>();

	const db = getFirestore(app);

	const transactionsCol = getCollection<ITransactionDB>(db, dbCollectionNames.transactions);
	const budgetPeriodCol = getCollection<IBudgetPeriodDB>(db, dbCollectionNames.budgetPeriods);
	const accountsCol = getCollection<IAccount>(db, dbCollectionNames.accounts);
	const usersCol = getCollection<IUserData>(db, dbCollectionNames.users);

	const setErrorMessageHandler = (message: string | unknown): void => {
		setErrorMessage(typeof message === 'string' ? message : 'Something went wrong');
	};

	/**
	 * Fetches user data
	 * @param userId ID of user
	 * @returns User
	 */
	const getUserData = async (userId: string): Promise<IUserData | undefined> => {
		const userDocRef = doc(usersCol, userId);
		const userDocSnap = await getDoc(userDocRef);
		return userDocSnap.data();
	};

	/**
	 * Adds a list of transactions to Firestore
	 * @param transactions list of transactions to be added
	 * @param successHandler function to run after successful completion
	 */
	const addTransactionsBatch = async (
		transactions: ITransaction[] | null,
		successHandler: () => void
	): Promise<void> => {
		try {
			setLoadingMessage('Adding transaction...');
			if (transactions) {
				const batch = writeBatch(db);
				transactions.forEach((transaction: ITransaction) => {
					const docRef: DocumentReference<DocumentData> = doc(transactionsCol);
					batch.set(docRef, { ...transaction, id: docRef.id });
				});
				await batch.commit();
				successHandler();
			} else {
				throw new Error('All fields must have a value');
			}
		} catch ({ message }) {
			setErrorMessageHandler(message);
		} finally {
			setLoadingMessage(null);
		}
	};

	const getBudgetPeriod = async (
		accountId: string,
		budgetPeriodHandler: (budgetPeriod: IBudgetPeriodDB | null) => void
	): Promise<void> => {
		try {
			setLoadingMessage('Fetching budget period...');
			const accountDocRef: DocumentReference<IAccount> = doc(accountsCol, accountId);
			const accountDocSnap: DocumentSnapshot<IAccount> = await getDoc(accountDocRef);
			if (accountDocSnap.exists()) {
				const currentBudgetPeriodId = accountDocSnap.data().currentBudgetPeriodId;

				if (currentBudgetPeriodId) {
					const budgetPeriodRef: DocumentReference<IBudgetPeriodDB> = doc(
						budgetPeriodCol,
						currentBudgetPeriodId
					);
					const budgetPeriodSnap: DocumentSnapshot<IBudgetPeriodDB> = await getDoc(
						budgetPeriodRef
					);

					if (budgetPeriodSnap.exists()) {
						budgetPeriodHandler(budgetPeriodSnap.data());
					} else {
						throw new Error('Could not fetch budget period.');
					}
				} else {
					budgetPeriodHandler(null);
				}
			} else {
				throw new Error('Could not fetch account.');
			}
		} catch ({ message }) {
			setErrorMessageHandler(message);
		} finally {
			setLoadingMessage(null);
		}
	};

	/**
	 * Fetches and subscribes to all transactions related to a budget period.
	 * @param budgetPeriodId ID of the budget period
	 * @param transactionsHandler function to run after successful completion
	 * @returns Unsubscribe function to unsubscribe from snapshot updates
	 */
	const getTransactions = (
		budgetPeriodId: string,
		transactionsHandler: (transactions: ITransactionDB[]) => void
	): Unsubscribe | null => {
		try {
			setLoadingMessage('Fetching transactions...');
			const q = query(transactionsCol, where('budgetPeriodId', '==', budgetPeriodId));
			const unsub = onSnapshot(q, (snapshot: QuerySnapshot<ITransactionDB>) => {
				const transactions: ITransactionDB[] = snapshot.docs.map(
					(doc: QueryDocumentSnapshot<ITransactionDB>) => ({
						...doc.data()
					})
				);
				transactionsHandler(transactions);
			});
			return unsub;
		} catch ({ message }) {
			setErrorMessageHandler(message);
			return null;
		} finally {
			setLoadingMessage(null);
		}
	};

	const addBudgetPeriod = async (
		accountId: string | null,
		endDate: string | null,
		successHandler: () => void
	) => {
		try {
			if (
				accountId &&
				endDate &&
				endDate !== '-' &&
				new Date(endDate).getTime() > new Date().getTime()
			) {
				setLoadingMessage('Adding budget period...');
				const data = {
					accountId,
					startDate: new Date(),
					endDate: new Date(endDate)
				};
				const budgetPeriodDocRef = doc(collection(db, dbCollectionNames.budgetPeriods));
				await setDoc(budgetPeriodDocRef, { ...data, id: budgetPeriodDocRef.id });

				const accountDocRef = doc(accountsCol, accountId);
				await setDoc(
					accountDocRef,
					{ currentBudgetPeriodId: budgetPeriodDocRef.id },
					{ merge: true }
				);

				successHandler();
			} else {
				throw new Error('End date must be set');
			}
		} catch ({ message }) {
			setErrorMessageHandler(message);
		} finally {
			setLoadingMessage(null);
		}
	};

	return {
		loadingMessage,
		errorMessage,
		getUserData,
		addTransactionsBatch,
		getBudgetPeriod,
		getTransactions,
		addBudgetPeriod
	};
};

export default useFirestore;
