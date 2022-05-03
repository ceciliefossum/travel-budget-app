import { LoadingProps } from '../_interfaces/props';
import './Loading.css';

const Loading = (props: LoadingProps) => (
	<div className="loading-container">
		<p>{props.text}</p>
	</div>
);

export default Loading;
