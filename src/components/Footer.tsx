
import React from 'react';
import { Sprout, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img src="/logo-leaf.svg" className="h-8 w-8 text-primary mr-2" />
              <span className="text-2xl font-bold">Jaba</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Connecting African farmers directly to buyers for fresh, sustainable, and affordable food.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-2" />
                <span>hello@jaba.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-2" />
                <span>+234 811 265 6046</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Farmers</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Sell Direct</li>
              <li>Fair Pricing</li>
              <li>Market Access</li>
              <li>Support</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Buyers</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Fresh Produce</li>
              <li>Local Sourcing</li>
              <li>Fast Delivery</li>
              <li>Quality Guarantee</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Jaba. All rights reserved. Proudly African. 🌍</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
