import { AttendanceSession } from '../types';

export const initialAttendanceSessions: AttendanceSession[] = [
  {
    id: 'att-101',
    date: 'July 20, 2026',
    title: 'School of Tyrannus: Session 28',
    topic: 'The Pattern of Kingdom Multiplication',
    attended: true,
    notes: 'Punctual attendance. Actively took notes on Acts 19.'
  },
  {
    id: 'att-102',
    date: 'July 13, 2026',
    title: 'School of Tyrannus: Session 27',
    topic: 'Foundations of Living the Word',
    attended: true,
    notes: 'Participated in group discussion.'
  },
  {
    id: 'att-103',
    date: 'July 06, 2026',
    title: 'School of Tyrannus: Session 26',
    topic: 'Cultivating Spiritual Capacity',
    attended: true,
    notes: 'Engaged with questions desk.'
  },
  {
    id: 'att-104',
    date: 'June 29, 2026',
    title: 'School of Tyrannus: Session 25',
    topic: 'The Servant Leader & Campus Evangelism',
    attended: true,
    notes: 'Submitted session quiz.'
  },
  {
    id: 'att-105',
    date: 'June 22, 2026',
    title: 'School of Tyrannus: Session 24',
    topic: 'Understanding the Apostolic Mandate',
    attended: false,
    notes: 'Excused due to outreach preparation.'
  },
  {
    id: 'att-106',
    date: 'June 15, 2026',
    title: 'School of Tyrannus: Session 23',
    topic: 'The Secret Place & Intimacy with Christ',
    attended: true,
    notes: 'Punctual attendance.'
  }
];
