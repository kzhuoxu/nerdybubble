
import { Book, User, BookClub, BookClubEvent, Highlight, Review, Comment } from '../types';

// Sample book content for demonstration
const loremIpsum = `
# Chapter 1: The Beginning

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## A New Journey

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

# Chapter 2: The Challenge

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.

Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.
`;

export const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Silent Echo',
    author: 'Eliza Montgomery',
    coverUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJvb2slMjBjb3ZlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    description: 'A captivating novel about a woman who discovers she can hear the thoughts of others, and how this ability transforms her life and relationships.',
    category: 'Fiction',
    rating: 4.5,
    pages: 342,
    readingTime: 420,
    publishedDate: '2023-07-15',
    content: loremIpsum,
    highlights: [],
    reviews: []
  },
  {
    id: '2',
    title: 'Quantum Horizons',
    author: 'Nathan Parker',
    coverUrl: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGJvb2slMjBjb3ZlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    description: 'An exploration of quantum mechanics and its implications for our understanding of reality, consciousness, and the future of technology.',
    category: 'Non-fiction',
    rating: 4.2,
    pages: 285,
    readingTime: 380,
    publishedDate: '2023-09-10',
    content: loremIpsum
  },
  {
    id: '3',
    title: 'Gardens of Memory',
    author: 'Sophia Chen',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGJvb2slMjBjb3ZlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    description: 'A moving memoir about family, immigration, and the gardens that helped a woman reconnect with her roots and heal from past traumas.',
    category: 'Memoir',
    rating: 4.7,
    pages: 320,
    readingTime: 410,
    publishedDate: '2023-01-22',
    content: loremIpsum
  },
  {
    id: '4',
    title: 'The Midnight Algorithm',
    author: 'Raj Patel',
    coverUrl: 'https://images.unsplash.com/photo-1603289851961-c99c4aaa6d93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGJvb2slMjBjb3ZlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    description: 'A techno-thriller about an AI system that starts making its own decisions, and the team of programmers racing to stop it before it's too late.',
    category: 'Thriller',
    rating: 4.1,
    pages: 375,
    readingTime: 450,
    publishedDate: '2023-06-08',
    content: loremIpsum
  },
  {
    id: '5',
    title: 'Whispers in the Forest',
    author: 'Lucas Rivera',
    coverUrl: 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGJvb2slMjBjb3ZlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    description: 'An enchanting fantasy novel set in a world where trees communicate with humans, and one young woman discovers she has the power to understand them all.',
    category: 'Fantasy',
    rating: 4.8,
    pages: 402,
    readingTime: 490,
    publishedDate: '2023-03-14',
    content: loremIpsum
  },
  {
    id: '6',
    title: 'The Art of Mindful Living',
    author: 'Emma Johnson',
    coverUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGJvb2slMjBjb3ZlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    description: 'A practical guide to incorporating mindfulness into everyday life, with exercises, reflections, and strategies for finding balance in a hectic world.',
    category: 'Self-help',
    rating: 4.3,
    pages: 230,
    readingTime: 300,
    publishedDate: '2023-05-20',
    content: loremIpsum
  }
];

// Create some highlights for the first book
export const MOCK_HIGHLIGHTS: Highlight[] = [
  {
    id: 'h1',
    bookId: '1',
    userId: 'u1',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    chapter: 1,
    position: 0,
    createdAt: '2023-10-05T14:48:00.000Z',
    likes: 12,
    comments: [
      {
        id: 'c1',
        highlightId: 'h1',
        userId: 'u2',
        text: 'This really resonated with me!',
        createdAt: '2023-10-05T15:30:00.000Z',
        likes: 3
      },
      {
        id: 'c2',
        highlightId: 'h1',
        userId: 'u3',
        text: 'I had a different interpretation of this passage.',
        createdAt: '2023-10-06T09:15:00.000Z',
        likes: 2
      }
    ],
    aiImage: 'https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aW1hZ2luYXRpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'h2',
    bookId: '1',
    userId: 'u4',
    text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    chapter: 2,
    position: 100,
    createdAt: '2023-10-10T18:22:00.000Z',
    likes: 8,
    comments: [],
    aiImage: 'https://images.unsplash.com/photo-1505816014357-96b5ff457e9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2luYXRpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  }
];

// Add the highlights to the first book
MOCK_BOOKS[0].highlights = MOCK_HIGHLIGHTS;

// Create some reviews for the first book
export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    bookId: '1',
    userId: 'u2',
    rating: 5,
    text: 'One of the best books I've read this year. The character development is outstanding and the plot kept me guessing until the very end.',
    createdAt: '2023-09-20T10:15:00.000Z',
    likes: 45
  },
  {
    id: 'r2',
    bookId: '1',
    userId: 'u5',
    rating: 4,
    text: 'A very enjoyable read with beautiful prose. My only criticism is that the ending felt a bit rushed.',
    createdAt: '2023-09-25T16:40:00.000Z',
    likes: 18
  }
];

// Add the reviews to the first book
MOCK_BOOKS[0].reviews = MOCK_REVIEWS;

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    bio: 'Book lover, coffee enthusiast, and aspiring writer.',
    friends: ['u2', 'u3', 'u4'],
    booksRead: 132,
    currentlyReading: [MOCK_BOOKS[0], MOCK_BOOKS[3]],
    bookshelf: [MOCK_BOOKS[1], MOCK_BOOKS[2], MOCK_BOOKS[4], MOCK_BOOKS[5]],
    readingGoal: 50,
    readingStreak: 15
  },
  {
    id: 'u2',
    name: 'Sarah Williams',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    bio: 'Sci-fi and fantasy fanatic. PhD in literature.',
    friends: ['u1', 'u5'],
    booksRead: 215,
    currentlyReading: [MOCK_BOOKS[4]],
    readingGoal: 75,
    readingStreak: 30
  },
  {
    id: 'u3',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    bio: 'Reading is my escape. Non-fiction and memoirs are my jam.',
    friends: ['u1', 'u4'],
    booksRead: 89,
    currentlyReading: [MOCK_BOOKS[2]],
    readingGoal: 40,
    readingStreak: 8
  },
  {
    id: 'u4',
    name: 'Jessica Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    bio: 'Book club organizer and literary fiction lover.',
    friends: ['u1', 'u3', 'u5'],
    booksRead: 167,
    currentlyReading: [MOCK_BOOKS[0], MOCK_BOOKS[5]],
    readingGoal: 60,
    readingStreak: 22
  },
  {
    id: 'u5',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    bio: 'Thriller and mystery enthusiast. Always looking for my next scare.',
    friends: ['u2', 'u4'],
    booksRead: 103,
    currentlyReading: [MOCK_BOOKS[3]],
    readingGoal: 45,
    readingStreak: 12
  }
];

export const MOCK_BOOK_CLUBS: BookClub[] = [
  {
    id: 'bc1',
    name: 'Mystery Lovers',
    bookId: '4',
    description: 'A club for those who enjoy mystery and thriller novels.',
    members: ['u1', 'u3', 'u5'],
    createdAt: '2023-01-15T12:00:00.000Z',
    schedule: [
      {
        id: 'bce1',
        bookClubId: 'bc1',
        title: 'Discussion: Chapters 1-5',
        date: '2023-10-25T19:00:00.000Z',
        description: 'Let\'s discuss the first five chapters of "The Midnight Algorithm".'
      },
      {
        id: 'bce2',
        bookClubId: 'bc1',
        title: 'Author Q&A Session',
        date: '2023-11-10T18:30:00.000Z',
        description: 'Special event: Q&A with Raj Patel.',
        meetingUrl: 'https://meet.example.com/mystery-lovers-qa'
      }
    ]
  },
  {
    id: 'bc2',
    name: 'Sci-Fi Explorers',
    bookId: '2',
    description: 'Exploring the vast universes of science fiction literature.',
    members: ['u2', 'u4', 'u5'],
    createdAt: '2023-03-22T14:30:00.000Z',
    schedule: [
      {
        id: 'bce3',
        bookClubId: 'bc2',
        title: 'Quantum Concepts Discussion',
        date: '2023-10-28T17:00:00.000Z',
        description: 'Deep dive into the quantum concepts presented in "Quantum Horizons".'
      }
    ]
  },
  {
    id: 'bc3',
    name: 'Literary Fiction Circle',
    bookId: '1',
    description: 'Appreciating the beauty and depth of literary fiction.',
    members: ['u1', 'u2', 'u3', 'u4'],
    createdAt: '2023-05-10T11:15:00.000Z',
    schedule: [
      {
        id: 'bce4',
        bookClubId: 'bc3',
        title: 'Character Analysis: Emily',
        date: '2023-10-30T19:30:00.000Z',
        description: 'Let\'s analyze the protagonist of "The Silent Echo".'
      },
      {
        id: 'bce5',
        bookClubId: 'bc3',
        title: 'Symbolism and Themes',
        date: '2023-11-15T19:30:00.000Z',
        description: 'Exploring the symbolism and central themes in "The Silent Echo".'
      }
    ]
  }
];

// Current user for demo purposes (matches u1 from MOCK_USERS)
export const CURRENT_USER = MOCK_USERS[0];
