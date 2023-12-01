import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useUser from "./useUser";


const useAssets = () => {
    const [databaseUser] = useUser()
    
    const axiosPublic = useAxiosPublic();
   
    const {data: assets = [], isPending: loading, refetch} = useQuery({
        queryKey: ['assets','search'], 
        queryFn: async() =>{
            const res = await axiosPublic.get(`/assets?companyName=${databaseUser.companyName}`);
            return res.data;
        }
    })


    return [assets, loading, refetch]
};

export default useAssets;