import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';

// Import all markdown files as raw strings
const markdownFiles = import.meta.glob('../content/*.md', { query: '?raw', import: 'default' });

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { i18n } = useTranslation();
  const isZh = i18n.language.startsWith('zh');
  
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadPost() {
      setLoading(true);
      setError(false);
      try {
        const path = `../content/${slug}.md`;
        if (markdownFiles[path]) {
          const rawContent = await markdownFiles[path]() as string;
          setContent(rawContent);
        } else {
          setError(true);
        }
      } catch (e) {
        console.error("Failed to load blog post:", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadPost();
    }
  }, [slug]);

  // Extract frontmatter and content
  const parseMarkdown = (raw: string) => {
    const frontmatterRegex = /---\n([\s\S]*?)\n---/;
    const match = raw.match(frontmatterRegex);
    
    let metadata: any = {};
    let markdownContent = raw;

    if (match) {
      const frontmatter = match[1];
      markdownContent = raw.replace(frontmatterRegex, '').trim();
      
      frontmatter.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
          let value = valueParts.join(':').trim();
          // Remove quotes if present
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1);
          }
          metadata[key.trim()] = value;
        }
      });
    }

    // Split content by language markers if they exist
    const enMarker = '<!-- ============================================================\n     ENGLISH VERSION\n     ============================================================ -->';
    const zhMarker = '<!-- ============================================================\n     CHINESE VERSION (中文版)\n     ============================================================ -->';
    
    let displayContent = markdownContent;
    
    if (markdownContent.includes(enMarker) && markdownContent.includes(zhMarker)) {
      const parts = markdownContent.split(zhMarker);
      if (isZh) {
        displayContent = parts[1] || markdownContent;
      } else {
        displayContent = parts[0].replace(enMarker, '') || markdownContent;
      }
    }

    return { metadata, content: displayContent };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-headline font-bold mb-4">Post Not Found</h1>
        <p className="text-on-surface-variant mb-8">The article you're looking for doesn't exist or hasn't been published yet.</p>
        <Link to="/blog" className="px-6 py-3 rounded-full bg-primary text-on-primary font-bold hover:bg-primary/90 transition-colors">
          Back to Blog
        </Link>
      </div>
    );
  }

  const { metadata, content: displayContent } = parseMarkdown(content);
  const title = isZh && metadata.title_cn ? metadata.title_cn : metadata.title;
  const description = isZh && metadata.description_cn ? metadata.description_cn : metadata.description;

  return (
    <article className="pb-32">
      <Helmet>
        <title>{title} | Neural Architect</title>
        {description && <meta name="description" content={description} />}
        <meta property="og:title" content={`${title} | Neural Architect`} />
        {description && <meta property="og:description" content={description} />}
        <meta property="og:type" content="article" />
        {metadata.og_image && <meta property="og:image" content={metadata.og_image} />}
      </Helmet>
      {/* Header */}
      <header className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#4be27733_0%,transparent_70%)]"></div>
        </div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 font-headline text-sm font-bold tracking-wider uppercase">
            <ArrowLeft className="w-4 h-4" />
            {isZh ? '返回博客' : 'Back to Blog'}
          </Link>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold leading-tight mb-8">
            {title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-on-surface-variant text-sm border-y border-white/10 py-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{metadata.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{isZh ? '8 分钟阅读' : '8 min read'}</span>
            </div>
            <button className="flex items-center gap-2 hover:text-white transition-colors ml-auto">
              <Share2 className="w-4 h-4" />
              <span>{isZh ? '分享' : 'Share'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="prose prose-invert prose-lg prose-primary max-w-none
          prose-headings:font-headline prose-headings:font-bold
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-on-surface-variant prose-p:leading-relaxed
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-white
          prose-hr:border-white/10 prose-hr:my-12
          prose-table:border-collapse prose-table:w-full
          prose-th:bg-surface-container-high prose-th:p-4 prose-th:text-left prose-th:border prose-th:border-white/10
          prose-td:p-4 prose-td:border prose-td:border-white/10
        ">
          <Markdown 
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({node, ...props}) => (
                <figure className="my-10">
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-surface-container-low group">
                    <img 
                      {...props} 
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 m-0" 
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none"></div>
                  </div>
                  {props.alt && (
                    <figcaption className="text-center text-sm text-on-surface-variant mt-4 font-medium px-4">
                      {props.alt}
                    </figcaption>
                  )}
                </figure>
              )
            }}
          >
            {displayContent}
          </Markdown>
        </div>
      </div>

      {/* Fixed CTA Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-[#131313]/95 backdrop-blur-xl border-t border-primary/20 p-4 z-50 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-headline font-bold text-white text-center sm:text-left">
            {isZh ? '想看看没有 AI slop 的图片增强效果？' : 'Want to see image enhancement without AI slop?'}
          </p>
          <a 
            href="https://dlss5nvidia.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="primary-gradient text-on-primary font-headline font-bold px-6 py-2.5 rounded-full text-sm whitespace-nowrap hover:shadow-[0_0_20px_rgba(75,226,119,0.4)] transition-all active:scale-95"
          >
            {isZh ? '试试我们的工具 →' : 'Try Our Tool →'}
          </a>
        </div>
      </div>
    </article>
  );
}
