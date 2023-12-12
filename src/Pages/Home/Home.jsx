import Banner from "../../../src/Pages/Home/Banner";
import AboutUs from "../../components/AboutUs";
import { Helmet} from 'react-helmet-async';
import Faq from "../../components/Faq";


const Home = () => {
    return (
        <div>
            <Helmet><title>home</title></Helmet>

            <Banner></Banner>
            <AboutUs></AboutUs>
            <Faq></Faq>
        </div>
    );
};

export default Home;