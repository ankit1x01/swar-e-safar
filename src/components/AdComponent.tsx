'use client';

import { useState } from 'react';
import Image from 'next/image';

interface AdComponentProps {
  songId?: string;
}

export default function AdComponent({ songId }: AdComponentProps) {
  const [adClosed, setAdClosed] = useState(false);

  // Array of ad images
  const adImages = [
    { id: 1, src: '/1.jpeg', alt: 'Advertisement 1' },
    { id: 2, src: '/2.jpeg', alt: 'Advertisement 2' },
    { id: 3, src: '/3.jpeg', alt: 'Advertisement 3' },
    { id: 4, src: '/4.jpeg', alt: 'Advertisement 4' },
  ];

  // Calculate which ad to show based on song ID
  const getSongNumber = (songId?: string): number => {
    if (!songId) return 1;
    const match = songId.match(/song-(\d+)/);
    return match ? parseInt(match[1]) : 1;
  };

  const songNumber = getSongNumber(songId);
  const adIndex = (songNumber - 1) % adImages.length;
  const currentAd = adImages[adIndex];

  if (adClosed) {
    return null;
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mt-8">
      <div className="flex justify-between items-start mb-4">
        <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
          Sponsored Content
        </span>
        <button
          onClick={() => setAdClosed(true)}
          className="text-white hover:text-yellow-200 transition-colors"
          aria-label="Close advertisement"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="flex justify-center">
        <div className="relative group cursor-pointer max-w-md w-full">
          <div className="relative w-full h-64 rounded-lg overflow-hidden border border-white/10">
            <Image
              src={currentAd.src}
              alt={currentAd.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 400px"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-white/70 text-sm">
          Discover amazing offers - Click to learn more
        </p>
      </div>
    </div>
  );
}