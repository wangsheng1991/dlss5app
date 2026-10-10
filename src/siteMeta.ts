import { gpuData } from './data';

/**
 * 站点级口径 —— 预渲染脚本（Node）与浏览器端共用同一份，
 * 免得「共 135 个页面」「support@…」「复审日期」在三处各写一遍后互相打架。
 */

/** 本轮复核日期：型号页状态段、支持显卡页、信任页、文章 reviewed、sitemap lastmod 都取这里。 */
export const REVIEWED_DATE = '2026-10-10';

/** 两站共用的公开联系邮箱 —— 主站 /download 与法务页用的也是这个地址。 */
export const SUPPORT_EMAIL = 'support@dlss5nvidia.com';

/** 站点信息页（E-E-A-T 门槛那一组）：谁做的、按什么规矩写、怎么联系、怎么处理数据。 */
export const TRUST_PAGE_SLUGS = ['about', 'editorial-policy', 'contact', 'privacy'] as const;

export type TrustSlug = typeof TRUST_PAGE_SLUGS[number];

/** 每种语言下的路由数：首页 + studio + supported-cards + blog 索引 + 文章 + 型号页 + 四个站点信息页。 */
export const routesPerLanguage = (articleCount: number): number => 4 + articleCount + gpuData.gpus.length + TRUST_PAGE_SLUGS.length;

/** sitemap 与页面里写的总页数，三个语言一起算。 */
export const totalPageCount = (articleCount: number): number => 3 * routesPerLanguage(articleCount);
