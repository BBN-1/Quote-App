import styles from "./Create.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import * as quoteService from "../../services/quoteService";
import { useNavigate } from "react-router-dom";
import Input from "../Input/Input";

const pencil = <FontAwesomeIcon icon={faPencil} />;
const astrounat = <FontAwesomeIcon icon={faUserAstronaut} />;

const Create = () => {
    const [text, setText] = useState("");
    const [author, setAuthor] = useState("");

    const navigate = useNavigate();

    const textHandler = (e) => {
        setText(e.target.value);

 
    };

    const onChangeHandler = (e) => {
        setAuthor(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (text.length < 10) {
            alert(
                "Quote text must be at least 10 characters and less than 350!"
            );
            return;
        }

        if (text.length > 350) {
            alert("Quote text must be less than 350 characters!");
            return;
        }

        quoteService.createQuote({ text, author });
        navigate("/catalog");
    };

    return (
        <section className={styles["create-form-container"]}>
            <div className={styles["create-cta-container"]}>
                <h2 className={styles["create-cta-title"]}>MOTIVATE OTHERS</h2>
                <p className={styles["create-cta-para"]}>
                    There is no joy in possession without sharing.
                </p>
            </div>

            <form onSubmit={onSubmit} className={styles["create-form"]}>
                <div
                    data-cy="quote-container"
                    className={styles["create-quote-container"]}
                >
                    <i className={styles["text-icon"]}>{pencil}</i>
                    <textarea
                        data-cy="quote-input"
                        className={styles["quote-input"]}
                        type="text"
                        id="text"
                        onChange={textHandler}
                        value={text}
                        name="quote"
                        placeholder="Quote text"
                        pattern="^.{10,350}$"
                        required={true}
                        autoComplete="on"
                    />
                </div>

                <div
                    data-cy="author-container"
                    className={styles["create-author-container"]}
                >
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

                <button
                    data-cy="submit"
                    type="submit"
                    className={styles["create-btn"]}
                >
                    CREATE!
                </button>
            </form>
        </section>
    );
};

export default Create;
