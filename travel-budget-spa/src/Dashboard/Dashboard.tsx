import Statement from "../Shared/Statement";
import { StatementType, StatementCategory } from "../Interfaces/Enums";
import './Dashboard.css';
import { StatementProps } from "../Interfaces/Props";

const statements = [
    { title: "Campingplass", type: StatementType.Expence, amount: 125, valuta: "NOK", category: StatementCategory.CampingSpot },
    { title: "Campingplass", type: StatementType.Expence, amount: 125, valuta: "NOK", category: StatementCategory.CampingSpot },
    { title: "Campingplass", type: StatementType.Expence, amount: 125, valuta: "NOK", category: StatementCategory.CampingSpot },
    { title: "Campingplass", type: StatementType.Expence, amount: 125, valuta: "NOK", category: StatementCategory.CampingSpot },
    { title: "Campingplass", type: StatementType.Expence, amount: 125, valuta: "NOK", category: StatementCategory.CampingSpot },
    { title: "Campingplass", type: StatementType.Expence, amount: 125, valuta: "NOK", category: StatementCategory.CampingSpot },
    { title: "Campingplass", type: StatementType.Expence, amount: 125, valuta: "NOK", category: StatementCategory.CampingSpot },
    { title: "Campingplass", type: StatementType.Expence, amount: 125, valuta: "NOK", category: StatementCategory.CampingSpot },

]

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="balance-container">
                <h1>Your balance</h1>
                <p>XXXX</p>
            </div>
            <div className="statements-container">
                {statements.map((statement: StatementProps, index: number) => (
                    <Statement key={index.toString()} title={statement.title} type={statement.type} amount={statement.amount} valuta={statement.valuta} category={statement.category}  />
                ))}
            </div>
        </div>
    )
}

export default Dashboard;