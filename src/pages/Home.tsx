import Hero from '../components/Hero';
import Features from '../components/Features';
import HealthBenefits from '../components/HealthBenefits';
import AISection from '../components/AISection';
import Marketplace from '../components/Marketplace';
import Services from '../components/Services';
import Learning from '../components/Learning';

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <HealthBenefits />
      <Marketplace />
      <Services />
      <Learning />
      <AISection />
    </>
  );
};

export default Home;