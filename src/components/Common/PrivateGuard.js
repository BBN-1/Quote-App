import { authContext } from "../../contexts/authContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateGuard = () => {
    const { isAuthenticated } = useContext(authContext);
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }

 
    return <Outlet />;
}

export default PrivateGuard;