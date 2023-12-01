
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";

// import useAssets from "../hooks/useAssets";


const AssetList = () => {
    const axiosPublic=useAxiosPublic()
    const [databaseUser]= useUser()
   
    const[assets,setAssets]=useState([])

    const[search,setSearch]=useState('')


    useEffect( ()=>{
        axiosPublic.get(`/assets?companyName=${databaseUser.companyName}&search=${search}`)
            .then(res=> setAssets(res.data))
            
    },[search,databaseUser,axiosPublic])
    console.log("data of assets",assets)
    


    const handleSearch = (e)=>{
        e.preventDefault()
            const searchText = e.target.search.value
            console.log(searchText)
            setSearch(searchText)
        }

       const handleDelete=(id)=>{
        console.log(id)
       }

     

     


    return (
        <div>
            <form onSubmit={handleSearch}>
                <div className="flex">
                    <input type="text" name="search" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                    <button  className="btn font-bold bg-cyan-700 text-white" type="submit"><FaSearch></FaSearch></button>
                </div>
                <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className='bg-[#175f82] text-white text-center'>
                        <tr>
                            <th>#</th>
                            <th>Asset name</th>
                            <th>Asset Type</th>
                            <th>Quantity</th>
                            <th>Date Added</th>
                            <th>update</th>

                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {assets.map((item, index) => (
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>{item.productNAme}</td>
                                <td>{item.productType}</td>
                                <td>{item.quantity}</td>
                                <td>{item?.addedDate}</td>
                                
                            
                                <th>
                                    <Link to={`/dashboard/updateAsset/${item._id}`}>
                                    <button
                                        className="btn"
                                    
                                     
                                        
                                    >
                                        Update
                                    </button>
                                    
                                    </Link>
                                </th>
                                <th>
                                    <button
                                        className="btn"
                                        onClick={()=>handleDelete(item._id)}
                                     
                                        
                                    >
                                        Delete
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </form>

        </div>
    );
};

export default AssetList;