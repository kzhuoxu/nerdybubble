
export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  category: string;
  rating: number;
  pages: number;
  readingTime: number;
  publishedDate: string;
  content?: string;
  highlights?: Highlight[];
  reviews?: Review[];
}

export interface Highlight {
  id: string;
  bookId: string;
  userId: string;
  text: string;
  chapter: number;
  position: number;
  createdAt: string;
  likes: number;
  comments?: Comment[];
  aiImage?: string;
}

export interface Comment {
  id: string;
  highlightId: string;
  userId: string;
  text: string;
  createdAt: string;
  likes: number;
}

export interface Review {
  id: string;
  bookId: string;
  userId: string;
  rating: number;
  text: string;
  createdAt: string;
  likes: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  friends: string[];
  booksRead: number;
  currentlyReading?: Book[];
  bookshelf?: Book[];
  readingGoal?: number;
  readingStreak?: number;
}

export interface BookClub {
  id: string;
  name: string;
  bookId: string;
  description: string;
  members: string[];
  createdAt: string;
  schedule: BookClubEvent[];
}

export interface BookClubEvent {
  id: string;
  bookClubId: string;
  title: string;
  date: string;
  description: string;
  meetingUrl?: string;
}

export type ReadingMode = 'focus' | 'explore';

export interface ReadingPreferences {
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
  theme: 'light' | 'dark' | 'sepia';
  margin: number;
}
