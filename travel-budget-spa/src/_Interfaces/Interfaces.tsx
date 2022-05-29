import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { BalanceType, TransactionType } from './enums';

export interface IBalance {
	amount: number;
	type: BalanceType;
}

interface ITransactionBase {
	type: TransactionType;
	amount: number;
	valuta: string;
	accountId: string | null;
	budgetPeriodId: string | null;
}

export interface ITransactionForCreate extends ITransactionBase {
	numberOfDays: number;
}

export interface ITransaction extends ITransactionBase {
	id?: string;
	date: Date;
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

export interface ITransactionForm {
	amount: number;
	valuta: string;
	numberOfDays: number;
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
