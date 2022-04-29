import Transaction from "../../shared/Transaction";
import './Dashboard.css';
import { databaseCollectionNames } from "../../_constants/Constants";
import Balance from "../../shared/Balance";
import { IBudgetPeriod, ITransaction } from "../../_interfaces/Interfaces";
import { BalanceType } from "../../_interfaces/Enums";
import { collection, DocumentData, getDocs, onSnapshot, query, QuerySnapshot, Unsubscribe, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseSetup";
import Loading from "../../shared/Loading";
import { getAccountBalance, getDailyBudget, getTodaysBalance } from "../../_helpers/utilities";


const Dashboard = () => {
    const [budgetPeriod, setBudgetPeriod] = useState<IBudgetPeriod>();
    const [transactions, setTransactions] = useState<ITransaction[]>();
    const [accountBalance, setAccountBalance] = useState<number>(0);
    const [dailyBudget, setDailyBudget] = useState<number>(0);
    const [todaysBalance, setTodaysBalance] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    

    const getLatestBudgetPeriod = async () => {
        const budgetPeriodRef = collection(db, databaseCollectionNames.budgetPeriods);
        const q = query(budgetPeriodRef, where("endDate", ">", new Date()));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const budgetPeriodTemp: { endDate: Date, startDate: Date } = {
                startDate: doc.data().startDate.toDate(),
                endDate: doc.data().endDate.toDate(),
            };
            setBudgetPeriod(budgetPeriodTemp);
        });
    }

    useEffect(() => {
        try {
            const getTransactionUnsubscription = (): Unsubscribe | null  => {
                if (!!budgetPeriod) {
                    const transactionsRef = collection(db, databaseCollectionNames.transactions);
                    const q = query(transactionsRef, where('date', '>', budgetPeriod.startDate));
                    const unsub = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
                        const transactionsTemp = snapshot.docs.map((doc) => ({
                            ...doc.data() as ITransaction, date: doc.data().date.toDate()
                        }));
                        setTransactions(transactionsTemp.reverse());
                        setAccountBalance(getAccountBalance(transactionsTemp));
                        const dailyBudget = getDailyBudget(transactionsTemp, budgetPeriod);
                        setDailyBudget(dailyBudget);
                        setTodaysBalance(getTodaysBalance(transactionsTemp, dailyBudget));
                        setIsLoading(false);
                    });

                    return unsub;
                }
        
                return null;
            }

            if (!budgetPeriod) 
                getLatestBudgetPeriod();

            const unsubTransations = getTransactionUnsubscription();

            if (unsubTransations)
                return () => unsubTransations();

        } catch (error) {
            console.log(error);
        }

    }, [budgetPeriod]);



    return (
        <div className="dashboard-container">
            {!!isLoading && <Loading text="Fetching transactions..." />}
            {!isLoading && (
                <React.Fragment>
                    <div className="balances-container">
                        {!!budgetPeriod && (
                            <React.Fragment>
                                <Balance balance={{ amount: todaysBalance, type: BalanceType.TodaysBalance }} />
                                <Balance balance={{ amount: dailyBudget, type: BalanceType.DailyBudget }} />
                                <Balance balance={{ amount: accountBalance, type: BalanceType.AccountBalance }} />
                            </React.Fragment>
                        )}
                        
                    </div>
                    <div className="transactions-container">
                        {transactions && transactions.map((transaction: ITransaction, index: number) => (
                            <Transaction key={index.toString()} transaction={transaction} />
                        ))}
                    </div>
                </React.Fragment>
            )}
        </div>
    )
}

export default Dashboard;