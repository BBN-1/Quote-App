import styles from './Author.module.css';
import { useParams } from 'react-router-dom';

import * as quoteService from '../../services/quoteService';
import { useEffect, useState } from 'react';
import CatalogItem from '../Catalog/CatalogItem/CatalogItem';
import Spinner from '../Spinner/Spinner';
import { useContext } from "react";
import { GameContext } from '../../contexts/GameContext';
import { getAllByAuthor } from '../../services/quoteService';

const Author = () => {

    const [authorQuotes, setAuthorQuotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { authorId } = useParams();
    const { quotesData } = useContext(GameContext);
    

    
    useEffect(() => {
        ( async () => {
        const res = await getAllByAuthor(quotesData, authorId);
        setAuthorQuotes(res);
        setIsLoading(false);
        })();
    },[authorId]);



    return (
        <div className={styles["catalog-contianer"]}> 
        <h1 className={styles["catalog-title"]}>{`All Motivations from ${authorId} `}</h1>
        <section className={styles["catalog-cards-container"]}>
        {(isLoading && <Spinner />) || authorQuotes.map(quote => <CatalogItem  key={quote._id} quote={quote} />)}
        

  
        </section>
        </div>
    );
}

export default Author;