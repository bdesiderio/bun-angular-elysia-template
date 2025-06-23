export interface Episode {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  youtubeUrl: string;
  duration: string;
  date: Date;
  views?: number;
} 