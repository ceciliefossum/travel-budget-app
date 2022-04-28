import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseSetup";
import Button from "../../shared/Button";
import styles from "../../shared/Button.module.css";
import CalendarPlusIcon from "../../shared/Icons/CalendarPlusIcon";
import PointRightIcon from "../../shared/Icons/PointRightIcon";
import Loading from "../../shared/Loading";
import { databaseCollectionNames } from "../../_constants/Constants";
import { appRoutePaths } from "../../_constants/Routes";
import './Budget.css';

const Budget = () => {
    const navigate = useNavigate();

    const toDay = new Date();
    const toDayString = toDay.getFullYear() + '-' + (toDay.getMonth() < 10 ? '0' : '') + toDay.getMonth() + '-' + (toDay.getDate() < 10 ? '0' : '') + toDay.getDate();

    const [startDay, setStartDay] = useState<string | null>();
    const [endDate, setEndDate] = useState<string>('-');
    const [loadingText, setLoadingText] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const addBudgetPeriodnHandler = async () => {
        try {
            if (endDate !== '-' && !!startDay && new Date(endDate).getTime() > new Date(startDay).getTime()) {
                const data = { startDate: new Date(), endDate: new Date(endDate) };
                setLoadingText('Adding budget period...');
                await addDoc(collection(db, databaseCollectionNames.budgetPeriods), data);
                navigate(appRoutePaths.home);
            } else {
                throw new Error('End date must be set');
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
            {!loadingText && <div className="budget-container">
                {!startDay && <React.Fragment>
                    <h2>Set up <br/> a new budget period</h2>
                    <Button
                        text="Add period"
                        icon={<CalendarPlusIcon />}
                        className={styles['text-icon-primary-big-button']}
                        onClick={() => setStartDay(toDayString)}
                    />
                </React.Fragment>}
                {!!startDay && <React.Fragment>
                    <h2>Select end date</h2>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                    />
                    <Button
                        text="Start period"
                        icon={<PointRightIcon />}
                        className={styles['text-icon-success-button']}
                        onClick={() => addBudgetPeriodnHandler()}
                    />
                    <p className="error-message">{error}</p>
                </React.Fragment>}
            </div>}
        </React.Fragment>
    );  
};


export default Budget;