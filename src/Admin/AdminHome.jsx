import useUser from "../hooks/useUser";


const AdminHome = () => {
    const  [databaseUser] = useUser()
    return (
        <div>
            
                
                   <p> {databaseUser.name} Welcome back </p>
                
            
                
                
                
             
            
        </div>
    );
};

export default AdminHome;