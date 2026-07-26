import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { IOSModal } from '../../ios/IOSModal';
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
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Discipleship Community
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            A healthy ecosystem of testimonies, insights, and kingdom encouragement
          </p>
        </div>

        <button
          onClick={() => setIsNewPostOpen(true)}
          className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all ios-active"
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
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ios-active ${
                active
                  ? 'bg-indigo-600 text-white shadow-md font-bold'
                  : 'bg-zinc-200/60 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700'
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
                <img 
                  src={post.authorAvatar} 
                  alt={post.authorName} 
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-amber-500/50"
                />
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                    {post.authorName}
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                      {post.authorRole}
                    </span>
                  </h3>
                  <p className="text-[11px] text-zinc-400">{post.timestamp}</p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20">
                {post.category}
              </span>
            </div>

            {/* Post Content */}
            <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-line">
              {post.content}
            </p>

            {post.scriptureRef && (
              <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs italic font-medium text-amber-700 dark:text-amber-300">
                📖 Scripture Reflection: <strong>{post.scriptureRef}</strong>
              </div>
            )}

            {/* Action Bar (Like & Comments) */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <button
                onClick={() => toggleLikePost(post.id)}
                className={`flex items-center gap-1.5 font-semibold transition-colors ${
                  post.isLiked ? 'text-red-500' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-red-500' : ''}`} />
                <span>{post.likes} Amen / Blessed</span>
              </button>

              <button
                onClick={() => toggleCommentsView(post.id)}
                className="flex items-center gap-1.5 font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{post.commentsCount} Comments</span>
              </button>
            </div>

            {/* Comments Drawer */}
            {expandedComments[post.id] && (
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
                <div className="space-y-2">
                  {post.comments?.map((c) => (
                    <div key={c.id} className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-zinc-900 dark:text-white">
                        <span>{c.authorName}</span>
                        <span className="text-[10px] text-zinc-400 font-normal">{c.timestamp}</span>
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-300">{c.content}</p>
                    </div>
                  ))}
                </div>

                {/* Add Comment Bar */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={commentInputs[post.id] || ''}
                    onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    placeholder="Write an encouraging comment..."
                    className="w-full px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white focus:outline-none"
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 shrink-0"
                  >
                    <Send className="w-4 h-4" />
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
        title="Share with Community"
        subtitle="Post a testimony, biblial insight, or prayer point"
      >
        <form onSubmit={handleCreatePost} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Category
            </label>
            <select
              value={postCategory}
              onChange={(e) => setPostCategory(e.target.value as CommunityPost['category'])}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none"
            >
              <option value="Testimony">Testimony</option>
              <option value="Insight">Insight</option>
              <option value="Prayer">Prayer Request</option>
              <option value="Question">Question</option>
              <option value="Encouragement">Encouragement</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Message Content
            </label>
            <textarea
              required
              rows={4}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What has the Lord done or taught you in the School of Tyrannus?"
              className="w-full p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Scripture Reference (Optional)
            </label>
            <input
              type="text"
              value={scriptureRef}
              onChange={(e) => setScriptureRef(e.target.value)}
              placeholder="e.g. Acts 19:10"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsNewPostOpen(false)}
              className="px-4 py-2 rounded-full text-xs font-semibold text-zinc-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
            >
              Publish Post
            </button>
          </div>
        </form>
      </IOSModal>

    </div>
  );
};
