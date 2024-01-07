import useRequests from "../hooks/useRequests";
import { FaCodePullRequest, FaUser } from "react-icons/fa6";
import useTeamMembers from "../hooks/useTeamMembers";
import useAssets from "../hooks/useAssets";
import { MdOutlineWebAsset } from "react-icons/md";



const AdminStats = () => {
    const [requests] = useRequests("")
    const [teamMembers] = useTeamMembers()
    const [assets]= useAssets()

    return (
        <div className="my-5 max-w-fit mx-auto">
            <div className="stats shadow bg-[#00B6FF] ">

                <div className="stat">
                    <div className="stat-figure text-primary">
                    <FaCodePullRequest />

                        
                    </div>
                    <div className="stat-title text-black font-bold">Total Requests</div>
                    <div className="stat-value text-primary">{requests.length}</div>
                    
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                    <FaUser />

                    </div>
                    <div className="stat-title text-black font-bold">Team members</div>
                    <div className="stat-value text-secondary">{teamMembers.length}</div>
                    
                </div>
                <div className="stat">
                    <div className="stat-figure text-[#56e22f]">
                    <MdOutlineWebAsset />


                    </div>
                    <div className="stat-title text-black font-bold">Total assets</div>
                    <div className="stat-value text-[#56e22f]">{assets.length}</div>
                    
                </div>

                

            </div>
        </div>
    );
};

export default AdminStats;