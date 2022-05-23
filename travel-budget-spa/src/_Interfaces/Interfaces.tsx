import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { BalanceType, TransactionType } from './enums';

export interface IBalance {
	amount: number;
	type: BalanceType;
}

export interface ITransaction {
	id?: string;
	type: TransactionType;
	amount: number;
	valuta: string;
	date: Date;
	accountId: string;
	budgetPeriodId: string;
}

export interface ITransactionDB {
	id: string;
	type: TransactionType;
	amount: number;
	valuta: string;
	date: Timestamp;
	accountId: string;
	budgetPeriodId: string;
}

export interface IBudgetPeriod {
	id: string;
	accountId: string;
	startDate: Date;
	endDate: Date;
}

export interface IBudgetPeriodDB {
	id: string;
	accountId: string;
	startDate: Timestamp;
	endDate: Timestamp;
}

export interface IRoute {
	path: string;
	title: string;
	isProtected: boolean;
}

export interface IMenyItem extends IRoute {
	icon: JSX.Element;
	buttonStyle: string;
}

export interface IUserDB {
	accountId: string | null;
}

export interface IUser extends User, IUserDB {}

export interface IUserState {
	user: IUser | null;
	isLoading: boolean;
	error: string | null;
}

export interface ITransactionTypeChoice {
	text: string;
	icon: JSX.Element;
	transactionType: TransactionType;
}

export interface IAccount {
	currentBudgetPeriodId: string;
}

export interface IBalanceSummary {
	dailyBudget: number;
	todaysBalance: number;
	accountBalance: number;
	daysLeft: number;
}
