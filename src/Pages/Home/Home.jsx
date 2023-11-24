import Banner from "../../../src/Pages/Home/Banner";
import AboutUs from "../../components/AboutUs";
import { Helmet} from 'react-helmet-async';


const Home = () => {
    return (
        <div>
            <Helmet><title>home</title></Helmet>

            <Banner></Banner>
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;