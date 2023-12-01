
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useUser from "./useUser";


const usePayments
 = () => {
    const [databaseUser] = useUser()
    
    const axiosPublic = useAxiosPublic();
   
    const {data: payments = [], isPending, refetch} = useQuery({
        queryKey: ['payments'], 
        queryFn: async() =>{
            const res = await axiosPublic.get(`/payments?companyName=${databaseUser.companyName}`);
            return res.data;
        }
    })


    return [payments, isPending, refetch]
};

export default usePayments
;