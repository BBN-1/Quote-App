import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
 

export const authContext = createContext();

export const AuthProvider = ({ children }) => {

    const [auth, setLocalStorage] = useLocalStorage("auth", {});

    const userLogin = (authData) => {
        setLocalStorage(authData);
    };

    const userLogout = () => {
        setLocalStorage({});
    };

    return (
        <authContext.Provider value={{ user: auth, isAuthenticated: Boolean(auth.accessToken), userLogin, userLogout }}>
            {children}
        </authContext.Provider>
    );
}
