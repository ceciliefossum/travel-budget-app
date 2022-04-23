import { IBalance } from "../_Interfaces/Interfaces";
import './Balance.css';

const Balance = (props: { balance: IBalance }) => (

    <div className="balance-container">
        <label>
            <p>{props.balance.amount}</p>
            {props.balance.type}
        </label>
    </div>
);

export default Balance;