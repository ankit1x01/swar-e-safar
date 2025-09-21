import Papa from 'papaparse';
import { Song } from '@/types/song';

// Helper function to assign genres based on artist
const getGenreByArtist = (artist: string): string => {
  const genreMap: { [key: string]: string } = {
    'Darsh': 'Romantic',
    'Utkarsh': 'Bollywood',
    'Ashish': 'Classical',
    'Sakshi': 'Pop',
    'Kuhoo/Sakshi': 'Pop',
    'Kuhoo': 'Pop',
    'Akash': 'Folk',
  };
  
  return genreMap[artist] || 'Bollywood';
};

export const parseSongsCSV = async (csvPath: string): Promise<Song[]> => {
  try {
    const response = await fetch(csvPath);
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          const songs: Song[] = (results.data as Record<string, string>[])
            .filter((row: Record<string, string>) => row.Song && row.Artist) // Filter out empty rows
            .map((row: Record<string, string>, index: number) => ({
              id: `song-${index + 1}`,
              title: row.Song || '',
              artist: row.Artist || '',
              lyrics: row.Lyrics || `[Lyrics for "${row.Song}" by ${row.Artist}]\n\nLyrics will be available soon.\nThis is a placeholder for the beautiful lyrics of this song.\n\nStay tuned for the complete lyrics experience!`,
              album: `Album ${Math.floor(index / 5) + 1}`, // Group songs into albums
              genre: getGenreByArtist(row.Artist || ''),
              duration: `${Math.floor(Math.random() * 3) + 3}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
            }));
          resolve(songs);
        },
        error: (error: Error) => {
          console.error('Error parsing CSV:', error);
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching CSV:', error);
    throw error;
  }
};

export const getSongById = async (id: string): Promise<Song | null> => {
  const songs = await parseSongsCSV('/songs.csv');
  return songs.find(song => song.id === id) || null;
};