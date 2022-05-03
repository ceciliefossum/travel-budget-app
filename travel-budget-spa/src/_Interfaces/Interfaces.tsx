import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { BalanceType, TransactionType } from './enums';

export interface IBalance {
	amount: number;
	type: BalanceType;
}

export interface ITransaction {
	type: TransactionType;
	amount: number;
	valuta: string;
	date: Date;
}

export interface ITransactionDB {
	type: TransactionType;
	amount: number;
	valuta: string;
	date: Timestamp;
}

export interface IBudgetPeriod {
	startDate: Date;
	endDate: Date;
}

export interface IBudgetPeriodDB {
	startDate: Timestamp;
	endDate: Timestamp;
}

export interface IRoute {
	path: string;
	title: string;
	element: JSX.Element;
	isProtected: boolean;
}

export interface IMenyItem extends IRoute {
	icon: JSX.Element;
	buttonStyle: string;
}

export interface IUserState {
	user: User | null;
	isLoading: boolean;
	error: string | null;
}

export interface ITransactionTypeChoice {
	text: string;
	icon: JSX.Element;
	transactionType: TransactionType;
}
