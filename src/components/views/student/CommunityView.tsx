import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { IOSModal } from '../../ios/IOSModal';
import { Avatar } from '../../ui/Avatar';
import { Heart, MessageSquare, Plus, Sparkles, Send, BookOpen, Filter } from 'lucide-react';
import { CommunityPost } from '../../../types';

export const CommunityView: React.FC = () => {
  const { 
    communityPosts, 
    addCommunityPost, 
    toggleLikePost, 
    addCommentToPost, 
    student, 
    showToast 
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState<CommunityPost['category']>('Testimony');
  const [scriptureRef, setScriptureRef] = useState('');

  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Testimony', 'Insight', 'Prayer', 'Question', 'Encouragement'];

  const filteredPosts = communityPosts.filter((p) => 
    activeCategory === 'All' || p.category === activeCategory
  );

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;
    addCommunityPost(postContent, postCategory, scriptureRef.trim() || undefined);
    setPostContent('');
    setScriptureRef('');
    setIsNewPostOpen(false);
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;
    addCommentToPost(postId, text);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const toggleCommentsView = (postId: string) => {
    setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <div className="space-y-8 pb-16 animate-ios-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Discipleship Community
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            A healthy ecosystem of testimonies, insights, and kingdom encouragement
          </p>
        </div>

        <button
          onClick={() => setIsNewPostOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all ios-active border border-white/20"
        >
          <Plus className="w-4 h-4" />
          Share Insight / Testimony
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => {
          const active = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all ios-active ${
                active
                  ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md shadow-blue-500/20'
                  : 'glass-pill text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Community Feed */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <IOSCard key={post.id} className="space-y-4">
            {/* Author Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar 
                  src={post.authorAvatar} 
                  name={post.authorName} 
                  size="md"
                  className="ring-2 ring-blue-500/40"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {post.authorName}
                  </h4>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">
                    {post.authorRole} • {post.timestamp}
                  </span>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full glass-pill text-indigo-600 dark:text-cyan-400 font-mono font-bold text-xs border border-indigo-500/20">
                {post.category}
              </span>
            </div>

            {/* Post Content */}
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              {post.content}
            </p>

            {/* Optional Scripture Reference Badge */}
            {post.scriptureRef && (
              <div className="p-3 rounded-2xl glass-pill border border-amber-500/20 text-xs italic text-amber-600 dark:text-amber-300">
                📖 Reference: {post.scriptureRef}
              </div>
            )}

            {/* Action Bar: Like & Comment Controls */}
            <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleLikePost(post.id)}
                  className={`flex items-center gap-1.5 font-bold transition-colors ${
                    post.isLiked ? 'text-red-500' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-red-500' : ''}`} />
                  <span>{post.likes}</span>
                </button>

                <button
                  onClick={() => toggleCommentsView(post.id)}
                  className="flex items-center gap-1.5 font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.commentsCount} Comments</span>
                </button>
              </div>
            </div>

            {/* Expanded Comments Section */}
            {expandedComments[post.id] && (
              <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 space-y-3 animate-ios-fade-in">
                {/* Existing Comments */}
                <div className="space-y-2">
                  {post.comments?.map((c) => (
                    <div key={c.id} className="p-3 rounded-2xl glass-pill text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                        <span>{c.authorName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{c.timestamp}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 font-medium">{c.content}</p>
                    </div>
                  ))}
                </div>

                {/* Add Comment Input Bar */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={commentInputs[post.id] || ''}
                    onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    placeholder="Write an encouraging comment..."
                    className="flex-1 px-4 py-2 rounded-full glass-input text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shrink-0 transition-colors shadow-sm"
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </IOSCard>
        ))}
      </div>

      {/* New Post Modal */}
      <IOSModal
        isOpen={isNewPostOpen}
        onClose={() => setIsNewPostOpen(false)}
        title="Share Insight or Testimony"
        subtitle="Encourage the School of Tyrannus discipleship community"
      >
        <form onSubmit={handleCreatePost} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <select
              value={postCategory}
              onChange={(e) => setPostCategory(e.target.value as any)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="Testimony">Testimony</option>
              <option value="Insight">Word Insight</option>
              <option value="Prayer">Prayer Request</option>
              <option value="Encouragement">Encouragement</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Scripture Reference (Optional)
            </label>
            <input
              type="text"
              value={scriptureRef}
              onChange={(e) => setScriptureRef(e.target.value)}
              placeholder="e.g. Acts 19:9 or Romans 8:1"
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Your Insight / Testimony
            </label>
            <textarea
              required
              rows={4}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Write what God is teaching you in the secret place..."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsNewPostOpen(false)}
              className="px-4 py-2 rounded-full text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md"
            >
              Publish Post
            </button>
          </div>
        </form>
      </IOSModal>

    </div>
  );
};
