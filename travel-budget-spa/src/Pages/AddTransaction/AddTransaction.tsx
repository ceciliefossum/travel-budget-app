import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import styles from '../../components/Button.module.css';
import './AddTransaction.css';
import CancelIcon from '../../components/Icons/CancelIcon';
import { TransactionType } from '../../_interfaces/enums';
import Loading from '../../components/Loading';
import { transactionTypeChoices } from '../../_constants/constants';
import { ITransactionForm, ITransactionTypeChoice } from '../../_interfaces/interfaces';
import { AuthContext } from '../../store/AuthContext';
import useTransactions from '../../hooks/use-transactions';
import useBudgetPeriod from '../../hooks/use-budget-period';
import NoBudgetPeriod from '../../components/Budget/NoBudgetPeriod';
import TransactionForm from '../../components/Transactions/TransactionForm';

const AddTransaction = () => {
	const navigate = useNavigate();
	const [transactionType, setTransactionType] = useState<TransactionType>();

	const { user } = useContext(AuthContext);
	const { budgetPeriod } = useBudgetPeriod(user?.accountId ?? null);
	const { addTransactions, loadingMessage, errorMessage } = useTransactions(
		budgetPeriod?.id ?? null
	);

	const setInitialValues = () => {
		setTransactionType(undefined);
	};

	const successHandler = () => {
		setInitialValues();
	};

	const addTransactionHandler = (formData: ITransactionForm) => {
		if (user?.accountId && budgetPeriod?.id && transactionType && budgetPeriod) {
			addTransactions(
				{
					...formData,
					type: transactionType,
					accountId: user.accountId,
					budgetPeriodId: budgetPeriod.id
				},
				successHandler
			);
		}
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
									className={styles['text-icon-big-button']}
									onClick={() => setTransactionType(choice.transactionType)}
								/>
							))}
						</React.Fragment>
					)}
					{!!transactionType && (
						<TransactionForm
							transactionType={transactionType}
							addTransactionHandler={addTransactionHandler}
						/>
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
