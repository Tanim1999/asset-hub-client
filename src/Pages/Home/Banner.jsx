import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div>
            <Carousel autoPlay={true} infiniteLoop={true}>
                <div>
                    <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/1fVKtM4/banner01.jpg)' }}>
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-md">
                                <h1 className="mb-5 text-5xl font-bold">Easy and effective management</h1>
                                <p className="mb-5 font-bold">Do you have a company?Join us as an admin and manage your team members and your company assets easily.</p>
                                <Link to="/joinAdmin"><button className="btn bg-[#175f82] text-white hover:bg-black font-bold">Join as Admin</button></Link>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div>
                    <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/VgwMLTy/banner02.jpg)' }}>
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-md">
                                <h1 className="mb-5 text-5xl font-bold">Send request easily and effectively</h1>
                                <p className="mb-5 font-bold">You will thank your boss for choosing us to manage company assets. </p>
                                <Link to='/joinEmployee'><button className="btn bg-[#175f82] text-white hover:bg-black font-bold">Join as employee</button></Link>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </Carousel>

        </div>
    );
};

export default Banner;