import styles from "./Comment.module.css";

import { useContext } from "react";
import { authContext } from "../../../contexts/authContext";

import { Link } from "react-router-dom";

const Comment = (props) => {
    const { user } = useContext(authContext);

    const commentsArray = props.comments;

    const hideMyUsername = "Anonymous";
    const defaultUsers = "Default User";

    

    return (
        <ul
            role="list"
            className={styles["details-comments-container-single-comment"]}
        >
            {commentsArray.length > 0 ? (
                commentsArray?.map((comment) => {
                    return (
                        <li
                            data-cy="comment"
                            className={
                                styles["details-comments-single-comment"]
                            }
                            key={comment._id}
                        >
                            <p className={styles["single-comment-text"]}>
                                {comment.text}
                            </p>

                            
                            {comment.hide ? (
                                <p
                                    className={
                                        styles["single-comment-authorHidden"]
                                    }
                                >
                                    by - {hideMyUsername}
                                </p>
                            ) : (
                                <p className={styles["single-comment-author"]}>
                                    by - {comment.user.username || defaultUsers}
                                </p>
                            )}

                            {comment._ownerId === user._id && (
                                <div
                                    className={
                                        styles["details-comments-btn-container"]
                                    }
                                >
                                    <Link

                                        data-cy="edit-comment"
                                        className={
                                            styles[
                                                "details-comments-container-editLink"
                                            ]
                                        }
                                        to={`/comment/edit/${comment._id}`}
                                    >
                                        edit
                                    </Link>
                                </div>
                            )}
                        </li>
                    );
                })
            ) : (
                <p className={styles["no-comments-text"]}>No comments yet</p>
            )}
        </ul>
    );
};

export default Comment;
