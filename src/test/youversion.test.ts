import { describe, it, expect, vi, beforeEach } from 'vitest';
import { 
  getDayOfYear, 
  isLeapYear, 
  parseScriptureReference, 
  CANONICAL_BIBLE_BOOKS,
  DEFAULT_BIBLE_VERSIONS,
  YouVersionService
} from '../services/youversion';

describe('YouVersion Service & Scripture Utilities', () => {

  describe('1. Leap Year & Day of Year Calculations', () => {
    it('accurately identifies leap years', () => {
      expect(isLeapYear(2024)).toBe(true); // Leap
      expect(isLeapYear(2020)).toBe(true); // Leap
      expect(isLeapYear(2000)).toBe(true); // 400 year rule
      expect(isLeapYear(2025)).toBe(false); // Non-leap
      expect(isLeapYear(2026)).toBe(false); // Non-leap
      expect(isLeapYear(1900)).toBe(false); // 100 year rule
    });

    it('calculates Jan 1 as day 1', () => {
      const jan1 = new Date(2026, 0, 1);
      expect(getDayOfYear(jan1)).toBe(1);
    });

    it('calculates Dec 31 in a standard non-leap year as day 365', () => {
      const dec31_2025 = new Date(2025, 11, 31);
      expect(getDayOfYear(dec31_2025)).toBe(365);
    });

    it('calculates Dec 31 in a leap year as day 366', () => {
      const dec31_2024 = new Date(2024, 11, 31);
      expect(getDayOfYear(dec31_2024)).toBe(366);
    });

    it('calculates Feb 28 as day 59 and Feb 29 (leap) as day 60', () => {
      const feb28_2024 = new Date(2024, 1, 28);
      const feb29_2024 = new Date(2024, 1, 29);
      expect(getDayOfYear(feb28_2024)).toBe(59);
      expect(getDayOfYear(feb29_2024)).toBe(60);
    });
  });

  describe('2. Scripture Reference Parser', () => {
    it('parses USFM dot format (e.g. JHN.3.16)', () => {
      const parsed = parseScriptureReference('JHN.3.16');
      expect(parsed.usfm).toBe('JHN');
      expect(parsed.bookName).toBe('John');
      expect(parsed.chapter).toBe(3);
      expect(parsed.verse).toBe('16');
      expect(parsed.displayReference).toBe('John 3:16');
    });

    it('parses Joshua 1:9 correctly', () => {
      const parsed = parseScriptureReference('Joshua 1:9');
      expect(parsed.usfm).toBe('JOS');
      expect(parsed.bookName).toBe('Joshua');
      expect(parsed.chapter).toBe(1);
      expect(parsed.verse).toBe('9');
      expect(parsed.displayReference).toBe('Joshua 1:9');
    });

    it('parses Roman 12:1-2 correctly', () => {
      const parsed = parseScriptureReference('Romans 12:1-2');
      expect(parsed.usfm).toBe('ROM');
      expect(parsed.bookName).toBe('Romans');
      expect(parsed.chapter).toBe(12);
      expect(parsed.verse).toBe('1-2');
    });

    it('parses book without verse (e.g. Psalm 23)', () => {
      const parsed = parseScriptureReference('Psalms 23');
      expect(parsed.usfm).toBe('PSA');
      expect(parsed.bookName).toBe('Psalms');
      expect(parsed.chapter).toBe(23);
      expect(parsed.displayReference).toBe('Psalms 23');
    });
  });

  describe('3. Canonical Books Dictionary', () => {
    it('contains all 66 canonical books (39 OT, 27 NT)', () => {
      expect(CANONICAL_BIBLE_BOOKS.length).toBe(66);
      const otBooks = CANONICAL_BIBLE_BOOKS.filter(b => b.testament === 'OT');
      const ntBooks = CANONICAL_BIBLE_BOOKS.filter(b => b.testament === 'NT');
      expect(otBooks.length).toBe(39);
      expect(ntBooks.length).toBe(27);
    });

    it('has valid chapter counts for landmark books', () => {
      const genesis = CANONICAL_BIBLE_BOOKS.find(b => b.id === 'GEN');
      const psalms = CANONICAL_BIBLE_BOOKS.find(b => b.id === 'PSA');
      const john = CANONICAL_BIBLE_BOOKS.find(b => b.id === 'JHN');
      const revelation = CANONICAL_BIBLE_BOOKS.find(b => b.id === 'REV');

      expect(genesis?.chaptersCount).toBe(50);
      expect(psalms?.chaptersCount).toBe(150);
      expect(john?.chaptersCount).toBe(21);
      expect(revelation?.chaptersCount).toBe(22);
    });
  });

  describe('4. YouVersion Service Layer & Fallbacks', () => {
    it('returns Verse of the Day reliably', async () => {
      const votd = await YouVersionService.getVerseOfTheDay(1);
      expect(votd).toBeDefined();
      expect(votd.day).toBe(1);
      expect(votd.passage_id).toBeTruthy();
    });

    it('returns licensed Bible versions', async () => {
      const versions = await YouVersionService.getBibleVersions();
      expect(versions.length).toBeGreaterThanOrEqual(1);
      expect(versions.some(v => v.abbreviation === 'BSB' || v.abbreviation === 'NIV')).toBe(true);
    });

    it('retrieves chapter verses cleanly', async () => {
      const chapter = await YouVersionService.getBibleChapter('3034', 'JHN', 1);
      expect(chapter.book).toBe('John');
      expect(chapter.chapter).toBe(1);
      expect(chapter.verses.length).toBeGreaterThan(0);
      expect(chapter.verses[0].verse).toBe(1);
      expect(chapter.verses[0].text).toContain('beginning');
    });
  });

});
