
export interface MediaItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
  title: string;
  description: string;
  category?: string;  // Making category optional to maintain compatibility
}
