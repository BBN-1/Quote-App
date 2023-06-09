import { useState } from "react";

import * as quoteService from "../../services/quoteService";
import { Link } from "react-router-dom";
import styles from "./Search.module.css";
import Modal from "../Modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";

const serchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} />;

const Search = () => {
    const [search, setSearch] = useState("");
    const [allQuotes, setAllQuotes] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const { quotesData } = useContext(GameContext);
    
  


   
    
    const [isOpen, setIsOpen] = useState(false);

    const isOpenHandler = async () => {
        setIsOpen(true);
        const res = await quotesData;
        setAllQuotes(res);
    };

    const onCloseOrClickOutside = () => {
        setIsOpen(false);
        setSearch("");
        setSearchResults([]);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
       

        setSearchResults(
            allQuotes.filter(
                (quote) =>
                    quote.author
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()) &&
                    e.target.value.toLowerCase().length >= 1
            )
        );
        

    };

    return (
        <>
            <button data-cy="search-button" className={styles['header-searchBtn']} onClick={isOpenHandler}>Search</button>

            <Modal
                open={isOpen}
                onClose={onCloseOrClickOutside}
                outerLayerClick={onCloseOrClickOutside}
                style={"search-modal"}
            >
                <div >
                    <span>
                    <i>{serchIcon}</i>
                    <input
                        data-cy="search-input"
                        type="text"
                        placeholder="Search by author"
                        value={search}
                        onChange={handleSearch}
                    />
                    </span>
                    
             
                    <div data-cy="search-container" className={styles['search-results-container']}>
                    
                            {searchResults.map((result) => (
                                <Link
                                    key={result.key}
                                    onClick={onCloseOrClickOutside}
                                    to={`/author/${result.author}`}
                                    className={styles["search-result-link"]}
                                >
                                   <p data-cy="search-author" className={styles['search-author-name']}> {result.author}</p><p className={styles['search-author-quote']} >-  said ...{" "}
                                    {result.text.slice(0, 20)}</p>
                                </Link>
                            ))}
                        
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Search;
