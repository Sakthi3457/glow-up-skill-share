
export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  location: string;
  profileImage?: string;
  skillsToTeach: string[];
  skillsToLearn: string[];
  availability: {
    days: string[];
    timeSlots: string[];
  };
  badges: Badge[];
  rating: number;
  reviews: Review[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Review {
  id: string;
  reviewerId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface MatchRequest {
  id: string;
  requesterId: string;
  recipientId: string;
  requesterTeachSkill: string;
  requesterLearnSkill: string;
  status: 'pending' | 'accepted' | 'rejected';
  message: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export const skillsList = [
  "JavaScript Programming",
  "Python Programming",
  "Yoga Instruction",
  "Cooking",
  "Photography",
  "Guitar Playing",
  "Digital Marketing",
  "Graphic Design",
  "French Language",
  "Spanish Language",
  "Public Speaking",
  "Writing",
  "Painting",
  "Dancing",
  "Meditation",
  "Financial Planning",
  "Gardening",
  "3D Modeling",
  "Video Editing",
  "Machine Learning",
  "Singing",
  "Knitting",
  "Woodworking",
];

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    bio: "Software developer with a passion for teaching coding skills and learning languages.",
    location: "San Francisco, CA",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    skillsToTeach: ["JavaScript Programming", "Python Programming"],
    skillsToLearn: ["Spanish Language", "Guitar Playing"],
    availability: {
      days: ["Monday", "Wednesday", "Friday"],
      timeSlots: ["Evening"]
    },
    badges: [
      {
        id: "b1",
        name: "Coding Guru",
        icon: "trophy",
        description: "Helped 10+ people learn programming"
      }
    ],
    rating: 4.8,
    reviews: []
  },
  {
    id: "2",
    name: "Sophia Martinez",
    email: "sophia@example.com",
    bio: "Bilingual teacher specializing in Spanish and French. Looking to improve my tech skills.",
    location: "New York, NY",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    skillsToTeach: ["Spanish Language", "French Language"],
    skillsToLearn: ["JavaScript Programming", "Digital Marketing"],
    availability: {
      days: ["Tuesday", "Thursday", "Saturday"],
      timeSlots: ["Morning", "Afternoon"]
    },
    badges: [
      {
        id: "b2",
        name: "Language Master",
        icon: "message-circle",
        description: "Proficient in teaching multiple languages"
      }
    ],
    rating: 4.9,
    reviews: []
  },
  {
    id: "3",
    name: "Marcus Lee",
    email: "marcus@example.com",
    bio: "Professional guitarist with 10 years of experience. Want to learn photography.",
    location: "Austin, TX",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    skillsToTeach: ["Guitar Playing"],
    skillsToLearn: ["Photography"],
    availability: {
      days: ["Monday", "Wednesday", "Sunday"],
      timeSlots: ["Evening"]
    },
    badges: [
      {
        id: "b3",
        name: "Music Maestro",
        icon: "music",
        description: "Expert-level musical teaching ability"
      }
    ],
    rating: 4.7,
    reviews: []
  }
];

export const mockConversations: Conversation[] = [
  {
    id: "c1",
    participants: ["1", "2"],
    lastMessage: "I'd love to schedule our first Spanish lesson. When are you free?",
    lastMessageTime: "2023-04-10T14:30:00Z",
    unreadCount: 1
  },
  {
    id: "c2",
    participants: ["1", "3"],
    lastMessage: "Thanks for the guitar lesson yesterday. I learned a lot!",
    lastMessageTime: "2023-04-09T19:15:00Z",
    unreadCount: 0
  }
];

export const mockMessages: Record<string, Message[]> = {
  "c1": [
    {
      id: "m1",
      senderId: "1",
      receiverId: "2",
      content: "Hi Sophia, I saw that you teach Spanish. I've been wanting to learn!",
      timestamp: "2023-04-10T14:20:00Z",
      read: true
    },
    {
      id: "m2",
      senderId: "2",
      receiverId: "1",
      content: "Hello Alex! Yes, I'd be happy to help you learn Spanish. I see you're a JavaScript developer - I've been trying to learn coding too!",
      timestamp: "2023-04-10T14:25:00Z",
      read: true
    },
    {
      id: "m3",
      senderId: "1",
      receiverId: "2",
      content: "I'd love to schedule our first Spanish lesson. When are you free?",
      timestamp: "2023-04-10T14:30:00Z",
      read: false
    }
  ],
  "c2": [
    {
      id: "m4",
      senderId: "3",
      receiverId: "1",
      content: "Hey Alex! I heard you're interested in learning guitar. I could teach you in exchange for some Python lessons?",
      timestamp: "2023-04-09T18:00:00Z",
      read: true
    },
    {
      id: "m5",
      senderId: "1",
      receiverId: "3",
      content: "That sounds perfect! When would you like to start?",
      timestamp: "2023-04-09T18:10:00Z",
      read: true
    },
    {
      id: "m6",
      senderId: "1",
      receiverId: "3",
      content: "Thanks for the guitar lesson yesterday. I learned a lot!",
      timestamp: "2023-04-09T19:15:00Z",
      read: true
    }
  ]
};

export const mockMatchRequests: MatchRequest[] = [
  {
    id: "r1",
    requesterId: "3",
    recipientId: "1",
    requesterTeachSkill: "Guitar Playing",
    requesterLearnSkill: "Python Programming",
    status: "accepted",
    message: "Would love to swap guitar lessons for Python programming!",
    createdAt: "2023-04-08T10:30:00Z"
  },
  {
    id: "r2",
    requesterId: "2",
    recipientId: "1",
    requesterTeachSkill: "Spanish Language",
    requesterLearnSkill: "JavaScript Programming",
    status: "pending",
    message: "I can help you with Spanish if you teach me JavaScript basics.",
    createdAt: "2023-04-10T09:45:00Z"
  }
];

// Mock current user (for development purposes)
export const currentUser: User = mockUsers[0];
