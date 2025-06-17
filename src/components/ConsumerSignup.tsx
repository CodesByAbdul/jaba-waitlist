
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ShoppingCart, MapPin, Phone, Mail, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ConsumerSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    householdSize: '',
    preferredProducts: [],
    dietaryPreferences: '',
    deliveryPreference: '',
    additionalInfo: ''
  });
  
  const { toast } = useToast();

  const productOptions = [
    'Vegetables', 'Fruits', 'Grains', 'Tubers', 'Herbs & Spices', 'Dairy', 'Poultry', 'Fish'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This will be connected to Supabase once integration is set up
    console.log('Consumer signup data:', formData);
    
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
      householdSize: '',
      preferredProducts: [],
      dietaryPreferences: '',
      deliveryPreference: '',
      additionalInfo: ''
    });
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
    <section id="consumer-signup" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl border-0 animate-fade-in">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <ShoppingCart className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              Join as a Consumer
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Get fresh, local produce delivered straight from the farm
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="consumer-name">Full Name *</Label>
                  <div className="relative">
                    <Input
                      id="consumer-name"
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
                  <Label htmlFor="consumer-email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="consumer-email"
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
                  <Label htmlFor="consumer-phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="consumer-phone"
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
                  <Label htmlFor="consumer-location">Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="consumer-location"
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
                  <Label htmlFor="household-size">Household Size</Label>
                  <Select onValueChange={(value) => handleChange('householdSize', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select household size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 person</SelectItem>
                      <SelectItem value="2-3">2-3 people</SelectItem>
                      <SelectItem value="4-5">4-5 people</SelectItem>
                      <SelectItem value="6+">6+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="delivery-preference">Delivery Preference</Label>
                  <Select onValueChange={(value) => handleChange('deliveryPreference', value)}>
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
                  placeholder="e.g., Vegetarian, Organic only, Gluten-free"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="consumer-additional-info">Additional Information</Label>
                <Textarea
                  id="consumer-additional-info"
                  value={formData.additionalInfo}
                  onChange={(e) => handleChange('additionalInfo', e.target.value)}
                  placeholder="Any specific requirements or questions you have..."
                  rows={3}
                />
              </div>
              
              <Button
                type="submit"
                className="w-full green-gradient hover:opacity-90 text-white py-3 text-lg font-medium transition-opacity duration-200"
              >
                <Heart className="h-5 w-5 mr-2" />
                Join Jaba as a Consumer
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ConsumerSignup;
