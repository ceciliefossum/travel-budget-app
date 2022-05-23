import React from 'react';
import { BalanceType } from '../_interfaces/enums';
import { BalanceSummaryProps } from '../_interfaces/props';
import Balance from './Balance';
import './BalanceSummary.css';

const BalanceSummary = ({ balanceSummary }: BalanceSummaryProps) => (
	<div className="balances-container">
		{!!balanceSummary && (
			<React.Fragment>
				<Balance
					balance={{
						amount: balanceSummary.todaysBalance,
						type: BalanceType.TodaysBalance
					}}
				/>
				<Balance
					balance={{
						amount: balanceSummary.dailyBudget,
						type: BalanceType.DailyBudget
					}}
				/>
				<Balance
					balance={{
						amount: balanceSummary.accountBalance,
						type: BalanceType.AccountBalance
					}}
				/>
				<Balance
					balance={{
						amount: balanceSummary.daysLeft,
						type: BalanceType.DaysLeft
					}}
				/>
			</React.Fragment>
		)}
	</div>
);

export default BalanceSummary;
