import { CommunityPost } from '../types';

export const initialCommunityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    authorName: 'Praise Wilson',
    authorAvatar: '/praise.jpg',
    authorRole: 'Student Disciple',
    category: 'Testimony',
    content: "During our recent secondary school visit following Saint Abraham Babatunde's teaching on Campus Evangelism, 14 students surrendered their lives to Christ at Christ's Girls School, Ado-Ekiti! Praise God for the power of the simple gospel message.",
    scriptureRef: 'Mark 16:15',
    timestamp: '2 hours ago',
    likes: 24,
    isLiked: false,
    commentsCount: 5,
    comments: [
      {
        id: 'c-1',
        authorName: 'David Omoyajowo',
        authorAvatar: '/david.jpg',
        content: 'Glory to God! The SSGI harvest is indeed continuing!',
        timestamp: '1 hour ago'
      },
      {
        id: 'c-2',
        authorName: 'Ifeoluwa Olusegun',
        authorAvatar: '/ifeoluwa.png',
        content: 'Amen! This is kingdom multiplication in action.',
        timestamp: '45 mins ago'
      }
    ]
  },
  {
    id: 'post-2',
    authorName: 'David Omoyajowo',
    authorAvatar: '/david.jpg',
    authorRole: 'Student Disciple',
    category: 'Insight',
    content: 'Meditating on Acts 19:9 today: Paul did not just host large rallies; he discipled men daily in Tyrannus. True territorial impact requires daily consistency, not just occasional spiritual high points.',
    scriptureRef: 'Acts 19:9-10',
    timestamp: 'Yesterday',
    likes: 18,
    isLiked: true,
    commentsCount: 2,
    comments: [
      {
        id: 'c-3',
        authorName: 'Praise Wilson',
        authorAvatar: '/praise.jpg',
        content: 'So deep David! Daily devotion builds unshakeable character.',
        timestamp: '18 hours ago'
      }
    ]
  },
  {
    id: 'post-3',
    authorName: 'Saint Abraham Babatunde',
    authorAvatar: '/AB.jpg',
    authorRole: 'Convener & Pastor',
    category: 'Encouragement',
    content: 'Beloved School of Tyrannus disciples, remember that your private prayer altar determines your public spiritual weight. Never trade depth for noise. Keep growing in secret before God.',
    scriptureRef: 'Matthew 6:6',
    timestamp: '2 days ago',
    likes: 56,
    isLiked: true,
    commentsCount: 9,
  }
];
