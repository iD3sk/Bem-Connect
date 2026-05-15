'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiFetch } from '@/lib/api';
import { Image as ImageIcon, Send, User, X } from 'lucide-react';

export default function CreatePost({ onPostCreated }) {
    const { user } = useAuth();
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState(''); // Simple string for now
    const [isPosting, setIsPosting] = useState(false);
    const [showImageInput, setShowImageInput] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim() && !imageUrl.trim()) return;

        setIsPosting(true);
        try {
            const newPost = await apiFetch('/post', {
                method: 'POST',
                body: JSON.stringify({ content, imageUrl: imageUrl || null }),
            });
            
            setContent('');
            setImageUrl('');
            setShowImageInput(false);
            if (onPostCreated) onPostCreated(newPost);
        } catch (error) {
            alert(error.message || 'Failed to create post');
        } finally {
            setIsPosting(false);
        }
    };

    if (!user) return null;

    return (
        <div className="glass-card p-6 mb-8 animate-fade-in">
            <form onSubmit={handleSubmit}>
                <div className="flex gap-4">
                    {/* User Avatar */}
                    <div className="w-12 h-12 rounded-full bg-surface-bright flex items-center justify-center border border-white/10 shrink-0 overflow-hidden">
                        {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                            <User size={20} className="text-outline" />
                        )}
                    </div>

                    <div className="flex-grow space-y-4">
                        <textarea 
                            className="w-full bg-transparent border-none text-white placeholder:text-outline focus:ring-0 resize-none text-lg min-h-[100px]"
                            placeholder={`What's happening, ${user.name.split(' ')[0]}?`}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />

                        {showImageInput && (
                            <div className="relative animate-fade-in">
                                <input 
                                    type="text"
                                    placeholder="Paste image URL here..."
                                    className="input-glass text-sm"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                />
                                <button 
                                    type="button"
                                    onClick={() => { setShowImageInput(false); setImageUrl(''); }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-secondary"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2">
                                <button 
                                    type="button"
                                    onClick={() => setShowImageInput(!showImageInput)}
                                    className={`p-2 rounded-full transition-colors ${showImageInput ? 'bg-primary/20 text-primary' : 'hover:bg-white/5 text-on-surface-variant'}`}
                                    title="Add image"
                                >
                                    <ImageIcon size={20} />
                                </button>
                                {/* Future features: Emoji, Poll, etc. */}
                            </div>

                            <button 
                                type="submit"
                                disabled={isPosting || (!content.trim() && !imageUrl.trim())}
                                className="btn-primary !py-2 !px-6 flex items-center gap-2 disabled:opacity-50 disabled:transform-none"
                            >
                                {isPosting ? 'Posting...' : (
                                    <>
                                        Post
                                        <Send size={16} />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
