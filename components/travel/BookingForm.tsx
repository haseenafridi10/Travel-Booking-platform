'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { CalendarIcon, Check } from 'lucide-react';
import PriceCalculator from './PriceCalculator';

interface BookingFormProps {
  onClose: () => void;
  preselectedDestination?: string | null;
}

const steps = [
  { id: 1, name: 'Destination', description: 'Choose your destination' },
  { id: 2, name: 'Dates', description: 'Select travel dates' },
  { id: 3, name: 'Travelers', description: 'Number of travelers' },
  { id: 4, name: 'Preferences', description: 'Your preferences' },
  { id: 5, name: 'Review', description: 'Review & confirm' },
];

const destinations = [
  { value: 'paris', label: 'Paris, France' },
  { value: 'tokyo', label: 'Tokyo, Japan' },
  { value: 'bali', label: 'Bali, Indonesia' },
  { value: 'newyork', label: 'New York, USA' },
  { value: 'dubai', label: 'Dubai, UAE' },
  { value: 'santorini', label: 'Santorini, Greece' },
];

export default function BookingForm({ onClose, preselectedDestination }: BookingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: preselectedDestination || '',
    checkIn: undefined as Date | undefined,
    checkOut: undefined as Date | undefined,
    adults: '2',
    children: '0',
    roomType: 'standard',
    preferences: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.destination) {
          newErrors.destination = 'Please select a destination';
        }
        break;
      case 2:
        if (!formData.checkIn) {
          newErrors.checkIn = 'Please select check-in date';
        }
        if (!formData.checkOut) {
          newErrors.checkOut = 'Please select check-out date';
        }
        if (formData.checkIn && formData.checkOut && formData.checkIn >= formData.checkOut) {
          newErrors.checkOut = 'Check-out must be after check-in';
        }
        break;
      case 3:
        if (parseInt(formData.adults) < 1) {
          newErrors.adults = 'At least one adult required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrors({});
  };

  const togglePreference = (pref: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter(p => p !== pref)
        : [...prev.preferences, pref]
    }));
  };

  const handleSubmit = () => {
    alert('Booking submitted successfully! (Demo - no actual booking)');
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Book Your Dream Vacation</DialogTitle>
        </DialogHeader>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex-1 relative">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      currentStep > step.id
                        ? 'bg-green-500 text-white'
                        : currentStep === step.id
                        ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                  </div>
                  <div className="text-xs mt-2 text-center hidden md:block">
                    <div className="font-medium">{step.name}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-5 left-1/2 w-full h-0.5 -z-10 transition-all ${
                      currentStep > step.id ? 'bg-green-500' : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="min-h-[300px]">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Select Your Destination</h3>
              <div>
                <Label htmlFor="destination">Destination</Label>
                <Select
                  value={formData.destination}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, destination: value }))}
                >
                  <SelectTrigger className={errors.destination ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Choose a destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map(dest => (
                      <SelectItem key={dest.value} value={dest.value}>
                        {dest.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.destination && (
                  <p className="text-red-500 text-sm mt-1">{errors.destination}</p>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Select Your Travel Dates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Check-in Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${
                          errors.checkIn ? 'border-red-500' : ''
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.checkIn ? format(formData.checkIn, 'PPP') : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.checkIn}
                        onSelect={(date) => setFormData(prev => ({ ...prev, checkIn: date }))}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.checkIn && (
                    <p className="text-red-500 text-sm mt-1">{errors.checkIn}</p>
                  )}
                </div>

                <div>
                  <Label>Check-out Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${
                          errors.checkOut ? 'border-red-500' : ''
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.checkOut ? format(formData.checkOut, 'PPP') : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.checkOut}
                        onSelect={(date) => setFormData(prev => ({ ...prev, checkOut: date }))}
                        disabled={(date) => date < new Date() || (formData.checkIn ? date <= formData.checkIn : false)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.checkOut && (
                    <p className="text-red-500 text-sm mt-1">{errors.checkOut}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Number of Travelers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="adults">Adults (18+)</Label>
                  <Select
                    value={formData.adults}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, adults: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.adults && (
                    <p className="text-red-500 text-sm mt-1">{errors.adults}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="children">Children (0-17)</Label>
                  <Select
                    value={formData.children}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, children: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[0,1,2,3,4,5,6].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="roomType">Room Type</Label>
                <Select
                  value={formData.roomType}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, roomType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Room</SelectItem>
                    <SelectItem value="deluxe">Deluxe Room</SelectItem>
                    <SelectItem value="suite">Suite</SelectItem>
                    <SelectItem value="villa">Private Villa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Your Preferences</h3>
              <div className="space-y-3">
                {[
                  { id: 'airport', label: 'Airport Transfer' },
                  { id: 'breakfast', label: 'Daily Breakfast' },
                  { id: 'tour', label: 'Guided City Tour' },
                  { id: 'insurance', label: 'Travel Insurance' },
                  { id: 'spa', label: 'Spa Package' },
                  { id: 'adventure', label: 'Adventure Activities' },
                ].map(pref => (
                  <div key={pref.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={pref.id}
                      checked={formData.preferences.includes(pref.id)}
                      onCheckedChange={() => togglePreference(pref.id)}
                    />
                    <Label htmlFor={pref.id} className="cursor-pointer">
                      {pref.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Review Your Booking</h3>

              <div className="bg-slate-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Destination:</span>
                  <span className="font-semibold">
                    {destinations.find(d => d.value === formData.destination)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Check-in:</span>
                  <span className="font-semibold">
                    {formData.checkIn ? format(formData.checkIn, 'PPP') : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Check-out:</span>
                  <span className="font-semibold">
                    {formData.checkOut ? format(formData.checkOut, 'PPP') : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Travelers:</span>
                  <span className="font-semibold">
                    {formData.adults} Adults, {formData.children} Children
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Room Type:</span>
                  <span className="font-semibold capitalize">{formData.roomType}</span>
                </div>
                {formData.preferences.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Extras:</span>
                    <span className="font-semibold">{formData.preferences.length} selected</span>
                  </div>
                )}
              </div>

              <PriceCalculator
                checkIn={formData.checkIn}
                checkOut={formData.checkOut}
                adults={parseInt(formData.adults)}
                children={parseInt(formData.children)}
                roomType={formData.roomType}
                preferences={formData.preferences}
              />
            </div>
          )}
        </div>

        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button
            variant="outline"
            onClick={currentStep === 1 ? onClose : handleBack}
          >
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </Button>

          <Button
            onClick={currentStep === steps.length ? handleSubmit : handleNext}
            className="bg-orange-500 hover:bg-orange-600"
          >
            {currentStep === steps.length ? 'Confirm Booking' : 'Next Step'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
