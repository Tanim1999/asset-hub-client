import useUser from "../hooks/useUser";


const EmployeeMyAssets = () => {
    const [databaseUser] = useUser();


    return (
        <div>
            {databaseUser.companyName==="none" ? <><p className="font-bold mx-auto p-5 w-[80%] text-3xl rounded-lg border-2 border-[#175f82]">You are not in any team. Please ask your admin to make you a team member</p>
             
             </>
             : 
             <>
             
             
             
             </>
             }
        </div>
    );
};

export default EmployeeMyAssets;