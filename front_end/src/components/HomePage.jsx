import banner from '../assets/images/banner.png';
import banner2 from '../assets/images/banner2.png';
import '../assets/css/HomePage.css';
import { Link } from 'react-router-dom';
import Header1 from './Header1';
import Footer from './Footer';
import Cheers from '../components/Cheers';
import Faq from '../components/Faq';
import ScrollingText from '../components/ScrollingText';
import YouTubeVideo from '../components/YouTubeVideo';
import Updates from '../components/Updates';
import Features from '../components/Features';
import StatisticsSuccessPage from '../components/StatisticsSuccessPage';

const HomePage = () => {
    return(
        <>
        <Header1/>
        <div className="Home">
      <header className="Home-header">
        <div className="hero-section">
          <h1>ShelfLife</h1>
          <p>You're stores Best Friend!</p>
          <p>"Efficiently manage your grocery store's shelf life with a seamless system that empowers managers, staff, and cashiers."</p>
          <Link to="/login" className="join-us">Join Us</Link>
        </div>
      </header>
    </div>
    <Cheers/>
          <Faq/>
          <ScrollingText/>
          <YouTubeVideo/>
          <Updates/>
          <Features/>
          <StatisticsSuccessPage/>
        </>

    );
}

export default HomePage;