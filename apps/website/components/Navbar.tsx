'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Menu, X, ArrowRight, Sun, Moon, Rocket } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { PrimaryButton } from '@/components/PrimaryButton';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const docsUrl = process.env.NEXT_PUBLIC_DOCS_URL ?? 'https://clawesome-docs.vercel.app';
  const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL ?? 
    (process.env.NODE_ENV === 'production' 
      ? 'https://clawesome-dashboard.vercel.app' 
      : 'http://localhost:3000');
  const uiUrl = process.env.NEXT_PUBLIC_UIURL ?? 'https://clawesome-ui.vercel.app'

  const navLinks = [
    { name: 'Docs', href: docsUrl, external: true },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Download', href: '/download' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'UI', href: uiUrl, external: true },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 flex items-center justify-center",
        isScrolled ? "translate-y-2" : "translate-y-0"
      )}
    >
      <div 
        className={cn(
          "max-w-7xl w-full flex items-center justify-between px-6 py-2.5 rounded-full transition-all duration-300",
          isScrolled 
            ? "glass-panel neon-glow border-indigo-500/20" 
            : "bg-transparent border-transparent"
        )}
      >
        <Link href="/" className="flex items-center group">
          <img 
            src="/clawesome-logo.svg" 
            alt="Clawesome" 
            className="h-8 w-auto transition-transform group-hover:scale-105 active:scale-95" 
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold transition-colors hover:text-indigo-500 text-slate-600 dark:text-slate-400"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-semibold transition-colors hover:text-indigo-500",
                  pathname === link.href ? "text-indigo-500" : "text-slate-600 dark:text-slate-400"
                )}
              >
                {link.name}
              </Link>
            )
          )}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          <Link href="/login" className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors">
            Log in
          </Link>
          <PrimaryButton 
            href={dashboardUrl} 
            size="sm"
            icon={<Rocket size={16} />}
          >
            Console
          </PrimaryButton>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-600 dark:text-slate-400"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-6 right-6 p-6 glass-panel rounded-3xl md:hidden flex flex-col gap-6"
          >
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-bold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Appearance</span>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex items-center gap-2 p-2 px-4 rounded-full bg-slate-100 dark:bg-slate-800 transition-colors text-slate-900 dark:text-white"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                <span className="text-sm font-bold capitalize">{theme}</span>
              </button>
            </div>
            <div className="h-px bg-slate-200 dark:bg-slate-800 my-2" />
            <PrimaryButton 
              href={dashboardUrl} 
              className="w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Console
            </PrimaryButton>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
