import useUser from "../hooks/useUser";


const DashboardHome = () => {
    const  [databaseUser] = useUser()
    return (
        <div>
            {
                databaseUser?.role==="admin"? 
                <>
                
                   <p> {databaseUser.name} Welcome back </p>
                
                </> 
                
                
                
                :
                 
                 
                 <>
                 
                  <p>
                    employee home
                  </p>
                 
                 </>
            }
            
        </div>
    );
};

export default DashboardHome;