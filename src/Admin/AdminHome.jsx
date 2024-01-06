import PendingReq from "../adminComponents/PendingReq";
import useUser from "../hooks/useUser";


const AdminHome = () => {
    const  [databaseUser] = useUser()
    return (
        <div>
            
                
                   <p className=" text-3xl font-bold my-10 "> {databaseUser.name}, Welcome back </p>
                
             <PendingReq></PendingReq>
                
                
                
             
            
        </div>
    );
};

export default AdminHome;