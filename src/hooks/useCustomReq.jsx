import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useUser from "./useUser";


const useCustomReq = () => {
    const [databaseUser] = useUser()
    
    const axiosPublic = useAxiosPublic();
   
    const {data: customReq = [], refetch} = useQuery({
        queryKey: ['customReq','search'], 
        queryFn: async() =>{
            const res = await axiosPublic.get(`requests/?companyName=${databaseUser.companyName}&requestType=custom`);
            return res.data;
        }
    })


    return [customReq,  refetch]
};

export default useCustomReq;