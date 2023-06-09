import styles from "./Spinner.module.css";

const Spinner = () => {
    return (
        <div className={styles['spinner-container']} >
        <div className={styles['spinner']}>
          <div className={styles['inner-spinner']}>
          </div>
        </div>
      </div>
    );
}

export default Spinner;