import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import Button from "../../Shared/Button";
import DollarSackIcon from "../../_Icons/DollarSackIcon";
import FuelIcon from "../../_Icons/FuelIcon";
import InvoiceIcon from "../../_Icons/InvoiceIcon";
import ShoppingBasketIcon from "../../_Icons/ShoppingBasketIcon";
import { ExpenceCategory, StatementType } from "../../_Interfaces/Enums";
import styles from "../../Shared/Button.module.css";
import './AddStatement.css';
import PlusIcon from "../../_Icons/PlusIcon";
import CancelIcon from "../../_Icons/CancelIcon";



const AddStatement = () => {
    const navigate = useNavigate();
    const [statement, setStatement] = useState<StatementType | undefined>(undefined)
    const [expenceCategory, setExpenceCategory] = useState<ExpenceCategory>();
    const [amount, setAmount] = useState<number>();
    
    return (
        <div className="add-statement-container">
            {!statement && (
                // <div className="choose-statement-container">
                <React.Fragment>
                    <h2>Add expence or income</h2>
                    <Button
                        text="Add Income"
                        icon={<DollarSackIcon />}
                        className={styles['text-icon-primary-big-button']}
                        onClick={() => setStatement(StatementType.Income)}
                    />
                    <Button
                        text="Add Expence"
                        icon={<InvoiceIcon />}
                        className={styles['text-icon-primary-big-button']}
                        onClick={() => setStatement(StatementType.Expence)}
                    />
                </React.Fragment>
                // </div>
            )}
    
            {(statement === StatementType.Expence && !expenceCategory) && (
                // <div className="choose-category-container">
                <React.Fragment>
                    <h2>Type of expence</h2>
                    <Button
                        text="Fuel"
                        icon={<FuelIcon />}
                        className={styles['text-icon-primary-big-button']}
                        onClick={() => setExpenceCategory(ExpenceCategory.Fuel)}
                    />
                    <Button
                        text="Daily Expence"
                        icon={<ShoppingBasketIcon />}
                        className={styles['text-icon-primary-big-button']}
                        onClick={() => setExpenceCategory(ExpenceCategory.DailyExpence)}
                    />
                </React.Fragment>
                // </div>
            )}

            {(statement === StatementType.Income || !!expenceCategory) && (
                // <div className="set-amount-container">
                <React.Fragment>
                    <h2>Enter the amount</h2>
                    <input className="amount-input" aria-label="amount" type="number" />
                    <select className="valuta-select" name="" id="">
                        <option value="NOK">NOK</option>
                        <option value="DKK">DKK</option>
                        <option value="EUR">EUR</option>
                    </select>
                    <Button
                        text="Add"
                        icon={<PlusIcon />}
                        className={styles['text-icon-success-button']}
                        onClick={() => setAmount(100)}
                    />
                </React.Fragment>
                // </div>
            )}
            <Button
                text="Cancel"
                icon={<CancelIcon />}
                className={styles['text-icon-danger-button']}
                onClick={() => navigate(-1)}
            />
        </div>
    );
};


export default AddStatement;