
import React, { useState } from 'react';
import Hero from '@/components/Hero';
import FarmerSignup from '@/components/FarmerSignup';
import BuyerSignup from '@/components/BuyerSignup';
import WhatsAppCommunity from '@/components/WhatsAppCommunity';
import Footer from '@/components/Footer';

const Index = () => {
  const [selectedForm, setSelectedForm] = useState<'farmer' | 'buyer' | null>(null);

  const handleFormSelect = (formType: 'farmer' | 'buyer') => {
    setSelectedForm(formType);
  };

  const handleBackToSelection = () => {
    setSelectedForm(null);
  };

  return (
    <div className="min-h-screen">
      <Hero onFormSelect={handleFormSelect} />
      {selectedForm === 'farmer' && (
        <>
          <FarmerSignup onBack={handleBackToSelection} />
          <WhatsAppCommunity />
        </>
      )}
      {selectedForm === 'buyer' && (
        <BuyerSignup onBack={handleBackToSelection} />
      )}
      <Footer />
    </div>
  );
};

export default Index;
