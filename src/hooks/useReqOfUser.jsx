import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useUser from "./useUser";


const useReqOfUser = () => {
    const [databaseUser] = useUser()
    
    const axiosPublic = useAxiosPublic();
   
    const {data: reqOfUser = [], refetch:reReq,isPending} = useQuery({
        queryKey: ['reqOfUser'], 
        queryFn: async() =>{
            const res = await axiosPublic.get(`requests/?companyName=${databaseUser.companyName}&emailOfRequester=${databaseUser.email}`);
            return res.data;
        }
    })


    return [reqOfUser,  reReq,isPending]
};

export default useReqOfUser;