export interface Service {
  id: string;
  title: string;
  price: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  category: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
