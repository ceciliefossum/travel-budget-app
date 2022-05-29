import { TransactionType } from './enums';
import {
	IBalanceSummary,
	IBudgetPeriod,
	ITransaction,
	ITransactionForm,
	IUser
} from './interfaces';

export type ButtonProps = {
	text: string,
	icon?: JSX.Element,
	onClick: (event?: any) => void,
	className: string
};

export type LoadingProps = {
	text: string
};

export type TransactionsProps = {
	transactions: ITransaction[] | null
};

export type BalanceSummaryProps = {
	balanceSummary: IBalanceSummary | undefined
};

export type CurrentBudgetProps = {
	budgetPeriod: IBudgetPeriod
};

export type UserProps = {
	user: IUser,
	onSignOut: () => void
};

export type CircleProgressBarProps = {
	total: number,
	current: number
};

export type TransactionFormProps = {
	transactionType: TransactionType,
	addTransactionHandler: (formData: ITransactionForm) => void
};
