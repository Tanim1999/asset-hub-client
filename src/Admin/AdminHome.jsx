import { Helmet } from "react-helmet-async";
import PendingReq from "../adminComponents/PendingReq";
import useUser from "../hooks/useUser";
import AdminStats from "../adminComponents/AdminStats";

import PieCharts from "../adminComponents/PieChart";
import EmployeeHome from "../Employee/EmployeeHome";


const AdminHome = () => {
    const [databaseUser] = useUser()
    return (
        <div className="mx-5">
            <Helmet><title>Home</title></Helmet>
            <p className=" text-3xl font-bold my-10 "> {databaseUser.name}, Welcome back </p>
            {databaseUser?.role === "admin" ?
                <>
                    <div>
                        <AdminStats></AdminStats>
                    </div>
                    <div>
                        <PieCharts></PieCharts>
                    </div>
                    <div>
                        <PendingReq></PendingReq>

                    </div>
                </>
                :
                <>
                 <EmployeeHome></EmployeeHome>
                </>}



            










        </div>
    );
};

export default AdminHome;