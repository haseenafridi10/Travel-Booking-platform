'use client';

import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Users } from 'lucide-react';

interface HeroProps {
  onBookNow: () => void;
}

export default function Hero({ onBookNow }: HeroProps) {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-cyan-900/60" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Discover Your Next Adventure
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
          Explore breathtaking destinations around the world
        </p>

        <div className="flex flex-wrap gap-6 justify-center mb-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-medium">100+ Destinations</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-full">
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-medium">Flexible Dates</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full">
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">Group & Solo Travel</span>
          </div>
        </div>

        <Button
          size="lg"
          onClick={onBookNow}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-7 delay-500"
        >
          Start Your Journey
        </Button>
      </div>
    </section>
  );
}
