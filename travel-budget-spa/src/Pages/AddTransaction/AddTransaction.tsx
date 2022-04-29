import React, { useState } from "react"; 
import { collection, addDoc } from "firebase/firestore"
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
import { TransactionCategory, TransactionType } from "../../_interfaces/Enums";
import { db } from "../../firebaseSetup";
import Loading from "../../shared/Loading";
import { databaseCollectionNames } from "../../_constants/Constants";

const AddTransaction = () => {
    const navigate = useNavigate();
    const [type, setType] = useState<TransactionType | undefined>(undefined)
    const [category, setCategory] = useState<TransactionCategory | undefined>(undefined);
    const [amount, setAmount] = useState<number>(0);
    const [valuta, setValuta] = useState<string>('NOK');
    const [loadingText, setLoadingText] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const setInitialValues = () => {
        setError(null);
        setAmount(0);
        setType(undefined);
        setCategory(undefined);
    }

    const addTransactionHandler = async () => {
        try {
            const data = { type, category, amount, valuta, date: new Date() };
            if (data.amount && data.valuta) {
                setLoadingText('Adding transaction...');
                await addDoc(collection(db, databaseCollectionNames.transactions), data);
                setInitialValues();
            } else {
                throw new Error('All fields must have a value');
            }

        } catch ({ message }) {
            setError(typeof message === 'string' ? message : 'Sorry! Something went wrong.')
        } finally {
            setLoadingText(null);
        }
    }
    
    return (
        <React.Fragment>
            {!!loadingText && <Loading text={loadingText} />}
            {!loadingText && <div className="add-transaction-container">
                {!type && (
                    <React.Fragment>
                        <h2>Add expence or income</h2>
                        <Button
                            text="Add Income"
                            icon={<DollarSackIcon />}
                            className={styles['text-icon-primary-big-button']}
                            onClick={() => {setType(TransactionType.Income); setCategory(TransactionCategory.Income)}}
                        />
                        <Button
                            text="Add Expence"
                            icon={<InvoiceIcon />}
                            className={styles['text-icon-primary-big-button']}
                            onClick={() => setType(TransactionType.Expence)}
                        />
                    </React.Fragment>
                )}
        
                {(type === TransactionType.Expence && !category) && (
                    <React.Fragment>
                        <h2>Type of expence</h2>
                        <Button
                            text="Fuel"
                            icon={<FuelIcon />}
                            className={styles['text-icon-primary-big-button']}
                            onClick={() => setCategory(TransactionCategory.Fuel)}
                        />
                        <Button
                            text="Daily Expence"
                            icon={<ShoppingBasketIcon />}
                            className={styles['text-icon-primary-big-button']}
                            onClick={() => setCategory(TransactionCategory.DailyExpence)}
                        />
                    </React.Fragment>
                )}
    
                {!!category && (
                    <React.Fragment>
                        <h2>Enter the amount</h2>
                        <input
                            className="amount-input"
                            aria-label="amount"
                            type="number"
                            placeholder="0"
                            value={amount || ''}
                            onChange={(event) => setAmount(Number(event.target.value))}
                        />
                        <select
                            className="valuta-select"
                            value={valuta}
                            onChange={(event) => setValuta(event.target.value)}
                        >
                            <option value="NOK">NOK</option>
                            <option value="DKK">DKK</option>
                            <option value="EUR">EUR</option>
                        </select>
                        <Button
                            text="Add"
                            icon={<PlusIcon />}
                            className={styles['text-icon-success-button']}
                            onClick={() => addTransactionHandler()}
                        />
                    </React.Fragment>
                )}
                <Button
                    text="Cancel"
                    icon={<CancelIcon />}
                    className={styles['text-icon-danger-button']}
                    onClick={() => navigate(-1)}
                />
                {!!error && <p className="error-message" >{error}</p>}
            </div>}
        </React.Fragment>
    );
};


export default AddTransaction;