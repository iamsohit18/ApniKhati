import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_COMMUNITY_POSTS } from '../../data/mockData';
import { CommunityPost } from '../../types';
import {
  Users,
  MessageSquare,
  ThumbsUp,
  Share2,
  CheckCircle2,
  Plus,
  Image as ImageIcon,
  Sparkles,
  ShieldCheck,
  Send,
} from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const { farmerProfile } = useApp();
  const [posts, setPosts] = useState<CommunityPost[]>(MOCK_COMMUNITY_POSTS);
  const [showNewPostModal, setShowNewPostModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCropTag, setNewCropTag] = useState('Wheat');
  const [upvotedIds, setUpvotedIds] = useState<Record<string, boolean>>({});

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const post: CommunityPost = {
      id: `post-${Date.now()}`,
      author: farmerProfile.name,
      authorLocation: `${farmerProfile.district}, ${farmerProfile.state}`,
      authorRole: 'FARMER',
      timestamp: 'Just now',
      title: newTitle,
      content: newContent,
      cropTag: newCropTag,
      upvotes: 1,
      repliesCount: 0,
    };

    setPosts([post, ...posts]);
    setShowNewPostModal(false);
    setNewTitle('');
    setNewContent('');
  };

  const handleUpvote = (id: string) => {
    if (upvotedIds[id]) {
      setUpvotedIds({ ...upvotedIds, [id]: false });
      setPosts(posts.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes - 1 } : p)));
    } else {
      setUpvotedIds({ ...upvotedIds, [id]: true });
      setPosts(posts.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p)));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-stone-100">
      
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                Kisan Chopal (किसान चौपाल)
              </h1>
              <p className="text-xs text-stone-400">
                Community Discussions, Crop Photos & PAU Agronomist Verified Answers
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowNewPostModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-700/30 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Ask Community Question</span>
        </button>
      </div>

      {/* 2. POSTS FEED */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                  {post.author[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-tight">{post.author}</p>
                  <p className="text-[11px] text-stone-400">{post.authorLocation} • {post.timestamp}</p>
                </div>
              </div>

              <span className="px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 text-xs font-semibold border border-stone-700">
                {post.cropTag}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-white font-['Outfit']">{post.title}</h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">{post.content}</p>

              {post.imageUrl && (
                <div className="pt-2">
                  <img
                    src={post.imageUrl}
                    alt="Post crop issue"
                    className="rounded-2xl max-h-72 w-full object-cover border border-stone-800"
                  />
                </div>
              )}
            </div>

            {/* Verified Agronomist Answer Box */}
            {post.expertAnswer && (
              <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-500/40 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 text-[10px] font-bold border border-teal-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Verified Expert Solution
                  </span>
                  <span className="text-xs font-bold text-stone-200">{post.expertAnswer.expertName}</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">{post.expertAnswer.answer}</p>
              </div>
            )}

            {/* Interactions Bar */}
            <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <button
                onClick={() => handleUpvote(post.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
                  upvotedIds[post.id]
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                    : 'hover:bg-stone-800 text-stone-400'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{post.upvotes} Helpful</span>
              </button>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.repliesCount} Answers</span>
                </span>
                <button className="hover:text-stone-200">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. POST QUESTION MODAL */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="bg-stone-900 border border-stone-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl text-stone-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="text-base font-bold text-white font-['Outfit']">Post to Kisan Chopal</h3>
              <button onClick={() => setShowNewPostModal(false)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-stone-400 mb-1">Question / Problem Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Yellow streaks on wheat leaf after first irrigation..."
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 font-medium"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Crop Tag</label>
                <select
                  value={newCropTag}
                  onChange={(e) => setNewCropTag(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100"
                >
                  <option value="Wheat">Wheat</option>
                  <option value="Mustard">Mustard</option>
                  <option value="Paddy/Rice">Paddy / Rice</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Solar Irrigation">Solar Irrigation</option>
                  <option value="Government Schemes">Government Schemes</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Detailed Observation</label>
                <textarea
                  rows={3}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Describe sowing date, variety, fertilizers applied, soil condition..."
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition"
              >
                Publish to Community
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
