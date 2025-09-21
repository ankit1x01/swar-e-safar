'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Song } from '@/types/song';
import { parseSongsCSV } from '@/utils/csvParser';

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songsData = await parseSongsCSV('/songs.csv');
        setSongs(songsData);
      } catch (err) {
        setError('Failed to load songs');
        console.error('Error loading songs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 title-gradient" style={{fontFamily: 'Playfair Display, serif'}}>
            Swar-e-Safar
          </h1>
          <p className="text-2xl md:text-3xl subtitle-gradient font-light mb-4">
            Your Musical Journey Through Lyrics
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-indigo-400 to-pink-400 mx-auto rounded-full"></div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="glass glass-hover rounded-2xl p-4">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search songs, artists, or albums..."
                className="flex-1 bg-transparent text-white placeholder-gray-300 outline-none text-lg"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center mb-12">
          <div className="glass rounded-xl p-6">
            <div className="flex items-center space-x-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white">{songs.length}</div>
                <div className="text-sm text-gray-300">Songs</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div>
                <div className="text-3xl font-bold text-white">{new Set(songs.map(s => s.artist)).size}</div>
                <div className="text-sm text-gray-300">Artists</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div>
                <div className="text-3xl font-bold text-white">{new Set(songs.map(s => s.genre)).size}</div>
                <div className="text-sm text-gray-300">Genres</div>
              </div>
            </div>
          </div>
        </div>

        {/* Songs Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {songs.map((song, index) => (
            <Link
              key={song.id}
              href={`/song/${song.id}`}
              className="block group"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="glass glass-hover rounded-2xl p-6 h-full relative overflow-hidden">
                {/* Card background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <pattern id={`pattern-${song.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="1" fill="currentColor"/>
                    </pattern>
                    <rect width="100" height="100" fill={`url(#pattern-${song.id})`}/>
                  </svg>
                </div>

                <div className="relative z-10">
                  {/* Music icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2 leading-tight">
                    {song.title}
                  </h3>
                  <p className="text-indigo-200 mb-4 line-clamp-1 font-medium">
                    {song.artist}
                  </p>

                  <div className="space-y-2">
                    {song.album && (
                      <p className="text-sm text-gray-300 line-clamp-1">
                        <span className="opacity-70">Album:</span> {song.album}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      {song.genre && (
                        <span className="inline-block bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-200 px-3 py-1 rounded-full text-xs border border-indigo-400/20">
                          {song.genre}
                        </span>
                      )}
                      {song.duration && (
                        <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full">
                          {song.duration}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {songs.length === 0 && (
          <div className="text-center mt-16">
            <div className="glass rounded-2xl p-12 max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">No Songs Yet</h3>
              <p className="text-gray-300">Start your musical journey by adding songs to your collection.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}