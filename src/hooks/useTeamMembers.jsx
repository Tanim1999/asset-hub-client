import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useUser from "./useUser";



const useTeamMembers = () => {
    const axiosPublic = useAxiosPublic();
    const [databaseUser]=useUser()
    const {data: teamMembers = [],  refetch} = useQuery({
        queryKey: ['employees'], 
        queryFn: async() =>{
            const res = await axiosPublic.get(`/users?companyName=${databaseUser.companyName}`);
            return res.data;
            
        }
    })
    return [teamMembers, refetch]
};

export default useTeamMembers;