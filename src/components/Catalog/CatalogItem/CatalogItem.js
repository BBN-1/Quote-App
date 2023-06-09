import styles from "./CatalogItem.module.css";
import { Link } from "react-router-dom";

const CatalogItem = ({ quote }) => {
    return (
        <div className={styles["quote-card"]}>
            <p className={styles["quote-text"]}>“{quote.text}”</p>

            <div className={styles["quote-bottom-wrapper"]}>
                <span className={styles["quote-author"]}>- <Link to={`/author/${quote.author}`} >{quote.author}</Link></span>
                <Link
                    data-cy="details"
                    className={styles["quote-details-link"]}
                    to={`/catalog/${quote.key}`}
                >
                    Details
                </Link>
            </div>
        </div>
    );
};

export default CatalogItem;
