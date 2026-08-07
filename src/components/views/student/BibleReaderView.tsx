import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';
import { 
  useBibleVersions, 
  useBibleBooks, 
  useBibleChapter, 
  useBibleReaderState 
} from '../../../hooks/useBible';
import { 
  CANONICAL_BIBLE_BOOKS, 
  DEFAULT_BIBLE_VERSIONS,
  parseScriptureReference 
} from '../../../services/youversion';
import { 
  BookOpen, 
  Bookmark, 
  Highlighter, 
  FileEdit, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles, 
  Search,
  Share2,
  Flame,
  Layers,
  Check,
  X,
  Copy,
  ChevronDown
} from 'lucide-react';

interface VerseHighlight {
  id: string;
  bookUsfm: string;
  chapter: number;
  verse: number;
  category: 'Promise' | 'Command' | 'Prayer' | 'Wisdom' | 'Faith' | 'Love' | 'Hope' | 'Personal';
  color: string;
}

interface VerseNote {
  id: string;
  bookUsfm: string;
  chapter: number;
  verse: number;
  noteText: string;
  date: string;
}

export const BibleReaderView: React.FC = () => {
  const { showToast } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const { 
    selectedBibleId, 
    selectedBook: currentBookUsfm, 
    selectedChapter: currentChapter,
    updateBibleId,
    updateBook,
    updateChapter
  } = useBibleReaderState();

  const [fontSize, setFontSize] = useState<number>(18);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState<boolean>(false);
  const [isChapterModalOpen, setIsChapterModalOpen] = useState<boolean>(false);
  const [bookSearchQuery, setBookSearchQuery] = useState<string>('');
  const [testamentFilter, setTestamentFilter] = useState<'ALL' | 'OT' | 'NT'>('ALL');

  // Highlights, notes, bookmarks state with local persistence
  const [highlights, setHighlights] = useState<VerseHighlight[]>(() => {
    const saved = localStorage.getItem('ls_bible_highlights');
    return saved ? JSON.parse(saved) : [
      { id: 'h-1', bookUsfm: 'JHN', chapter: 1, verse: 1, category: 'Promise', color: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' },
      { id: 'h-2', bookUsfm: 'JHN', chapter: 1, verse: 12, category: 'Faith', color: 'bg-amber-500/20 text-amber-800 dark:text-amber-300' }
    ];
  });

  const [notes, setNotes] = useState<VerseNote[]>(() => {
    const saved = localStorage.getItem('ls_bible_notes');
    return saved ? JSON.parse(saved) : [
      { id: 'n-1', bookUsfm: 'JHN', chapter: 1, verse: 14, noteText: 'The incarnation of Christ is the cornerstone of apostolic grace.', date: 'Today' }
    ];
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('ls_bible_bookmarks');
    return saved ? JSON.parse(saved) : ['JHN.1.1', 'JHN.1.12', 'JOS.1.9'];
  });

  const [newNoteInput, setNewNoteInput] = useState<string>('');

  // ----------------------------------------------------
  // React Query YouVersion Data Hooks
  // ----------------------------------------------------
  const { data: bibleVersions } = useBibleVersions();
  const { data: bibleBooks } = useBibleBooks(selectedBibleId);
  const { data: chapterData, isLoading: isChapterLoading } = useBibleChapter(
    selectedBibleId, 
    currentBookUsfm, 
    currentChapter
  );

  // Sync with URL query parameters if present (e.g. ?book=JOS&chapter=1&verse=9)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const bookParam = params.get('book');
    const chapterParam = params.get('chapter');
    const verseParam = params.get('verse');

    if (bookParam) {
      const parsed = parseScriptureReference(bookParam);
      updateBook(parsed.usfm);
    }
    if (chapterParam) {
      const chNum = parseInt(chapterParam, 10);
      if (!isNaN(chNum) && chNum > 0) {
        updateChapter(chNum);
      }
    }
    if (verseParam) {
      const vNum = parseInt(verseParam, 10);
      if (!isNaN(vNum)) {
        setSelectedVerse(vNum);
      }
    }
  }, [location.search]);

  // Persist highlights, notes, bookmarks
  useEffect(() => {
    localStorage.setItem('ls_bible_highlights', JSON.stringify(highlights));
  }, [highlights]);

  useEffect(() => {
    localStorage.setItem('ls_bible_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('ls_bible_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Active book metadata
  const currentBookObj = useMemo(() => {
    return CANONICAL_BIBLE_BOOKS.find(b => b.id === currentBookUsfm.toUpperCase()) || CANONICAL_BIBLE_BOOKS[42]; // Default to John
  }, [currentBookUsfm]);

  const activeVersionObj = useMemo(() => {
    return bibleVersions?.find(v => String(v.id) === String(selectedBibleId)) || DEFAULT_BIBLE_VERSIONS[0];
  }, [bibleVersions, selectedBibleId]);

  // Filtered books list for book modal
  const filteredBooks = useMemo(() => {
    let list = CANONICAL_BIBLE_BOOKS;
    if (testamentFilter !== 'ALL') {
      list = list.filter(b => b.testament === testamentFilter);
    }
    if (bookSearchQuery.trim()) {
      const q = bookSearchQuery.toLowerCase();
      list = list.filter(b => b.name.toLowerCase().includes(q) || b.id.toLowerCase().includes(q));
    }
    return list;
  }, [testamentFilter, bookSearchQuery]);

  // ----------------------------------------------------
  // Actions
  // ----------------------------------------------------
  const handleSelectBook = (bookUsfm: string) => {
    updateBook(bookUsfm);
    setIsBookModalOpen(false);
    setSelectedVerse(null);
    setBookSearchQuery('');
  };

  const handleSelectChapter = (ch: number) => {
    updateChapter(ch);
    setIsChapterModalOpen(false);
    setSelectedVerse(null);
  };

  const handleNextChapter = () => {
    if (currentChapter < currentBookObj.chaptersCount) {
      updateChapter(currentChapter + 1);
    } else {
      // Advance to next book
      const currentIdx = CANONICAL_BIBLE_BOOKS.findIndex(b => b.id === currentBookObj.id);
      if (currentIdx < CANONICAL_BIBLE_BOOKS.length - 1) {
        const nextBook = CANONICAL_BIBLE_BOOKS[currentIdx + 1];
        updateBook(nextBook.id);
        showToast('Next Book', `Opened ${nextBook.name} Chapter 1`);
      } else {
        showToast('End of Scripture', 'You have reached the end of the Holy Scriptures.');
      }
    }
    setSelectedVerse(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousChapter = () => {
    if (currentChapter > 1) {
      updateChapter(currentChapter - 1);
    } else {
      // Go to previous book's last chapter
      const currentIdx = CANONICAL_BIBLE_BOOKS.findIndex(b => b.id === currentBookObj.id);
      if (currentIdx > 0) {
        const prevBook = CANONICAL_BIBLE_BOOKS[currentIdx - 1];
        updateBook(prevBook.id);
        updateChapter(prevBook.chaptersCount);
        showToast('Previous Book', `Opened ${prevBook.name} Chapter ${prevBook.chaptersCount}`);
      }
    }
    setSelectedVerse(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddHighlight = (category: VerseHighlight['category'], colorClass: string) => {
    if (selectedVerse === null) return;
    const newH: VerseHighlight = {
      id: `h-${Date.now()}`,
      bookUsfm: currentBookObj.id,
      chapter: currentChapter,
      verse: selectedVerse,
      category,
      color: colorClass
    };
    setHighlights(prev => [
      ...prev.filter(h => !(h.bookUsfm === currentBookObj.id && h.chapter === currentChapter && h.verse === selectedVerse)), 
      newH
    ]);
    showToast('Verse Highlighted', `Highlighted ${currentBookObj.name} ${currentChapter}:${selectedVerse} under "${category}".`);
  };

  const handleToggleBookmark = (verseNum: number) => {
    const refKey = `${currentBookObj.id}.${currentChapter}.${verseNum}`;
    const displayRef = `${currentBookObj.name} ${currentChapter}:${verseNum}`;
    if (bookmarks.includes(refKey)) {
      setBookmarks(prev => prev.filter(b => b !== refKey));
      showToast('Bookmark Removed', `Removed ${displayRef} from your Bible bookmarks.`);
    } else {
      setBookmarks(prev => [...prev, refKey]);
      showToast('Bookmark Added', `Saved ${displayRef} to your Bible bookmarks.`);
    }
  };

  const handleSaveNote = () => {
    if (selectedVerse === null || !newNoteInput.trim()) return;
    const newN: VerseNote = {
      id: `n-${Date.now()}`,
      bookUsfm: currentBookObj.id,
      chapter: currentChapter,
      verse: selectedVerse,
      noteText: newNoteInput.trim(),
      date: 'Today'
    };
    setNotes(prev => [...prev, newN]);
    setNewNoteInput('');
    showToast('Note Saved', `Personal note saved for ${currentBookObj.name} ${currentChapter}:${selectedVerse}.`);
  };

  const handleCopyVerse = (verseNum: number, verseText: string) => {
    const formatted = `"${verseText}" — ${currentBookObj.name} ${currentChapter}:${verseNum} (${activeVersionObj.abbreviation})`;
    navigator.clipboard.writeText(formatted);
    showToast('Verse Copied', `"${currentBookObj.name} ${currentChapter}:${verseNum}" copied to clipboard.`);
  };

  const versesList = chapterData?.verses || [];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 animate-ios-fade-in text-slate-900 dark:text-slate-100 font-sans">
      
      {/* ---------------------------------------------------- */}
      {/* 1. STICKY / TOP BIBLE CONTROLS BAR                   */}
      {/* ---------------------------------------------------- */}
      <div className="sticky top-16 z-10 p-4 sm:p-5 rounded-3xl bg-white/90 dark:bg-forest-950/90 backdrop-blur-xl border border-slate-200 dark:border-forest-800 shadow-xl transition-all">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Book & Chapter Jump Selector Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsBookModalOpen(true)}
              className="px-4 py-2 rounded-2xl bg-forest-800 hover:bg-forest-700 text-gold-400 font-extrabold text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
              title="Select Bible Book"
              aria-label="Select Bible Book"
            >
              <BookOpen className="w-4 h-4 text-gold-400" />
              <span>{currentBookObj.name}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-80" />
            </button>

            <button
              onClick={() => setIsChapterModalOpen(true)}
              className="px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-forest-900 hover:bg-slate-200 dark:hover:bg-forest-800 text-slate-900 dark:text-white font-extrabold text-sm flex items-center gap-1.5 transition-all border border-slate-200 dark:border-forest-700 active:scale-95"
              title="Select Chapter"
              aria-label="Select Chapter"
            >
              <span>Chapter {currentChapter}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            <span className="hidden md:inline-flex text-[11px] font-mono text-slate-500 dark:text-forest-300 font-semibold pl-1">
              {currentBookObj.testament === 'OT' ? 'Old Testament' : 'New Testament'} • {currentBookObj.chaptersCount} Chapters
            </span>
          </div>

          {/* Translation Picker & Reader Display Settings */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            
            {/* Translation Dropdown */}
            <select
              value={selectedBibleId}
              onChange={(e) => updateBibleId(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-300 dark:border-forest-700 text-xs font-bold text-slate-900 dark:text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-400"
              aria-label="Select Bible translation"
            >
              {(bibleVersions || DEFAULT_BIBLE_VERSIONS).map(v => (
                <option key={v.id} value={v.id}>
                  {v.abbreviation} ({v.name})
                </option>
              ))}
            </select>

            {/* Font Size Adjuster Controls */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-forest-900 p-1 rounded-xl border border-slate-300 dark:border-forest-700">
              <button 
                onClick={() => setFontSize(prev => Math.max(14, prev - 2))} 
                className="px-2 py-1 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-forest-800 rounded-lg transition-colors"
                title="Decrease Reading Font Size"
                aria-label="Decrease Font Size"
              >
                A-
              </button>
              <span className="text-[11px] font-mono font-bold px-1 text-slate-600 dark:text-gold-400">
                {fontSize}px
              </span>
              <button 
                onClick={() => setFontSize(prev => Math.min(26, prev + 2))} 
                className="px-2 py-1 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-forest-800 rounded-lg transition-colors"
                title="Increase Reading Font Size"
                aria-label="Increase Font Size"
              >
                A+
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 2. SCRIPTURE PASSAGE READING SURFACE                 */}
      {/* ---------------------------------------------------- */}
      <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-white dark:bg-forest-950 border border-slate-200 dark:border-forest-800 shadow-xl space-y-6 leading-relaxed transition-all">
        
        {/* Chapter Header */}
        <div className="text-center pb-6 border-b border-slate-200 dark:border-forest-800 space-y-1">
          <p className="text-xs font-mono font-bold text-gold-500 uppercase tracking-widest">
            {currentBookObj.testament === 'OT' ? 'Old Testament' : 'New Testament'}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif tracking-tight text-slate-900 dark:text-white">
            {currentBookObj.name} {currentChapter}
          </h1>
          <p className="text-xs font-mono text-slate-500 dark:text-forest-300">
            {activeVersionObj.name} ({activeVersionObj.abbreviation})
          </p>
        </div>

        {/* Loading Skeleton */}
        {isChapterLoading && versesList.length === 0 ? (
          <div className="space-y-4 py-8 animate-pulse">
            <div className="h-4 bg-slate-200 dark:bg-forest-900 rounded w-full" />
            <div className="h-4 bg-slate-200 dark:bg-forest-900 rounded w-5/6" />
            <div className="h-4 bg-slate-200 dark:bg-forest-900 rounded w-4/5" />
            <div className="h-4 bg-slate-200 dark:bg-forest-900 rounded w-full" />
            <div className="h-4 bg-slate-200 dark:bg-forest-900 rounded w-3/4" />
          </div>
        ) : (
          /* Scripture Verses Paragraph Flow */
          <div className="space-y-3 font-serif selection:bg-gold-500/30">
            {versesList.map((v) => {
              const isSelected = selectedVerse === v.verse;
              const highlight = highlights.find(
                h => h.bookUsfm === currentBookObj.id && h.chapter === currentChapter && h.verse === v.verse
              );
              const isBookmarked = bookmarks.includes(`${currentBookObj.id}.${currentChapter}.${v.verse}`);
              const hasNote = notes.some(
                n => n.bookUsfm === currentBookObj.id && n.chapter === currentChapter && n.verse === v.verse
              );

              return (
                <div 
                  key={v.verse}
                  onClick={() => setSelectedVerse(isSelected ? null : v.verse)}
                  className={`p-2.5 rounded-2xl cursor-pointer transition-all ${
                    isSelected 
                      ? 'ring-2 ring-gold-400 bg-gold-500/10 dark:bg-forest-900/60 shadow-md' 
                      : 'hover:bg-slate-50 dark:hover:bg-forest-900/30'
                  } ${highlight ? highlight.color : ''}`}
                >
                  {/* Verse Number Badge */}
                  <span className="font-sans font-extrabold text-xs text-forest-700 dark:text-gold-400 mr-2 selection:bg-none inline-block min-w-[20px]">
                    {v.verse}
                  </span>

                  {/* Verse Text Content */}
                  <span 
                    style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }} 
                    className="font-serif text-slate-800 dark:text-slate-100"
                  >
                    {v.text}
                  </span>

                  {/* Active Badges */}
                  <div className="inline-flex items-center gap-1.5 ml-2 font-sans align-middle">
                    {isBookmarked && (
                      <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-amber-500 inline" />
                    )}
                    {hasNote && (
                      <FileEdit className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 inline" />
                    )}
                    {highlight && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-forest-800 text-gold-300 uppercase tracking-wider">
                        {highlight.category}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* Chapter Navigation Footer Controls                   */}
        {/* ---------------------------------------------------- */}
        <div className="pt-8 border-t border-slate-200 dark:border-forest-800 flex flex-wrap items-center justify-between gap-4 font-sans">
          <button 
            disabled={currentChapter <= 1 && currentBookObj.id === 'GEN'}
            onClick={handlePreviousChapter}
            className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-forest-900 hover:bg-slate-200 dark:hover:bg-forest-800 text-slate-900 dark:text-white text-xs font-bold flex items-center gap-2 disabled:opacity-40 transition-all border border-slate-200 dark:border-forest-700 shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Chapter</span>
          </button>

          <div className="text-xs font-mono font-bold text-slate-400">
            {currentBookObj.name} {currentChapter} of {currentBookObj.chaptersCount}
          </div>

          <button 
            onClick={handleNextChapter}
            className="px-5 py-2.5 rounded-2xl bg-forest-800 hover:bg-forest-700 text-gold-400 text-xs font-extrabold flex items-center gap-2 shadow-lg transition-all"
          >
            <span>Next Chapter</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* ---------------------------------------------------- */}
        {/* Licensing & Copyright Attribution Statement          */}
        {/* ---------------------------------------------------- */}
        <div className="pt-4 border-t border-slate-100 dark:border-forest-900/60 text-center space-y-1 font-mono text-[11px] text-slate-400 dark:text-forest-400">
          <p>{chapterData?.copyright || activeVersionObj.copyright || 'YouVersion Platform Bible API'}</p>
          <p className="text-[10px] opacity-75">
            Scripture access authorized via YouVersion Platform API (v1).
          </p>
        </div>

      </div>

      {/* ---------------------------------------------------- */}
      {/* 3. SELECTED VERSE ACTION MODAL / FLOATING PANEL      */}
      {/* ---------------------------------------------------- */}
      {selectedVerse !== null && (
        <div className="sticky bottom-6 p-5 rounded-3xl bg-forest-950 text-white border border-forest-700 shadow-2xl space-y-4 animate-spring-up font-sans z-30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-gold-400 uppercase tracking-widest">
              Verse Action Panel • {currentBookObj.name} {currentChapter}:{selectedVerse}
            </span>
            <button 
              onClick={() => setSelectedVerse(null)} 
              className="w-7 h-7 rounded-full bg-forest-900 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Copy Action */}
            <button 
              onClick={() => {
                const targetVerseObj = versesList.find(v => v.verse === selectedVerse);
                if (targetVerseObj) {
                  handleCopyVerse(selectedVerse, targetVerseObj.text);
                }
              }}
              className="px-3.5 py-1.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-xs font-bold flex items-center gap-1.5 text-slate-200"
            >
              <Copy className="w-3.5 h-3.5 text-gold-400" />
              Copy
            </button>

            {/* Bookmark Action */}
            <button 
              onClick={() => handleToggleBookmark(selectedVerse)}
              className="px-3.5 py-1.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-xs font-bold flex items-center gap-1.5 text-slate-200"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              {bookmarks.includes(`${currentBookObj.id}.${currentChapter}.${selectedVerse}`) ? 'Bookmarked' : 'Bookmark'}
            </button>

            {/* Highlight Categories */}
            <button 
              onClick={() => handleAddHighlight('Promise', 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300')}
              className="px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold"
            >
              Promise
            </button>

            <button 
              onClick={() => handleAddHighlight('Wisdom', 'bg-amber-500/20 text-amber-800 dark:text-amber-300')}
              className="px-3 py-1.5 rounded-xl bg-amber-950 border border-amber-500/40 text-amber-300 text-xs font-bold"
            >
              Wisdom
            </button>

            <button 
              onClick={() => handleAddHighlight('Command', 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300')}
              className="px-3 py-1.5 rounded-xl bg-indigo-950 border border-indigo-500/40 text-indigo-300 text-xs font-bold"
            >
              Command
            </button>

            <button 
              onClick={() => handleAddHighlight('Faith', 'bg-sky-500/20 text-sky-700 dark:text-sky-300')}
              className="px-3 py-1.5 rounded-xl bg-sky-950 border border-sky-500/40 text-sky-300 text-xs font-bold"
            >
              Faith
            </button>
          </div>

          {/* Add Personal Verse Reflection Note */}
          <div className="flex items-center gap-2 pt-1">
            <input 
              type="text" 
              value={newNoteInput} 
              onChange={(e) => setNewNoteInput(e.target.value)} 
              placeholder={`Write personal reflection on ${currentBookObj.name} ${currentChapter}:${selectedVerse}...`} 
              className="flex-1 px-4 py-2.5 rounded-xl bg-forest-900 border border-forest-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
            <button 
              onClick={handleSaveNote}
              className="px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-forest-950 text-xs font-extrabold shrink-0 shadow-md"
            >
              Save Note
            </button>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 4. BOOK SELECTION MODAL                              */}
      {/* ---------------------------------------------------- */}
      {isBookModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-2xl bg-white dark:bg-forest-950 rounded-3xl border border-slate-200 dark:border-forest-800 shadow-2xl p-6 space-y-5 max-h-[85vh] flex flex-col">
            
            {/* Modal Header & Search */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-forest-800 text-gold-400 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    Select Bible Book
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-forest-300">
                    Canonical Holy Scripture (66 Books)
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setIsBookModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-forest-900 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-forest-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input & Testament Tabs */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={bookSearchQuery}
                  onChange={(e) => setBookSearchQuery(e.target.value)}
                  placeholder="Search book (e.g. John, Genesis, Romans, Psalms)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTestamentFilter('ALL')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    testamentFilter === 'ALL'
                      ? 'bg-forest-800 text-gold-400 shadow-sm'
                      : 'bg-slate-100 dark:bg-forest-900 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  All (66)
                </button>
                <button
                  onClick={() => setTestamentFilter('OT')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    testamentFilter === 'OT'
                      ? 'bg-forest-800 text-gold-400 shadow-sm'
                      : 'bg-slate-100 dark:bg-forest-900 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Old Testament (39)
                </button>
                <button
                  onClick={() => setTestamentFilter('NT')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    testamentFilter === 'NT'
                      ? 'bg-forest-800 text-gold-400 shadow-sm'
                      : 'bg-slate-100 dark:bg-forest-900 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  New Testament (27)
                </button>
              </div>
            </div>

            {/* Books Grid */}
            <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {filteredBooks.map((b) => (
                <button
                  key={b.id}
                  onClick={() => handleSelectBook(b.id)}
                  className={`p-3 rounded-2xl text-left text-xs font-bold transition-all border ${
                    b.id === currentBookObj.id
                      ? 'bg-gold-500 text-forest-950 border-gold-400 shadow-md'
                      : 'bg-slate-50 dark:bg-forest-900/60 hover:bg-forest-100 dark:hover:bg-forest-800 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-forest-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{b.name}</span>
                    <span className="text-[10px] font-mono opacity-70">{b.chaptersCount} ch</span>
                  </div>
                </button>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 5. CHAPTER SELECTION MODAL                           */}
      {/* ---------------------------------------------------- */}
      {isChapterModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-forest-950 rounded-3xl border border-slate-200 dark:border-forest-800 shadow-2xl p-6 space-y-4 max-h-[80vh] flex flex-col">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {currentBookObj.name} Chapters
                </h3>
                <p className="text-xs text-slate-500 dark:text-forest-300">
                  Select a chapter to read (1 to {currentBookObj.chaptersCount})
                </p>
              </div>
              <button 
                onClick={() => setIsChapterModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-forest-900 text-slate-600 dark:text-slate-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto grid grid-cols-5 sm:grid-cols-6 gap-2 p-1">
              {Array.from({ length: currentBookObj.chaptersCount }, (_, i) => i + 1).map((ch) => (
                <button
                  key={ch}
                  onClick={() => handleSelectChapter(ch)}
                  className={`py-3 rounded-xl font-mono text-sm font-bold transition-all ${
                    ch === currentChapter
                      ? 'bg-gold-500 text-forest-950 shadow-md font-extrabold'
                      : 'bg-slate-100 dark:bg-forest-900 hover:bg-slate-200 dark:hover:bg-forest-800 text-slate-900 dark:text-slate-100'
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
