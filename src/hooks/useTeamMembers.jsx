import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useUser from "./useUser";



const useTeamMembers = () => {
    const axiosPublic = useAxiosPublic();
    const [databaseUser]=useUser()
    const {data: teamMembers = [],  refetch:redone,isLoading,isPending,isFetching} = useQuery({
        queryKey: ['teamMembers'], 
        queryFn: async() =>{
            const res = await axiosPublic.get(`/users?companyName=${databaseUser.companyName}`);
            
            return res.data;
            
            
        }
    })
    return [teamMembers, redone,isLoading,isPending,isFetching,isPending]
};

export default useTeamMembers;