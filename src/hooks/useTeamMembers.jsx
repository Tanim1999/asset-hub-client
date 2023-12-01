import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useUser from "./useUser";



const useTeamMembers = () => {
    const axiosPublic = useAxiosPublic();
    const [databaseUser]=useUser()
    const {data: teamMembers = [],  refetch:redone} = useQuery({
        queryKey: ['teamMembers'], 
        queryFn: async() =>{
            const res = await axiosPublic.get(`/users?companyName=${databaseUser.companyName}`);
            return res.data;
            
        }
    })
    return [teamMembers, redone]
};

export default useTeamMembers;