import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import styles from '../../components/Button.module.css';
import CalendarPlusIcon from '../../components/Icons/CalendarPlusIcon';
import PointRightIcon from '../../components/Icons/PointRightIcon';
import Loading from '../../components/Loading';
import { appRoutePaths } from '../../_constants/routes';
import './Budget.css';
import useFirestore from '../../hooks/use-firestore';
import { AuthContext } from '../../store/AuthContext';

const Budget = () => {
	const navigate = useNavigate();

	const [endDate, setEndDate] = useState<string>('-');
	const [startBudget, setStartBudget] = useState<boolean>(false);

	const { loadingMessage, errorMessage, addBudgetPeriod } = useFirestore();
	const { userData } = useContext(AuthContext);

	const addBudgetPeriodnHandler = async () => {
		addBudgetPeriod(userData?.accountId ?? null, endDate, () => {
			navigate(appRoutePaths.home);
		});
	};

	return (
		<React.Fragment>
			{!!loadingMessage && <Loading text={loadingMessage} />}
			{!loadingMessage && (
				<div className="budget-container">
					{!startBudget && (
						<React.Fragment>
							<h2>
								Set up <br /> a new budget period
							</h2>
							<Button
								text="Add period"
								icon={<CalendarPlusIcon />}
								className={styles['text-icon-primary-big-button']}
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
