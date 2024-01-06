import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useUser from "./useUser";


const useRequests = (search) => {
    const [databaseUser] = useUser()
    
    const axiosPublic = useAxiosPublic();
   
    const {data: requests = [], isPending: loading, refetch:reRequests} = useQuery({
        queryKey: ['requests','search'], 
        queryFn: async() =>{
            const res = await axiosPublic.get(`/requests?companyName=${databaseUser.companyName}&status=pending&search=${search}`);
            return res.data;
        }
    })


    return [requests, loading, reRequests]
};

export default useRequests;