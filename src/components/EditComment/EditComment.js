import styles from "./EditComment.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as commentService from "../../services/commentService";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

import { Navigate } from "react-router-dom";

const EditComment = () => {
    const [commentText, setCommentText] = useState("");
    const [comment, setComment] = useState({});
    const [anonymous, setAnonymous] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    

    const { commentId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const currentComment = await commentService.getOneComment(
                commentId
            );

            setComment(currentComment);
            setCommentText(currentComment.text);

            setIsLoading(false);
        })();
    }, [commentId]);

  

    const anonymousHandler = (e) => {
        setAnonymous(e.target.checked);
    };

    const commentHandler = (e) => {
        setCommentText(e.target.value);

        if (e.target.value.length > 200) {
            alert("Comment must be less than 200 characters!");
            setCommentText(e.target.value.substring(0, 200));
            return;
        }
    };

    const enterKey = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            onSubmit(e);
        }
    };

    const OnDeleteHandler = async (event) => {
        const result = window.confirm(
            "are you sure you want to delete this comment?"
        );

        if (result === false) {
            event.preventDefault();
            <Navigate to={`/comment/edit/${comment._id}`} />;
        } else {
            await commentService.deleteComment(commentId);

            navigate(`/catalog/${comment.quoteId}`);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (commentText.length < 10) {
            alert("Comment must be at least 10 character!");
            return;
        }



        await commentService.editComment(commentId, {
            ...comment,
            hide: anonymous,
            text: commentText,
        });
        navigate(`/catalog/${comment.quoteId}`);
    };

    return (
        <div className={styles["details-comment-form-container"]}>
            {(isLoading && <Spinner />) || (
                <form
                    onSubmit={onSubmit}
                    onKeyDown={enterKey}
                    className={styles["comment-form"]}
                >
                    <label
                        className={styles["comment-label"]}
                        htmlFor="comment"
                    >
                        Edit your comment!
                    </label>
                    <textarea
                        data-cy="comment-textarea"
                        className={styles["comment-textarea"]}
                        name="comment"
                        id=""
                        cols="30"
                        rows="10"
                        onChange={commentHandler}
                        value={commentText}
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
                                <label htmlFor="scales">Hide username!</label>
                            </div>
                        </fieldset>
                    </div>
                    <button data-cy="send-comment" type="submit" className={styles["comment-btn"]}>
                        Send comment!
                    </button>

                    <button className={styles["delete-btn"]} onClick={OnDeleteHandler}>delete</button>
                </form>
            )}
        </div>
    );
};

export default EditComment;
