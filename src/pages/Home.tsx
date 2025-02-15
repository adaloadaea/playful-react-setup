
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import ProjectGallery from '../components/ProjectGallery';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import ReviewSection from '../components/ReviewSection';
import CTA from '../components/CTA';

const Home = () => {
  return (
    <PageWrapper>
      <HeroSection />
      <ProjectGallery />
      <FeaturesSection />
      <ReviewSection />
      <CTA />
    </PageWrapper>
  );
};

export default Home;
