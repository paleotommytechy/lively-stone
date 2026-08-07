import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
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
  Flame
} from 'lucide-react';

interface VerseHighlight {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  category: 'Promise' | 'Command' | 'Prayer' | 'Wisdom' | 'Faith' | 'Love' | 'Hope' | 'Personal';
  color: string;
}

interface VerseNote {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  noteText: string;
  date: string;
}

const SAMPLE_CHAPTER_VERSES = [
  { verse: 1, text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
  { verse: 2, text: "The same was in the beginning with God." },
  { verse: 3, text: "All things were made by him; and without him was not any thing made that was made." },
  { verse: 4, text: "In him was life; and the life was the light of men." },
  { verse: 5, text: "And the light shineth in darkness; and the darkness comprehended it not." },
  { verse: 6, text: "There was a man sent from God, whose name was John." },
  { verse: 7, text: "The same came for a witness, to bear witness of the Light, that all men through him might believe." },
  { verse: 8, text: "He was not that Light, but was sent to bear witness of that Light." },
  { verse: 9, text: "That was the true Light, which lighteth every man that cometh into the world." },
  { verse: 10, text: "He was in the world, and the world was made by him, and the world knew him not." },
  { verse: 11, text: "He came unto his own, and his own received him not." },
  { verse: 12, text: "But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name:" },
  { verse: 13, text: "Which were born, not of blood, nor of the will of the flesh, nor of the will of man, but of God." },
  { verse: 14, text: "And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth." }
];

export const BibleReaderView: React.FC = () => {
  const { showToast } = useApp();
  
  const [translation, setTranslation] = useState<string>('KJV');
  const [currentBook, setCurrentBook] = useState<string>('John');
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [fontSize, setFontSize] = useState<number>(18);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  
  const [highlights, setHighlights] = useState<VerseHighlight[]>([
    { id: 'h-1', book: 'John', chapter: 1, verse: 1, category: 'Promise', color: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' },
    { id: 'h-2', book: 'John', chapter: 1, verse: 12, category: 'Faith', color: 'bg-amber-500/20 text-amber-800 dark:text-amber-300' }
  ]);
  
  const [notes, setNotes] = useState<VerseNote[]>([
    { id: 'n-1', book: 'John', chapter: 1, verse: 14, noteText: 'The incarnation of Christ is the cornerstone of apostolic grace.', date: 'Today' }
  ]);
  
  const [bookmarks, setBookmarks] = useState<string[]>(['John 1:1', 'John 1:12']);
  const [newNoteInput, setNewNoteInput] = useState<string>('');

  const handleAddHighlight = (category: VerseHighlight['category'], colorClass: string) => {
    if (selectedVerse === null) return;
    const newH: VerseHighlight = {
      id: `h-${Date.now()}`,
      book: currentBook,
      chapter: currentChapter,
      verse: selectedVerse,
      category,
      color: colorClass
    };
    setHighlights(prev => [...prev.filter(h => !(h.book === currentBook && h.chapter === currentChapter && h.verse === selectedVerse)), newH]);
    showToast('Verse Highlighted', `Highlighted ${currentBook} ${currentChapter}:${selectedVerse} under "${category}".`);
  };

  const handleToggleBookmark = (verseNum: number) => {
    const refStr = `${currentBook} ${currentChapter}:${verseNum}`;
    if (bookmarks.includes(refStr)) {
      setBookmarks(prev => prev.filter(b => b !== refStr));
      showToast('Bookmark Removed', `Removed ${refStr} from your bookmarks.`);
    } else {
      setBookmarks(prev => [...prev, refStr]);
      showToast('Bookmark Added', `Saved ${refStr} to your Bible bookmarks.`);
    }
  };

  const handleSaveNote = () => {
    if (selectedVerse === null || !newNoteInput.trim()) return;
    const newN: VerseNote = {
      id: `n-${Date.now()}`,
      book: currentBook,
      chapter: currentChapter,
      verse: selectedVerse,
      noteText: newNoteInput.trim(),
      date: 'Just now'
    };
    setNotes(prev => [...prev, newN]);
    setNewNoteInput('');
    showToast('Note Saved', `Personal note saved for ${currentBook} ${currentChapter}:${selectedVerse}.`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 animate-ios-fade-in text-slate-900 dark:text-slate-100">
      
      {/* Bible Navigation Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-700/10 text-emerald-800 dark:text-emerald-400 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">
              {currentBook} {currentChapter}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Daily Scripture Reading • {translation} Translation
            </p>
          </div>
        </div>

        {/* Translation & Controls */}
        <div className="flex items-center gap-2">
          <select 
            value={translation} 
            onChange={(e) => setTranslation(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold focus:outline-none"
          >
            <option value="KJV">King James (KJV)</option>
            <option value="WEB">World English (WEB)</option>
            <option value="ESV">English Standard (ESV)</option>
          </select>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-300 dark:border-slate-700">
            <button 
              onClick={() => setFontSize(prev => Math.max(14, prev - 2))} 
              className="px-2 py-0.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 rounded-lg"
              title="Decrease Font Size"
            >
              A-
            </button>
            <span className="text-[11px] font-mono font-bold px-1">{fontSize}px</span>
            <button 
              onClick={() => setFontSize(prev => Math.min(26, prev + 2))} 
              className="px-2 py-0.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 rounded-lg"
              title="Increase Font Size"
            >
              A+
            </button>
          </div>
        </div>
      </div>

      {/* Scripture Reading Reader Surface */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 leading-relaxed font-serif transition-all">
        {SAMPLE_CHAPTER_VERSES.map((v) => {
          const isSelected = selectedVerse === v.verse;
          const highlight = highlights.find(h => h.book === currentBook && h.chapter === currentChapter && h.verse === v.verse);
          const isBookmarked = bookmarks.includes(`${currentBook} ${currentChapter}:${v.verse}`);
          const hasNote = notes.some(n => n.book === currentBook && n.chapter === currentChapter && n.verse === v.verse);

          return (
            <div 
              key={v.verse}
              onClick={() => setSelectedVerse(isSelected ? null : v.verse)}
              className={`p-2.5 rounded-2xl cursor-pointer transition-all ${
                isSelected ? 'ring-2 ring-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
              } ${highlight ? highlight.color : ''}`}
            >
              <span className="font-sans font-extrabold text-xs text-emerald-700 dark:text-emerald-400 mr-2 selection:bg-none">
                {v.verse}
              </span>
              <span style={{ fontSize: `${fontSize}px` }} className="font-serif text-slate-800 dark:text-slate-200">
                {v.text}
              </span>

              {/* Badges */}
              <div className="inline-flex items-center gap-1.5 ml-2 font-sans">
                {isBookmarked && (
                  <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-amber-500 inline" />
                )}
                {hasNote && (
                  <FileEdit className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 inline" />
                )}
                {highlight && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-700 text-white uppercase tracking-wider">
                    {highlight.category}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* Reader Navigation Footer */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between font-sans">
          <button 
            disabled={currentChapter <= 1}
            onClick={() => setCurrentChapter(prev => Math.max(1, prev - 1))}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold flex items-center gap-1.5 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Chapter
          </button>

          <button 
            onClick={() => {
              showToast('Chapter Complete', `Finished reading ${currentBook} ${currentChapter}!`);
              setCurrentChapter(prev => prev + 1);
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-emerald-800/20"
          >
            <span>Complete & Next Chapter</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Selected Verse Context Menu Panel */}
      {selectedVerse !== null && (
        <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl space-y-4 animate-spring-up font-sans">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              Action Panel • {currentBook} {currentChapter}:{selectedVerse}
            </span>
            <button 
              onClick={() => setSelectedVerse(null)} 
              className="text-xs text-slate-400 hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => handleToggleBookmark(selectedVerse)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold flex items-center gap-1.5"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              {bookmarks.includes(`${currentBook} ${currentChapter}:${selectedVerse}`) ? 'Bookmarked' : 'Bookmark Verse'}
            </button>

            <button 
              onClick={() => handleAddHighlight('Promise', 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300')}
              className="px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-300 text-xs font-bold"
            >
              Highlight Promise
            </button>

            <button 
              onClick={() => handleAddHighlight('Wisdom', 'bg-amber-500/20 text-amber-800 dark:text-amber-300')}
              className="px-3 py-1.5 rounded-xl bg-amber-950 border border-amber-500/30 text-amber-300 text-xs font-bold"
            >
              Highlight Wisdom
            </button>

            <button 
              onClick={() => handleAddHighlight('Command', 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300')}
              className="px-3 py-1.5 rounded-xl bg-indigo-950 border border-indigo-500/30 text-indigo-300 text-xs font-bold"
            >
              Highlight Command
            </button>
          </div>

          {/* Add Personal Verse Note */}
          <div className="flex items-center gap-2 pt-2">
            <input 
              type="text" 
              value={newNoteInput} 
              onChange={(e) => setNewNoteInput(e.target.value)} 
              placeholder={`Write personal reflection on verse ${selectedVerse}...`} 
              className="flex-1 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button 
              onClick={handleSaveNote}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-extrabold"
            >
              Save Note
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
