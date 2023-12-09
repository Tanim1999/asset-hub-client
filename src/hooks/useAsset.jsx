import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";



const useAsset = (id) => {
   
    
    const axiosPublic = useAxiosPublic();
   
    const {data: asset = [], isPending: loading, refetch:reAsset} = useQuery({
        queryKey: ['asset','id'], 
        queryFn: async() =>{
            const res = await axiosPublic.get(`/assets/${id}`);
            return res.data;
        }
    })


    return [asset, loading, reAsset]
};

export default useAsset;