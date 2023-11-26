import { Outlet } from "react-router-dom";
import EmployeeNavbar from "./EmployeeNavbar";


const EmployeeMain = () => {
    return (
        
        <div>
            <EmployeeNavbar></EmployeeNavbar>
            <Outlet></Outlet>
        </div>
    );
};

export default EmployeeMain;