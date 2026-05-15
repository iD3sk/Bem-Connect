import React from 'react';
import { Zap, Users, BookOpen, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
    return (
        <div className="relative overflow-hidden pt-16">
            {/* Background Light Orbs */}
            <div className="glow-orb-blue top-[-10%] left-[-10%] opacity-50 animate-glow-pulse" />
            <div className="glow-orb-red bottom-[20%] right-[-10%] opacity-40 animate-glow-pulse delay-500" />
            <div className="glow-orb-indigo top-[40%] left-[20%] opacity-30 animate-glow-pulse delay-300" />

            {/* --- HERO SECTION --- */}
            <section className="relative z-10 pt-20 pb-32 px-6">
                <div className="container mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 text-primary-dim text-sm font-bold mb-8 animate-fade-in">
                        <Sparkles size={16} />
                        <span>Platform Mahasiswa Universitas #1</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 animate-fade-in-up">
                        Welcome to <span className="bg-gradient-to-r from-primary via-tertiary to-secondary bg-clip-text text-transparent">Bem Connect</span>
                    </h1>
                    
                    <p className="text-xl text-on-surface-variant max-w-2xl mx-auto mb-12 animate-fade-in-up delay-100">
                        Platform khusus untuk ngepost hal-hal seru di BEM seperti kegiatan, 
                        pengumuman, sampai momen kebersamaan yang tak terlupakan.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up delay-200">
                        <Link href="/register" className="btn-primary flex items-center gap-2 group">
                            Mulai Sekarang
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/timeline" className="btn-ghost">
                            Lihat Timeline
                        </Link>
                    </div>

                    {/* Featured Preview Card */}
                    <div className="mt-24 max-w-4xl mx-auto glass-card p-4 animate-float">
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-dim border border-white/5">
                            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                            <div className="absolute bottom-8 left-8 text-left">
                                <span className="px-3 py-1 rounded-full bg-secondary text-white text-xs font-bold mb-3 inline-block">Trending</span>
                                <h3 className="text-2xl font-bold mb-2">Pekan Olahraga Mahasiswa 2026</h3>
                                <p className="text-on-surface-variant">Join the biggest sports event of the semester. Register your team now.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- KEUNGGULAN SECTION --- */}
            <section className="relative z-10 py-32 px-6 bg-surface-dim/50 border-y border-white/5">
                <div className="container mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Mengapa Bem Connect?</h2>
                        <p className="text-on-surface-variant max-w-xl mx-auto">
                            Didesain khusus untuk kebutuhan mahasiswa yang dinamis, cepat, dan haus akan kolaborasi.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={<Zap className="text-primary" size={32} />}
                            title="Cepat dan Responsif"
                            description="Nikmati pengalaman interaksi super cepat yang dirancang untuk ekosistem mahasiswa modern."
                        />
                        <FeatureCard 
                            icon={<Users className="text-tertiary" size={32} />}
                            title="Terkoneksi Antar Sesama"
                            description="Bangun jaringan akademik yang bermakna dan tetap terhubung dengan teman-teman sejawat secara mulus."
                        />
                        <FeatureCard 
                            icon={<BookOpen className="text-secondary" size={32} />}
                            title="Sharing KJ & Tugas"
                            description="Kolaborasi jadi lebih seru! Bagikan wawasan, catatan, dan taklukkan tantangan akademik bersama."
                        />
                    </div>
                </div>
            </section>

            {/* --- ABOUT SECTION --- */}
            <section id="about" className="relative z-10 py-32 px-6">
                <div className="container mx-auto">
                    <div className="glass-card p-8 md:p-16 flex flex-col md:flex-row gap-16 items-center">
                        <div className="flex-1">
                            <h2 className="text-3xl md:text-5xl font-bold mb-8">Tentang Kami</h2>
                            <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed">
                                <p>
                                    Bem Connect hadir sebagai wadah inovatif yang menjembatani komunikasi 
                                    dan kolaborasi bagi seluruh mahasiswa. Kami berkomitmen untuk membangun 
                                    ekosistem digital yang dinamis di mana setiap momen kebersamaan dan 
                                    informasi penting dapat diakses dengan mudah oleh seluruh civitas akademika.
                                </p>
                                <p>
                                    Misi utama kami adalah mempererat hubungan antar mahasiswa melalui fitur-fitur 
                                    sosial yang intuitif. Dari pengumuman resmi BEM hingga berbagi catatan kuis, 
                                    kami percaya bahwa konektivitas adalah kunci untuk menciptakan pengalaman 
                                    kampus yang lebih bermakna dan suportif bagi semua.
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <div className="w-full aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-tertiary/20 to-secondary/20 flex items-center justify-center p-8 animate-float">
                                <div className="w-full h-full glass-card flex items-center justify-center">
                                    <span className="text-8xl font-black opacity-20">BEM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="glass-card p-8 group hover:translate-y-[-8px] transition-all">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-white/10 transition-colors">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <p className="text-on-surface-variant leading-relaxed">
                {description}
            </p>
        </div>
    );
}
