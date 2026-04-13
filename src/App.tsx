/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate, useParams, useNavigate, Outlet } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { 
  Menu, Search, Cpu, Check, Globe, Terminal, ChevronDown, ArrowRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/:lang" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blog" element={<BlogList />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="games" element={<div className="pt-32 text-center text-white">Games List Coming Soon</div>} />
          </Route>
          <Route path="*" element={<LanguageRedirect />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

function LanguageRedirect() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const lang = i18n.language || 'en';
  const supportedLangs = ['en', 'zh-CN', 'zh-TW', 'zh-HK', 'ko', 'ja', 'es', 'fr', 'de', 'fi', 'zh'];
  const pathLang = location.pathname.split('/')[1];
  
  if (supportedLangs.includes(pathLang)) {
    return <Navigate to={`/${pathLang}`} replace />;
  }
  
  return <Navigate to={`/${lang}${location.pathname}`} replace />;
}

function SEOHead() {
  const location = useLocation();
  const { lang } = useParams<{ lang: string }>();
  const basePath = location.pathname.replace(new RegExp(`^/${lang}`), '') || '';
  const languages = ['en', 'zh-CN', 'zh-TW', 'zh-HK', 'ko', 'ja', 'es', 'fr', 'de', 'fi'];

  return (
    <Helmet>
      <link rel="alternate" hrefLang="x-default" href={`https://dlss5.app/en${basePath}`} />
      {languages.map(code => (
        <link key={code} rel="alternate" hrefLang={code} href={`https://dlss5.app/${code}${basePath}`} />
      ))}
    </Helmet>
  );
}

function Layout() {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();
  const supportedLangs = ['en', 'zh-CN', 'zh-TW', 'zh-HK', 'ko', 'ja', 'es', 'fr', 'de', 'fi', 'zh'];
  
  useEffect(() => {
    if (lang && supportedLangs.includes(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  if (lang && !supportedLangs.includes(lang)) {
    return <Navigate to={`/en`} replace />;
  }

  return (
    <div className="selection:bg-primary selection:text-on-primary min-h-screen flex flex-col">
      <SEOHead />
      <Banner lang={lang || 'en'} />
      <Header lang={lang || 'en'} />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

function Banner({ lang }: { lang: string }) {
  const { t } = useTranslation();
  return (
    <div className="bg-primary text-on-primary px-4 py-2 text-center text-sm font-headline font-bold flex flex-wrap items-center justify-center gap-2 z-[60] relative">
      <span>{t('banner.text')}</span>
      <Link to={`/${lang}/blog/dlss5-ai-slop-controversy`} className="inline-flex items-center gap-1 underline decoration-on-primary/50 hover:decoration-on-primary transition-all">
        {t('banner.link')} <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
}

function Header({ lang }: { lang: string }) {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const languages = [
    { code: 'en', label: 'EN', full: 'English' },
    { code: 'zh-CN', label: '简中', full: '简体中文' },
    { code: 'zh-TW', label: '繁中', full: '繁體中文 (TW)' },
    { code: 'zh-HK', label: '繁中', full: '繁體中文 (HK)' },
    { code: 'ko', label: 'KO', full: '한국어' },
    { code: 'ja', label: 'JA', full: '日本語' },
    { code: 'es', label: 'ES', full: 'Español' },
    { code: 'fr', label: 'FR', full: 'Français' },
    { code: 'de', label: 'DE', full: 'Deutsch' },
    { code: 'fi', label: 'FI', full: 'Suomi' }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [langMenuRef]);

  const changeLanguage = (code: string) => {
    const currentPath = location.pathname;
    const newPath = currentPath.replace(new RegExp(`^/${lang}`), `/${code}`);
    navigate(newPath);
    setIsLangMenuOpen(false);
  };

  const isHome = location.pathname === `/${lang}` || location.pathname === `/${lang}/`;

  return (
    <header className="sticky top-0 w-full z-50 bg-[#131313]/90 backdrop-blur-md border-b border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
      <nav className="flex justify-between items-center px-6 h-16 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Menu 
            className="text-primary cursor-pointer active:scale-95 transition-transform md:hidden" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
          <Link to={`/${lang}`} className="text-xl font-bold tracking-tighter text-primary font-headline">NEURAL ARCHITECT</Link>
        </div>
        <div className="hidden md:flex items-center gap-8 text-white/70 font-headline text-sm font-medium">
          {isHome ? (
            <>
              <a href="#hero" className="hover:text-primary transition-colors duration-300">{t('nav.home')}</a>
              <a href="#checker" className="hover:text-primary transition-colors duration-300">{t('nav.checker')}</a>
              <a href="#matrix" className="hover:text-primary transition-colors duration-300">{t('nav.matrix')}</a>
              <a href="#faq" className="hover:text-primary transition-colors duration-300">{t('nav.faq')}</a>
            </>
          ) : (
            <Link to={`/${lang}`} className="hover:text-primary transition-colors duration-300">{t('nav.home')}</Link>
          )}
          <Link to={`/${lang}/blog`} className="hover:text-primary transition-colors duration-300">{t('nav.blog')}</Link>
          <Link to={`/${lang}/games`} className="hover:text-primary transition-colors duration-300">{t('nav.games')}</Link>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative" ref={langMenuRef}>
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all duration-300 font-headline text-xs font-bold tracking-wider"
            >
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span>{currentLang.label}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isLangMenuOpen && (
              <div className="absolute right-0 mt-3 w-[320px] bg-[#131313]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                <div className="p-3 grid grid-cols-2 gap-1.5">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => changeLanguage(l.code)}
                      className={`w-full text-left px-4 py-3 text-sm font-headline rounded-xl transition-all duration-200 flex items-center justify-between group ${
                        i18n.language === l.code 
                          ? 'text-primary bg-primary/10 font-bold shadow-[inset_0_0_0_1px_rgba(75,226,119,0.2)]' 
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{l.full}</span>
                      {i18n.language === l.code && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Search className="text-primary cursor-pointer active:scale-95 transition-transform hidden md:block" />
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#131313]/95 backdrop-blur-xl border-b border-white/10 flex flex-col p-6 gap-4 font-headline text-sm font-medium shadow-2xl animate-in slide-in-from-top-2">
          <Link to={`/${lang}`} onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-primary py-2">{t('nav.home')}</Link>
          <Link to={`/${lang}/blog`} onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-primary py-2">{t('nav.blog')}</Link>
          <Link to={`/${lang}/games`} onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-primary py-2">{t('nav.games')}</Link>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#131313] border-t border-white/5 py-12 px-6 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="text-primary font-bold font-headline text-lg">NEURAL ARCHITECT</span>
          <p className="text-white/40 text-sm tracking-wide">© 2026 NEURAL ARCHITECT. POWERED BY DLSS 5.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-white/40 text-sm tracking-wide">
          <a href="#" className="hover:text-white transition-colors">Architecture</a>
          <a href="#" className="hover:text-white transition-colors">Benchmarks</a>
          <a href="#" className="hover:text-white transition-colors">Compatibility</a>
          <a href="#" className="hover:text-white transition-colors">Support</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
        </div>
        <div className="flex gap-4">
          <Globe className="w-5 h-5 text-white/20 hover:text-primary cursor-pointer transition-colors" />
          <Terminal className="w-5 h-5 text-white/20 hover:text-primary cursor-pointer transition-colors" />
          <Cpu className="w-5 h-5 text-white/20 hover:text-primary cursor-pointer transition-colors" />
        </div>
      </div>
    </footer>
  );
}
