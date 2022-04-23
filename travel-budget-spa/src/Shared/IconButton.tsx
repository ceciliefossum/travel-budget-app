import { ButtonColor, ButtonStyle } from '../_Interfaces/Enums';
import './IconButton.css';

const getButtonStyle = (style: ButtonStyle) => {
    switch(style) {
        case ButtonStyle.Border: return 'button-border';
        case ButtonStyle.Solid: return 'button-solid';
    }
}

const getButtonColor = (style: ButtonColor) => {
    switch(style) {
        case ButtonColor.MainColor: return 'button-main-color';
        case ButtonColor.SuccessColor: return 'button-success-color';
        case ButtonColor.DangerColor: return 'button-danger-color';
    }
}

const IconButton = (props: { icon: JSX.Element, style: ButtonStyle, color: ButtonColor } ) => (
    <div className={`icon-button-container ${getButtonStyle(props.style)} ${getButtonColor(props.color)}`}>
        {props.icon}
    </div>
);

export default IconButton;