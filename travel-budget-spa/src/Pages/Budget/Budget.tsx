import Button from "../../Shared/Button";
import styles from "../../Shared/Button.module.css";

const Budget = () => (
    <div className="budget-container">
        Budget
        <Button className={styles['icon-primary-button']} text="Primary" onClick={() => null} />
        <Button className={styles['icon-success-button']} text="Primary" onClick={() => null} />
    </div>
);  

export default Budget;