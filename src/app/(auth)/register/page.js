'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { apiFetch } from '@/lib/api';
import { UserPlus, Mail, Lock, User, Calendar, AlertCircle, ArrowLeft, ChevronRight } from 'lucide-react';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        birthday: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Backend expects birthday in ISO format or date string
            const data = await apiFetch('/auth/signup', {
                method: 'POST',
                body: JSON.stringify({
                    ...formData,
                    birthday: new Date(formData.birthday).toISOString()
                }),
            });

            // Auto login after signup
            login(data.token, data.user);
            
            // Redirect to timeline
            router.push('/timeline');
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in">
            {/* Back to Home */}
            <Link href="/" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-white mb-8 transition-colors text-sm font-medium group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Home
            </Link>

            <div className="glass-card p-8 md:p-10">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-primary/20">
                        <UserPlus size={32} />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Join the Connect</h1>
                    <p className="text-on-surface-variant">Create your student profile and start sharing.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-secondary text-sm flex items-start gap-3 animate-fade-in">
                        <AlertCircle size={18} className="shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-primary-dim ml-1" htmlFor="name">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
                                <input 
                                    id="name"
                                    type="text" 
                                    required
                                    className="input-glass !pl-12"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-primary-dim ml-1" htmlFor="username">Username</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline font-bold">@</span>
                                <input 
                                    id="username"
                                    type="text" 
                                    required
                                    className="input-glass !pl-10"
                                    placeholder="johndoe"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-primary-dim ml-1" htmlFor="email">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
                            <input 
                                id="email"
                                type="email" 
                                required
                                className="input-glass !pl-12"
                                placeholder="name@university.edu"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-primary-dim ml-1" htmlFor="password">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
                                <input 
                                    id="password"
                                    type="password" 
                                    required
                                    className="input-glass !pl-12"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-primary-dim ml-1" htmlFor="birthday">Birthday</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
                                <input 
                                    id="birthday"
                                    type="date" 
                                    required
                                    className="input-glass !pl-12 [color-scheme:dark]"
                                    value={formData.birthday}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="btn-primary w-full flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Create Account
                                    <ChevronRight size={18} />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-8 pt-8 border-t border-white/5 text-center">
                    <p className="text-on-surface-variant text-sm">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary font-bold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
