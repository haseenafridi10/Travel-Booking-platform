'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, MapPin, Calendar, Users } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Package {
  id: string;
  destination: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  maxPeople: number;
  highlights: string[];
}

const packages: Package[] = [
  {
    id: '1',
    destination: 'paris',
    title: 'Romantic Paris Escape',
    description: 'Experience the magic of Paris with visits to the Eiffel Tower, Louvre, and Seine River cruise',
    price: 1299,
    duration: '5 days',
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 234,
    category: 'Romantic',
    maxPeople: 2,
    highlights: ['Eiffel Tower Tour', 'Seine Cruise', 'Louvre Museum']
  },
  {
    id: '2',
    destination: 'tokyo',
    title: 'Tokyo Cultural Journey',
    description: 'Immerse yourself in Japanese culture, from ancient temples to modern tech districts',
    price: 1599,
    duration: '7 days',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 312,
    category: 'Cultural',
    maxPeople: 4,
    highlights: ['Mount Fuji', 'Tokyo Skytree', 'Traditional Tea Ceremony']
  },
  {
    id: '3',
    destination: 'bali',
    title: 'Bali Beach Paradise',
    description: 'Relax on pristine beaches, explore rice terraces, and visit ancient temples',
    price: 899,
    duration: '6 days',
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviews: 189,
    category: 'Beach',
    maxPeople: 6,
    highlights: ['Beach Resort', 'Tegalalang Rice Terrace', 'Tanah Lot Temple']
  },
  {
    id: '4',
    destination: 'newyork',
    title: 'New York City Explorer',
    description: 'Discover the Big Apple with iconic landmarks, Broadway shows, and world-class dining',
    price: 1499,
    duration: '5 days',
    image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    reviews: 267,
    category: 'City',
    maxPeople: 4,
    highlights: ['Statue of Liberty', 'Central Park', 'Broadway Show']
  },
  {
    id: '5',
    destination: 'dubai',
    title: 'Luxury Dubai Experience',
    description: 'Indulge in luxury with desert safaris, shopping, and world-class attractions',
    price: 1799,
    duration: '6 days',
    image: 'https://images.pexels.com/photos/1470405/pexels-photo-1470405.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 198,
    category: 'Luxury',
    maxPeople: 4,
    highlights: ['Burj Khalifa', 'Desert Safari', 'Dubai Mall']
  },
  {
    id: '6',
    destination: 'santorini',
    title: 'Santorini Sunset Retreat',
    description: 'Experience breathtaking sunsets, white-washed villages, and Mediterranean cuisine',
    price: 1399,
    duration: '5 days',
    image: 'https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 289,
    category: 'Romantic',
    maxPeople: 2,
    highlights: ['Oia Sunset', 'Wine Tasting', 'Caldera Cruise']
  },
  {
    id: '7',
    destination: 'bali',
    title: 'Bali Adventure Trek',
    description: 'Hiking, waterfalls, and jungle adventures in the heart of Bali',
    price: 799,
    duration: '4 days',
    image: 'https://images.pexels.com/photos/2474689/pexels-photo-2474689.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.5,
    reviews: 156,
    category: 'Adventure',
    maxPeople: 8,
    highlights: ['Mount Batur Sunrise', 'Waterfall Trek', 'Jungle Rafting']
  },
  {
    id: '8',
    destination: 'paris',
    title: 'Paris Food & Wine Tour',
    description: 'Savor the finest French cuisine and wines with expert local guides',
    price: 1099,
    duration: '4 days',
    image: 'https://images.pexels.com/photos/1850629/pexels-photo-1850629.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviews: 178,
    category: 'Culinary',
    maxPeople: 6,
    highlights: ['Wine Tasting', 'Cooking Class', 'Market Tour']
  },
];

interface PackageGalleryProps {
  selectedDestination: string | null;
  onBookPackage: () => void;
}

export default function PackageGallery({ selectedDestination, onBookPackage }: PackageGalleryProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'popularity'>('popularity');

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const filteredAndSortedPackages = useMemo(() => {
    let filtered = selectedDestination
      ? packages.filter(pkg => pkg.destination === selectedDestination)
      : packages;

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popularity':
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });
  }, [selectedDestination, sortBy]);

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
              Vacation Packages
            </h2>
            <p className="text-lg text-slate-600">
              {selectedDestination
                ? `Showing packages for your selected destination`
                : 'Explore our curated travel experiences'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600 font-medium">Sort by:</span>
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedPackages.map((pkg) => (
            <Card
              key={pkg.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button
                  onClick={() => toggleFavorite(pkg.id)}
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-200 hover:scale-110"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      favorites.has(pkg.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-slate-600'
                    }`}
                  />
                </button>
                <Badge className="absolute top-3 left-3 bg-blue-600 text-white">
                  {pkg.category}
                </Badge>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-sm">{pkg.rating}</span>
                  <span className="text-slate-500 text-xs">({pkg.reviews} reviews)</span>
                </div>

                <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-1">
                  {pkg.title}
                </h3>

                <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                  {pkg.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Calendar className="w-3 h-3" />
                    {pkg.duration}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Users className="w-3 h-3" />
                    Up to {pkg.maxPeople}
                  </div>
                </div>

                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-2xl font-bold text-blue-600">
                    ${pkg.price}
                  </span>
                  <span className="text-sm text-slate-500">per person</span>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={onBookPackage}
                >
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
