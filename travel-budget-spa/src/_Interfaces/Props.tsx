import { IBalanceSummary, IBudgetPeriod, ITransaction, IUser } from './interfaces';

export type ButtonProps = {
	text: string,
	icon?: JSX.Element,
	onClick: () => void,
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
