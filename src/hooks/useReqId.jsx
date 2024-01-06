import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";



const useReqID = (id) => {
    
    
    const axiosPublic = useAxiosPublic();
   
    const {data: request = [],  refetch:reReqId} = useQuery({
        queryKey: ['requests'], 
        queryFn: async() =>{
            const res = await axiosPublic.get(`requests/?assetID=${id}`);
            return res.data;
        }
    })


    return [request, reReqId]
};

export default useReqID;