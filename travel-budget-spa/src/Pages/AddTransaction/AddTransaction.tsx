import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import Button from "../../shared/Button";
import DollarSackIcon from "../../shared/Icons/DollarSackIcon";
import FuelIcon from "../../shared/Icons/FuelIcon";
import InvoiceIcon from "../../shared/Icons/InvoiceIcon";
import ShoppingBasketIcon from "../../shared/Icons/ShoppingBasketIcon";
import styles from "../../shared/Button.module.css";
import './AddTransaction.css';
import PlusIcon from "../../shared/Icons/PlusIcon";
import CancelIcon from "../../shared/Icons/CancelIcon";
import { ExpenceCategory, TransactionType } from "../../_interfaces/Enums";


const AddStatement = () => {
    const navigate = useNavigate();
    const [transactionType, setTransactionType] = useState<TransactionType | undefined>(undefined)
    const [expenceCategory, setExpenceCategory] = useState<ExpenceCategory>();
    const [amount, setAmount] = useState<number>();
    
    return (
        <div className="add-transaction-container">
            {!transactionType && (
                <React.Fragment>
                    <h2>Add expence or income</h2>
                    <Button
                        text="Add Income"
                        icon={<DollarSackIcon />}
                        className={styles['text-icon-primary-big-button']}
                        onClick={() => setTransactionType(TransactionType.Income)}
                    />
                    <Button
                        text="Add Expence"
                        icon={<InvoiceIcon />}
                        className={styles['text-icon-primary-big-button']}
                        onClick={() => setTransactionType(TransactionType.Expence)}
                    />
                </React.Fragment>
            )}
    
            {(transactionType === TransactionType.Expence && !expenceCategory) && (
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
            )}

            {(transactionType === TransactionType.Income || !!expenceCategory) && (
                <React.Fragment>
                    <h2>Enter the amount</h2>
                    <input className="amount-input" aria-label="amount" type="number" placeholder="0" />
                    <select className="valuta-select" name="valuta" id="valuta">
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