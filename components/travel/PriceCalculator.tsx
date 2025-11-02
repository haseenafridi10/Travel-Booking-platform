'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Info } from 'lucide-react';

interface PriceCalculatorProps {
  checkIn?: Date;
  checkOut?: Date;
  adults: number;
  children: number;
  roomType: string;
  preferences: string[];
}

const roomPrices: Record<string, number> = {
  standard: 150,
  deluxe: 250,
  suite: 400,
  villa: 650,
};

const preferencePrices: Record<string, number> = {
  airport: 50,
  breakfast: 25,
  tour: 80,
  insurance: 35,
  spa: 120,
  adventure: 150,
};

const exchangeRates: Record<string, { rate: number; symbol: string }> = {
  USD: { rate: 1, symbol: '$' },
  EUR: { rate: 0.92, symbol: '€' },
  GBP: { rate: 0.79, symbol: '£' },
};

export default function PriceCalculator({
  checkIn,
  checkOut,
  adults,
  children,
  roomType,
  preferences,
}: PriceCalculatorProps) {
  const [currency, setCurrency] = useState('USD');
  const [showBreakdown, setShowBreakdown] = useState(false);

  const calculations = useMemo(() => {
    const nights = checkIn && checkOut
      ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
      : 5;

    const roomPrice = roomPrices[roomType] || 150;
    const roomTotal = roomPrice * nights;

    const preferencesTotal = preferences.reduce((sum, pref) => {
      return sum + (preferencePrices[pref] || 0);
    }, 0);

    const childDiscount = children * 50;
    const subtotal = roomTotal + preferencesTotal - childDiscount;
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    return {
      nights,
      roomPrice,
      roomTotal,
      preferencesTotal,
      childDiscount,
      subtotal,
      tax,
      total,
    };
  }, [checkIn, checkOut, roomType, preferences, adults, children]);

  const convertPrice = (price: number) => {
    return price * exchangeRates[currency].rate;
  };

  const formatPrice = (price: number) => {
    return `${exchangeRates[currency].symbol}${convertPrice(price).toFixed(2)}`;
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-slate-900">Price Summary</h3>
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
            <SelectItem value="GBP">GBP</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-slate-700">
          <span>Room ({calculations.nights} nights)</span>
          <span className="font-medium">{formatPrice(calculations.roomTotal)}</span>
        </div>

        {preferences.length > 0 && (
          <div className="flex justify-between text-slate-700">
            <span>Extras</span>
            <span className="font-medium">{formatPrice(calculations.preferencesTotal)}</span>
          </div>
        )}

        {children > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Child Discount</span>
            <span className="font-medium">-{formatPrice(calculations.childDiscount)}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-700">
          <span>Tax (10%)</span>
          <span className="font-medium">{formatPrice(calculations.tax)}</span>
        </div>
      </div>

      <div className="border-t pt-4 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-slate-900">Total</span>
          <span className="text-3xl font-bold text-blue-600">
            {formatPrice(calculations.total)}
          </span>
        </div>
        <p className="text-sm text-slate-500 mt-1">
          Per person: {formatPrice(calculations.total / (adults + children))}
        </p>
      </div>

      <Dialog open={showBreakdown} onOpenChange={setShowBreakdown}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <Info className="w-4 h-4 mr-2" />
            View Detailed Breakdown
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detailed Price Breakdown</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Accommodation</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Room Type:</span>
                  <span className="font-medium capitalize">{roomType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Rate per night:</span>
                  <span className="font-medium">{formatPrice(calculations.roomPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Number of nights:</span>
                  <span className="font-medium">{calculations.nights}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Subtotal:</span>
                  <span>{formatPrice(calculations.roomTotal)}</span>
                </div>
              </div>
            </div>

            {preferences.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Additional Services</h4>
                <div className="space-y-2 text-sm">
                  {preferences.map(pref => (
                    <div key={pref} className="flex justify-between">
                      <span className="text-slate-600 capitalize">
                        {pref.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="font-medium">
                        {formatPrice(preferencePrices[pref] || 0)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="font-semibold mb-2">Travelers</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Adults:</span>
                  <span className="font-medium">{adults}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Children:</span>
                  <span className="font-medium">{children}</span>
                </div>
                {children > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Child Discount:</span>
                    <span className="font-medium">-{formatPrice(calculations.childDiscount)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal:</span>
                  <span className="font-medium">{formatPrice(calculations.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tax (10%):</span>
                  <span className="font-medium">{formatPrice(calculations.tax)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600">{formatPrice(calculations.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
