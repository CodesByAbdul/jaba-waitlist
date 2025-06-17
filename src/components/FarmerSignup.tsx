
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sprout, MapPin, Phone, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FarmerSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    farmSize: '',
    primaryCrops: '',
    farmingExperience: '',
    additionalInfo: ''
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This will be connected to Supabase once integration is set up
    console.log('Farmer signup data:', formData);
    
    toast({
      title: "Thank you for joining!",
      description: "We'll contact you soon with more details about Jaba.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      farmSize: '',
      primaryCrops: '',
      farmingExperience: '',
      additionalInfo: ''
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="farmer-signup" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl border-0 animate-fade-in">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Sprout className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              Join as a Farmer
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Connect directly with consumers and grow your business
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmer-name">Full Name *</Label>
                  <div className="relative">
                    <Input
                      id="farmer-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                      className="pl-4"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="farmer-email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="farmer-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                      className="pl-10"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmer-phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="farmer-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      required
                      className="pl-10"
                      placeholder="+234 xxx xxx xxxx"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="farmer-location">Farm Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="farmer-location"
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      required
                      className="pl-10"
                      placeholder="City, State"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farm-size">Farm Size</Label>
                  <Select onValueChange={(value) => handleChange('farmSize', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select farm size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (0-2 acres)</SelectItem>
                      <SelectItem value="medium">Medium (2-10 acres)</SelectItem>
                      <SelectItem value="large">Large (10+ acres)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="farming-experience">Years of Experience</Label>
                  <Select onValueChange={(value) => handleChange('farmingExperience', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-2">0-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="primary-crops">Primary Crops *</Label>
                <Input
                  id="primary-crops"
                  type="text"
                  value={formData.primaryCrops}
                  onChange={(e) => handleChange('primaryCrops', e.target.value)}
                  required
                  placeholder="e.g., Tomatoes, Yams, Cassava, Plantain"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="additional-info">Additional Information</Label>
                <Textarea
                  id="additional-info"
                  value={formData.additionalInfo}
                  onChange={(e) => handleChange('additionalInfo', e.target.value)}
                  placeholder="Tell us more about your farm or any questions you have..."
                  rows={3}
                />
              </div>
              
              <Button
                type="submit"
                className="w-full green-gradient hover:opacity-90 text-white py-3 text-lg font-medium transition-opacity duration-200"
              >
                Join Jaba as a Farmer
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FarmerSignup;
