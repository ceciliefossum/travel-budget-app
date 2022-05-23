import { useEffect, useState } from 'react';
import { IBudgetPeriod, IBudgetPeriodDB } from '../_interfaces/interfaces';
import useFirestore from './use-firestore';

const useBudgetPeriod = (accountId: string | null) => {
	const [budgetPeriod, setBudgetPeriod] = useState<IBudgetPeriod>();
	const { getBudgetPeriod, loadingMessage, errorMessage } = useFirestore();

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

	return { budgetPeriod, loadingMessage, errorMessage };
};

export default useBudgetPeriod;
