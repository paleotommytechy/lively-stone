import { StudentProfile } from '../types';

export const currentStudent: StudentProfile = {
  id: 'std-771',
  name: 'Ifeoluwa Olusegun',
  email: 'ifeoluwa@livelystones.org',
  location: 'Ado-Ekiti, Nigeria',
  avatarUrl: '/ifeoluwa.png',
  currentPillar: 'Grow',
  progressPercentage: 68,
  weeklyStreak: 6,
  totalTeachingsCompleted: 14,
  quizzesCompleted: 12,
  assignmentsSubmitted: 10,
  attendanceRate: 92,
  joinDate: 'January 2026',
};

export const allStudentsList: StudentProfile[] = [
  currentStudent,
  {
    id: 'std-772',
    name: 'Praise Wilson',
    email: 'praise@livelystones.org',
    location: 'Ikere-Ekiti, Nigeria',
    avatarUrl: '/praise.jpg',
    currentPillar: 'Disciple',
    progressPercentage: 88,
    weeklyStreak: 12,
    totalTeachingsCompleted: 24,
    quizzesCompleted: 22,
    assignmentsSubmitted: 20,
    attendanceRate: 98,
    joinDate: 'November 2025',
  },
  {
    id: 'std-773',
    name: 'David Omoyajowo',
    email: 'david@livelystones.org',
    location: 'Oye-Ekiti, Nigeria',
    avatarUrl: '/david.jpg',
    currentPillar: 'Live',
    progressPercentage: 52,
    weeklyStreak: 4,
    totalTeachingsCompleted: 10,
    quizzesCompleted: 9,
    assignmentsSubmitted: 8,
    attendanceRate: 84,
    joinDate: 'February 2026',
  }
];
