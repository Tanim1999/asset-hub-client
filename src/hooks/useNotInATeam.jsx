import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useNotInATeam = () => {
    const axiosPublic = useAxiosPublic();
    const {data: notInATeam = [],  refetch} = useQuery({
        queryKey: ['employees'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/users?companyName=none');
            return res.data;
            
        }
    })
    return [notInATeam, refetch]
};

export default useNotInATeam;