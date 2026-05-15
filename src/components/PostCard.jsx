'use client';

import React from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, User } from 'lucide-react';

export default function PostCard({ post }) {
    // Format date nicely
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <div className="glass-card p-6 mb-4 hover:border-primary/30 transition-all animate-fade-in-up">
            <div className="flex gap-4">
                {/* Author Avatar */}
                <div className="w-12 h-12 rounded-full bg-surface-bright flex items-center justify-center border border-white/10 shrink-0 overflow-hidden">
                    {post.author.avatar ? (
                        <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                    ) : (
                        <User size={20} className="text-outline" />
                    )}
                </div>

                <div className="flex-grow">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h4 className="font-bold text-white leading-tight">{post.author.name}</h4>
                            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                                <span>@{post.author.username || 'user'}</span>
                                <span>•</span>
                                <span>{formatDate(post.createdAt)}</span>
                            </div>
                        </div>
                        <button className="p-2 rounded-full hover:bg-white/5 text-outline transition-colors">
                            <MoreHorizontal size={18} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="text-on-surface leading-relaxed mb-4 whitespace-pre-wrap">
                        {post.content}
                    </div>

                    {/* Post Image */}
                    {post.imageUrl && (
                        <div className="rounded-2xl overflow-hidden border border-white/5 mb-4 max-h-[500px] bg-surface-dim">
                            <img 
                                src={post.imageUrl} 
                                alt="Post content" 
                                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-8 pt-2 border-t border-white/5">
                        <ActionButton 
                            icon={<Heart size={18} />} 
                            count={post._count?.likes || 0} 
                            hoverClass="hover:text-secondary hover:bg-secondary/10"
                        />
                        <ActionButton 
                            icon={<MessageCircle size={18} />} 
                            count={post._count?.comments || 0} 
                            hoverClass="hover:text-primary hover:bg-primary/10"
                        />
                        <ActionButton 
                            icon={<Share2 size={18} />} 
                            hoverClass="hover:text-tertiary hover:bg-tertiary/10"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ActionButton({ icon, count, hoverClass }) {
    return (
        <button className={`flex items-center gap-2 text-on-surface-variant transition-all px-3 py-1.5 rounded-full ${hoverClass}`}>
            {icon}
            {count !== undefined && <span className="text-sm font-medium">{count}</span>}
        </button>
    );
}
