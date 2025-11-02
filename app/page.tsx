'use client';

import { useState } from 'react';
import Hero from '@/components/travel/Hero';
import DestinationMap from '@/components/travel/DestinationMap';
import PackageGallery from '@/components/travel/PackageGallery';
import BookingForm from '@/components/travel/BookingForm';
import ReviewSection from '@/components/travel/ReviewSection';

export default function Home() {
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Hero onBookNow={() => setShowBookingForm(true)} />

      <DestinationMap
        onDestinationSelect={(dest) => {
          setSelectedDestination(dest);
          window.scrollTo({ top: document.getElementById('packages')?.offsetTop || 0, behavior: 'smooth' });
        }}
      />

      <div id="packages">
        <PackageGallery
          selectedDestination={selectedDestination}
          onBookPackage={() => setShowBookingForm(true)}
        />
      </div>

      <ReviewSection />

      {showBookingForm && (
        <BookingForm
          onClose={() => setShowBookingForm(false)}
          preselectedDestination={selectedDestination}
        />
      )}
    </main>
  );
}
