import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Calendar } from 'lucide-react';

const blogPosts = [
  {
    slug: 'dlss-5-architecture-explained-blackwell-neural-rendering',
    title: {
      en: "DLSS 5 Architecture Explained: How Blackwell Powers Neural Rendering",
      zh: "DLSS 5 架构深度解析：Blackwell 如何驱动神经渲染"
    },
    description: {
      en: "A deep dive into the DLSS 5 architecture, explaining why neural rendering requires RTX 50 series Blackwell GPUs, Tensor Cores, and FP8 precision.",
      zh: "深入解析 DLSS 5 架构，揭秘为什么神经渲染需要 RTX 50 系列 Blackwell 显卡、Tensor Core 和 FP8 精度。"
    },
    date: '2026-04-13',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600',
    featured: true
  },
  {
    slug: 'what-is-dlss-5-neural-rendering-guide',
    title: {
      en: "What Is DLSS 5? The Complete Technical Guide to Neural Rendering (2026)",
      zh: "DLSS 5 是什么？神经渲染完全技术指南（2026）"
    },
    description: {
      en: "A complete technical guide to NVIDIA's DLSS 5 neural rendering technology, explaining how it differs from previous versions and what it means for the future of gaming.",
      zh: "NVIDIA DLSS 5 神经渲染技术的完全技术指南，解释它与以前版本的不同之处以及它对游戏未来的意义。"
    },
    date: '2026-04-11',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1600',
    featured: false
  },
  {
    slug: 'dlss5-vs-dlss4-vs-fsr4-comparison-2026',
    title: {
      en: "DLSS 5 vs DLSS 4 vs FSR 4: The 2026 Upscaling War, Explained",
      zh: "DLSS 5 vs DLSS 4 vs FSR 4：2026 超分辨率大战完全解析"
    },
    description: {
      en: "A detailed comparison of DLSS 5, DLSS 4, and FSR 4. Should you upgrade your GPU for DLSS 5? We break down the differences.",
      zh: "DLSS 5、DLSS 4 和 FSR 4 的详细对比。你应该为了 DLSS 5 升级显卡吗？我们为你解析差异。"
    },
    date: '2026-04-11',
    image: 'https://images.unsplash.com/photo-1655823769188-1234567890?auto=format&fit=crop&q=80&w=1600',
    featured: false
  },
  {
    slug: 'crimson-desert-pc-optimization-dlss-fsr-guide-2026',
    title: {
      en: "Crimson Desert PC Optimization Guide: DLSS 4.5, FSR 4, and Getting 60fps at 4K (2026)",
      zh: "绯红荒漠 PC 性能优化指南：DLSS 4.5、FSR 4 设置，4K 60fps 完整教程（2026）"
    },
    description: {
      en: "How to optimize Crimson Desert on PC for 4K 60fps using DLSS 4.5 and FSR 4. Best settings for RTX 50, RTX 40, and AMD GPUs.",
      zh: "如何使用 DLSS 4.5 和 FSR 4 在 PC 上优化绯红荒漠以实现 4K 60fps。RTX 50、RTX 40 和 AMD 显卡的最佳设置。"
    },
    date: '2026-04-11',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1600',
    featured: false
  },
  {
    slug: 'best-ai-image-upscaler-2026-comparison',
    title: {
      en: "AI Image Upscaling in 2026: Which Tool Is Actually Best?",
      zh: "2026 年 AI 图片超分辨率工具横评：哪个最好用？"
    },
    description: {
      en: "A comprehensive comparison of the best AI image upscaling tools in 2026, including free, open-source, and premium options.",
      zh: "2026 年最佳 AI 图片超分辨率工具的全面横评，包括免费、开源和高级付费选项。"
    },
    date: '2026-04-11',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600',
    featured: false
  },
  {
    slug: 'dlss5-artistic-vision-debate-honest-assessment',
    title: {
      en: "Will DLSS 5 Kill Artistic Vision in Games? An Honest Assessment",
      zh: "DLSS 5 会杀死游戏的艺术灵魂吗？一次诚实的评估"
    },
    description: {
      en: "A deep dive into the debate surrounding DLSS 5 and its impact on artistic vision and creative control in video games.",
      zh: "深入探讨围绕 DLSS 5 及其对视频游戏艺术愿景和创意控制影响的争论。"
    },
    date: '2026-04-11',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600',
    featured: false
  }
];

export default function BlogList() {
  const { i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const isZh = i18n.language.startsWith('zh');
  const currentLang = lang || 'en';

  const featuredPost = blogPosts.find(p => p.featured);
  const regularPosts = blogPosts.filter(p => !p.featured);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
      <Helmet>
        <title>{isZh ? 'DLSS 5 博客与新闻 | Neural Architect' : 'DLSS 5 Blog & News | Neural Architect'}</title>
        <meta name="description" content={isZh ? '探索 DLSS 5 的最新动态、技术分析和行业争议。' : 'Explore the latest updates, technical analysis, and industry controversies surrounding DLSS 5.'} />
        <link rel="canonical" href={`https://dlss5.app/${currentLang}/blog`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={isZh ? 'DLSS 5 博客与新闻 | Neural Architect' : 'DLSS 5 Blog & News | Neural Architect'} />
        <meta property="og:description" content={isZh ? '探索 DLSS 5 的最新动态、技术分析和行业争议。' : 'Explore the latest updates, technical analysis, and industry controversies surrounding DLSS 5.'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://dlss5.app/${currentLang}/blog`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isZh ? 'DLSS 5 博客与新闻 | Neural Architect' : 'DLSS 5 Blog & News | Neural Architect'} />
        <meta name="twitter:description" content={isZh ? '探索 DLSS 5 的最新动态、技术分析和行业争议。' : 'Explore the latest updates, technical analysis, and industry controversies surrounding DLSS 5.'} />
      </Helmet>
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">Neural Architect <span className="text-primary">Blog</span></h1>
        <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
          {isZh ? '探索 DLSS 5 的最新动态、技术分析和行业争议。' : 'Explore the latest updates, technical analysis, and industry controversies surrounding DLSS 5.'}
        </p>
      </div>

      {featuredPost && (
        <div className="mb-16">
          <Link to={`/${currentLang}/blog/${featuredPost.slug}`} className="group block relative rounded-3xl overflow-hidden border border-white/10 bg-surface-container hover:border-primary/50 transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-video md:aspect-auto overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={isZh ? featuredPost.title.zh : featuredPost.title.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#131313] via-[#131313]/50 to-transparent opacity-80 md:opacity-100"></div>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center relative z-10 bg-[#131313] md:bg-transparent -mt-20 md:mt-0">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase w-fit mb-6">
                  {isZh ? '热门文章' : 'Featured'}
                </div>
                <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4 group-hover:text-primary transition-colors">
                  {isZh ? featuredPost.title.zh : featuredPost.title.en}
                </h2>
                <p className="text-on-surface-variant text-lg mb-8 line-clamp-3">
                  {isZh ? featuredPost.description.zh : featuredPost.description.en}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:translate-x-2 transition-transform">
                    {isZh ? '阅读全文' : 'Read Article'} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regularPosts.map(post => (
          <Link key={post.slug} to={`/${currentLang}/blog/${post.slug}`} className="group block rounded-2xl overflow-hidden border border-white/10 bg-surface-container hover:border-primary/30 transition-all duration-300 flex flex-col h-full">
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={post.image} 
                alt={isZh ? post.title.zh : post.title.en}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-4">
                <Calendar className="w-3.5 h-3.5" />
                <span>{post.date}</span>
              </div>
              <h3 className="text-xl font-headline font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {isZh ? post.title.zh : post.title.en}
              </h3>
              <p className="text-on-surface-variant text-sm mb-6 line-clamp-3 flex-grow">
                {isZh ? post.description.zh : post.description.en}
              </p>
              <span className="inline-flex items-center gap-1 text-primary text-sm font-bold group-hover:gap-2 transition-all">
                {isZh ? '阅读全文' : 'Read Article'} <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
