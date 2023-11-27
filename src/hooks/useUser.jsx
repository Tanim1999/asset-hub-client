import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../ContextApi/AuthProvider";




const useUser = () => {
    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic();
    
    console.log('User email:', user?.email);
    console.log('abal user email:',user?.user?.email)

    const {data: databaseUser = [],refetch, isPending} = useQuery({
        queryKey: ['databaseUser',user?.email], 
        
        
        queryFn: async() =>{
            const res = await axiosPublic.get(`/users/${user?.email}`);
            return res.data;
            
        }
        
    })
    
    
    isPending&& console.log('shonar chele oad hoy')
    
    return [databaseUser,refetch]


};

export default useUser;