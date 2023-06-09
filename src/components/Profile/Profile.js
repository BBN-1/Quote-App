import styles from "./Profile.module.css";
import { useContext } from "react";
import { authContext } from "../../contexts/authContext";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailBulk, faUser, faPenAlt, faComments } from "@fortawesome/free-solid-svg-icons";

const userIcon = <FontAwesomeIcon icon={faUser} />;
const mailIcon = <FontAwesomeIcon icon={faMailBulk} />;
const penIcon = <FontAwesomeIcon icon={faPenAlt} />;
const commentIcon = <FontAwesomeIcon icon={faComments} />;

const Profile = () => {





    const {user} = useContext(authContext)
    

    return (
        <section className={styles["profile-form-container"]}>
            <div className={styles["profile-header"]}>
                <h2 className={styles["profile-title"]}>Profile</h2>
                <p className={styles["profile-para"]}>
                    Your personal information and activity
                </p>
            </div>

            <div className={styles["profile-card"]}>
                <div className={styles["profile-card-username-container"]}>
                    <i className={styles["username-icon"]}>{userIcon}</i>
                    <h1 data-cy="profile-username" className={styles["profile-card-username"]}>{user.username || 'Default User'}</h1>
                </div>

                <div className={styles["profile-card-email-container"]}>
                    <i className={styles["email-icon"]}>{mailIcon}</i>
                    <p data-cy="profile-email" className={styles["profile-card-email"]}>
                        {user.email}
                    </p>
                </div>

                <div className={styles["profile-bottom-wrapper"]}>

                    <Link to={'/profile/posts'} className={styles["profile-card-link"]}>
                    <i className={styles["profile-icon-links"]}>{penIcon}</i>
                        Posts</Link>
                    <Link to={'/profile/comments'} className={styles["profile-card-link"]}>
                    <i className={styles["profile-icon-links"]}>{commentIcon}</i>Comments</Link>
                </div>
            </div>
        </section>
    );
};

export default Profile;
