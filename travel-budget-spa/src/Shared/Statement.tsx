import { StatementType } from "../_interfaces/Enums";
import './Statement.css'
import { IStatement } from "../_interfaces/Interfaces";

const Statement = (props: { statement: IStatement }) => (
    <div className="statement-container">
        <div className="information">
            <h2>{props.statement.title}</h2>
            <p>{props.statement.category}</p>
        </div>
        <p className="amount">{props.statement.type === StatementType.Expence && '-'} {props.statement.amount}</p>
    </div>
);

export default Statement;