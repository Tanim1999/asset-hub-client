import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://dream-asset-hub-server.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;