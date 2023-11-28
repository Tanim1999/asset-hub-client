import useUser from "../hooks/useUser";


const DashboardHome = () => {
    const  [databaseUser] = useUser()
    return (
        <div>
            {
                databaseUser?.role==="admin"? 
                <>
                
                   <p> admin home</p>
                
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