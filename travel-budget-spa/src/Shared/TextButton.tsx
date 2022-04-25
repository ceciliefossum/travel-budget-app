import { TextButtonProps } from '../_Interfaces/Props';
import './TextButton.css';

const TextButton = (props: TextButtonProps) => {
    return (
        <button
            className="text-button-container animated-button-big"
            onClick={() => props.onClick()}
        >
            {props.icon && props.icon}
            <span className="button-text" >
                {props.text}
            </span>
        </button>
    );
};
export default TextButton;