import { NavLink, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { authContext } from "../../contexts/authContext";
import Search from "../Search/Search";

import styles from "./Header.module.css";
import main_logo_transparent from "../../images/logo_header.png";

const Header = () => {
    const { user } = useContext(authContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMobileMenu = () => {
        setMenuOpen(false);
    };

    const toggleHamburger = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add("mobile-nav-active");
        } else {
            document.body.classList.remove("mobile-nav-active");
        }
    }, [menuOpen]);

    const setHeaderLinks = ({ isActive }) => {
        return isActive ? styles["active-link"] : styles["non-active-link"];
    };

    return (
        <header className={styles["header-box"]}>
            <nav className={styles["main-nav"]}>
                <div className={styles["logo-box"]}>
                    <li className={styles["logo-link"]}>
                        <NavLink to="/" onClick={closeMobileMenu}>
                            <img src={main_logo_transparent} alt="main logo" />
                        </NavLink>
                    </li>
                </div>

                <ol
                    role="list"
                    data-cy="header-links-list"
                    className={styles["main-links-box"]}
                >
                    <li>
                        <NavLink
                            to="/catalog"
                            data-cy="catalog"
                            className={setHeaderLinks}
                        >
                            GET MOTIVATED!
                        </NavLink>
                    </li>

                    {user.accessToken ? (
                        <>
                            <li>
                                <NavLink
                                    data-cy="create"
                                    to="/create"
                                    className={setHeaderLinks}
                                >
                                    CREATE
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    data-cy="profile"
                                    to="/profile"
                                    className={setHeaderLinks}
                                >
                                    Welcome,{" "}
                                    {user.username?.toUpperCase() ||
                                        "DEFAULT USER"}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    data-cy="logout"
                                    to="/logout"
                                    className={setHeaderLinks}
                                >
                                    LOGOUT
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink
                                    to="/login"
                                    data-cy="login"
                                    className={setHeaderLinks}
                                >
                                    LOGIN
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/register"
                                    data-cy="register"
                                    className={setHeaderLinks}
                                >
                                    REGISTER
                                </NavLink>
                            </li>
                        </>
                    )}

                    <li data-cy="search" className={styles["header-searchBtn"]}>
                        <Search />
                    </li>
                </ol>
                <button
                    onClick={toggleHamburger}
                    className={`${styles["header-hamburger"]} ${
                        menuOpen ? styles["is-active"] : ""
                    }`}
                >
                    <div className={styles["hamburger-bar"]}></div>
                </button>
            </nav>

            <nav
                className={`${styles["mobile-nav"]} ${
                    menuOpen ? styles["is-active"] : ""
                }`}
            >
                <Link to="/catalog" onClick={closeMobileMenu}>
                    GET MOTIVATED!
                </Link>
                <Link to="/login" onClick={closeMobileMenu}>
                    LOGIN
                </Link>
                <Link to="/register" onClick={closeMobileMenu}>
                    REGISTER
                </Link>
            </nav>
        </header>
    );
};

export default Header;
