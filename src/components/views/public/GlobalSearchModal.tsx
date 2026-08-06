import React, { useState, useEffect, useRef } from 'react';
import { useUIStore } from '../../../store/useUIStore';
import { useGlobalSearch } from '../../../hooks/useGlobalSearch';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, MessageSquare, Calendar, HelpCircle, Users, ArrowRight } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setSearchOpen } = useUIStore();
  const [query, setQuery] = useState('');
  const searchResults = useGlobalSearch(query);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      // Focus input on open
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      // Disable body scroll when open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const handleItemClick = (path: string) => {
    navigate(path);
    setSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-ios-fade-in">
      {/* Click outside to close */}
      <div className="absolute inset-0 z-0" onClick={() => setSearchOpen(false)} />

      {/* Search Container Card */}
      <div className="relative z-10 w-full max-w-2xl bg-slate-900/90 dark:bg-slate-950/95 border border-white/20 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">
        {/* Top Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search teachings, scriptures, community posts, events..."
            className="flex-1 bg-transparent text-white text-sm placeholder:text-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-500 hover:text-white text-xs font-bold font-mono px-1.5 py-0.5 rounded bg-slate-800"
            >
              CLEAR
            </button>
          )}
          <button
            onClick={() => setSearchOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center shrink-0 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-4 no-scrollbar space-y-6">
          {!query && (
            <div className="text-center py-10 space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-200">Global Search Service</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Type keys to query across teachings, SSGI events, community Q&A desks, and student catalogs.
              </p>
            </div>
          )}

          {query && searchResults.totalResults === 0 && (
            <div className="text-center py-10 space-y-1">
              <h3 className="text-sm font-bold text-slate-300">No results found</h3>
              <p className="text-xs text-slate-500">
                No entries match the term "{query}". Try checking your spelling.
              </p>
            </div>
          )}

          {query && searchResults.totalResults > 0 && (
            <>
              {/* Group 1: Teachings */}
              {searchResults.teachings.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-bold font-mono text-cyan-400 tracking-wider uppercase flex items-center gap-1.5 pl-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    LMS COURSE TEACHINGS ({searchResults.teachings.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.teachings.map(t => (
                      <div
                        key={t.id}
                        onClick={() => handleItemClick(`/teachings/${t.id}`)}
                        className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                            {t.title}
                          </p>
                          <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                            {t.summary}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white shrink-0 transition-all group-hover:translate-x-0.5" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Group 2: Community Posts */}
              {searchResults.posts.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-bold font-mono text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 pl-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    COMMUNITY DISCUSSION ({searchResults.posts.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.posts.map(p => (
                      <div
                        key={p.id}
                        onClick={() => handleItemClick('/student/community')}
                        className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-100 line-clamp-1">
                            {p.content}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            Posted by {p.authorName} • {p.category}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white shrink-0 transition-all group-hover:translate-x-0.5" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Group 3: Questions */}
              {searchResults.questions.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-bold font-mono text-purple-400 tracking-wider uppercase flex items-center gap-1.5 pl-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    STUDENT Q&A FORUM ({searchResults.questions.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.questions.map(q => (
                      <div
                        key={q.id}
                        onClick={() => handleItemClick('/student/questions')}
                        className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-100 line-clamp-1">
                            {q.question}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            Asked by {q.studentName} • {q.isAnswered ? 'ANSWERED BY LEADER' : 'PENDING'}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white shrink-0 transition-all group-hover:translate-x-0.5" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Group 4: Events */}
              {searchResults.events.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-bold font-mono text-amber-500 tracking-wider uppercase flex items-center gap-1.5 pl-1">
                    <Calendar className="w-3.5 h-3.5" />
                    MINISTRY EVENTS ({searchResults.events.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.events.map(e => (
                      <div
                        key={e.id}
                        onClick={() => handleItemClick('/events')}
                        className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                            {e.title}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {e.date} • {e.location}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white shrink-0 transition-all group-hover:translate-x-0.5" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Group 5: Students (Only shown for Admin role) */}
              {searchResults.students.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-bold font-mono text-emerald-400 tracking-wider uppercase flex items-center gap-1.5 pl-1">
                    <Users className="w-3.5 h-3.5" />
                    STUDENT DIRECTORY ({searchResults.students.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.students.map(s => (
                      <div
                        key={s.id}
                        onClick={() => handleItemClick('/admin/students')}
                        className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-3">
                          <img src={s.avatarUrl} alt="Avatar" className="w-6 h-6 rounded-full object-cover" />
                          <div>
                            <p className="text-xs font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                              {s.name}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              {s.email} • {s.currentPillar} Pillar Stage
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white shrink-0 transition-all group-hover:translate-x-0.5" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
