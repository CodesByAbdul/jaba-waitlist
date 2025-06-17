
import React from 'react';
import { MessageCircle, Users, TrendingUp, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhatsAppCommunity = () => {
  const handleJoinWhatsApp = () => {
    window.open('https://chat.whatsapp.com/FPfrBM6Jeb9CfhsHeN0Wii', '_blank');
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 green-gradient">
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full">
              <MessageCircle className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Join Our Farmers' WhatsApp Community
          </h2>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Connect with fellow farmers across Africa. Share knowledge, learn best practices, and grow your farming business together.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Users className="h-8 w-8 text-white mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Network & Learn</h3>
              <p className="text-white/80 text-sm">
                Connect with experienced farmers and share agricultural tips
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <TrendingUp className="h-8 w-8 text-white mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Market Insights</h3>
              <p className="text-white/80 text-small">
                Get real-time market prices and demand updates
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <BookOpen className="h-8 w-8 text-white mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Farming Resources</h3>
              <p className="text-white/80 text-sm">
                Access exclusive farming guides and early platform features
              </p>
            </div>
          </div>
          
          <Button
            onClick={handleJoinWhatsApp}
            className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg font-semibold transition-colors duration-200"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Join Farmers' Community
          </Button>
          
          <p className="text-white/70 text-sm mt-4">
            Exclusive to registered farmers - Join thousands of farmers already in our community
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppCommunity;
