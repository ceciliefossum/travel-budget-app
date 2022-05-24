import { useEffect, useState } from 'react';
import { IBudgetPeriod, IBudgetPeriodDB } from '../_interfaces/interfaces';
import useFirestore from './use-firestore';

const useBudgetPeriod = (accountId: string | null) => {
	const [budgetPeriod, setBudgetPeriod] = useState<IBudgetPeriod>();
	const { getBudgetPeriod, addBudgetPeriod, loadingMessage, errorMessage } = useFirestore();

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

	const addNewBudgetPeriod = (
		accountId: string | null,
		endDate: string | null,
		successHandler: () => void
	) => {
		addBudgetPeriod(accountId, endDate, successHandler);
	};

	return { budgetPeriod, addNewBudgetPeriod, loadingMessage, errorMessage };
};

export default useBudgetPeriod;
