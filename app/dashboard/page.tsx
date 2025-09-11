'use client';

import React, { useState, useEffect } from 'react';
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const useReverseGeocode = () => {
  const [location, setLocation] = useState({ state: '', detailedRegion: '' });
  const [error, setError] = useState(null);

  const getLocation = async () => {
    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const lat = pos.coords.latitude;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const lon = pos.coords.longitude;
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1&zoom=10`);
      if (!res.ok) throw new Error('Failed to fetch location data');
      const data = await res.json();
      const state = data.address.state || data.address.province || data.address.region || 'Unknown';
      const detailedRegion = `${data.address.city || ''}, ${data.address.county || ''}, ${data.address.state_district || ''}, ${data.address.state || ''}, ${data.address.country || ''}`.replace(/, ,/g, ',').replace(/,$/, '');
      setLocation({ state, detailedRegion });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { location, error, getLocation };
};

const DashboardPage = () => {
  const [formData, setFormData] = useState({
    crop: '',
    season: '',
    state: '',
    annualRainfall: '',
    area: '',
    fertilizer: '',
    pesticide: '',
    cropYear: '',
  });

  const { location, getLocation } = useReverseGeocode();

  useEffect(() => {
    if (location.detailedRegion) {
      setFormData((prev) => ({ ...prev, state: location.detailedRegion }));
    }
  }, [location.detailedRegion]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (field: any) => (e: any) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-x-hidden">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-green-100/50 md:bg-transparent md:backdrop-blur-none md:border-none md:relative">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Image
                src="/favicon.png"
                alt="AgroGen Logo"
                width={24}
                height={24}
                className="md:w-8 md:h-8 object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                AgroGen
              </h1>
            </div>
          </div>
          <div className="scale-90 md:scale-100">
            <UserButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-4 md:py-8 md:h-[calc(100vh-120px)] md:flex md:items-center md:justify-center">
        <div className="w-full max-w-2xl">
          <Card className="bg-white/70 backdrop-blur-sm mb-6 border-green-100 shadow-xl w-full md:h-full">
            <CardHeader className="pb-4 md:pb-6">
              <CardTitle className="text-xl md:text-2xl justify-center text-gray-800 flex items-center space-x-2">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Crop Analysis Form</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between md:h-[calc(100%-3rem)]">
              <div className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="space-y-2">
                    <Label htmlFor="crop" className="text-sm font-semibold text-gray-700">Crop Type</Label>
                    <Input 
                      id="crop" 
                      value={formData.crop} 
                      onChange={handleChange('crop')}
                      className="border-green-200 focus:border-green-500 focus:ring-green-500 w-full h-10 md:h-auto"
                      placeholder="e.g., Rice, Wheat, Cotton"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="season" className="text-sm font-semibold text-gray-700">Season</Label>
                    <Input 
                      id="season" 
                      value={formData.season} 
                      onChange={handleChange('season')}
                      className="border-green-200 focus:border-green-500 focus:ring-green-500 w-full h-10 md:h-auto"
                      placeholder="e.g., Kharif, Rabi"
                    />
                  </div>
                </div>
                <div className="space-y-2 w-full">
                  <Label htmlFor="state" className="text-sm font-semibold text-gray-700">State/Region</Label>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full">
                    <Input 
                      id="state" 
                      value={formData.state} 
                      onChange={handleChange('state')}
                      className="flex-1 border-green-200 focus:border-green-500 focus:ring-green-500 w-full h-10 md:h-auto"
                      placeholder="Enter your state/region"
                    />
                    <Button 
                      type="button" 
                      onClick={getLocation} 
                      variant="outline"
                      className="border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 transition-all duration-200 w-full sm:w-auto h-10 md:h-auto text-sm"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Auto-detect
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="space-y-2">
                    <Label htmlFor="annualRainfall" className="text-sm font-semibold text-gray-700">Annual Rainfall (mm)</Label>
                    <Input 
                      id="annualRainfall" 
                      type="number" 
                      value={formData.annualRainfall} 
                      onChange={handleChange('annualRainfall')}
                      className="border-green-200 focus:border-green-500 focus:ring-green-500 w-full h-10 md:h-auto"
                      placeholder="e.g., 1200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area" className="text-sm font-semibold text-gray-700">Area (hectares)</Label>
                    <Input 
                      id="area" 
                      type="number" 
                      value={formData.area} 
                      onChange={handleChange('area')}
                      className="border-green-200 focus:border-green-500 focus:ring-green-500 w-full h-10 md:h-auto"
                      placeholder="e.g., 5.5"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="space-y-2">
                    <Label htmlFor="fertilizer" className="text-sm font-semibold text-gray-700">Fertilizer (kg/hectare)</Label>
                    <Input 
                      id="fertilizer" 
                      type="number" 
                      value={formData.fertilizer} 
                      onChange={handleChange('fertilizer')}
                      className="border-green-200 focus:border-green-500 focus:ring-green-500 w-full h-10 md:h-auto"
                      placeholder="e.g., 120"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pesticide" className="text-sm font-semibold text-gray-700">Pesticide (kg/hectare)</Label>
                    <Input 
                      id="pesticide" 
                      type="number" 
                      value={formData.pesticide} 
                      onChange={handleChange('pesticide')}
                      className="border-green-200 focus:border-green-500 focus:ring-green-500 w-full h-10 md:h-auto"
                      placeholder="e.g., 2.5"
                    />
                  </div>
                </div>

                <div className="space-y-2 w-full">
                  <Label htmlFor="cropYear" className="text-sm font-semibold text-gray-700">Crop Year</Label>
                  <Input 
                    id="cropYear" 
                    type="number" 
                    value={formData.cropYear} 
                    onChange={handleChange('cropYear')}
                    className="border-green-200 focus:border-green-500 focus:ring-green-500 w-full h-10 md:h-auto"
                    placeholder="e.g., 2024"
                  />
                </div>
              </div>
              <div className="mt-6">
                <Button 
                  type="submit" 
                  className="w-full cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 h-12 md:h-auto rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                  onClick={handleSubmit}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Analyze Crop Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
