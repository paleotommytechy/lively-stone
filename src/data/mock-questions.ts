import { StudentQuestion } from '../types';

export const initialQuestions: StudentQuestion[] = [
  {
    id: 'qna-101',
    studentName: 'Ifeoluwa Olusegun',
    studentAvatar: '/ifeoluwa.png',
    question: 'How do we maintain a consistent daily secret place prayer life when faced with demanding academic schedules in university?',
    teachingTitle: 'Cultivating Spiritual Capacity for Kingdom Service',
    category: 'Spiritual Disciplines',
    timestamp: '3 days ago',
    isAnswered: true,
    answer: {
      answeredBy: 'Saint Abraham Babatunde',
      answerText: 'Spiritual discipline is not an extra task added to a busy day; it is the anchor of your day. Guard your early morning hours before digital distractions begin. Fixed time and fixed place produce sustainable consistency.',
      timestamp: '2 days ago'
    },
    likes: 31,
    isLiked: true,
    isFeatured: true
  },
  {
    id: 'qna-102',
    studentName: 'David Omoyajowo',
    studentAvatar: '/david.jpg',
    question: 'What is the biblical distinction between an evangelistic outreach and a true discipleship structure?',
    teachingTitle: 'The Pattern of Kingdom Multiplication',
    category: 'Discipleship & Apostolic Impact',
    timestamp: 'Yesterday',
    isAnswered: false,
    likes: 12,
    isLiked: false,
    isFeatured: false
  }
];
