import { CurrentBudgetProps } from '../../_interfaces/props';
import './CurrentBudget.css';
import ArrowRightFromLine from '../Icons/ArrowRightFromLine';
import ArrowRightToLine from '../Icons/ArrowRightToLine';

const CurrentBudget = ({ budgetPeriod }: CurrentBudgetProps) => (
	<div className="current-budget-period-container">
		<h3>Current Budget Period</h3>
		<div className="details">
			<ArrowRightFromLine />
			<p>{budgetPeriod.startDate.toDateString()}</p>
		</div>
		<div className="details">
			<ArrowRightToLine />
			<p>{budgetPeriod.endDate.toDateString()}</p>
		</div>
	</div>
);

export default CurrentBudget;
