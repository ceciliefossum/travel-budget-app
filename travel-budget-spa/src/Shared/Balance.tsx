import { IBalance } from "../_Interfaces/Interfaces";
import './Balance.css';

const getBalanceClassName = (amount: number) :string => {
    return amount > 0 ? '' : 'negative-amount';
}

const Balance = (props: { balance: IBalance }) => (
    <div className="balance-container">
        <label>
            <p className={getBalanceClassName(props.balance.amount)}>{props.balance.amount}</p>
            {props.balance.type}
        </label>
    </div>
);

export default Balance;