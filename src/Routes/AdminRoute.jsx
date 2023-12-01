/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";



const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const[databaseUser,,isPending]=useUser();
    
    const location = useLocation();

    if (loading || isPending) {
        return <progress className="progress w-56"></progress>
        
    }

    if (user && databaseUser.role==="admin") {
        
        return children;
        
    }

    return <Navigate to="/dashboard/home" state={{ from: location }} replace></Navigate>
    
};

export default AdminRoute;