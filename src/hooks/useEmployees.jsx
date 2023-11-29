import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useEmployees = () => {
    const axiosPublic = useAxiosPublic();
    const {data: employees = [],  refetch} = useQuery({
        queryKey: ['employees'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/users?role=employee');
            return res.data;
            
        }
    })
    return [employees, refetch]
};

export default useEmployees;