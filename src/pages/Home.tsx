import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Menu, Search, Cpu, CheckCircle2, Check, Star, Zap, 
  ChevronDown, Globe, Terminal, X, ArrowRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { gpuData } from '../data';

export default function Home() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || 'en';
  return (
    <main className="pt-16">
      <Helmet>
        <title>DLSS 5 GPU Checker & Feature Matrix | Neural Architect</title>
        <meta name="description" content="What GPUs support DLSS 5? RTX 5090, 5080, and 5070 Ti confirmed. Check the full list of DLSS 5 supported cards and see if your RTX 40-series made the cut." />
        <link rel="canonical" href={`https://dlss5.app/${currentLang}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content="DLSS 5 GPU Checker & Feature Matrix | Neural Architect" />
        <meta property="og:description" content="What GPUs support DLSS 5? RTX 5090, 5080, and 5070 Ti confirmed. Check the full list of DLSS 5 supported cards and see if your RTX 40-series made the cut." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://dlss5.app/${currentLang}`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DLSS 5 GPU Checker & Feature Matrix | Neural Architect" />
        <meta name="twitter:description" content="What GPUs support DLSS 5? RTX 5090, 5080, and 5070 Ti confirmed. Check the full list of DLSS 5 supported cards and see if your RTX 40-series made the cut." />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Neural Architect",
            "url": "https://dlss5.app/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://dlss5.app/?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>
      <HeroSection />
      <AboutSection />
      <CompatibilitySection />
      <EvolutionMatrix />
      <FAQSection />
    </main>
  );
}

function getStatusBadge(status: string) {
  if (status === 'confirmed') return { key: 'status.confirmed', color: 'text-primary bg-primary/10' };
  if (status === 'unconfirmed') return { key: 'status.unconfirmed', color: 'text-secondary bg-secondary/10' };
  return { key: 'status.unsupported', color: 'text-error bg-error/10' };
}

function HeroSection() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<typeof gpuData.gpus>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [result, setResult] = useState<typeof gpuData.gpus[0] | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  useEffect(() => {
    setFocusedIndex(-1);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setNotFound(false);
    if (val.trim().length > 0) {
      const searchTerms = val.toLowerCase().split(/\s+/).filter(Boolean);
      const filtered = gpuData.gpus.filter(g => {
        const searchableText = `nvidia geforce ${g.name.toLowerCase()}`;
        return searchTerms.every(term => searchableText.includes(term));
      });
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
    setResult(null);
  };

  const handleSelect = (gpu: typeof gpuData.gpus[0]) => {
    setQuery(gpu.name);
    setResult(gpu);
    setNotFound(false);
    setShowSuggestions(false);
  };

  const handleCheck = () => {
    if (result) return;
    if (!query.trim()) return;
    
    const searchTerms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const matches = gpuData.gpus.filter(g => {
      const searchableText = `nvidia geforce ${g.name.toLowerCase()}`;
      return searchTerms.every(term => searchableText.includes(term));
    });

    if (matches.length > 0) {
      const exactMatch = matches.find(g => g.name.toLowerCase() === query.toLowerCase().replace(/nvidia|geforce/gi, '').trim());
      const selected = exactMatch || matches[0];
      setResult(selected);
      setQuery(selected.name);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (showSuggestions && focusedIndex >= 0 && focusedIndex < suggestions.length) {
        handleSelect(suggestions[focusedIndex]);
      } else {
        handleCheck();
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <section id="hero" className="relative min-h-[707px] flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#4be27722_0%,transparent_70%)]"></div>
      </div>
      <div className="relative z-30 w-full max-w-4xl text-center space-y-8">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[0.65rem] font-bold tracking-[0.2em] uppercase">
          {t('hero.badge')}
        </div>
        <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter leading-none">
          {t('hero.title1')} <br /><span className="text-primary">{t('hero.title2')}</span>
        </h1>
        <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          {t('hero.desc')}
        </p>
        
        <div className="w-full max-w-2xl mx-auto relative" ref={wrapperRef}>
          <div className="flex flex-col md:flex-row gap-4 p-2 rounded-xl bg-surface-container-low border border-outline-variant/20 shadow-2xl focus-within:border-primary/50 transition-colors">
            <div className="relative flex-grow flex items-center px-4">
              <Cpu className="text-outline-variant absolute left-4 w-5 h-5" />
              <input 
                type="text" 
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={t('hero.placeholder')} 
                className="w-full bg-transparent border-none focus:ring-0 focus:outline-none pl-10 py-4 text-on-surface placeholder:text-on-surface-variant/40"
              />
              {query && (
                <button onClick={() => { setQuery(''); setResult(null); setShowSuggestions(false); }} className="absolute right-4 text-on-surface-variant hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button 
              onClick={handleCheck}
              className="primary-gradient text-on-primary font-headline font-bold px-10 py-4 rounded-lg active:scale-95 transition-transform shadow-[0_0_20px_rgba(75,226,119,0.3)] hover:shadow-[0_0_30px_rgba(75,226,119,0.5)]">
              {t('hero.btn')}
            </button>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-[#131313]/95 backdrop-blur-xl border border-primary/20 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-[100] max-h-60 overflow-y-auto">
              {suggestions.map((gpu, index) => (
                <div 
                  key={gpu.id} 
                  onClick={() => handleSelect(gpu)}
                  className={`px-6 py-4 cursor-pointer flex justify-between items-center border-b border-white/5 last:border-0 transition-colors ${focusedIndex === index ? 'bg-primary/20 text-primary' : 'hover:bg-white/5'}`}
                >
                  <span className={`font-bold ${focusedIndex === index ? 'text-primary' : 'text-white'}`}>{gpu.name}</span>
                  <span className="text-sm text-on-surface-variant">{gpu.vram_gb}GB</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {result && (
          <div className="mt-8 w-full max-w-2xl mx-auto p-6 rounded-xl glass-card border border-outline-variant/20 shadow-2xl text-left animate-in fade-in slide-in-from-bottom-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div>
                <h3 className="text-2xl font-headline font-bold text-white">NVIDIA GeForce {result.name}</h3>
                <p className="text-on-surface-variant text-sm mt-1">
                  {gpuData.gpu_series.find(s => s.id === result.series)?.architecture} {t('hero.arch')} • {result.vram_gb}GB {t('hero.vram')}
                </p>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider ${getStatusBadge(result.dlss5_status).color}`}>
                {t(getStatusBadge(result.dlss5_status).key)}
              </span>
            </div>
            <p className="text-on-surface-variant text-sm border-t border-white/5 pt-4">
              {result.note || (result.dlss5 ? t('hero.supported') : t('hero.unsupported'))}
            </p>
          </div>
        )}

        {notFound && (
          <div className="mt-8 w-full max-w-2xl mx-auto p-6 rounded-xl glass-card border border-error/50 shadow-2xl text-left animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-3 text-error mb-2">
              <X className="w-6 h-6" />
              <h3 className="text-xl font-headline font-bold">{t('hero.notFound')}</h3>
            </div>
            <p className="text-on-surface-variant text-sm">
              {t('hero.notFoundDesc').replace('{{query}}', query)}
            </p>
          </div>
        )}
      </div>

      <div className="mt-20 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        <StatCard value={t('stats.s1_val')} label={t('stats.s1_lbl')} />
        <StatCard value={t('stats.s2_val')} label={t('stats.s2_lbl')} />
        <StatCard value={t('stats.s3_val')} label={t('stats.s3_lbl')} />
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: string, label: string }) {
  return (
    <div className="p-8 rounded-xl bg-surface-container border border-outline-variant/10 hover:bg-surface-container-high transition-colors">
      <span className="text-primary font-headline text-4xl font-bold">{value}</span>
      <p className="text-sm text-on-surface-variant mt-2 font-headline tracking-widest uppercase">{label}</p>
    </div>
  );
}

function AboutSection() {
  const { t } = useTranslation();
  return (
    <section className="bg-surface-container-low py-24 px-6">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl font-headline font-bold tracking-tight">{t('about.title1')} <span className="text-primary">{t('about.title2')}</span></h2>
          <div className="space-y-6 text-on-surface-variant leading-relaxed">
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-primary mt-1 w-5 h-5 shrink-0" />
              <div>
                <span className="font-bold block text-white">Blackwell Architecture Optimization</span>
                <span className="text-sm text-on-surface-variant">Specifically designed to leverage 5th Gen Tensor Cores.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-primary mt-1 w-5 h-5 shrink-0" />
              <div>
                <span className="font-bold block text-white">Neural Texture Compression</span>
                <span className="text-sm text-on-surface-variant">Reduces VRAM usage by up to 40% while increasing detail.</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-outline-variant/20 shadow-2xl">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCB_vIF29PCEy3nMF1PU4yMKEJBrthcOf2fRXhRN2f3PKMEi2CGdw6_YY8UpGulrbSsYDwsDdDyGYM6QxTZbP_QS0stYAYgfHzly9YTHX4goQy_rHzxtwE7dMpoO5gcvNWodeMo28OhPaTycD9NiiWMO99bM6F2Epn8IzirzBAKzDYue3QfGcb1Tg8jjfCOGViYgeDeq8IifohCx3O_HHc--O16WCCtkN5iQ0Wf4KQguv25yTo_JPkRzS3hV-wJ84dh67iuHKp2iiY" 
            alt="Neural Network Visualization" 
            className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"></div>
        </div>
      </div>
    </section>
  );
}

function CompatibilitySection() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('ALL');
  const filters = ['ALL', 'RTX 50 SERIES', 'RTX 40 SERIES', 'RTX 30 SERIES', 'RTX 20 SERIES'];

  const filteredGpus = gpuData.gpus.filter(gpu => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'RTX 50 SERIES') return gpu.series === 'rtx50';
    if (activeFilter === 'RTX 40 SERIES') return gpu.series === 'rtx40';
    if (activeFilter === 'RTX 30 SERIES') return gpu.series === 'rtx30';
    if (activeFilter === 'RTX 20 SERIES') return gpu.series === 'rtx20';
    return true;
  });

  return (
    <section id="checker" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div className="space-y-4">
          <h2 className="text-4xl font-headline font-bold">{t('checker.title1')} <span className="text-primary">{t('checker.title2')}</span></h2>
          <p className="text-on-surface-variant">{t('checker.desc')}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-headline text-sm transition-colors ${
                activeFilter === filter 
                  ? 'bg-primary text-on-primary font-bold' 
                  : 'bg-surface-container-highest text-on-surface-variant hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-surface-container rounded-xl overflow-hidden border border-outline-variant/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-high">
              <tr>
                <th className="px-8 py-5 font-headline text-xs font-bold tracking-widest text-on-surface-variant uppercase">{t('checker.col1')}</th>
                <th className="px-8 py-5 font-headline text-xs font-bold tracking-widest text-on-surface-variant uppercase">{t('checker.col2')}</th>
                <th className="px-8 py-5 font-headline text-xs font-bold tracking-widest text-on-surface-variant uppercase">{t('checker.col3')}</th>
                <th className="px-8 py-5 font-headline text-xs font-bold tracking-widest text-on-surface-variant uppercase text-right">{t('checker.col4')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredGpus.map((gpu, index) => (
                <tr key={gpu.id} className={`${index % 2 !== 0 ? 'bg-surface-container-low/50' : ''} hover:bg-white/5 transition-colors`}>
                  <td className="px-8 py-6 font-bold text-white">{gpu.name}</td>
                  <td className="px-8 py-6 text-on-surface-variant">{gpuData.gpu_series.find(s => s.id === gpu.series)?.architecture}</td>
                  <td className="px-8 py-6 text-on-surface-variant">{gpu.vram_gb}GB</td>
                  <td className="px-8 py-6 text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] tracking-wider font-bold ${getStatusBadge(gpu.dlss5_status).color}`}>
                      {t(getStatusBadge(gpu.dlss5_status).key)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function EvolutionMatrix() {
  const { t } = useTranslation();
  return (
    <section id="matrix" className="bg-surface-container-low py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-headline font-bold text-center mb-16">{t('matrix.title1')} <span className="text-primary">{t('matrix.title2')}</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Feature Column */}
          <div className="hidden md:flex flex-col gap-4">
            <div className="h-20 flex items-center px-4 font-headline text-xs font-bold tracking-widest text-on-surface-variant uppercase">{t('matrix.col1')}</div>
            {gpuData.feature_matrix.map((feature, i) => (
              <FeatureRow key={i} label={feature.label} />
            ))}
          </div>

          {/* RTX 30 Series */}
          <div className="flex flex-col gap-4 text-center">
            <div className="h-20 flex flex-col items-center justify-center font-headline text-lg font-bold">{t('matrix.col2')}</div>
            {gpuData.feature_matrix.map((feature, i) => (
              <StatusCell key={i} status={feature.rtx30 === 'yes' ? 'check' : 'none'} />
            ))}
          </div>

          {/* RTX 40 Series */}
          <div className="flex flex-col gap-4 text-center">
            <div className="h-20 flex flex-col items-center justify-center font-headline text-lg font-bold">{t('matrix.col3')}</div>
            {gpuData.feature_matrix.map((feature, i) => (
              <StatusCell key={i} status={feature.rtx40 === 'yes' ? 'check' : feature.rtx40 === 'unconfirmed' ? 'star' : 'none'} />
            ))}
          </div>

          {/* RTX 50 Series */}
          <div className="flex flex-col gap-4 text-center relative">
            <div className="absolute -top-4 inset-x-0 mx-auto w-fit px-3 py-1 bg-primary text-on-primary text-[10px] font-bold rounded-full z-10 tracking-wider">{t('matrix.badge')}</div>
            <div className="h-20 flex flex-col items-center justify-center font-headline text-lg font-bold text-primary">{t('matrix.col4')}</div>
            {gpuData.feature_matrix.map((feature, i) => (
              <StatusCell key={i} status={feature.rtx50 === 'confirmed' || feature.rtx50 === 'yes' ? 'check' : 'none'} highlight />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const FeatureRow: React.FC<{ label: string }> = ({ label }) => {
  return (
    <div className="bg-surface-container h-16 flex items-center px-6 rounded-lg text-sm border border-outline-variant/10 text-on-surface">
      {label}
    </div>
  );
};

const StatusCell: React.FC<{ status: 'check' | 'none' | 'star' | 'zap', highlight?: boolean }> = ({ status, highlight = false }) => {
  const baseClasses = "h-16 flex items-center justify-center rounded-lg border";
  const highlightClasses = highlight 
    ? "bg-primary/10 border-primary/30" 
    : "bg-surface-container border-outline-variant/10";

  return (
    <div className={`${baseClasses} ${highlightClasses}`}>
      {status === 'check' && <Check className="text-primary w-5 h-5" />}
      {status === 'star' && <Star className="text-secondary w-5 h-5" />}
      {status === 'zap' && <Zap className="text-primary w-5 h-5 fill-primary" />}
      {status === 'none' && <span className="text-on-surface-variant/20">—</span>}
    </div>
  );
};

function FAQSection() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6 max-w-3xl mx-auto">
      <h2 className="text-4xl font-headline font-bold text-center mb-16">{t('faq.title1')} <span className="text-primary">{t('faq.title2')}</span></h2>
      <div className="space-y-4">
        {gpuData.faq.map((faq, index) => (
          <div 
            key={index} 
            className="bg-surface-container rounded-xl border border-outline-variant/10 overflow-hidden transition-all duration-300"
          >
            <button 
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center px-8 py-6 text-left focus:outline-none"
            >
              <span className="font-bold text-white">{faq.q}</span>
              <ChevronDown className={`text-on-surface-variant transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
            </button>
            <div 
              className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-on-surface-variant leading-relaxed">
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
