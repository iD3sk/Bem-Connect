'use client';

import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import CreatePost from '@/components/CreatePost';
import PostCard from '@/components/PostCard';
import { Sparkles, TrendingUp, UserPlus, Search } from 'lucide-react';

export default function TimelinePage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, loading: authLoading } = useAuth();

    const fetchPosts = async () => {
        try {
            const data = await apiFetch('/post');
            setPosts(data);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handlePostCreated = (newPost) => {
        // Add new post to the top of the list
        setPosts([newPost, ...posts]);
    };

    return (
        <div className="container mx-auto px-6 pt-24 pb-12">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* --- LEFT SIDEBAR (Desktop) --- */}
                <aside className="hidden lg:block w-1/4 space-y-6">
                    <div className="glass-card p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white">
                                <Sparkles size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold">Bem Connect</h3>
                                <p className="text-xs text-on-surface-variant">University Network</p>
                            </div>
                        </div>
                        <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                            Bagikan momen terbaikmu dan tetap terhubung dengan teman kampus.
                        </p>
                    </div>

                    <div className="glass-card p-6">
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                            <TrendingUp size={18} className="text-primary" />
                            Trending Topics
                        </h4>
                        <div className="space-y-4">
                            <TrendItem tag="#PekanOlahraga" posts="1.2k posts" />
                            <TrendItem tag="#KuisDDP" posts="856 posts" />
                            <TrendItem tag="#Wisuda2026" posts="543 posts" />
                        </div>
                    </div>
                </aside>

                {/* --- MAIN TIMELINE --- */}
                <main className="w-full lg:w-2/4 max-w-2xl mx-auto">
                    {/* Create Post Area */}
                    {!authLoading && user && (
                        <CreatePost onPostCreated={handlePostCreated} />
                    )}

                    {/* Timeline Feed */}
                    <div className="space-y-4">
                        {loading ? (
                            // Skeleton Loading
                            [1, 2, 3].map(i => (
                                <div key={i} className="glass-card p-6 animate-pulse h-48" />
                            ))
                        ) : posts.length > 0 ? (
                            posts.map(post => (
                                <PostCard key={post.id} post={post} />
                            ))
                        ) : (
                            <div className="glass-card p-12 text-center">
                                <p className="text-on-surface-variant">Belum ada postingan. Jadilah yang pertama!</p>
                            </div>
                        )}
                    </div>
                </main>

                {/* --- RIGHT SIDEBAR (Desktop) --- */}
                <aside className="hidden lg:block w-1/4 space-y-6">
                    <div className="glass flex items-center gap-3 px-4 py-3 rounded-full mb-6">
                        <Search size={18} className="text-outline" />
                        <input 
                            type="text" 
                            placeholder="Search posts..." 
                            className="bg-transparent border-none text-sm outline-none w-full"
                        />
                    </div>

                    <div className="glass-card p-6">
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                            <UserPlus size={18} className="text-secondary" />
                            Suggested for you
                        </h4>
                        <div className="space-y-4">
                            <SuggestedUser name="BEM UI Official" username="bemui" />
                            <SuggestedUser name="Dosen Ganteng" username="dganteng" />
                            <SuggestedUser name="Maba Ambis" username="ambis_banget" />
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

function TrendItem({ tag, posts }) {
    return (
        <div className="group cursor-pointer">
            <p className="text-sm font-bold text-primary group-hover:underline">{tag}</p>
            <p className="text-[10px] text-outline uppercase tracking-wider">{posts}</p>
        </div>
    );
}

function SuggestedUser({ name, username }) {
    return (
        <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-bright flex items-center justify-center border border-white/5">
                    <span className="text-xs font-bold text-outline">{name[0]}</span>
                </div>
                <div>
                    <p className="text-sm font-bold leading-tight group-hover:text-primary transition-colors">{name}</p>
                    <p className="text-xs text-outline">@{username}</p>
                </div>
            </div>
            <button className="text-xs font-bold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-full transition-colors border border-primary/20">
                Follow
            </button>
        </div>
    );
}
