import React, { useState } from 'react';
import { collection, writeBatch, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Button from '../../shared/Button';
import styles from '../../shared/Button.module.css';
import './AddTransaction.css';
import PlusIcon from '../../shared/Icons/PlusIcon';
import CancelIcon from '../../shared/Icons/CancelIcon';
import { TransactionType } from '../../_interfaces/Enums';
import { db } from '../../firebaseSetup';
import Loading from '../../shared/Loading';
import { databaseCollectionNames, transactionTypeChoices } from '../../_constants/Constants';
import { ITransaction, ITransactionTypeChoice } from '../../_interfaces/Interfaces';
import { getRoundedNumber } from '../../_helpers/utilities';

const AddTransaction = () => {
	const navigate = useNavigate();
	const [transactionType, setTransactionType] = useState<TransactionType>();
	const [amount, setAmount] = useState<number>(0);
	const [valuta, setValuta] = useState<string>('NOK');
	const [numberOfDays, setNumberOfDays] = useState<number>(1);
	const [loadingText, setLoadingText] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const setInitialValues = () => {
		setError(null);
		setAmount(0);
		setTransactionType(undefined);
	};

	const getTransactions = (): ITransaction[] | null => {
		if (transactionType && amount && valuta && numberOfDays > 0) {
			const amountDivided = getRoundedNumber(amount / numberOfDays);
			return Array.from(Array(numberOfDays)).map((value, index: number) => {
				const date = new Date();
				date.setDate(date.getDate() - 1);
				date.setDate(date.getDate() + index);
				return {
					type: transactionType,
					amount:
						transactionType === TransactionType.Income ? amountDivided : -amountDivided,
					valuta,
					date
				};
			});
		} else {
			return null;
		}
	};

	const addTransactionHandler = async () => {
		try {
			const transactions = getTransactions();
			if (transactions) {
				setLoadingText('Adding transaction...');
				const batch = writeBatch(db);
				transactions.forEach((transaction: ITransaction) => {
					const docRef = doc(collection(db, databaseCollectionNames.transactions));
					batch.set(docRef, transaction);
				});
				await batch.commit();
				setInitialValues();
			} else {
				throw new Error('All fields must have a value');
			}
		} catch ({ message }) {
			setError(typeof message === 'string' ? message : 'Sorry! Something went wrong.');
		} finally {
			setLoadingText(null);
		}
	};

	return (
		<React.Fragment>
			{!!loadingText && <Loading text={loadingText} />}
			{!loadingText && (
				<div className="add-transaction-container">
					{!transactionType && (
						<React.Fragment>
							<h2>Add expence or income</h2>
							{transactionTypeChoices.map((choice: ITransactionTypeChoice) => (
								<Button
									key={choice.text}
									text={choice.text}
									icon={choice.icon}
									className={styles['text-icon-primary-big-button']}
									onClick={() => setTransactionType(choice.transactionType)}
								/>
							))}
						</React.Fragment>
					)}
					{!!transactionType && (
						<React.Fragment>
							<h2>Enter the amount</h2>
							<input
								className="amount-input"
								aria-label="amount"
								type="number"
								placeholder="Amount"
								value={amount || ''}
								onChange={(event) => setAmount(Number(event.target.value))}
							/>
							<select
								className="valuta-select"
								value={valuta}
								onChange={(event) => setValuta(event.target.value)}
							>
								<option value="NOK">NOK</option>
								<option value="DKK">DKK</option>
								<option value="EUR">EUR</option>
							</select>
							<input
								className="amount-input"
								aria-label="number of days"
								type="number"
								placeholder="Expence for 1 day"
								value={numberOfDays === 1 ? '' : numberOfDays}
								onChange={(event) => setNumberOfDays(Number(event.target.value))}
							/>
							<Button
								text="Add"
								icon={<PlusIcon />}
								className={styles['text-icon-success-button']}
								onClick={() => addTransactionHandler()}
							/>
						</React.Fragment>
					)}
					<Button
						text="Cancel"
						icon={<CancelIcon />}
						className={styles['text-icon-danger-button']}
						onClick={() => navigate(-1)}
					/>
					{!!error && <p className="error-message">{error}</p>}
				</div>
			)}
		</React.Fragment>
	);
};

export default AddTransaction;
