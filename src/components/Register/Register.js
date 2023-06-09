import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAt,
    faLock,
    faUnlockKeyhole,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useContext } from "react";
import { authContext } from "../../contexts/authContext";
import * as authService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import Modal from "../Modal/Modal";

const userIcon = <FontAwesomeIcon icon={faUser} />;
const emailIcon = <FontAwesomeIcon icon={faAt} />;
const passwordIcon = <FontAwesomeIcon icon={faLock} />;
const confirmPassIcon = <FontAwesomeIcon icon={faUnlockKeyhole} />;

const Register = () => {
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        passConfirm: "",
    });

    const { userLogin } = useContext(authContext);
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await authService.register(
                values.email,
                values.password,
                values.username
            );

            console.log(res.code);
            if (res.code === 409) {
                setOpen(true);
                return;
            }

            userLogin(res);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const onChangeHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onCloseBtnHandler = () => {
        setOpen(false);
    };

    const onOuterLayerClickHandler = () => {
        setOpen(false);
    };

    return (
        <>
            <Modal
                open={open}
                onClose={onCloseBtnHandler}
                outerLayerClick={onOuterLayerClickHandler}
                style={"login-error-modal"}
            >
                <p>User with this {values.email} email already exists!</p>
            </Modal>
            <section className={styles["register-form-container"]}>
                <div className={styles["register-cta-container"]}>
                    <h2 className={styles["register-cta-title"]}>REGISTER</h2>
                    <p className={styles["register-cta-para"]}>
                        Please fill in the form!
                    </p>
                </div>

                <form onSubmit={onSubmit} className={styles["register-form"]}>
                    <section className={styles["input-upper-section"]}>
                        <div
                            data-cy="username-container"
                            className={styles["register-username-container"]}
                        >
                            <i className={styles["username-icon"]}>
                                {userIcon}
                            </i>
                            <Input
                                value={values["username"]}
                                onChange={onChangeHandler}
                                name={"username"}
                                placeholder={"Username"}
                                type={"username"}
                                setStyles={"error-msg"}
                                errorMsg={
                                    "Username must be between 3 and 12 characters long and can contain only letters, numbers and underscore!"
                                }
                                required={true}
                                pattern={"^[a-zA-Z0-9_]{3,12}$"}
                                autoComplete={"on"}
                            />
                        </div>

                        <div
                            data-cy="email-container"
                            className={styles["register-email-container"]}
                        >
                            <i className={styles["username-icon"]}>
                                {emailIcon}
                            </i>

                            <Input
                                value={values["email"]}
                                onChange={onChangeHandler}
                                name={"email"}
                                placeholder={"Yourmail@here.com"}
                                type={"email"}
                                setStyles={"error-msg"}
                                errorMsg={"Email must be valid!"}
                                required={true}
                                pattern={
                                    "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
                                }
                                autoComplete={"one"}
                            />
                        </div>
                    </section>

                    <section className={styles["input-lower-section"]}>
                        <div
                            data-cy="password-container"
                            className={styles["register-password-container"]}
                        >
                            <i className={styles["username-icon"]}>
                                {passwordIcon}
                            </i>
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

                        <div
                            data-cy="passConfirm-container"
                            className={styles["register-passconfirm-container"]}
                        >
                            <i className={styles["username-icon"]}>
                                {confirmPassIcon}
                            </i>
                            <Input
                                value={values["Passconfirm"]}
                                onChange={onChangeHandler}
                                name={"passConfirm"}
                                placeholder={"Repeat your password"}
                                type={"password"}
                                setStyles={"error-msg"}
                                errorMsg={"Passwords must match!"}
                                required={true}
                                pattern={values.password}
                                autoComplete={"on"}
                            />
                        </div>
                    </section>

                    <button
                        data-cy="submit"
                        type="submit"
                        className={styles["register-btn"]}
                    >
                        REGISTER
                    </button>
                </form>

                <div className={styles["register-notlogged-container"]}>
                    <p>
                        Already have an account?{" "}
                        <Link to="/login">Login here</Link>
                    </p>
                </div>
            </section>
        </>
    );
};

export default Register;
