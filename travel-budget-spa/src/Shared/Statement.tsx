import { StatementProps } from "../Interfaces/Props";
import { StatementType } from "../Interfaces/Enums";
import './Statement.css'

const Statement = (props: StatementProps) => (
    <div className="statement-container">
        <div className="information">
            <h2>{props.title}</h2>
            <p>{props.category}</p>
        </div>
        <p className="amount">{props.type === StatementType.Expence && '-'} {props.amount}</p>
    </div>
);

export default Statement;