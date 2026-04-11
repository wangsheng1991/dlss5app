import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Calendar } from 'lucide-react';

const blogPosts = [
  {
    slug: 'dlss5-ai-slop-controversy',
    title: {
      en: "DLSS 5 'AI Slop' Controversy: Everything That Happened",
      zh: "DLSS 5「AI Slop」争议全记录：一场关于游戏灵魂的战争"
    },
    description: {
      en: "NVIDIA's DLSS 5 was supposed to be the 'GPT moment for graphics.' Instead, it sparked one of gaming's biggest AI controversies. Here's the full timeline.",
      zh: "NVIDIA 的 DLSS 5 本该是「图形界的 GPT 时刻」。结果它引发了游戏史上最大的 AI 争议之一。以下是完整时间线。"
    },
    date: '2026-04-10',
    image: 'https://www.nvidia.com/content/nvidiaGDC/us/en_US/geforce/news/dlss5-breakthrough-in-visual-fidelity-for-games/jcr:content/root/responsivegrid/nv_container_392921705/header/nv_image.coreimg.100.1070.jpeg/1742147200424/dlss5-blog-social-share.jpeg',
    featured: true
  },
  {
    slug: 'dlss5-vs-dlss4-comparison',
    title: {
      en: "DLSS 5 vs DLSS 4: Complete Comparison",
      zh: "DLSS 5 vs DLSS 4 完整对比"
    },
    description: {
      en: "Should you upgrade for DLSS 5? A detailed breakdown of the differences, performance metrics, and visual quality.",
      zh: "为了 DLSS 5 升级显卡值得吗？详细解析差异、性能指标和视觉质量。"
    },
    date: '2026-04-15',
    image: 'https://images.unsplash.com/photo-1655823769188-1234567890?auto=format&fit=crop&q=80&w=1600',
    featured: false
  },
  {
    slug: 'ai-upscaling-vs-dlss5-neural-rendering',
    title: {
      en: "AI Upscaling vs DLSS 5 Neural Rendering: What's the Difference?",
      zh: "AI 超分 vs DLSS 5 Neural Rendering：有什么不同"
    },
    description: {
      en: "Understanding the relationship between post-processing AI upscaling and in-engine neural rendering.",
      zh: "理解后期 AI 超分与游戏内神经渲染之间的关系。"
    },
    date: '2026-04-20',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1600',
    featured: false
  }
];

export default function BlogList() {
  const { i18n } = useTranslation();
  const isZh = i18n.language.startsWith('zh');

  const featuredPost = blogPosts.find(p => p.featured);
  const regularPosts = blogPosts.filter(p => !p.featured);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
      <Helmet>
        <title>{isZh ? 'DLSS 5 博客与新闻 | Neural Architect' : 'DLSS 5 Blog & News | Neural Architect'}</title>
        <meta name="description" content={isZh ? '探索 DLSS 5 的最新动态、技术分析和行业争议。' : 'Explore the latest updates, technical analysis, and industry controversies surrounding DLSS 5.'} />
        <meta property="og:title" content={isZh ? 'DLSS 5 博客与新闻 | Neural Architect' : 'DLSS 5 Blog & News | Neural Architect'} />
        <meta property="og:description" content={isZh ? '探索 DLSS 5 的最新动态、技术分析和行业争议。' : 'Explore the latest updates, technical analysis, and industry controversies surrounding DLSS 5.'} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">Neural Architect <span className="text-primary">Blog</span></h1>
        <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
          {isZh ? '探索 DLSS 5 的最新动态、技术分析和行业争议。' : 'Explore the latest updates, technical analysis, and industry controversies surrounding DLSS 5.'}
        </p>
      </div>

      {featuredPost && (
        <div className="mb-16">
          <Link to={`/blog/${featuredPost.slug}`} className="group block relative rounded-3xl overflow-hidden border border-white/10 bg-surface-container hover:border-primary/50 transition-all duration-500">
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
          <Link key={post.slug} to={`/blog/${post.slug}`} className="group block rounded-2xl overflow-hidden border border-white/10 bg-surface-container hover:border-primary/30 transition-all duration-300 flex flex-col h-full">
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
