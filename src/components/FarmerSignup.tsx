
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sprout, MapPin, Phone, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { TablesInsert } from '@/integrations/supabase/types.ts';

interface FarmerSignupProps {
  onBack: () => void;
}

const FarmerSignup = ({ onBack }: FarmerSignupProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    farmSize: '',
    primaryProducts: '',
    farmingType: '',
    farmingExperience: '',
    additionalInfo: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare data for Supabase (convert camelCase to snake_case)
      const farmerData: TablesInsert<'farmers'> = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        farm_size: formData.farmSize || null,
        primary_crops: formData.primaryProducts,
        farming_experience: formData.farmingExperience || null,
        additional_info: formData.additionalInfo || null,
      };

      const { data, error } = await supabase
        .from('farmers')
        .insert([farmerData])
        .select();

      if (error) {
        console.error('Error inserting farmer data:', error);
        
        // Handle specific error cases
        if (error.code === '23505') { // Unique violation
          toast({
            title: "Email already registered",
            description: "This email address is already registered. Please use a different email.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Registration failed",
            description: "Something went wrong. Please try again.",
            variant: "destructive"
          });
        }
        return;
      }

      console.log('Producer registered successfully:', data);
      
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
        primaryProducts: '',
        farmingType: '',
        farmingExperience: '',
        additionalInfo: ''
      });
      
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl border-0 animate-fade-in">
          <CardHeader className="text-center pb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
              disabled={isSubmitting}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to selection
            </button>
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Sprout className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              Join as a Producer
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Connect directly with buyers and grow your agricultural business
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="producer-name">Full Name *</Label>
                  <div className="relative">
                    <Input
                      id="producer-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="pl-4"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="producer-email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="producer-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="pl-10"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="producer-phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="producer-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="pl-10"
                      placeholder="+234 xxx xxx xxxx"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="producer-location">Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="producer-location"
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="pl-10"
                      placeholder="City, State"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="farming-type">Type of Production *</Label>
                <Select 
                  value={formData.farmingType}
                  onValueChange={(value) => handleChange('farmingType', value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your production type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crop-farming">Crop Farming</SelectItem>
                    <SelectItem value="livestock">Livestock (Cattle, Goats, Sheep)</SelectItem>
                    <SelectItem value="poultry">Poultry (Chickens, Ducks, Turkey)</SelectItem>
                    <SelectItem value="aquaculture">Fish Farming / Aquaculture</SelectItem>
                    <SelectItem value="dairy">Dairy Production</SelectItem>
                    <SelectItem value="mixed-farming">Mixed Farming (Crops + Animals)</SelectItem>
                    <SelectItem value="processed-foods">Processed Foods</SelectItem>
                    <SelectItem value="value-added">Value-Added Products</SelectItem>
                    <SelectItem value="other">Other Agricultural Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farm-size">Farm/Operation Size</Label>
                  <Select 
                    value={formData.farmSize}
                    onValueChange={(value) => handleChange('farmSize', value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select operation size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small Scale (0-2 acres / Small herd)</SelectItem>
                      <SelectItem value="medium">Medium Scale (2-10 acres / Medium herd)</SelectItem>
                      <SelectItem value="large">Large Scale (10+ acres / Large herd)</SelectItem>
                      <SelectItem value="commercial">Commercial Operation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="farming-experience">Years of Experience</Label>
                  <Select 
                    value={formData.farmingExperience}
                    onValueChange={(value) => handleChange('farmingExperience', value)}
                    disabled={isSubmitting}
                  >
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
                <Label htmlFor="primary-products">Primary Products *</Label>
                <Input
                  id="primary-products"
                  type="text"
                  value={formData.primaryProducts}
                  onChange={(e) => handleChange('primaryProducts', e.target.value)}
                  required
                  disabled={isSubmitting}
                  placeholder="e.g., Tomatoes, Rice, Cattle, Chicken, Fish, Processed Yam Flour"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="additional-info">Additional Information</Label>
                <Textarea
                  id="additional-info"
                  value={formData.additionalInfo}
                  onChange={(e) => handleChange('additionalInfo', e.target.value)}
                  disabled={isSubmitting}
                  placeholder="Tell us more about your operation, production capacity, or any questions you have..."
                  rows={3}
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full green-gradient hover:opacity-90 text-white py-3 text-lg font-medium transition-opacity duration-200 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Registering...
                  </>
                ) : (
                  'Join Jaba as a Producer'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FarmerSignup;
