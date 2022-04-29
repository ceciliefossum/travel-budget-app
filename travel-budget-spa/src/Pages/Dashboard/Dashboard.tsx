import Transaction from "../../shared/Transaction";
import './Dashboard.css';
import { balancesTemp, databaseCollectionNames } from "../../_constants/Constants";
import Balance from "../../shared/Balance";
import { IBalance, ITransaction } from "../../_interfaces/Interfaces";
import { BalanceType, TransactionType } from "../../_interfaces/Enums";
import { collection, DocumentData, getDocs, onSnapshot, query, QuerySnapshot, Unsubscribe, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebaseSetup";


const Dashboard = () => {
    const [budgetPeriod, setBudgetPeriod] = useState<{ startDate: Date, endDate: Date }>();
    const [transactions, setTransactions] = useState<ITransaction[]>();
    const [accountBalance, setAccountBalance] = useState<number>(0);

    const getAddedValue = (transaction: ITransaction, currentAmount: number): number => {
        return transaction.type === TransactionType.Expence ? currentAmount - transaction.amount : currentAmount + transaction.amount;
    }

    const getTransactionUnsubscription = (): Unsubscribe | null  => {
        if (!!budgetPeriod) {
            const transactionsRef = collection(db, databaseCollectionNames.transactions);
            const q = query(transactionsRef, where('date', '>', budgetPeriod.startDate));
            const unsub = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
                const transactionsTemp: ITransaction[] = [];
                let accountBalanceTemp = 0;
                snapshot.forEach((doc) => {
                    const transaction = doc.data() as ITransaction;
                    transactionsTemp.push({ ...transaction, date: doc.data().date.toDate()});
                    accountBalanceTemp = getAddedValue(transaction, accountBalanceTemp);
                });
                setTransactions(transactionsTemp.reverse());
                setAccountBalance(accountBalanceTemp);
            });

            return unsub;
        }

        return null;
    }

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
            if (!budgetPeriod) {
                getLatestBudgetPeriod();
            }
            const unsubTransations = getTransactionUnsubscription();

            if (unsubTransations) {
                return () => unsubTransations();
            }

        } catch (error) {
            console.log(error);
        }

    }, [budgetPeriod, getTransactionUnsubscription]);

    return (
        <div className="dashboard-container">
            <div className="balances-container">
                <Balance balance={{amount: accountBalance, type: BalanceType.AccountBalance}} />
                {balancesTemp.map((balance: IBalance, index: number) => (
                    <Balance key={index.toString()} balance={balance} />
                ))}
            </div>
            <div className="transactions-container">
                {transactions && transactions.map((transaction: ITransaction, index: number) => (
                    <Transaction key={index.toString()} transaction={transaction} />
                ))}
            </div>
        </div>
    )
}

export default Dashboard;