import styles from "./Edit.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as quoteService from "../../services/quoteService";
import { useNavigate } from "react-router-dom";
import Input from "../Input/Input";

const pencil = <FontAwesomeIcon icon={faPencil} />;
const astrounat = <FontAwesomeIcon icon={faUserAstronaut} />;

const Edit = () => {
    const { quoteId } = useParams();

    const [text, setText] = useState("");
    const [author, setAuthor] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        quoteService.getOne(quoteId).then((res) => {
            setText(res.text);
            setAuthor(res.author);
        });
    }, [quoteId]);

    const textHandler = (e) => {
        setText(e.target.value);

        if (text.length > 350) {
            alert("Quote text must be less than 350 characters!");
            setText(text.substring(0, 350));
            return;
        }

      
    };

    const onChangeHandler = (e) => {
        setAuthor(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (text.length < 10) {
            alert("Quote text must be at least 10 characters!");
            return;
        }

        if (text.length > 350) {
            alert("Quote text must be less than 350 characters!");
            return;
        }

        quoteService.editQuote(quoteId, { text, author });
        navigate(`/catalog/${quoteId}`);
    };

    return (
        <section className={styles["edit-form-container"]}>
            <div className={styles["edit-cta-container"]}>
                <h2 className={styles["edit-cta-title"]}>FINE-TUNE</h2>
                <p className={styles["edit-cta-para"]}>
                    It is never too late to get it right!
                </p>
            </div>

            <form onSubmit={onSubmit} className={styles["edit-form"]}>
                <div className={styles["edit-quote-container"]}>
                    <i className={styles["text-icon"]}>{pencil}</i>
                    <textarea
                    
                        data-cy="quote-input"
                        className={styles["quote-input"]}
                        type="text"
                        id="text"
                        onChange={textHandler}
                        value={text}
                        name="quote"
                        pattern="^.{10,350}$"
                        autoComplete="on"
                    />
                </div>

                <div  className={styles["edit-author-container"]}>
                    <i className={styles["author-icon"]}>{astrounat}</i>
                    <Input
                        value={author}
                        onChange={onChangeHandler}
                        name={"author"}
                        placeholder={"Quote's author"}
                        type={"author"}
                        setStyles={"error-msg"}
                        errorMsg={
                            "Author's name must be in the format: 'John Doe' or 'John'!"
                        }
                        required={true}
                        pattern={"^[a-zA-Z]+(\\s[a-zA-Z]+)?$"}
                        autoComplete={"on"}
                    />
                </div>

                <button data-cy="edit-btn" type="submit" className={styles["edit-btn"]}>
                    EDIT QUOTE
                </button>
            </form>
        </section>
    );
};

export default Edit;
