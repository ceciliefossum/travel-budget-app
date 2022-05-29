import { BalanceType } from '../_interfaces/enums';
import { CircleProgressBarProps } from '../_interfaces/props';
import Balance from './Balance/Balance';
import './CircleProgressBar.css';

const CircleProgressBar = ({ total, current }: CircleProgressBarProps) => {
	const radius = 83;
	const circle = Math.PI * radius * 2;
	const progressPercent = total > 0 ? (current / total) * 100 : 0;
	const circleProgress = progressPercent < 0 ? circle : (1 - progressPercent / 100) * circle;

	return (
		<div className="circle-progress-bar-container">
			<div className="outer-circle">
				<div className="inner-circle">
					<Balance balance={{ amount: current, type: BalanceType.TodaysBalance }} />
				</div>
				<svg className="progress-bar">
					<circle
						className={progressPercent > 100 ? 'over-budget' : ''}
						cx="90"
						cy="90"
						r={radius}
						strokeDasharray={circle}
						strokeDashoffset={circleProgress}
					/>
					<circle
						cx="90"
						cy="90"
						r={radius}
						strokeDasharray={circle}
						strokeDashoffset={circleProgress}
					/>
				</svg>
			</div>
		</div>
	);
};

export default CircleProgressBar;
