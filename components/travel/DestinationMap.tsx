'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  position: { top: string; left: string };
}

const destinations: Destination[] = [
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    description: 'The City of Light awaits with its iconic Eiffel Tower and rich culture',
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
    position: { top: '35%', left: '48%' }
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    description: 'Experience the perfect blend of tradition and modernity',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800',
    position: { top: '38%', left: '85%' }
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    description: 'Tropical paradise with stunning beaches and temples',
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800',
    position: { top: '62%', left: '78%' }
  },
  {
    id: 'newyork',
    name: 'New York',
    country: 'USA',
    description: 'The city that never sleeps, full of iconic landmarks',
    image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800',
    position: { top: '38%', left: '22%' }
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    description: 'Luxury and innovation in the heart of the desert',
    image: 'https://images.pexels.com/photos/1470405/pexels-photo-1470405.jpeg?auto=compress&cs=tinysrgb&w=800',
    position: { top: '42%', left: '60%' }
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    description: 'Whitewashed buildings overlooking the Aegean Sea',
    image: 'https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?auto=compress&cs=tinysrgb&w=800',
    position: { top: '40%', left: '54%' }
  },
];

interface DestinationMapProps {
  onDestinationSelect: (destination: string) => void;
}

export default function DestinationMap({ onDestinationSelect }: DestinationMapProps) {
  const [hoveredDest, setHoveredDest] = useState<Destination | null>(null);
  const [selectedDest, setSelectedDest] = useState<string | null>(null);

  const handleDestinationClick = (dest: Destination) => {
    setSelectedDest(dest.id);
    onDestinationSelect(dest.id);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Explore Popular Destinations
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Click on any destination to discover amazing vacation packages
          </p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto">
          <div
            className="relative w-full bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl shadow-2xl overflow-hidden"
            style={{ paddingBottom: '60%' }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{
                backgroundImage: 'url(https://images.pexels.com/photos/335393/pexels-photo-335393.jpeg?auto=compress&cs=tinysrgb&w=1920)',
              }}
            />

            {destinations.map((dest) => (
              <button
                key={dest.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                  selectedDest === dest.id ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                }`}
                style={{ top: dest.position.top, left: dest.position.left }}
                onMouseEnter={() => setHoveredDest(dest)}
                onMouseLeave={() => setHoveredDest(null)}
                onClick={() => handleDestinationClick(dest)}
              >
                <div className="relative">
                  <div className={`w-4 h-4 rounded-full ${
                    selectedDest === dest.id
                      ? 'bg-orange-500 animate-ping absolute'
                      : ''
                  }`} />
                  <MapPin
                    className={`w-8 h-8 ${
                      selectedDest === dest.id
                        ? 'text-orange-500 fill-orange-500'
                        : 'text-blue-600 fill-blue-600'
                    } drop-shadow-lg`}
                  />
                </div>
              </button>
            ))}

            {hoveredDest && (
              <Card className="absolute left-1/2 bottom-8 transform -translate-x-1/2 p-4 shadow-2xl z-30 animate-in fade-in slide-in-from-bottom-2 duration-200 max-w-sm">
                <div className="flex gap-4">
                  <img
                    src={hoveredDest.image}
                    alt={hoveredDest.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{hoveredDest.name}</h3>
                    <p className="text-sm text-slate-600 mb-1">{hoveredDest.country}</p>
                    <p className="text-xs text-slate-500">{hoveredDest.description}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
