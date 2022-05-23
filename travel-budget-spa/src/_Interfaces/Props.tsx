import { IBalanceSummary, ITransaction } from './interfaces';

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
