import { useContext, useEffect } from "react";
import * as authService from "../../services/authService";
import { authContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    const { user, userLogout } = useContext(authContext);

    useEffect(() => {
        authService
            .logout(user.accessToken)
            .then(() => {
                userLogout();
                navigate("/");
            })
            .catch(() => {
                navigate("/");
            });
    });

    return null;
};

export default Logout;
