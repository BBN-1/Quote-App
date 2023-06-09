import styles from "./CommentItem.module.css";
import { Link } from "react-router-dom";


const CommentItem = ({ comment, quoteId, quoteSnippet }) => {
    const quotePage = `/catalog/${quoteId}`;

    

    return (
        <div className={styles["quote-card"]}>
            <p className={styles["quote-text"]}>“{comment.text}”</p>
            <p className={styles["commentedOn-text"]}>commented on quote -</p>
            <Link className={styles["comment-link"]} to={quotePage}>
                {`${quoteSnippet || "Quote was removed"}  ...`}
            </Link>
        </div>
    );
};

export default CommentItem;
