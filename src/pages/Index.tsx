
import React from 'react';
import Hero from '@/components/Hero';
import FarmerSignup from '@/components/FarmerSignup';
import ConsumerSignup from '@/components/ConsumerSignup';
import WhatsAppCommunity from '@/components/WhatsAppCommunity';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FarmerSignup />
      <ConsumerSignup />
      <WhatsAppCommunity />
      <Footer />
    </div>
  );
};

export default Index;
