import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useContext } from "react";
import { authContext } from "../../contexts/authContext";
import * as authService from "../../services/authService";
import Input from "../Input/Input";
import Modal from "../Modal/Modal";

const emailIcon = <FontAwesomeIcon icon={faAt} />;
const passwordIcon = <FontAwesomeIcon icon={faLock} />;

const Login = () => {
    const { userLogin } = useContext(authContext);
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onCloseBtnHandler = () => {
        setOpen(false);
    };

    const onOuterLayerClickHandler = () => {
        setOpen(false);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const authData = await authService.login(
                values.email,
                values.password
            );
            if (!authData.accessToken) {
                setOpen(true);
            } else {
                userLogin(authData);
                navigate("/catalog");
            }
        } catch (error) {
            navigate("/bad");
        }
    };

    return (
        <>
            <Modal
                open={open}
                onClose={onCloseBtnHandler}
                outerLayerClick={onOuterLayerClickHandler}
                style={"login-error-modal"}
            >
                
                <p>We could not find a user with the email and password combination you entered. Please check that the email and password you entered are correct and try again.</p>
            </Modal>
            <section className={styles["login-form-container"]}>
                <div className={styles["login-cta-container"]}>
                    <h2 className={styles["login-cta-title"]}>LOGIN</h2>
                    <p className={styles["login-cta-para"]}>
                        Please enter you email and password!
                    </p>
                </div>

                <form className={styles["login-form"]} onSubmit={onSubmit}>
                    <div  data-cy="email-container" className={styles["login-email-container"]}>
                        <i className={styles["login-icons"]}>{emailIcon}</i>
                        <Input
                            value={values["email"]}
                            onChange={onChangeHandler}
                            name={"email"}
                            placeholder={"Youremail@here.com"}
                            type={"email"}
                            setStyles={"error-msg"}
                            errorMsg={"Email must be valid!"}
                            required={true}
                            pattern={
                                "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
                            }
                            autoComplete={"on"}
                        />
                    </div>

                    <div data-cy="password-container"  className={styles["login-password-container"]}>
                        <i className={styles["login-icons"]}>{passwordIcon}</i>
                        <Input
                            value={values["password"]}
                            onChange={onChangeHandler}
                            name={"password"}
                            placeholder={"Password"}
                            type={"password"}
                            setStyles={"error-msg"}
                            errorMsg={
                                "The password must be between 6 and 12 characters long!"
                            }
                            required={true}
                            pattern={"^.{6,12}$"}
                            autoComplete={"on"}
                        />
                    </div>

                    <button data-cy="submit" type="submit" className={styles["login-btn"]}>
                        LOGIN
                    </button>
                </form>

                <div className={styles["login-notlogged-container"]}>
                    <p>
                        Don't have an account?{" "}
                        <Link to="/register">Register here</Link>
                    </p>
                </div>
            </section>
        </>
    );
};

export default Login;


