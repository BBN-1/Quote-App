import styles from "./ProfilePosts.module.css";
import { useContext } from "react";
import { authContext } from "../../../contexts/authContext";
import { useState, useEffect } from "react";
import * as quoteService from "../../../services/quoteService";
import CatalogItem from "../../Catalog/CatalogItem/CatalogItem";
import Spinner from "../../Spinner/Spinner";
import Pagination from "../../Pagination/Pagination";

const ProfilePosts = () => {
    const [allQuotesByAuthor, setAllQuotesByAuthor] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(authContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [quotesPerPage, setQuotesPerPage] = useState(5);

    useEffect(() => {
        (async () => {
            const quotes = await quoteService.getAllQuotesByAuthor(user._id);
            setAllQuotesByAuthor(quotes);
            setIsLoading(false);
        })();
    }, [user._id]);

    


    //pagination needed values
    
    const indexOfLastQuote = currentPage * quotesPerPage;
    const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
    const currentQuotes = allQuotesByAuthor.slice(indexOfFirstQuote, indexOfLastQuote);

    return (

        <>
        <div className={styles["catalog-container"]}>
            <h1 className={styles["catalog-title"]}>
                Your Quotes, {user.username || 'Default User'}!
            </h1>
            <section className={styles["catalog-cards-container"]}>
                {(isLoading && <Spinner />) ||
                    (allQuotesByAuthor.length > 0 &&
                        currentQuotes.map((quote) => (
                            <CatalogItem key={quote._id} quote={quote} />
                        ))) || (
                        <p className={styles["no-quotes"]}>
                            You have no quotes yet!
                        </p>
                    )}
            </section>
        </div>

        <Pagination totalPosts={allQuotesByAuthor.length} postsPerPage={quotesPerPage} setCurrentPage={setCurrentPage} />
        </>
    );
};

export default ProfilePosts;
