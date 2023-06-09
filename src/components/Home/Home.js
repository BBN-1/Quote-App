import styles from "./Home.module.css";
import RandomQuote from "./RandomQuote/RandomQuote";
import Spinner from "../Spinner/Spinner";
import html2canvas from "html2canvas";
import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import { quotesData } from "../DataStorage/DataStorage";

import { useEffect, useState, useRef } from "react";

const Home = () => {
    const [randomQuote, setRandomQuote] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { quotesData } = useContext(GameContext);
    const printRef = useRef();

    //initial quote logic with simalated api call

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setRandomQuote(
                    quotesData[Math.floor(Math.random() * quotesData.length)]
                );

                setIsLoading(false);
            }, 10);
        };

        fetchData();
    }, []);

    //random quote logic

    const OnRandomClick = () => {
        setRandomQuote(
            quotesData[Math.floor(Math.random() * quotesData.length)]
        );
    };

    //download image logic

    const onSaveHandler = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element);

        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");

        if (typeof link.download === "string") {
            link.href = imgData;
            link.download = "quote.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            window.open(imgData);
        }
    };

    return (
        <div ref={printRef} className={styles["home-container"]}>
            <section className={styles["home-card-container"]}>
                {(isLoading && <Spinner />) ||
                    (randomQuote.text && (
                        <RandomQuote
                            quote={randomQuote}
                            setRandomQuote={OnRandomClick}
                            onSaveHandler={onSaveHandler}
                        />
                    )) || (
                        <p className={styles["no-quotes"]}>
                            Not a single quote has been posted!
                        </p>
                    )}
            </section>
        </div>
    );
};

export default Home;
