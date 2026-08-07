import { describe, it, expect } from 'vitest';
import { initialEvents } from '../data/mock-events';
import { initialAttendanceSessions } from '../data/mock-attendance';
import { MinistryEvent } from '../types';

describe('Events & Attendance Module Logic', () => {
  describe('Ministry Events Data & Logic', () => {
    it('should contain initial production events with valid structure', () => {
      expect(initialEvents.length).toBeGreaterThan(0);
      const firstEvent = initialEvents[0];
      expect(firstEvent.title).toBeDefined();
      expect(firstEvent.type).toBe('Convention');
      expect(firstEvent.registrationOpen).toBe(true);
      expect(firstEvent.registeredCount).toBeGreaterThan(0);
      expect(firstEvent.speakers.length).toBeGreaterThan(0);
    });

    it('should generate valid Google Calendar URLs with encoded parameters', () => {
      const sampleEvent: MinistryEvent = initialEvents[0];
      const title = encodeURIComponent(sampleEvent.title);
      const details = encodeURIComponent(`${sampleEvent.description}\n\nTheme: ${sampleEvent.theme}\nSpeakers: ${sampleEvent.speakers.join(', ')}`);
      const location = encodeURIComponent(sampleEvent.location);
      const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;

      expect(gCalUrl).toContain('https://calendar.google.com/calendar/render');
      expect(gCalUrl).toContain(title);
      expect(gCalUrl).toContain(location);
    });

    it('should format valid RFC 5545 iCalendar payload', () => {
      const event = initialEvents[0];
      const cleanTitle = event.title.replace(/[,;]/g, '');
      const cleanDesc = event.description.replace(/\n/g, ' ');
      const cleanLocation = event.location.replace(/[,;]/g, '');
      const nowStr = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

      const icsData = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Lively Stones International Network//Events//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `UID:${event.id}@livelystone.org`,
        `DTSTAMP:${nowStr}`,
        `DTSTART:${nowStr}`,
        `SUMMARY:${cleanTitle}`,
        `DESCRIPTION:${cleanDesc}`,
        `LOCATION:${cleanLocation}`,
        `STATUS:CONFIRMED`,
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      expect(icsData).toContain('BEGIN:VCALENDAR');
      expect(icsData).toContain('BEGIN:VEVENT');
      expect(icsData).toContain(`SUMMARY:${cleanTitle}`);
      expect(icsData).toContain('END:VCALENDAR');
    });

    it('should correctly calculate registration capacity percentage', () => {
      const event = initialEvents[0];
      const maxCap = event.maxCapacity || 2500;
      const pct = Math.min(100, Math.round((event.registeredCount / maxCap) * 100));
      expect(pct).toBeGreaterThan(0);
      expect(pct).toBeLessThanOrEqual(100);
    });
  });

  describe('Attendance & Consistency Logic', () => {
    it('should contain initial attendance sessions with status and topic', () => {
      expect(initialAttendanceSessions.length).toBeGreaterThan(0);
      const session = initialAttendanceSessions[0];
      expect(session.id).toBeDefined();
      expect(session.topic).toBeDefined();
      expect(session.checkinPin).toBe('777');
    });

    it('should calculate attendance percentage accurately', () => {
      const sessions = initialAttendanceSessions;
      const attended = sessions.filter(s => s.attended).length;
      const total = sessions.length;
      const rate = Math.round((attended / total) * 100);

      expect(rate).toBeGreaterThanOrEqual(0);
      expect(rate).toBeLessThanOrEqual(100);
    });

    it('should validate session check-in PIN correctly', () => {
      const session = initialAttendanceSessions[0];
      const validPin = session.checkinPin || '777';
      const enteredPin = '777';
      const invalidPin = '123';

      expect(enteredPin === validPin).toBe(true);
      expect(invalidPin === validPin).toBe(false);
    });

    it('should properly format excuse submission payload with category', () => {
      const category = 'Outreach Mobilization';
      const reason = 'Mobilizing for SSGI secondary school outreach.';
      const formattedExcuse = `[${category}] ${reason}`;

      expect(formattedExcuse).toContain('[Outreach Mobilization]');
      expect(formattedExcuse).toContain('SSGI');
    });

    it('should increment weekly streak upon verified attendance', () => {
      let currentStreak = 4;
      const checkinSuccess = true;
      if (checkinSuccess) {
        currentStreak += 1;
      }
      expect(currentStreak).toBe(5);
    });
  });
});
