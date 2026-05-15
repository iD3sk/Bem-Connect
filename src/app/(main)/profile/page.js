'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiFetch } from '@/lib/api';
import PostCard from '@/components/PostCard';
import { User, Calendar, MapPin, Link as LinkIcon, Edit3, LogOut, Grid, Heart, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const { user, logout, loading: authLoading } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('posts');
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
            return;
        }

        if (user) {
            fetchUserPosts();
        }
    }, [user, authLoading]);

    const fetchUserPosts = async () => {
        try {
            const data = await apiFetch(`/post/user/${user.id}`);
            setPosts(data);
        } catch (error) {
            console.error('Failed to fetch user posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    if (authLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-16 pb-12">
            {/* Header / Cover Photo */}
            <div className="h-48 md:h-64 bg-gradient-to-r from-primary/20 via-tertiary/20 to-secondary/20 relative">
                <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="container mx-auto px-6">
                <div className="relative -mt-20 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    {/* Avatar & Basic Info */}
                    <div className="flex flex-col md:flex-row md:items-end gap-6">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-surface-dim border-4 border-background overflow-hidden relative z-10 shadow-xl">
                            {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-surface-bright">
                                    <User size={64} className="text-outline" />
                                </div>
                            )}
                        </div>
                        
                        <div className="mb-2">
                            <h1 className="text-3xl md:text-4xl font-black text-white">{user.name}</h1>
                            <p className="text-on-surface-variant text-lg">@{user.username}</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mb-2">
                        <button className="btn-ghost !px-6 !py-2 flex items-center gap-2">
                            <Edit3 size={18} />
                            Edit Profile
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="p-2.5 rounded-xl bg-red-500/10 text-secondary border border-red-500/20 hover:bg-red-500/20 transition-all"
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar: Bio & Stats */}
                    <aside className="lg:w-1/3 space-y-6">
                        <div className="glass-card p-8">
                            <h3 className="font-bold text-xl mb-4 text-primary-dim">About</h3>
                            <p className="text-on-surface-variant leading-relaxed mb-6">
                                {user.bio || "Mahasiswa ambis yang suka berbagi momen seru di kampus. Mari berteman!"}
                            </p>
                            
                            <div className="space-y-4 text-sm text-on-surface-variant">
                                <div className="flex items-center gap-3">
                                    <Calendar size={18} className="text-outline" />
                                    <span>Joined {new Date(user.createdAt).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin size={18} className="text-outline" />
                                    <span>Universitas Indonesia</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <LinkIcon size={18} className="text-outline" />
                                    <a href="#" className="text-primary hover:underline">bem-connect.com/{user.username}</a>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/5 text-center">
                                <div>
                                    <p className="text-xl font-black text-white">{posts.length}</p>
                                    <p className="text-[10px] uppercase tracking-widest text-outline">Posts</p>
                                </div>
                                <div>
                                    <p className="text-xl font-black text-white">248</p>
                                    <p className="text-[10px] uppercase tracking-widest text-outline">Followers</p>
                                </div>
                                <div>
                                    <p className="text-xl font-black text-white">192</p>
                                    <p className="text-[10px] uppercase tracking-widest text-outline">Following</p>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content: Tabs & Posts */}
                    <div className="lg:w-2/3">
                        <div className="flex border-b border-white/5 mb-8">
                            <TabButton 
                                active={activeTab === 'posts'} 
                                onClick={() => setActiveTab('posts')}
                                icon={<Grid size={18} />}
                                label="Posts"
                            />
                            <TabButton 
                                active={activeTab === 'likes'} 
                                onClick={() => setActiveTab('likes')}
                                icon={<Heart size={18} />}
                                label="Likes"
                            />
                            <TabButton 
                                active={activeTab === 'comments'} 
                                onClick={() => setActiveTab('comments')}
                                icon={<MessageSquare size={18} />}
                                label="Comments"
                            />
                        </div>

                        <div className="space-y-6">
                            {loading ? (
                                [1, 2].map(i => <div key={i} className="glass-card h-48 animate-pulse" />)
                            ) : activeTab === 'posts' ? (
                                posts.length > 0 ? (
                                    posts.map(post => <PostCard key={post.id} post={post} />)
                                ) : (
                                    <div className="glass-card p-16 text-center">
                                        <p className="text-on-surface-variant">Kamu belum membuat postingan apapun.</p>
                                    </div>
                                )
                            ) : (
                                <div className="glass-card p-16 text-center">
                                    <p className="text-on-surface-variant">Fitur ini akan segera hadir!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TabButton({ active, onClick, icon, label }) {
    return (
        <button 
            onClick={onClick}
            className={`flex items-center gap-2 px-8 py-4 font-bold transition-all border-b-2 ${
                active 
                ? 'text-primary border-primary bg-primary/5' 
                : 'text-on-surface-variant border-transparent hover:text-white hover:bg-white/5'
            }`}
        >
            {icon}
            {label}
        </button>
    );
}
