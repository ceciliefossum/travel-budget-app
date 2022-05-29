import React, { useState } from 'react';
import PlusIcon from '../Icons/PlusIcon';
import './TransactionForm.css';
import Button from '../Button';
import styles from '../Button.module.css';
import { TransactionFormProps } from '../../_interfaces/props';
import { TransactionType } from '../../_interfaces/enums';
import { ITransactionForm } from '../../_interfaces/interfaces';

const initialFormState = {
	amount: 0,
	valuta: 'NOK',
	numberOfDays: 1
};
const valutas = ['NOK', 'EUR'];

const isGreaterThanZero = (value: number): boolean => value > 0;

const isFormValid = (formData: ITransactionForm): boolean => {
	const amountIsValid = !!formData.amount && isGreaterThanZero(formData.amount);
	const numberOfDaysIsValid = !!formData.numberOfDays && isGreaterThanZero(formData.numberOfDays);
	const valutaIsValid = !!formData.valuta && valutas.includes(formData.valuta);

	return amountIsValid && numberOfDaysIsValid && valutaIsValid;
};

const TransactionForm = ({ transactionType, addTransactionHandler }: TransactionFormProps) => {
	const [form, setForm] = useState<ITransactionForm>(initialFormState);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const setInitialValues = () => {
		setForm(initialFormState);
		setErrorMessage(null);
	};

	const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (isFormValid(form)) {
			addTransactionHandler(form);
			setInitialValues();
		} else {
			setErrorMessage('All fields must have valid values.');
		}
	};

	const amountChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setForm((prevForm: ITransactionForm) => ({
			...prevForm,
			amount: Number(event.target.value)
		}));
	};

	const numberOfDaysChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setForm((prevForm: ITransactionForm) => ({
			...prevForm,
			numberOfDays: Number(event.target.value)
		}));
	};

	const valutaChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setForm((prevForm: ITransactionForm) => ({
			...prevForm,
			valuta: event.target.value
		}));
	};

	return (
		<form className="transaction-form-container">
			<h2>Enter the amount</h2>
			<input
				className="amount-input"
				aria-label="amount"
				type="number"
				placeholder="Amount"
				value={form.amount || ''}
				onChange={amountChangeHandler}
			/>
			<select
				className="valuta-select"
				value={form.valuta}
				disabled
				onChange={valutaChangeHandler}
			>
				{valutas.map((valuta: string) => (
					<option key={valuta} value={valuta}>
						{valuta}
					</option>
				))}
			</select>
			{transactionType === TransactionType.DailyExpence && (
				<input
					className="amount-input"
					aria-label="number of days"
					type="number"
					placeholder="Expence for 1 day"
					value={form.numberOfDays === 1 ? '' : form.numberOfDays}
					onChange={numberOfDaysChangeHandler}
				/>
			)}
			<Button
				text="Add"
				icon={<PlusIcon />}
				className={styles['text-icon-success-button']}
				onClick={submitHandler}
			/>
			{errorMessage && <p className="error-message">{errorMessage}</p>}
		</form>
	);
};

export default TransactionForm;
