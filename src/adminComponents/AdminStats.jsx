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
        <div className="my-5">
            <div className="stats shadow">

                <div className="stat">
                    <div className="stat-figure text-primary">
                    <FaCodePullRequest />

                        
                    </div>
                    <div className="stat-title">Total Requests</div>
                    <div className="stat-value text-primary">{requests.length}</div>
                    
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                    <FaUser />

                    </div>
                    <div className="stat-title">Team members</div>
                    <div className="stat-value text-secondary">{teamMembers.length}</div>
                    
                </div>
                <div className="stat">
                    <div className="stat-figure text-cyan-600">
                    <MdOutlineWebAsset />


                    </div>
                    <div className="stat-title">Total assets</div>
                    <div className="stat-value text-cyan-600">{assets.length}</div>
                    
                </div>

                

            </div>
        </div>
    );
};

export default AdminStats;