import { useEffect, useState } from 'react';
import { IBudgetPeriod, IBudgetPeriodDB } from '../_interfaces/interfaces';
import useFirestore from './use-firestore';

const useBudgetPeriod = (accountId: string | null) => {
	const [budgetPeriod, setBudgetPeriod] = useState<IBudgetPeriod>();
	const {
		getBudgetPeriod,
		addBudgetPeriod,
		removeCurrentBudgetPeriod,
		loadingMessage,
		errorMessage
	} = useFirestore();

	useEffect(() => {
		if (accountId) {
			getBudgetPeriod(accountId, setCurrentBudgetPeriod);
		} else {
			setBudgetPeriod(undefined);
		}
	}, [accountId]);

	const setCurrentBudgetPeriod = (budgetPeriodDB: IBudgetPeriodDB | null) => {
		if (budgetPeriodDB) {
			const budgetPeriod = {
				...budgetPeriodDB,
				startDate: budgetPeriodDB.startDate.toDate(),
				endDate: budgetPeriodDB.endDate.toDate()
			};
			setBudgetPeriod(budgetPeriod);
		} else {
			setBudgetPeriod(undefined);
		}
	};

	const endBudgetPeriodSuccessHandler = () => {
		setBudgetPeriod(undefined);
	};

	/**
	 * Adds a new budget period for an account
	 * @param accountId the id of the account
	 * @param endDate the end date for the budget period, inclusive
	 * @param successHandler the function to be run after successful completion
	 */
	const addNewBudgetPeriod = (
		accountId: string | null,
		endDate: string | null,
		successHandler: () => void
	) => {
		const endDateFixed = endDate + 'T23:59:59';
		addBudgetPeriod(accountId, endDateFixed, successHandler);
	};

	/**
	 * Ends the current budget period for an account.
	 * @param accountId the id of the account
	 */
	const endBudgetPeriod = (accountId: string | null) => {
		removeCurrentBudgetPeriod(accountId, endBudgetPeriodSuccessHandler);
	};

	return { budgetPeriod, addNewBudgetPeriod, endBudgetPeriod, loadingMessage, errorMessage };
};

export default useBudgetPeriod;
