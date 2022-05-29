import { ButtonProps } from '../_interfaces/props';

const Button = (props: ButtonProps) => (
	<button className={props.className} onClick={props.onClick}>
		{props.icon && props.icon}
		<span>{props.text}</span>
	</button>
);

export default Button;
