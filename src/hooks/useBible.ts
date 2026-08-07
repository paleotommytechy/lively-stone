import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  YouVersionService, 
  YouVersionBible, 
  YouVersionBook, 
  YouVersionPassage, 
  DEFAULT_BIBLE_VERSIONS, 
  CANONICAL_BIBLE_BOOKS,
  getDayOfYear,
  parseScriptureReference
} from '../services/youversion';

const STORAGE_KEY_PREFERRED_BIBLE = 'ls_preferred_bible_version';
const STORAGE_KEY_LAST_READ_BOOK = 'ls_bible_last_read_book';
const STORAGE_KEY_LAST_READ_CHAPTER = 'ls_bible_last_read_chapter';

/**
 * Hook to fetch the official YouVersion Verse of the Day.
 * Cached for 12 hours.
 */
export const useVerseOfTheDay = (dayOfYear?: number) => {
  const currentDay = dayOfYear || getDayOfYear();

  return useQuery({
    queryKey: ['youversion_votd', currentDay],
    queryFn: async () => {
      return await YouVersionService.getVerseOfTheDay(currentDay);
    },
    staleTime: 1000 * 60 * 60 * 12, // 12 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: 2,
  });
};

/**
 * Hook to fetch available Bible versions.
 * Cached for 24 hours.
 */
export const useBibleVersions = (language = 'en') => {
  return useQuery<YouVersionBible[]>({
    queryKey: ['youversion_bibles', language],
    queryFn: async () => {
      return await YouVersionService.getBibleVersions(language);
    },
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 48,
    initialData: DEFAULT_BIBLE_VERSIONS,
  });
};

/**
 * Hook to fetch books for a specific Bible version.
 * Cached for 24 hours.
 */
export const useBibleBooks = (bibleId: string) => {
  return useQuery<YouVersionBook[]>({
    queryKey: ['youversion_books', bibleId],
    queryFn: async () => {
      return await YouVersionService.getBibleBooks(bibleId);
    },
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 48,
    initialData: CANONICAL_BIBLE_BOOKS,
  });
};

/**
 * Hook to fetch specific passage content.
 */
export const useBiblePassage = (bibleId: string, passageId: string, enabled = true) => {
  return useQuery<YouVersionPassage>({
    queryKey: ['youversion_passage', bibleId, passageId],
    queryFn: async () => {
      return await YouVersionService.getBiblePassage(bibleId, passageId);
    },
    enabled: enabled && !!bibleId && !!passageId,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 48,
    retry: 2,
  });
};

/**
 * Hook to fetch a full chapter.
 */
export const useBibleChapter = (bibleId: string, bookUsfm: string, chapter: number) => {
  return useQuery({
    queryKey: ['youversion_chapter', bibleId, bookUsfm, chapter],
    queryFn: async () => {
      return await YouVersionService.getBibleChapter(bibleId, bookUsfm, chapter);
    },
    enabled: !!bibleId && !!bookUsfm && chapter > 0,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 48,
  });
};

/**
 * Composite Hook: Daily Scripture on Student Overview.
 * Fetches Verse of the Day and resolves the scripture text in the student's preferred translation.
 */
export const useDailyScripture = () => {
  const [preferredBibleId, setPreferredBibleIdState] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_PREFERRED_BIBLE) || '3034'; // Default to BSB / NIV
  });

  const setPreferredBibleId = (id: string) => {
    setPreferredBibleIdState(id);
    localStorage.setItem(STORAGE_KEY_PREFERRED_BIBLE, id);
  };

  const { data: versions } = useBibleVersions();
  const dayOfYear = getDayOfYear();
  const { data: votd, isLoading: isVotdLoading, isError: isVotdError, error: votdError, refetch: refetchVotd } = useVerseOfTheDay(dayOfYear);

  const activePassageId = votd?.passage_id || 'JOS.1.9';
  const { 
    data: passage, 
    isLoading: isPassageLoading, 
    isError: isPassageError, 
    error: passageError,
    refetch: refetchPassage 
  } = useBiblePassage(preferredBibleId, activePassageId, !!activePassageId);

  const activeVersion = versions?.find(v => String(v.id) === String(preferredBibleId)) || DEFAULT_BIBLE_VERSIONS[0];
  const parsed = parseScriptureReference(activePassageId);

  const isLoading = isVotdLoading || isPassageLoading;
  const isError = isVotdError || isPassageError;
  const error = votdError || passageError;

  const refetch = async () => {
    await refetchVotd();
    await refetchPassage();
  };

  return {
    dayOfYear,
    passageId: activePassageId,
    reference: passage?.reference || parsed.displayReference,
    text: passage?.content || votd?.content || 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.',
    versionName: activeVersion.name,
    versionAbbreviation: activeVersion.abbreviation,
    copyright: passage?.copyright || activeVersion.copyright || 'YouVersion Platform',
    preferredBibleId,
    setPreferredBibleId,
    versions: versions || DEFAULT_BIBLE_VERSIONS,
    isLoading,
    isError,
    error,
    refetch,
    parsedReference: parsed,
  };
};

/**
 * Hook to persist & restore student's Bible reader position.
 */
export const useBibleReaderState = () => {
  const [selectedBibleId, setSelectedBibleId] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_PREFERRED_BIBLE) || '3034';
  });

  const [selectedBook, setSelectedBook] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_LAST_READ_BOOK) || 'JHN';
  });

  const [selectedChapter, setSelectedChapter] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LAST_READ_CHAPTER);
    return saved ? parseInt(saved, 10) : 1;
  });

  const updateBibleId = (id: string) => {
    setSelectedBibleId(id);
    localStorage.setItem(STORAGE_KEY_PREFERRED_BIBLE, id);
  };

  const updateBook = (usfm: string) => {
    setSelectedBook(usfm);
    setSelectedChapter(1);
    localStorage.setItem(STORAGE_KEY_LAST_READ_BOOK, usfm);
    localStorage.setItem(STORAGE_KEY_LAST_READ_CHAPTER, '1');
  };

  const updateChapter = (chapterNum: number) => {
    setSelectedChapter(chapterNum);
    localStorage.setItem(STORAGE_KEY_LAST_READ_CHAPTER, String(chapterNum));
  };

  return {
    selectedBibleId,
    selectedBook,
    selectedChapter,
    updateBibleId,
    updateBook,
    updateChapter,
  };
};
