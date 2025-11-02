'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  avatar: string;
  destination: string;
  rating: number;
  date: string;
  title: string;
  excerpt: string;
  fullText: string;
}

const reviews: Review[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    destination: 'Paris, France',
    rating: 5,
    date: 'March 2024',
    title: 'Absolutely Magical Experience',
    excerpt: 'Our trip to Paris exceeded all expectations. The hotel was stunning, the tours were well-organized...',
    fullText: 'Our trip to Paris exceeded all expectations. The hotel was stunning, the tours were well-organized, and our guide was incredibly knowledgeable. We visited the Eiffel Tower at sunset, cruised down the Seine, and enjoyed authentic French cuisine. The booking process was seamless, and customer service was excellent throughout. Highly recommend this package to anyone planning a romantic getaway!'
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    destination: 'Tokyo, Japan',
    rating: 5,
    date: 'February 2024',
    title: 'Cultural Journey of a Lifetime',
    excerpt: 'Tokyo was incredible! From the ancient temples to the modern skyscrapers, every moment was...',
    fullText: 'Tokyo was incredible! From the ancient temples to the modern skyscrapers, every moment was memorable. Our package included a traditional tea ceremony, Mount Fuji day trip, and access to exclusive restaurants. The accommodations were luxurious and centrally located. Our tour coordinator went above and beyond to ensure we experienced authentic Japanese culture. This trip changed my perspective on travel.'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    destination: 'Bali, Indonesia',
    rating: 5,
    date: 'January 2024',
    title: 'Paradise Found',
    excerpt: 'Bali is truly a paradise on earth. The beaches were pristine, the people were welcoming...',
    fullText: 'Bali is truly a paradise on earth. The beaches were pristine, the people were welcoming, and the cultural experiences were enriching. We stayed at a beautiful resort with ocean views, visited ancient temples, and explored the rice terraces. The spa treatments were heavenly, and the local cuisine was delicious. This vacation was exactly what we needed to relax and reconnect with nature.'
  },
  {
    id: '4',
    name: 'David Thompson',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200',
    destination: 'Santorini, Greece',
    rating: 5,
    date: 'December 2023',
    title: 'Breathtaking Sunsets',
    excerpt: 'Santorini surpassed our wildest dreams. The white-washed buildings against the blue sea...',
    fullText: 'Santorini surpassed our wildest dreams. The white-washed buildings against the blue sea created the most stunning backdrop. We enjoyed wine tasting at local vineyards, sailing around the caldera, and watching the famous Oia sunset. Our honeymoon suite had a private pool and incredible views. The staff at every location were attentive and friendly. We are already planning our return trip!'
  },
  {
    id: '5',
    name: 'Lisa Park',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200',
    destination: 'Dubai, UAE',
    rating: 4,
    date: 'November 2023',
    title: 'Luxury at Its Finest',
    excerpt: 'Dubai is a city of superlatives. From the tallest building to the largest mall...',
    fullText: 'Dubai is a city of superlatives. From the tallest building to the largest mall, everything is designed to impress. We experienced the desert safari, visited the Burj Khalifa, and shopped at the Dubai Mall. The hotel was incredibly luxurious with world-class amenities. The only downside was it felt a bit rushed trying to see everything in 6 days. Overall, an unforgettable experience!'
  },
  {
    id: '6',
    name: 'James Wilson',
    avatar: 'https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=200',
    destination: 'New York, USA',
    rating: 5,
    date: 'October 2023',
    title: 'The Big Apple Delivered',
    excerpt: 'New York City is an experience unlike any other. The energy, the diversity, the attractions...',
    fullText: 'New York City is an experience unlike any other. The energy, the diversity, the attractions - everything exceeded expectations. We saw a Broadway show, visited the Statue of Liberty, explored Central Park, and ate at some amazing restaurants. The hotel location was perfect for accessing all major attractions. Our city guide provided insider tips that made the trip special. NYC truly never sleeps!'
  },
];

export default function ReviewSection() {
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());

  const toggleReview = (id: string) => {
    setExpandedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const loadMore = () => {
    setVisibleReviews(prev => Math.min(prev + 3, reviews.length));
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            What Our Travelers Say
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-lg font-semibold text-slate-700">4.9 out of 5</span>
            <span className="text-slate-500">({reviews.length} reviews)</span>
          </div>
          <p className="text-lg text-slate-600">
            Real experiences from real travelers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {reviews.slice(0, visibleReviews).map((review) => (
            <Card key={review.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{review.name}</h4>
                    <p className="text-sm text-slate-500">{review.destination}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-500">{review.date}</span>
                </div>

                <h5 className="font-semibold text-slate-900 mb-2">{review.title}</h5>

                <p className="text-sm text-slate-600 mb-3">
                  {expandedReviews.has(review.id) ? review.fullText : review.excerpt}
                </p>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleReview(review.id)}
                  className="text-blue-600 hover:text-blue-700 p-0 h-auto font-medium"
                >
                  {expandedReviews.has(review.id) ? (
                    <>
                      Show less <ChevronUp className="w-4 h-4 ml-1" />
                    </>
                  ) : (
                    <>
                      Read more <ChevronDown className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {visibleReviews < reviews.length && (
          <div className="text-center">
            <Button
              onClick={loadMore}
              size="lg"
              variant="outline"
              className="border-2 hover:bg-slate-50"
            >
              Load More Reviews
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
