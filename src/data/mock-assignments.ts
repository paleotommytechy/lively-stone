import { Assignment } from '../types';

export const initialAssignments: Assignment[] = [
  {
    id: 'a-101',
    teachingId: 't-101',
    title: 'Discipleship Accountability Partner Mapping',
    instructions: 'Identify 2 individuals in your immediate sphere of influence (fellow students, friends, or younger believers) whom you will commit to sharing weekly key takeaways from the School of Tyrannus. Write a short plan (200-300 words) on how you will meet weekly and pray together.',
    deadline: 'July 28, 2026',
    pillar: 'Disciple',
    submitted: true,
    submissionText: 'I have partnered with Brother Michael and Sister Praise. We scheduled a 30-minute weekly reflection call every Tuesday evening right after School of Tyrannus teaching. Our goal is to review key points, discuss practical application, and pray for high school students in our community.',
    submittedAt: 'July 22, 2026',
    status: 'graded',
    grade: 'A',
    feedback: 'Excellent work, Ifeoluwa! Your commitment to intentional multiplication is inspiring. Keep encouraging Michael and Praise.'
  },
  {
    id: 'a-102',
    teachingId: 't-102',
    title: 'Personal Word Obedience Audit',
    instructions: 'Select one specific area of daily life (e.g. speech, speech integrity, time stewardship, or forgiveness) where you have noticed a gap between hearing God’s Word and doing it. Document a 3-step action plan to yield to the Holy Spirit in that area this week.',
    deadline: 'August 02, 2026',
    pillar: 'Live',
    submitted: false,
    status: 'pending'
  },
  {
    id: 'a-103',
    teachingId: 't-103',
    title: 'Secret Place Prayer Log & Scripture Memory',
    instructions: 'Log 5 consecutive days of 45-minute secret prayer and memorize Matthew 6:6 and Acts 19:9-10. Submit a summary reflection on how quiet time deepened your spiritual awareness.',
    deadline: 'August 09, 2026',
    pillar: 'Grow',
    submitted: false,
    status: 'pending'
  }
];
