import styles from "./Catalog.module.css";
import CatalogItem from "./CatalogItem/CatalogItem";
import Spinner from "../Spinner/Spinner";
import Pagination from "../Pagination/Pagination";
import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";

import { useEffect, useState } from "react";


const Catalog = () => {
    const [quotes, setQuotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [quotesPerPage, setQuotesPerPage] = useState(3);
    const { quotesData } = useContext(GameContext);

    console.log(quotesData);

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setQuotes(quotesData.reverse());
                setIsLoading(false);
            }, 200);
        };

        fetchData();
    }, []);

    // pagination needed values

    const indexOfLastQuote = currentPage * quotesPerPage;
    const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
    const currentQuotes = quotes.slice(indexOfFirstQuote, indexOfLastQuote);
    

    return (
        <>
            <div className={styles["catalog-contianer"]}>
                <h1 className={styles["catalog-title"]}>All Quotes</h1>

                <section
                    data-cy="quote-list"
                    className={styles["catalog-cards-container"]}
                >
                    {(isLoading && <Spinner />) ||
                        (quotes.length > 0 &&
                            currentQuotes.map((quote) => (
                                <CatalogItem key={quote.key} quote={quote} />
                            ))) || (
                            <p className={styles["no-quotes"]}>
                                No quotes yet!
                            </p>
                        )}
                </section>
                <Pagination
                    totalPosts={quotes.length}
                    postsPerPage={quotesPerPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
    );
};

export default Catalog;
