'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Song } from '@/types/song';
import { getSongById } from '@/utils/csvParser';
import AdComponent from '@/components/AdComponent';

export default function SongPage() {
  const params = useParams();
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const songId = params.id as string;
        const songData = await getSongById(songId);
        
        if (!songData) {
          setError('Song not found');
          return;
        }
        
        setSong(songData);
      } catch (err) {
        setError('Failed to load song');
        console.error('Error loading song:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchSong();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !song) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Song Not Found</h1>
          <p className="text-gray-300 mb-6">{error}</p>
          <Link 
            href="/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center glass glass-hover rounded-xl px-4 py-2 text-indigo-200 hover:text-white transition-all duration-300 group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Songs
          </Link>
        </div>

        {/* Song Header */}
        <div className="mb-12">
          <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <pattern id="music-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="0.5" fill="currentColor"/>
                    <path d="M5 15 Q10 10 15 15" stroke="currentColor" strokeWidth="0.3" fill="none"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#music-pattern)"/>
              </svg>
            </div>

            <div className="relative z-10">
              {/* Music note icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>

              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 title-gradient" style={{fontFamily: 'Playfair Display, serif'}}>
                  {song.title}
                </h1>
                <p className="text-2xl md:text-3xl subtitle-gradient font-light mb-6">
                  by {song.artist}
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  {song.album && (
                    <span className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 px-4 py-2 rounded-full text-sm border border-purple-400/20 backdrop-blur-sm">
                      <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      {song.album}
                    </span>
                  )}
                  {song.genre && (
                    <span className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-200 px-4 py-2 rounded-full text-sm border border-indigo-400/20 backdrop-blur-sm">
                      <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      {song.genre}
                    </span>
                  )}
                  {song.duration && (
                    <span className="bg-gradient-to-r from-pink-500/20 to-red-500/20 text-pink-200 px-4 py-2 rounded-full text-sm border border-pink-400/20 backdrop-blur-sm">
                      <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15V9l6 4-6 4z"/>
                      </svg>
                      {song.duration}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lyrics Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Section header */}
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white">Lyrics</h2>
            </div>

            {/* Lyrics content */}
            <div className="relative">
              <div className="prose prose-invert max-w-none">
                <div className="text-lg md:text-xl text-gray-100 leading-relaxed whitespace-pre-line font-light" style={{fontFamily: 'Inter, sans-serif', lineHeight: '1.8'}}>
                  {song.lyrics ? (
                    <div className="space-y-6">
                      {song.lyrics.split('\n\n').map((verse, index) => (
                        <div key={index} className="p-4 rounded-xl bg-white/5 border-l-4 border-gradient-to-b from-indigo-400 to-purple-400">
                          {verse}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-500/30 to-gray-600/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.691-2.471M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-300 mb-2">Lyrics Not Available</h3>
                      <p className="text-gray-400">Lyrics for this song are not currently available in our collection.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            <button className="glass glass-hover rounded-xl px-6 py-3 text-white font-medium transition-all duration-300 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Add to Favorites
            </button>
            <button className="glass glass-hover rounded-xl px-6 py-3 text-white font-medium transition-all duration-300 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Share
            </button>
            <button className="glass glass-hover rounded-xl px-6 py-3 text-white font-medium transition-all duration-300 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download
            </button>
          </div>
        </div>

        {/* Advertisement Section */}
        <AdComponent songId={song.id} />
      </div>
    </div>
  );
}