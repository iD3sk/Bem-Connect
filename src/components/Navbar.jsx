'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Home, LayoutGrid, Info, LogIn, User, LogOut } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="glass-nav fixed top-0 left-0 right-0 z-50 h-16">
            <div className="container mx-auto px-6 h-full flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xl group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-shadow">
                        B
                    </div>
                    <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white to-on-surface-variant bg-clip-text text-transparent">
                        Bem Connect
                    </span>
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    <NavLink href="/" icon={<Home size={18} />} label="Home" />
                    <NavLink href="/timeline" icon={<LayoutGrid size={18} />} label="Timeline" />
                    <NavLink href="/#about" icon={<Info size={18} />} label="About Us" />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link href="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-surface-bright flex items-center justify-center border border-white/10 overflow-hidden">
                                    {user.avatar ? (
                                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={16} />
                                    )}
                                </div>
                                <span className="hidden sm:inline font-medium text-sm">{user.username}</span>
                            </Link>
                            <button 
                                onClick={logout}
                                className="p-2 rounded-full hover:bg-red-500/10 text-on-surface-variant hover:text-secondary transition-all"
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/login" className="btn-ghost !px-5 !py-2 !text-sm">
                                Login
                            </Link>
                            <Link href="/register" className="btn-primary !px-5 !py-2 !text-sm">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

function NavLink({ href, icon, label }) {
    return (
        <Link href={href} className="flex items-center gap-2 text-on-surface-variant hover:text-white font-medium transition-colors group">
            <span className="group-hover:text-primary transition-colors">{icon}</span>
            <span>{label}</span>
        </Link>
    );
}
