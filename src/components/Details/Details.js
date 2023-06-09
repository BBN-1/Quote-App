import styles from "./Details.module.css";
import Comment from "./Comment/Comment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faRadiation } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import * as quoteService from "../../services/quoteService";
import { useEffect, useState } from "react";
import * as commentService from "../../services/commentService";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import Spinner from "../Spinner/Spinner";
import { getOneLocal } from "../../services/quoteService";

import Modal from "../Modal/Modal";

const pencil = <FontAwesomeIcon icon={faPencil} />;
const danger = <FontAwesomeIcon icon={faRadiation} />;

const Details = () => {
    const [quote, setQuote] = useState({});
    const { quoteId } = useParams();

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [anonymous, setAnonymous] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isCommentLoading, setIsCommentLoading] = useState(true);

    //local quotes data
    const { quotesData } = useContext(GameContext);


    //This effect needs the server to be running
    // useEffect(() => {
    //     (async () => {
    //         const quote = await quoteService.getOne(quoteId);
    //         setQuote(quote);
    //         setIsLoading(false);

    //         const commentsForQuote = await commentService.getByQuoteId(quoteId);
    //         setComments(commentsForQuote);
    //         setIsCommentLoading(false);

    //     })();
    // }, [quoteId]);


//fetching quote from local database
    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setQuote(getOneLocal(quotesData,quoteId));
                setIsLoading(false);
            }, 200);
        };

        fetchData();
    }, []);

   

    const navigate = useNavigate();

    const { user } = useContext(authContext);
    const isOwner = user._id === quote._ownerId;

    const commentHandler = (e) => {
        setComment(e.target.value);

        if (e.target.value.length > 200) {
            alert("Comment must be less than 200 characters!");
            setComment(e.target.value.substring(0, 200));
            return;
        }


    };

    const anonymousHandler = (e) => {
        console.log(e.target.checked);
        setAnonymous(e.target.checked);
    };

    const onDelete = async () => {
        setIsOpen(true);
    };
    
    const onCloseOrClickOutside = () => {
        setIsOpen(false);
    };
    
    const deleteQuote = async () => {
        await quoteService.deleteQuote(quoteId);
        navigate("/catalog", { replace: true });
    };


    const onSubmit = async (e) => {
        e.preventDefault();

        if (comment.length < 10) {
            alert("Comment must be at least 10 character long!");
            return;
        }

        if (comment.length > 200) {
            alert("Comment must be less than 200 characters!");
            return;
        }


        await commentService.create(quoteId, quote.text.substring(0,33), comment, anonymous);

        setComment("");
        const commentsForQuote = await commentService.getByQuoteId(quoteId);
        setComments([...commentsForQuote]);
    };

    const enterKey = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            onSubmit(e);
        }
    };

    //quote edit and delete buttons

    const buttonsShow = () => {
      if(!isOwner) {
        return null;
      } else {
        return (
            <div className={styles["details-buttons-container"]}>
            <Link data-cy="edit-link" to={`/quote/edit/${quote._id}`}>
                <i className={styles.icon}>{pencil}</i>
                Edit
            </Link>
            <button onClick={onDelete}>
                <i className={styles.icon}>{danger}</i>
                Delete!
            </button>
    
            <Modal
                open={isOpen}
                onClose={onCloseOrClickOutside}
                outerLayerClick={onCloseOrClickOutside}
                style={"login-error-modal"}
            >
                <p>Are you sure you want to delete this quote?</p>
                <button onClick={deleteQuote}>Yes</button>
            </Modal>
        </div>
        )
      }

          
        

    };

    return (

        
        <div className={styles["quote-container"]}>
            {(isLoading && <Spinner />) || (
                <div className={styles["text-container"]}>
                    <p className={styles["quote-text"]}>“{quote?.text || "This Quote Has Been Deleted By The User!"}”</p>
                    <span className={styles["quote-author"]}>
                        -{quote.author}
                    </span>
                </div>
            )}

            {buttonsShow()}


            {/* {user.accessToken && (
                <div className={styles["details-comment-form-container"]}>
                    <form
                        onSubmit={onSubmit}
                        onKeyDown={enterKey}
                        className={styles["comment-form"]}
                    >
                        <label
                            className={styles["comment-label"]}
                            htmlFor="comment"
                        >
                            Leave a comment
                        </label>
                        <textarea
                            data-cy="comment-textarea"
                            className={styles["comment-textarea"]}
                            name="comment"
                            id=""
                            cols="30"
                            rows="10"
                            onChange={commentHandler}
                            value={comment}
                            placeholder="“People ask you for criticism, but they only want praise.”"
                        ></textarea>
                        <div className={styles["anonymous-container"]}>
                            <fieldset>
                                <div>
                                    <input
                                        data-cy="anonymous-checkbox"
                                        type="checkbox"
                                        id="anonymous"
                                        name="anonymous"
                                        unchecked="true"
                                        value={anonymous}
                                        onChange={anonymousHandler}
                                    />
                                    <label htmlFor="scales">
                                        Hide username!
                                    </label>
                                </div>
                            </fieldset>
                        </div>
                        <button data-cy="comment-submit-btn" type="submit" className={styles["comment-btn"]}>
                            Send comment!
                        </button>
                    </form>
                </div>
            )} */}

            {/* {(isCommentLoading && <Spinner />) || (
                           <div className={styles["details-comments-container"]}>
                           <div
                               className={
                                   styles["details-comments-container-inside-wrapper"]
                               }
                           >
                               <h1 className={styles["comments-wrapper-title"]}>
                                   comments by members
                               </h1>
                               <Comment
                                   comments={comments}
                                   setComments={setComments}
                                   owner={quote._ownerId}
                               />
                           </div>
                       </div>
            )} */}

 
        </div>
    );
};

export default Details;
