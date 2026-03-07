'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { IntegrationIcon } from '@clawesome/ui';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Contact', href: '#' },
        { name: 'Blog', href: '#' },
      ],
    },
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/#features' },
        { name: 'Marketplace', href: '/marketplace' },
        { name: 'Download', href: '/download' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Swarms', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Security', href: '#' },
        { name: 'Cookies', href: '#' },
      ],
    },
  ];

  return (
    <footer className="w-full bg-slate-50 dark:bg-black border-t border-slate-200 dark:border-white/10 transition-colors py-20 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-8 justify-between">
        {/* Brand Info */}
        <div className="flex flex-col gap-6 md:max-w-xs">
          <Link href="/" className="flex items-center group">
            <img 
              src="/clawesome-logo.svg" 
              alt="Clawesome" 
              className="h-10 w-auto" 
            />
          </Link>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Simply Awesome Vibes
          </p>
          <div className="flex items-center gap-4">
            {[
              { id: 'github', href: 'https://github.com/clawesome' },
              { id: 'linkedin', href: 'https://linkedin.com/company/clawesome' }
            ].map((social) => (
              <a 
                key={social.id} 
                href={social.href} 
                className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-[#8C00FF] hover:border-indigo-500/50 transition-all flex items-center justify-center group"
                target="_blank"
                rel="noreferrer"
              >
                <div className="w-5 h-5 bg-slate-400 dark:bg-slate-600 group-hover:bg-gradient-to-tr group-hover:from-[#8C00FF] group-hover:to-[#008FD6] transition-colors relative overflow-hidden flex justify-center items-center">
                   <IntegrationIcon name={social.id} size={20} className="w-full h-full text-current bg-current" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 md:gap-24">
          {footerLinks.map((category) => (
            <div key={category.title} className="flex flex-col gap-6">
              <h4 className="text-xs font-black uppercase tracking-[0.4em] text-slate-900 dark:text-slate-200">
                {category.title}
              </h4>
              <ul className="flex flex-col gap-4">
                {category.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-[#8C00FF] transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row gap-4 items-center justify-between text-sm text-slate-500">
        <p>© {currentYear} Clawesome AI, Inc. All rights reserved.</p>
        <div className="flex items-center gap-1.5">
          <span>Built with</span>
          <Heart size={14} className="text-rose-500 fill-rose-500 animate-pulse" />
          <span>by the Clawesome Team</span>
        </div>
      </div>
    </footer>
  );
};
