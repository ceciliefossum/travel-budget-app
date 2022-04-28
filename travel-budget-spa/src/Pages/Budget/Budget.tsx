import Button from "../../shared/Button";
import styles from "../../shared/Button.module.css";

const Budget = () => (
    <div className="budget-container">
        Budget
        <Button className={styles['icon-primary-button']} text="Primary" onClick={() => null} />
        <Button className={styles['icon-success-button']} text="Primary" onClick={() => null} />
    </div>
);  

export default Budget;