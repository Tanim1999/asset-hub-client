import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useUser from "./useUser";


const useRequestsStatus = () => {
    const [databaseUser] = useUser()
    
    const axiosPublic = useAxiosPublic();
   
    const {data: requestStatus = [], refetch} = useQuery({
        queryKey: ['requestStatus','search'], 
        queryFn: async() =>{
            const res = await axiosPublic.get(`requests/?companyName=${databaseUser.companyName}&status=pending`);
            return res.data;
        }
    })


    return [requestStatus,  refetch]
};

export default useRequestsStatus;