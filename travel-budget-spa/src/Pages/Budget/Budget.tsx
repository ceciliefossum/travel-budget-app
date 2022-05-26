import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import CalendarPlusIcon from '../../components/Icons/CalendarPlusIcon';
import PointRightIcon from '../../components/Icons/PointRightIcon';
import Loading from '../../components/Loading';
import { appRoutePaths } from '../../_constants/routes';
import './Budget.css';
import { AuthContext } from '../../store/AuthContext';
import useBudgetPeriod from '../../hooks/use-budget-period';
import CurrentBudget from '../../components/CurrentBudget';
import styles from '../../components/Button.module.css';
import CancelIcon from '../../components/Icons/CancelIcon';

const Budget = () => {
	const navigate = useNavigate();

	const [endDate, setEndDate] = useState<string>('-');
	const [startBudget, setStartBudget] = useState<boolean>(false);

	const { user } = useContext(AuthContext);
	const { loadingMessage, errorMessage, budgetPeriod, addNewBudgetPeriod, endBudgetPeriod } =
		useBudgetPeriod(user?.accountId ?? null);

	const addBudgetPeriodnHandler = async () => {
		addNewBudgetPeriod(user?.accountId ?? null, endDate, () => {
			navigate(appRoutePaths.home);
		});
	};

	return (
		<React.Fragment>
			{!!loadingMessage && <Loading text={loadingMessage} />}
			{!loadingMessage && budgetPeriod && (
				<div className="budget-container">
					<h2>
						You have an <br /> active budget period
					</h2>
					<CurrentBudget budgetPeriod={budgetPeriod} />
					<Button
						className={styles['text-icon-danger-button']}
						text="End budget period"
						icon={<CancelIcon />}
						onClick={() => endBudgetPeriod(user?.accountId ?? null)}
					></Button>
					{errorMessage && <p className="error-message">{errorMessage}</p>}
				</div>
			)}
			{!loadingMessage && !budgetPeriod && (
				<div className="budget-container">
					{!startBudget && (
						<React.Fragment>
							<h2>
								Set up <br /> a new budget period
							</h2>
							<Button
								text="Add period"
								icon={<CalendarPlusIcon />}
								className={styles['text-icon-big-button']}
								onClick={() => setStartBudget(true)}
							/>
						</React.Fragment>
					)}
					{!!startBudget && (
						<React.Fragment>
							<h2>Select end date</h2>
							<input
								type="date"
								value={endDate}
								onChange={(event) => setEndDate(event.target.value)}
							/>
							<Button
								text="Start period"
								icon={<PointRightIcon />}
								className={styles['text-icon-success-button']}
								onClick={() => addBudgetPeriodnHandler()}
							/>
							<p className="error-message">{errorMessage}</p>
						</React.Fragment>
					)}
				</div>
			)}
		</React.Fragment>
	);
};

export default Budget;
