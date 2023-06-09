import styles from "./RandomQuote.module.css";
import { Link } from "react-router-dom";

export const RandomQuote = ({ quote, setRandomQuote, onSaveHandler }) => {
    return (
        <div className={styles["homepage-randomQuote-card"]}>
            <div className={styles["homepage-randomQuote-text-wrapper"]}>
                <p data-cy="random-quote-text" className={styles["homepage-randomQuote-text"]}>
                    {quote.text}
                </p>
                <p className={styles["homepage-randomQuote-author"]}>
                    -{quote.author}
                </p>
            </div>
            <div
                data-html2canvas-ignore="true"
                className={styles["homepage-randomQuote-button-wrapper"]}
            >
                <button
                    data-cy="random-quote"
                    className={styles["homepage-randomQuote-randomBtn"]}
                    onClick={setRandomQuote}
                >
                    Another One!
                </button>
                <button
                    data-cy="download-quote"
                    className={styles["homepage-randomQuote-downloadBtn"]}
                    onClick={onSaveHandler}
                >
                    Download Quote
                </button>
                <Link
                    className={styles["homepage-randomQuote-showAllLink"]}
                    to={"/catalog"}
                >
                    Show All!
                </Link>
            </div>
        </div>
    );
};

export default RandomQuote;


