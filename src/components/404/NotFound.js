import styles from "./NotFound.module.css";

const NotFound = () => {
    return (
        <>
            <div className={styles['container-not-found']}>
            <h1 className={styles["neon"]}>
                GO
                <span className={styles["flicker-slow"]}>
                    T <br />
                </span>
                L<span className={styles["flicker-fast"]}>O</span>ST <span className={styles["flicker-middle"]}>?</span>
            </h1>
            </div>
        
        </>
    );
};

export default NotFound;
