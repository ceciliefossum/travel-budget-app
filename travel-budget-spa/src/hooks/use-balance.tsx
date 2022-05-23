import { useEffect, useState } from 'react';
import {
	getAccountBalance,
	getDailyBudget,
	getDayDifference,
	getTodaysBalance
} from '../helpers/utilities';
import { IBalanceSummary, IBudgetPeriod, ITransaction } from '../_interfaces/interfaces';

const useBalance = (
	transactions: ITransaction[] | undefined,
	budgetPeriod: IBudgetPeriod | undefined
) => {
	const [balanceSummary, setBalanceSummary] = useState<IBalanceSummary>();

	useEffect(() => {
		if (transactions && budgetPeriod) {
			const dailyBudget = getDailyBudget(transactions, budgetPeriod);
			const accountBalance = getAccountBalance(transactions);
			const todaysBalance = getTodaysBalance(transactions, dailyBudget);
			const daysLeft = getDayDifference(new Date(), budgetPeriod.endDate) + 1;

			setBalanceSummary({ dailyBudget, accountBalance, todaysBalance, daysLeft });
		}
	}, [transactions, budgetPeriod]);

	return { balanceSummary };
};

export default useBalance;
