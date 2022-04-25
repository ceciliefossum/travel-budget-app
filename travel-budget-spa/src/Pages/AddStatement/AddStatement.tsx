import { useState } from "react"; 
import TextButton from "../../Shared/TextButton";
import DollarSackIcon from "../../_Icons/DollarSackIcon";
import FuelIcon from "../../_Icons/FuelIcon";
import InvoiceIcon from "../../_Icons/InvoiceIcon";
import ShoppingBasketIcon from "../../_Icons/ShoppingBasketIcon";
import { ExpenceCategory, StatementType } from "../../_Interfaces/Enums";
import './AddStatement.css';



const AddStatement = () => {
    const [statement, setStatement] = useState<StatementType | undefined>(undefined)
    const [expenceCategory, setExpenceCategory] = useState<ExpenceCategory>();
    const [amount, setAmount] = useState<number>();
    
    return (
        <div className="add-statement-container">
            {!statement && (
                <div className="choose-statement-container">
                    <h2>Add expence or income</h2>
                    <TextButton text="Add Income" icon={<DollarSackIcon />} onClick={() => setStatement(StatementType.Income)} />
                    <TextButton text="Add Expence" icon={<InvoiceIcon />} onClick={() => setStatement(StatementType.Expence)} />
                </div>
            )}
    
            {(statement === StatementType.Expence && !expenceCategory) && (
                <div className="choose-category-container">
                    <h2>Type of expence</h2>
                    <TextButton text="Fuel" icon={<FuelIcon />} onClick={() => setExpenceCategory(ExpenceCategory.Fuel)} />
                    <TextButton text="Daily expences" icon={<ShoppingBasketIcon />} onClick={() => setExpenceCategory(ExpenceCategory.DailyExpence)} />
                </div>
            )}

            {(statement === StatementType.Income || !!expenceCategory) && (
                <div className="set-amount-container">
                    <h2>Enter the amount</h2>
                        <input className="amount-input" aria-label="amount" type="number" />
                        <select className="valuta-select" name="" id="">
                            <option value="NOK">NOK</option>
                            <option value="DKK">DKK</option>
                            <option value="EUR">EUR</option>
                        </select>
                        <TextButton text={`ADD ${statement}`} onClick={() => setAmount(100)} />
                </div>
            )}
        </div>
    );
};


export default AddStatement;