import CalendarErrorIcon from './Icons/CalendarErrorIcon';
import './NoBudgetPeriod.css';

const NoBudgetPeriod = () => (
	<div className="no-budget-period-container">
		<CalendarErrorIcon />
		<p>No budget period. Please add one.</p>
	</div>
);

export default NoBudgetPeriod;
