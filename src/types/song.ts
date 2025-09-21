export interface Song {
  id: string;
  title: string;
  artist: string;
  lyrics: string;
  album?: string;
  genre?: string;
  duration?: string;
}

export interface SongListProps {
  songs: Song[];
}

export interface SongDetailProps {
  song: Song;
}