import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../ContextApi/AuthProvider";




const useUser = () => {
    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic();
    const {data: currentUser = [] } = useQuery({
        queryKey: ['currentUser',user?.email,], 
        queryFn: async() =>{
            const res = await axiosPublic.get(`/users/${user?.email}`);
            return res.data;
            
        }
        
    })
    return [currentUser]

};

export default useUser;