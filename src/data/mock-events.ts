import { MinistryEvent } from '../types';

export const initialEvents: MinistryEvent[] = [
  {
    id: 'evt-2026-1',
    title: 'Lively Stones Annual Kingdom Convention 2026',
    type: 'Convention',
    date: 'November 18-22, 2026',
    time: '8:00 AM & 4:30 PM Daily',
    location: 'Main Auditorium, Lively Stones Network Center, Ado-Ekiti, Ekiti State',
    theme: 'Transformed Disciples: Taking the Nations for Christ',
    description: 'An apostolic gathering of disciples, ministers, youth, and leaders from across Nigeria. Experience intense prayer, clear teaching of the Word, prophetic impartation, and practical discipleship workshops.',
    speakers: ['Saint Abraham Babatunde', 'Guest Apostolic Ministers', 'School of Tyrannus Leadership Team'],
    bannerUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    registrationOpen: true,
    registeredCount: 1420
  },
  {
    id: 'evt-2026-2',
    title: 'School of Tyrannus Leaders & Disciple-Makers Retreat',
    type: 'Retreat',
    date: 'September 11-13, 2026',
    time: 'Residential Retreat',
    location: 'Quiet Streams Retreat Grounds, Ikogosi, Ekiti State',
    theme: 'Capacity for Multiplication: Deep Waters',
    description: 'A 3-day quiet retreat dedicated to prayer, fasting, personal consecrated alignment, and strategic planning for campus and secondary school invasions.',
    speakers: ['Saint Abraham Babatunde'],
    bannerUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    registrationOpen: true,
    registeredCount: 380
  }
];
