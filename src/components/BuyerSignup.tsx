import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ShoppingCart, MapPin, Phone, Mail, Heart, ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { TablesInsert } from '@/integrations/supabase/types.ts';

interface BuyerSignupProps {
  onBack: () => void;
}

const BuyerSignup = ({ onBack }: BuyerSignupProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    businessType: '',
    preferredProducts: [] as string[],
    dietaryPreferences: '',
    deliveryPreference: '',
    additionalInfo: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const productOptions = [
    'Vegetables', 'Fruits', 'Grains', 'Tubers', 'Herbs & Spices', 'Dairy', 'Poultry', 'Fish'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare data for Supabase (convert camelCase to snake_case)
      const buyerData: TablesInsert<'buyers'> = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        business_type: formData.businessType || null,
        preferred_products: formData.preferredProducts.length > 0 ? formData.preferredProducts : null,
        dietary_preferences: formData.dietaryPreferences || null,
        delivery_preference: formData.deliveryPreference || null,
        additional_info: formData.additionalInfo || null,
      };

      const { data, error } = await supabase
        .from('buyers')
        .insert([buyerData])
        .select();

      if (error) {
        console.error('Error inserting buyer data:', error);
        
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

      console.log('Buyer registered successfully:', data);
      
      toast({
        title: "Welcome to Jaba!",
        description: "We'll notify you as soon as we launch in your area.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        businessType: '',
        preferredProducts: [],
        dietaryPreferences: '',
        deliveryPreference: '',
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

  const handleProductToggle = (product: string) => {
    setFormData(prev => ({
      ...prev,
      preferredProducts: prev.preferredProducts.includes(product)
        ? prev.preferredProducts.filter(p => p !== product)
        : [...prev.preferredProducts, product]
    }));
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
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
                <ShoppingCart className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              Join as a Buyer
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Get fresh, local produce delivered straight from the farm
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="buyer-name">Full Name *</Label>
                  <div className="relative">
                    <Input
                      id="buyer-name"
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
                  <Label htmlFor="buyer-email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="buyer-email"
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
                  <Label htmlFor="buyer-phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="buyer-phone"
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
                  <Label htmlFor="buyer-location">Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="buyer-location"
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="business-type">Business Type</Label>
                  <Select 
                    value={formData.businessType}
                    onValueChange={(value) => handleChange('businessType', value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Household</SelectItem>
                      <SelectItem value="restaurant">Restaurant/Hotel</SelectItem>
                      <SelectItem value="grocery-store">Grocery Store</SelectItem>
                      <SelectItem value="supermarket">Supermarket/Chain</SelectItem>
                      <SelectItem value="food-processor">Food Processor</SelectItem>
                      <SelectItem value="wholesaler">Wholesaler</SelectItem>
                      <SelectItem value="distributor">Distributor</SelectItem>
                      <SelectItem value="catering">Catering Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="delivery-preference">Delivery Preference</Label>
                  <Select 
                    value={formData.deliveryPreference}
                    onValueChange={(value) => handleChange('deliveryPreference', value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="same-day">Same Day</SelectItem>
                      <SelectItem value="next-day">Next Day</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Preferred Products</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {productOptions.map((product) => (
                    <div key={product} className="flex items-center space-x-2">
                      <Checkbox
                        id={`product-${product}`}
                        checked={formData.preferredProducts.includes(product)}
                        onCheckedChange={() => handleProductToggle(product)}
                        disabled={isSubmitting}
                      />
                      <Label
                        htmlFor={`product-${product}`}
                        className="text-sm font-normal"
                      >
                        {product}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dietary-preferences">Dietary Preferences</Label>
                <Input
                  id="dietary-preferences"
                  type="text"
                  value={formData.dietaryPreferences}
                  onChange={(e) => handleChange('dietaryPreferences', e.target.value)}
                  disabled={isSubmitting}
                  placeholder="e.g., Vegetarian, Organic only, Gluten-free"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="buyer-additional-info">Additional Information</Label>
                <Textarea
                  id="buyer-additional-info"
                  value={formData.additionalInfo}
                  onChange={(e) => handleChange('additionalInfo', e.target.value)}
                  disabled={isSubmitting}
                  placeholder="Any specific requirements or questions you have..."
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
                  <>
                    <Heart className="h-5 w-5 mr-2" />
                    Join Jaba as a Buyer
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BuyerSignup;