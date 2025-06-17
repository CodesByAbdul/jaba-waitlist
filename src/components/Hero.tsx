
import React from 'react';
import { Sprout, Users, Truck } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero-gradient py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <Sprout className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Welcome to{' '}
            <span className="text-primary bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              Jaba
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connecting African farmers directly to consumers. Fresh, local, and sustainable food at your fingertips.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex items-center gap-2 text-gray-700">
              <Users className="h-5 w-5 text-primary" />
              <span>Direct Farm-to-Table</span>
            </div>
            <div className="hidden sm:block w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="flex items-center gap-2 text-gray-700">
              <Truck className="h-5 w-5 text-primary" />
              <span>Fast Delivery</span>
            </div>
            <div className="hidden sm:block w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="flex items-center gap-2 text-gray-700">
              <Sprout className="h-5 w-5 text-primary" />
              <span>Fresh & Organic</span>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-md mx-auto animate-scale-in">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Be the first to know when we launch!
            </h2>
            <p className="text-gray-600 mb-6">
              Join our waitlist to get early access and exclusive benefits.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="#farmer-signup"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                I'm a Farmer
              </a>
              <a
                href="#consumer-signup"
                className="border border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                I'm a Consumer
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
