import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { gpuData } from '../data';
import { REVIEWED_DATE, SUPPORT_EMAIL, totalPageCount, type TrustSlug } from '../siteMeta';
import { blogPosts } from './BlogList';

const canonicalHost = 'https://www.dlss5.app';

type Section = { heading: string; paragraphs: React.ReactNode[] };

type SiteInfoCopy = {
  title: string;
  description: string;
  eyebrow: string;
  sections: Section[];
};

/**
 * 四个站点信息页的正文。措辞与预渲染脚本 scripts/prerender-seo.ts 里的 trustPage() 保持一致：
 * 谁做的、按什么规矩写、怎么联系、怎么处理数据。只写本站已经成立的事实，不写承诺。
 */
function copyFor(slug: TrustSlug, lang: string): SiteInfoCopy {
  const isEnglish = lang === 'en';
  const isTraditional = lang === 'zh-TW';
  const mail = <a className="text-primary underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>;
  const counts = { gpus: gpuData.gpus.length, pages: totalPageCount(blogPosts.length) };
  const link = (to: string, label: string) => <Link className="text-primary underline" to={to}>{label}</Link>;

  if (slug === 'about') {
    return {
      title: isEnglish ? 'About the DLSS 5 GPU evidence checker' : isTraditional ? '關於本站：DLSS 5 顯示卡證據檢查器' : '关于本站：DLSS 5 显卡证据检测器',
      description: isEnglish
        ? `Who publishes the DLSS 5 GPU evidence checker at dlss5.app, what it does and does not claim, and how it relates to dlss5nvidia.com. Reviewed ${REVIEWED_DATE}.`
        : isTraditional
          ? `dlss5.app 的 DLSS 5 顯示卡證據檢查器由誰發布、聲明什麼與不聲明什麼、與 dlss5nvidia.com 是什麼關係。複審日期 ${REVIEWED_DATE}。`
          : `dlss5.app 的 DLSS 5 显卡证据检测器由谁发布、声明什么与不声明什么、与 dlss5nvidia.com 是什么关系。复审日期 ${REVIEWED_DATE}。`,
      eyebrow: 'NEURAL ARCHITECT',
      sections: isEnglish
        ? [
            { heading: 'What this site is', paragraphs: [
              `Neural Architect is an independent, free DLSS 5 GPU compatibility checker published at https://www.dlss5.app. It maps ${counts.gpus} GeForce RTX models to the public NVIDIA source behind each status, in English, Simplified Chinese and Traditional Chinese — ${counts.pages} pages in total. Every model has its own page carrying the card's hardware record, its DLSS 5 status and the source for both.`,
              'The site answers one question: can this card run DLSS 5, and what is the evidence? It does not sell anything, does not require an account and does not scan your computer.',
            ] },
            { heading: 'How it relates to dlss5nvidia.com', paragraphs: [
              <><a className="text-primary underline" href="https://www.dlss5nvidia.com/">dlss5nvidia.com</a> is the product and workflow site — the local DLSS 5 Studio software, the visual converter, model workflows and the download page. This site is the evidence desk: compatibility, per-card records and the sources behind them. Both are published by the same team and are meant to be read together, so a &ldquo;can my card run it&rdquo; question and a &ldquo;how do I use it&rdquo; question do not get answered with the same page.</>,
            ] },
            { heading: 'What this site does not claim', paragraphs: [
              'It is not affiliated with, endorsed by or connected to NVIDIA. It publishes no compatibility claim that is not backed by an official NVIDIA source or a published specification table. It does not turn community reports, leaks or predictions into a status, and it publishes no benchmark ranking between models.',
              'Where the evidence is missing, the record says so: "unconfirmed" means we found no official model-level statement, not that the card has been rejected.',
            ] },
            { heading: 'How the data is maintained', paragraphs: [
              <>Statuses and hardware records are updated when NVIDIA publishes verifiable information; each affected page carries its own review date. The rules we hold ourselves to are written out on the {link(`/${lang}/editorial-policy`, 'editorial policy')} page.</>,
            ] },
            { heading: 'Contact', paragraphs: [
              <>Corrections, source suggestions and questions: {mail}. How to reach us, and what we can and cannot answer, is on the {link(`/${lang}/contact`, 'contact page')}.</>,
            ] },
          ]
        : [
            { heading: isTraditional ? '這是什麼站' : '这是什么站', paragraphs: [
              isTraditional
                ? `Neural Architect 是獨立的免費 DLSS 5 顯示卡相容性檢查器，發佈在 https://www.dlss5.app。本站把 ${counts.gpus} 款 GeForce RTX 型號逐一對應到每條狀態背後的 NVIDIA 公開來源，以英文、簡體中文、繁體中文三種語言發佈，共 ${counts.pages} 個頁面。每款型號都有自己的頁面，上面有這張卡的硬體紀錄、DLSS 5 狀態，以及兩者各自的來源。`
                : `Neural Architect 是独立的免费 DLSS 5 显卡兼容性检测器，发布在 https://www.dlss5.app。本站把 ${counts.gpus} 款 GeForce RTX 型号逐一对应到每条状态背后的 NVIDIA 公开来源，以英文、简体中文、繁体中文三种语言发布，共 ${counts.pages} 个页面。每款型号都有自己的页面，上面有这张卡的硬件记录、DLSS 5 状态，以及两者各自的来源。`,
              isTraditional
                ? '本站只回答一個問題：這張卡能不能執行 DLSS 5，憑什麼這麼說。這裡不賣東西、不要求註冊，也不會掃描你的電腦。'
                : '本站只回答一个问题：这张卡能不能运行 DLSS 5，凭什么这么说。这里不卖东西、不要求注册，也不会扫描你的电脑。',
            ] },
            { heading: isTraditional ? '與 dlss5nvidia.com 的關係' : '与 dlss5nvidia.com 的关系', paragraphs: [
              isTraditional
                ? <>兩個站由同一個團隊維護，是要一起看的。<a className="text-primary underline" href="https://www.dlss5nvidia.com/">dlss5nvidia.com</a> 是產品與工作流程站——本機 DLSS 5 Studio 軟體、視覺轉換器、模型工作流程與下載頁；本站是證據台：相容性、逐卡紀錄與它們的來源。這樣分開是刻意的，「我的卡能不能跑」和「我要怎麼用」不該用同一頁回答。</>
                : <>两个站由同一个团队维护，是要一起看的。<a className="text-primary underline" href="https://www.dlss5nvidia.com/">dlss5nvidia.com</a> 是产品与工作流站——本地 DLSS 5 Studio 软件、视觉转换器、模型工作流与下载页；本站是证据台：兼容性、逐卡记录与它们的来源。这样分开是刻意的，「我的卡能不能跑」和「我要怎么用」不该用同一页回答。</>,
            ] },
            { heading: isTraditional ? '本站不聲明什麼' : '本站不声明什么', paragraphs: [
              isTraditional
                ? '本站與 NVIDIA 沒有隸屬、背書或合作關係。凡是官方聲明或公開規格表支持不了的相容性結論，我們都不寫；也不把社群說法、洩露或預測寫成狀態，不發布型號之間的效能排名。'
                : '本站与 NVIDIA 没有隶属、背书或合作关系。凡是官方声明或公开规格表支持不了的兼容性结论，我们都不写；也不把社区说法、泄露或预测写成状态，不发布型号之间的性能排名。',
              isTraditional
                ? '證據不足時，紀錄就照實寫：「尚未確認」代表我們沒有找到官方型號級聲明，不代表這張卡被否定。'
                : '证据不足时，记录就照实写：「未确认」代表我们没有找到官方型号级声明，不代表这张卡被否定。',
            ] },
            { heading: isTraditional ? '資料怎麼維護' : '数据怎么维护', paragraphs: [
              isTraditional
                ? <>NVIDIA 發布可核實資訊時更新狀態與硬體紀錄；受影響的頁面各自標註複審日期。我們給自己定的規矩寫在{link(`/${lang}/editorial-policy`, '編輯政策')}頁。</>
                : <>NVIDIA 发布可核实信息时更新状态与硬件记录；受影响的页面各自标注复审日期。我们给自己定的规矩写在{link(`/${lang}/editorial-policy`, '编辑政策')}页。</>,
            ] },
            { heading: isTraditional ? '聯絡' : '联系', paragraphs: [
              isTraditional
                ? <>更正、補充來源或提問：{mail}。怎麼找我們、我們能答什麼與不能答什麼，寫在{link(`/${lang}/contact`, '聯絡頁')}。</>
                : <>更正、补充来源或提问：{mail}。怎么找我们、我们能答什么与不能答什么，写在{link(`/${lang}/contact`, '联系页')}。</>,
            ] },
          ],
    };
  }

  if (slug === 'editorial-policy') {
    return {
      title: isEnglish ? 'DLSS 5 editorial policy and review dates' : isTraditional ? '編輯政策：DLSS 5 狀態與硬體紀錄的來源規矩' : '编辑政策：DLSS 5 状态与硬件记录的来源规矩',
      description: isEnglish
        ? `The rules behind every DLSS 5 status on dlss5.app — what counts as evidence, what we refuse to publish, how review dates work. Reviewed ${REVIEWED_DATE}.`
        : isTraditional
          ? `dlss5.app 上每條 DLSS 5 狀態背後的規矩：什麼算證據、我們拒寫什麼、複審日期怎麼運作。複審日期 ${REVIEWED_DATE}。`
          : `dlss5.app 上每条 DLSS 5 状态背后的规矩：什么算证据、我们拒写什么、复审日期怎么运作。复审日期 ${REVIEWED_DATE}。`,
      eyebrow: 'NEURAL ARCHITECT',
      sections: isEnglish
        ? [
            { heading: 'One status, one source', paragraphs: [
              'Every card carries one of three statuses, and each one has a specific evidence requirement. Nothing is written into a status field on the strength of a plausible argument.',
              'Confirmed: NVIDIA has published a scope covering this model — evidence required is an official NVIDIA statement or an official gameplay list. Unconfirmed: no official model-level statement exists yet — an NVIDIA source is linked and community claims are excluded. Not supported: the model sits outside the published compatibility scope, decided from its architecture plus official compatibility information.',
            ] },
            { heading: 'What counts as a source', paragraphs: [
              `Official NVIDIA announcements, product pages, driver release notes and published specification tables. For the per-card hardware record — launch date, die, CUDA cores, memory bus, board power — we use the published GeForce RTX series specification tables, which cite NVIDIA's own product pages and architecture whitepapers; each model page prints the source link and the date we read it (${REVIEWED_DATE}).`,
              'Where a card exists in more than one memory configuration, the record is matched to the configuration this site lists, so the spec row and the VRAM column can never disagree.',
            ] },
            { heading: 'What we refuse to publish', paragraphs: [
              'Community reports, mod results, leaks and launch-date guesses are not evidence and are never turned into a status. We publish no ranking between models and no performance percentage unless we measured it ourselves. Where our own measurement exists it is labelled as a single-machine result with the machine, the driver and the input given — the RTX 4090 video run on this site is exactly that: one configuration, not a promise about yours.',
            ] },
            { heading: 'Freshness', paragraphs: [
              "Model pages and articles carry a review date, and the sitemap's lastmod value is taken from the same field, so the page and the sitemap can never disagree about how current a claim is. A page is only given a new review date when its claims were actually re-checked against their sources.",
            ] },
            { heading: 'Corrections', paragraphs: [
              <>When a claim turns out to be wrong or the source has changed, we change the page and update its review date. If you find an error, write to {mail} with the URL and the source you are comparing against.</>,
            ] },
          ]
        : [
            { heading: isTraditional ? '一條狀態，一個來源' : '一条状态，一个来源', paragraphs: [
              isTraditional
                ? '每張卡只會落在三種狀態之一，每種狀態都有明確的證據要求。不會因為「說得通」就往狀態欄裡寫東西。'
                : '每张卡只会落在三种状态之一，每种状态都有明确的证据要求。不会因为「说得通」就往状态栏里写东西。',
              isTraditional
                ? '已確認：NVIDIA 已公佈涵蓋該型號的適用範圍，證據是官方聲明或官方遊戲名單。尚未確認：目前沒有官方型號級聲明，我們掛上 NVIDIA 來源並排除社群說法。不支援：落在已公佈的相容範圍之外，依架構與官方相容說明判定。'
                : '已确认：NVIDIA 已公布覆盖该型号的适用范围，证据是官方声明或官方游戏名单。未确认：目前没有官方型号级声明，我们挂上 NVIDIA 来源并排除社区说法。不支持：落在已公布的兼容范围之外，依架构与官方兼容说明判定。',
            ] },
            { heading: isTraditional ? '什麼算來源' : '什么算来源', paragraphs: [
              isTraditional
                ? `NVIDIA 官方公告、產品頁、驅動程式發行說明，以及公開的規格表。逐卡的硬體紀錄——發佈時間、核心代號、CUDA 核心數、顯存位寬、整卡功耗——取自公開的 GeForce RTX 系列規格表，該表引用 NVIDIA 自己的產品頁與架構白皮書；每個型號頁都印出來源連結與我們讀取的日期（${REVIEWED_DATE}）。`
                : `NVIDIA 官方公告、产品页、驱动发行说明，以及公开的规格表。逐卡的硬件记录——发布时间、核心代号、CUDA 核心数、显存位宽、整卡功耗——取自公开的 GeForce RTX 系列规格表，该表引用 NVIDIA 自己的产品页与架构白皮书；每个型号页都印出来源链接与我们读取的日期（${REVIEWED_DATE}）。`,
              isTraditional
                ? '同一款卡存在多種顯存配置時，紀錄對齊本站列出的那一種，因此規格列與顯存欄不會互相矛盾。'
                : '同一款卡存在多种显存配置时，记录对齐本站列出的那一种，因此规格列与显存栏不会互相矛盾。',
            ] },
            { heading: isTraditional ? '我們拒寫什麼' : '我们拒写什么', paragraphs: [
              isTraditional
                ? '社群說法、改機結果、洩露與發布日期猜測都不算證據，也不會被寫成狀態。我們不發布型號之間的排名；沒有自己測過的效能百分比也不寫。確實有自己實測的地方，會標明是單機單配置的結果並附上機器、驅動與輸入——本站 RTX 4090 的那組影片數據就是如此：一個配置的結果，不是對你那台的承諾。'
                : '社区说法、改机结果、泄露与发布日期猜测都不算证据，也不会被写成状态。我们不发布型号之间的排名；没有自己测过的性能百分比也不写。确实有自己实测的地方，会标明是单机单配置的结果并附上机器、驱动与输入——本站 RTX 4090 的那组视频数据就是如此：一个配置的结果，不是对你那台的承诺。',
            ] },
            { heading: isTraditional ? '新鮮度' : '新鲜度', paragraphs: [
              isTraditional
                ? '型號頁與文章都標註複審日期，sitemap 的 lastmod 取同一個值，所以頁面與 sitemap 不會對「這條結論有多新」各說各話。只有在真的回到來源核對過之後，頁面才會更新複審日期。'
                : '型号页与文章都标注复审日期，sitemap 的 lastmod 取同一个值，所以页面与 sitemap 不会对「这条结论有多新」各说各话。只有在真的回到来源核对过之后，页面才会更新复审日期。',
            ] },
            { heading: isTraditional ? '更正' : '更正', paragraphs: [
              isTraditional
                ? <>如果某條結論是錯的，或來源變了，我們改頁面並更新複審日期。發現錯誤時，請把網址與你對照的來源寄到 {mail}。</>
                : <>如果某条结论是错的，或来源变了，我们改页面并更新复审日期。发现错误时，请把网址与你对照的来源寄到 {mail}。</>,
            ] },
          ],
    };
  }

  if (slug === 'contact') {
    return {
      title: isEnglish ? 'Contact the DLSS 5 evidence checker' : isTraditional ? '聯絡 DLSS 5 顯示卡證據檢查器' : '联系 DLSS 5 显卡证据检测器',
      description: isEnglish
        ? `How to reach Neural Architect about a DLSS 5 status, a source or a correction — and what this site cannot answer. Reviewed ${REVIEWED_DATE}.`
        : isTraditional
          ? `如何就 DLSS 5 狀態、來源或更正與 Neural Architect 聯絡，以及本站不能回答什麼。複審日期 ${REVIEWED_DATE}。`
          : `如何就 DLSS 5 状态、来源或更正与 Neural Architect 联系，以及本站不能回答什么。复审日期 ${REVIEWED_DATE}。`,
      eyebrow: 'NEURAL ARCHITECT',
      sections: isEnglish
        ? [
            { heading: 'Email', paragraphs: [<>Contact: {mail} — the same mailbox the software and billing pages use. Both sites are read by the same team.</>] },
            { heading: 'What we can help with', paragraphs: [
              'A status that looks wrong, a source we have missed for a specific card, a hardware value that does not match the specification table, a broken link, or a page that needs re-review. Include the URL and, where you have one, the source you are comparing against — that is usually enough to act on.',
            ] },
            { heading: 'What we cannot answer', paragraphs: [
              <>We cannot say when NVIDIA will publish support for a given generation, whether a specific unreleased game will ship DLSS 5, or what performance your machine will produce. Those are not things this site measures, and inventing an answer would contradict the {link(`/${lang}/editorial-policy`, 'editorial policy')} it publishes.</>,
            ] },
            { heading: 'Looking for the software instead?', paragraphs: [
              <>The local DLSS 5 Studio build, its requirements and its measured results are on <a className="text-primary underline" href="https://www.dlss5nvidia.com/download">dlss5nvidia.com/download</a>; subscription questions go to the same address. This site only covers whether a card is in scope and on what evidence.</>,
            ] },
            { heading: 'Security note', paragraphs: [
              'We never ask for passwords, payment details or remote access by email. Anything requesting those is not from us.',
            ] },
          ]
        : [
            { heading: isTraditional ? '電子郵件' : '电子邮件', paragraphs: [
              isTraditional ? <>{mail}——與軟體、付款頁面用的是同一個信箱。兩個站由同一批人讀。</> : <>{mail}——与软件、付款页面用的是同一个邮箱。两个站由同一批人读。</>,
            ] },
            { heading: isTraditional ? '我們能幫什麼' : '我们能帮什么', paragraphs: [
              isTraditional
                ? '某條狀態看起來不對、某款卡我們漏了來源、某個硬體數值與規格表不符、連結失效，或某頁需要重新複審。請附上網址；如果你有對照的來源也一併附上——通常這樣就足以處理。'
                : '某条状态看起来不对、某款卡我们漏了来源、某个硬件数值与规格表不符、链接失效，或某页需要重新复审。请附上网址；如果你有对照的来源也一并附上——通常这样就足以处理。',
            ] },
            { heading: isTraditional ? '我們不能答什麼' : '我们不能答什么', paragraphs: [
              isTraditional
                ? <>我們不能說 NVIDIA 什麼時候會為某代顯示卡發布支援、某款未上市遊戲會不會支援 DLSS 5，也無法預測你那台機器的效能。這些不是本站測得到的事，硬編一個答案會違背本站公開的{link(`/${lang}/editorial-policy`, '編輯政策')}。</>
                : <>我们不能说 NVIDIA 什么时候会为某代显卡发布支持、某款未上市游戏会不会支持 DLSS 5，也无法预测你那台机器的性能。这些不是本站测得到的事，硬编一个答案会违背本站公开的{link(`/${lang}/editorial-policy`, '编辑政策')}。</>,
            ] },
            { heading: isTraditional ? '你要找的是軟體？' : '你要找的是软件？', paragraphs: [
              isTraditional
                ? <>本機 DLSS 5 Studio 版本、執行要求與實測結果在 <a className="text-primary underline" href="https://www.dlss5nvidia.com/download">dlss5nvidia.com/download</a>；訂閱相關問題寄同一個信箱。本站只負責這張卡在不在範圍內、憑什麼。</>
                : <>本地 DLSS 5 Studio 版本、运行要求与实测结果在 <a className="text-primary underline" href="https://www.dlss5nvidia.com/download">dlss5nvidia.com/download</a>；订阅相关问题寄同一个邮箱。本站只负责这张卡在不在范围内、凭什么。</>,
            ] },
            { heading: isTraditional ? '安全提醒' : '安全提醒', paragraphs: [
              isTraditional ? '我們不會用郵件索取密碼、付款資訊或遠端存取權限。任何索取這些的郵件都不是我們發的。' : '我们不会用邮件索取密码、付款信息或远程访问权限。任何索取这些的邮件都不是我们发的。',
            ] },
          ],
    };
  }

  return {
    title: isEnglish ? 'Privacy: what dlss5.app collects' : isTraditional ? '隱私：dlss5.app 收集什麼、不收集什麼' : '隐私：dlss5.app 收集什么、不收集什么',
    description: isEnglish
      ? `No accounts, no uploads, no scanning script, and no advertising. Google Analytics 4 measures aggregated route traffic and events. The external services this site relies on, and what they see. Reviewed ${REVIEWED_DATE}.`
      : isTraditional
        ? `不要求註冊、不收上傳、不跑掃描腳本，也沒有廣告。Google Analytics 4 只量測彙總的路由流量與事件。本站依賴的外部服務，以及它們能看到什麼。複審日期 ${REVIEWED_DATE}。`
        : `不要求注册、不收上传、不跑扫描脚本，也没有广告。Google Analytics 4 只量测汇总的路由流量与事件。本站依赖的外部服务，以及它们能看到什么。复审日期 ${REVIEWED_DATE}。`,
    eyebrow: 'NEURAL ARCHITECT',
    sections: isEnglish
      ? [
          { heading: 'What this site does not do', paragraphs: [
            'No account is required and none can be created. No file can be uploaded here. No script on this site reads your hardware: the checker is a published data set, not a scan of your computer. There is no newsletter and no advertising.',
            'Queries you type into the checker are handled in your browser; the URL of a model page is a plain path, so nothing about your machine is sent to us when you open it.',
          ] },
          { heading: 'The external services this site uses', paragraphs: [
            <><strong className="text-white">Google Fonts</strong> — the page loads its typefaces from fonts.googleapis.com and fonts.gstatic.com. Your IP address and browser user agent are sent to Google as part of that request; that is a Google service, governed by Google&apos;s own privacy terms.</>,
            <><strong className="text-white">Vercel hosting</strong> — the site is served by Vercel, which keeps standard request logs (IP address, user agent, timestamp, requested path) as any web host does.</>,
            'Article pages with a share image load that image from the Unsplash CDN (images.unsplash.com).',
          ] },
          { heading: 'Third-party analytics and ads', paragraphs: [
            'Google Analytics 4 is loaded after the page load event to measure aggregated route traffic and product events. We send the page path, language and event name; we do not send GPU queries, files, account details or advertising identifiers. This site runs no advertising script.',
          ] },
          { heading: 'Payments', paragraphs: [
            <>Nothing is sold on this site and no payment details are collected here. The paid product lives on <a className="text-primary underline" href="https://www.dlss5nvidia.com/">dlss5nvidia.com</a>, and its own privacy, refund and terms pages govern that transaction.</>,
          ] },
          { heading: 'Outbound links', paragraphs: [
            "Pages here link to NVIDIA's own announcements and to dlss5nvidia.com. Once you follow an outbound link, the destination site's own privacy policy applies.",
          ] },
          { heading: 'Questions', paragraphs: [<>Write to {mail} with the URL you are asking about.</>] },
        ]
      : [
          { heading: isTraditional ? '本站不做什麼' : '本站不做什么', paragraphs: [
            isTraditional
              ? '不需要註冊，也沒有註冊功能。本站不接受任何檔案上傳。本站沒有腳本會去讀你的硬體：檢查器是一份公開資料集，不是對你電腦的掃描。沒有電子報，也沒有廣告。'
              : '不需要注册，也没有注册功能。本站不接受任何文件上传。本站没有脚本会去读你的硬件：检测器是一份公开数据集，不是对你电脑的扫描。没有订阅邮件，也没有广告。',
            isTraditional
              ? '你在檢查器裡輸入的查詢在瀏覽器內處理；型號頁的網址就是一條普通路徑，開啟它不會送出任何關於你機器的資訊。'
              : '你在检测器里输入的查询在浏览器内处理；型号页的网址就是一条普通路径，打开它不会送出任何关于你机器的信息。',
          ] },
          { heading: isTraditional ? '本站用到的外部服務' : '本站用到的外部服务', paragraphs: [
            isTraditional
              ? <><strong className="text-white">Google Fonts</strong>——頁面從 fonts.googleapis.com 與 fonts.gstatic.com 載入字型。這個請求會把你的 IP 位址與瀏覽器 UA 送給 Google；那是 Google 的服務，適用 Google 自己的隱私條款。</>
              : <><strong className="text-white">Google Fonts</strong>——页面从 fonts.googleapis.com 与 fonts.gstatic.com 加载字体。这个请求会把你的 IP 地址与浏览器 UA 送给 Google；那是 Google 的服务，适用 Google 自己的隐私条款。</>,
            isTraditional
              ? <><strong className="text-white">Vercel 託管</strong>——本站由 Vercel 提供服務，跟任何網站主機一樣會保留標準請求日誌（IP 位址、UA、時間、請求路徑）。</>
              : <><strong className="text-white">Vercel 托管</strong>——本站由 Vercel 提供服务，跟任何网站主机一样会保留标准请求日志（IP 地址、UA、时间、请求路径）。</>,
            isTraditional
              ? '帶分享圖的文章頁，該圖片從 Unsplash 的 CDN（images.unsplash.com）載入。'
              : '带分享图的文章页，该图片从 Unsplash 的 CDN（images.unsplash.com）加载。',
          ] },
          { heading: isTraditional ? '第三方分析與廣告' : '第三方分析与广告', paragraphs: [
            isTraditional
              ? 'Google Analytics 4 會在頁面載入後載入，用來量測彙總的路由流量與產品事件。我們只送出頁面路徑、語言與事件名稱，不送出 GPU 查詢、檔案、帳號資料或廣告識別碼。本站不執行廣告腳本。'
              : 'Google Analytics 4 会在页面加载后加载，用来量测汇总的路由流量与产品事件。我们只送出页面路径、语言与事件名称，不送出 GPU 查询、文件、账号资料或广告识别码。本站不执行广告脚本。',
          ] },
          { heading: isTraditional ? '付款' : '付款', paragraphs: [
            isTraditional
              ? <>本站不販售任何東西，也不在此收集付款資訊。付費產品在 <a className="text-primary underline" href="https://www.dlss5nvidia.com/">dlss5nvidia.com</a>，該筆交易適用它自己的隱私、退款與條款頁。</>
              : <>本站不销售任何东西，也不在此收集付款信息。付费产品在 <a className="text-primary underline" href="https://www.dlss5nvidia.com/">dlss5nvidia.com</a>，该笔交易适用它自己的隐私、退款与条款页。</>,
          ] },
          { heading: isTraditional ? '對外連結' : '对外链接', paragraphs: [
            isTraditional
              ? '本站頁面會連結到 NVIDIA 自己的公告與 dlss5nvidia.com。一旦你離開本站，目的地網站的隱私政策適用於那裡。'
              : '本站页面会链接到 NVIDIA 自己的公告与 dlss5nvidia.com。一旦你离开本站，目的地网站的隐私政策适用于那里。',
          ] },
          { heading: isTraditional ? '問題' : '问题', paragraphs: [
            isTraditional ? <>請把你要問的網址附上，寄到 {mail}。</> : <>请把你要问的网址附上，寄到 {mail}。</>,
          ] },
        ],
  };
}

const headingFor = (slug: TrustSlug, lang: string): string => {
  const isEnglish = lang === 'en';
  const isTraditional = lang === 'zh-TW';
  if (slug === 'about') return isEnglish ? 'About this site' : isTraditional ? '關於本站' : '关于本站';
  if (slug === 'editorial-policy') return isEnglish ? 'Editorial policy' : isTraditional ? '編輯政策' : '编辑政策';
  if (slug === 'contact') return isEnglish ? 'Contact' : isTraditional ? '聯絡我們' : '联系我们';
  return isEnglish ? 'Privacy' : isTraditional ? '隱私' : '隐私';
};

export default function SiteInfo({ slug }: { slug: TrustSlug }) {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const isEnglish = lang === 'en';
  const isTraditional = lang === 'zh-TW';
  const content = copyFor(slug, lang);
  const heading = headingFor(slug, lang);
  const reviewedLine = isEnglish ? `Last reviewed ${REVIEWED_DATE}` : isTraditional ? `內容複審 ${REVIEWED_DATE}` : `内容复审 ${REVIEWED_DATE}`;

  return (
    <main className="pt-32 px-6 pb-24">
      <Helmet>
        <title>{content.title} | Neural Architect</title>
        <meta name="description" content={content.description} />
        <link rel="canonical" href={`${canonicalHost}/${lang}/${slug}`} />
        <meta property="og:title" content={`${content.title} | Neural Architect`} />
        <meta property="og:description" content={content.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${canonicalHost}/${lang}/${slug}`} />
        <meta name="twitter:card" content="summary" />
      </Helmet>

      <div className="mx-auto max-w-3xl space-y-10">
        <nav aria-label={isEnglish ? 'Breadcrumb' : isTraditional ? '麵包屑' : '面包屑'} className="text-sm text-on-surface-variant">
          <Link className="text-primary underline" to={`/${lang}`}>{isEnglish ? 'Home' : isTraditional ? '首頁' : '首页'}</Link>
          <span className="px-2">/</span>
          <span>{heading}</span>
        </nav>

        <header className="space-y-4">
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">{content.eyebrow}</p>
          <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-white">{heading}</h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">{content.description}</p>
          <p className="text-sm text-on-surface-variant/80">{reviewedLine}</p>
        </header>

        <div className="space-y-10">
          {content.sections.map(section => (
            <section key={section.heading} className="space-y-4">
              <h2 className="text-2xl font-headline font-bold text-white">{section.heading}</h2>
              {section.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-on-surface-variant leading-relaxed">{paragraph}</p>
              ))}
            </section>
          ))}
        </div>

        <nav className="flex flex-wrap gap-4 border-t border-outline-variant/20 pt-6 text-sm" aria-label={isEnglish ? 'Site information' : isTraditional ? '站點資訊' : '站点信息'}>
          <Link className="text-primary underline" to={`/${lang}/about`}>{isEnglish ? 'About' : isTraditional ? '關於本站' : '关于本站'}</Link>
          <Link className="text-primary underline" to={`/${lang}/editorial-policy`}>{isEnglish ? 'Editorial policy' : isTraditional ? '編輯政策' : '编辑政策'}</Link>
          <Link className="text-primary underline" to={`/${lang}/contact`}>{isEnglish ? 'Contact' : isTraditional ? '聯絡我們' : '联系我们'}</Link>
          <Link className="text-primary underline" to={`/${lang}/privacy`}>{isEnglish ? 'Privacy' : isTraditional ? '隱私' : '隐私'}</Link>
          <a className="text-primary underline" href="/llms.txt">{isEnglish ? 'Machine-readable summary' : isTraditional ? '給機器讀的摘要' : '给机器读的摘要'}</a>
          <a className="text-primary underline" href="https://www.dlss5nvidia.com/download">{isEnglish ? 'DLSS 5 Studio on dlss5nvidia.com' : 'DLSS 5 Studio（dlss5nvidia.com）'}</a>
        </nav>
      </div>
    </main>
  );
}
