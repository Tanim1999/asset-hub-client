import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';


const AboutUs = () => {
    return (
        <div>
            <h2 className=" text-[#175f82] text-3xl my-5 font-bold text-center ">About us</h2>
            <Carousel autoPlay={true} infiniteLoop={true} transitionTime={500} interval={3000}>
                <div>
                    <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/1fVKtM4/banner01.jpg)' }}>
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-md">
                                <h1 className="mb-5 text-5xl  font-bold">Request assets as you want</h1>
                                <p className="mb-5 font-bold">Being a employee you can make custom requests.</p>
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div>
                    <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/VgwMLTy/banner02.jpg)' }}>
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-md">
                                <h1 className="mb-5 text-5xl font-bold">Create assets</h1>
                                <p className="mb-5 font-bold">As admin can create assets with important infos </p>
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div>
                    <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/VgwMLTy/banner02.jpg)' }}>
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-md">
                                <h1 className="mb-5 text-5xl font-bold">Can search requests from different users</h1>
                                <p className="mb-5 font-bold">As admin you can search different assets requested by employees </p>
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </Carousel>

            
        </div>
    );
};

export default AboutUs;