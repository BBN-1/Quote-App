import styles from "./ProfileComments.module.css";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { authContext } from "../../../contexts/authContext";
import * as commentService from "../../../services/commentService";
import CommentItem from "./CommentItem/CommentItem";
import Spinner from "../../Spinner/Spinner";
import Pagination from "../../Pagination/Pagination";

const ProfileComments = () => {
    const [allCommentsByUser, setAllCommentsByUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(authContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [commentsPerPage, setCommentsPerPage] = useState(5);


    useEffect(() => {
        (async () => {
            const quotes = await commentService.getAllCommentsByUser(user._id);
            setAllCommentsByUser(quotes);
            setIsLoading(false);
        })();
    }, [user._id]);

    //pagination needed values

    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = allCommentsByUser.slice(indexOfFirstComment, indexOfLastComment);

 

    

    return (

        <>
        <div className={styles["catalog-container"]}>
            <h1 className={styles["catalog-title"]}>
                Your Comments, {user.username || 'Default User'}!
            </h1>
            <section className={styles["catalog-cards-container"]}>
                {(isLoading && <Spinner />) ||
                    (allCommentsByUser.length > 0 &&
                        currentComments.map((comment) => (
                            <CommentItem
                                key={comment._id}
                                quoteId={comment.quoteId}
                                comment={comment}
                                quoteSnippet={comment.quoteSnippet}
                                user={user}
                            />
                        ))) || (
                        <p className={styles["no-comments"]}>
                            You have no comments yet!
                        </p>
                    )}
            </section>
        </div>

        <Pagination totalPosts={allCommentsByUser.length} postsPerPage={commentsPerPage} setCurrentPage={setCurrentPage} />
        </>
    );
};

export default ProfileComments;
