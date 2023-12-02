import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useUser from "./useUser";


const useRequests = () => {
    const [databaseUser] = useUser()
    
    const axiosPublic = useAxiosPublic();
   
    const {data: requests = [], isPending: loading, refetch} = useQuery({
        queryKey: ['requests','search'], 
        queryFn: async() =>{
            const res = await axiosPublic.get(`requests/?companyName=${databaseUser.companyName}`);
            return res.data;
        }
    })


    return [requests, loading, refetch]
};

export default useRequests;