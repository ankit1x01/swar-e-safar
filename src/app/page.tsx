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
          <p className="text-2xl md:text-3xl subtitle-gradient font-light mb-6">
            Your Musical Journey Through Lyrics
          </p>

          {/* Shifoyage Description */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="glass rounded-2xl p-8 backdrop-blur-md border border-white/20">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{fontFamily: 'Playfair Display, serif'}}>
                Shifoyage
              </h2>
              <div className="space-y-3 text-gray-200 leading-relaxed">
                <p className="text-lg md:text-xl font-light italic">
                  &ldquo;Healing isn&apos;t a destination — it&apos;s a journey.&rdquo;
                </p>
                <p className="text-base md:text-lg">
                  A journey within. A voyage toward wholeness.
                </p>
                <p className="text-base md:text-lg">
                  Shifoyage blends <span className="text-indigo-300 font-semibold">&lsquo;Shifa&rsquo;</span> (healing) and <span className="text-purple-300 font-semibold">&lsquo;Voyage&rsquo;</span> (journey) —
                </p>
                <p className="text-base md:text-lg">
                  inviting you into spaces where transformation happens gently, soulfully, and together.
                </p>
              </div>
            </div>
          </div>

          <div className="w-32 h-1 bg-gradient-to-r from-indigo-400 to-pink-400 mx-auto rounded-full mb-6"></div>

          {/* Social Links */}
          <div className="flex justify-center items-center space-x-6">
            <a
              href="https://www.instagram.com/shifoyage/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-hover rounded-full p-3 group transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6 text-white group-hover:text-pink-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <a
              href="https://share.google/8gxbhPHyz1AdjfCln"
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-hover rounded-full p-3 group transition-all duration-300 hover:scale-110"
              title="Rate us on Google"
            >
              <svg className="w-6 h-6 text-white group-hover:text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </a>
          </div>
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

        {/* Footer */}
        <footer className="mt-20 border-t border-white/10 pt-12">
          <div className="text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Swar-e-Safar</h3>
              <p className="text-gray-300 text-lg mb-6">Your Musical Journey Through Lyrics</p>

              {/* Social Links */}
              <div className="flex justify-center items-center space-x-6 mb-6">
                <a
                  href="https://www.instagram.com/shifoyage/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glass-hover rounded-full p-3 group transition-all duration-300 hover:scale-110"
                  aria-label="Follow us on Instagram"
                >
                  <svg className="w-6 h-6 text-white group-hover:text-pink-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                <a
                  href="https://share.google/8gxbhPHyz1AdjfCln"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glass-hover rounded-full p-3 group transition-all duration-300 hover:scale-110"
                  aria-label="Rate us on Google"
                >
                  <svg className="w-6 h-6 text-white group-hover:text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </a>
              </div>

              {/* Rate Us Text */}
              <a
                href="https://share.google/8gxbhPHyz1AdjfCln"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block glass glass-hover rounded-full px-6 py-3 text-white hover:text-yellow-300 transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-300">⭐⭐⭐⭐⭐</span>
                  </div>
                  <span className="font-medium">Rate Us on Google</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </div>

            <div className="text-gray-400 text-sm">
              <p>&copy; 2025 Swar-e-Safar. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}