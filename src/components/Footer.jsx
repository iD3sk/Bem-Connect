import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="mt-auto py-12 border-t border-white/5 bg-background">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                                B
                            </div>
                            <span className="text-lg font-bold tracking-tight">Bem Connect</span>
                        </div>
                        <p className="text-on-surface-variant text-sm max-w-xs text-center md:text-left">
                            Membangun ekosistem digital yang dinamis untuk mahasiswa universitas.
                        </p>
                    </div>

                    <div className="flex gap-12">
                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-sm uppercase tracking-widest text-primary-dim">Platform</h4>
                            <Link href="/" className="text-on-surface-variant hover:text-white transition-colors text-sm">Home</Link>
                            <Link href="/timeline" className="text-on-surface-variant hover:text-white transition-colors text-sm">Timeline</Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-sm uppercase tracking-widest text-primary-dim">Company</h4>
                            <Link href="/#about" className="text-on-surface-variant hover:text-white transition-colors text-sm">About Us</Link>
                            <Link href="/privacy" className="text-on-surface-variant hover:text-white transition-colors text-sm">Privacy</Link>
                            <Link href="/terms" className="text-on-surface-variant hover:text-white transition-colors text-sm">Terms</Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant">
                    <p>© 2026 Bem Connect. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span>Made with ❤️ for Students</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
