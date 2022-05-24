import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import styles from '../../components/Button.module.css';
import './AddTransaction.css';
import PlusIcon from '../../components/Icons/PlusIcon';
import CancelIcon from '../../components/Icons/CancelIcon';
import { TransactionType } from '../../_interfaces/enums';
import Loading from '../../components/Loading';
import { transactionTypeChoices } from '../../_constants/constants';
import { ITransactionTypeChoice } from '../../_interfaces/interfaces';
import { AuthContext } from '../../store/AuthContext';
import useTransactions from '../../hooks/use-transactions';
import useBudgetPeriod from '../../hooks/use-budget-period';
import NoBudgetPeriod from '../../components/NoBudgetPeriod';

const AddTransaction = () => {
	const navigate = useNavigate();
	const [transactionType, setTransactionType] = useState<TransactionType>();
	const [amount, setAmount] = useState<number>(0);
	const [valuta, setValuta] = useState<string>('NOK');
	const [numberOfDays, setNumberOfDays] = useState<number>(1);

	const { user } = useContext(AuthContext);
	const { budgetPeriod, loadingMessage, errorMessage } = useBudgetPeriod(user?.accountId ?? null);
	const { addTransactions } = useTransactions(budgetPeriod?.id ?? null);

	const setInitialValues = () => {
		setAmount(0);
		setTransactionType(undefined);
	};

	const successHandler = () => {
		setInitialValues();
	};

	const addTransactionHandler = () => {
		addTransactions(
			amount,
			numberOfDays,
			transactionType,
			valuta,
			user?.accountId ?? null,
			budgetPeriod?.id ?? null,
			successHandler
		);
	};

	return (
		<React.Fragment>
			{!!loadingMessage && <Loading text={loadingMessage} />}
			{!loadingMessage && !budgetPeriod && <NoBudgetPeriod />}
			{!loadingMessage && budgetPeriod && (
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
					{!!errorMessage && <p className="error-message">{errorMessage}</p>}
				</div>
			)}
		</React.Fragment>
	);
};

export default AddTransaction;
