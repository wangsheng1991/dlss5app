import { gpuData } from '../data';

// Shared by static HTML and React: search snippets must not change on mount.
export function homeMetadata(lang: string) {
  const count = gpuData.gpus.length;
  if (lang === 'zh-CN') return {
    title: 'DLSS 5 支持哪些显卡？RTX 50/40/30 系列兼容性查询',
    description: `查询 ${count} 款 GeForce RTX 显卡的 DLSS 5 支持状态，核对 NVIDIA 来源，并查看独立 DLSS 5 Studio 的本地运行要求。`,
  };
  if (lang === 'zh-TW') return {
    title: 'DLSS 5 支援哪些顯示卡？RTX 50/40/30 系列相容性查詢',
    description: `查詢 ${count} 款 GeForce RTX 顯示卡的 DLSS 5 支援狀態，核對 NVIDIA 來源，並查看獨立 DLSS 5 Studio 的本機執行要求。`,
  };
  return {
    title: 'DLSS 5 Supported GPUs: RTX Compatibility & Studio Requirements',
    description: `Check DLSS 5 support for ${count} GeForce RTX GPUs against NVIDIA sources, then review the separate local requirements for independent DLSS 5 Studio.`,
  };
}

export function gpuMetadata(lang: string, gpu: { name: string; vram_gb: number }, status: string) {
  if (lang === 'zh-CN') return {
    title: `${gpu.name} 支持 DLSS 5 吗？兼容性与 Studio 运行要求`,
    description: `${gpu.name} 的 DLSS 5 状态：${status}。查看 NVIDIA 来源、${gpu.vram_gb} GB 显存说明，以及独立 DLSS 5 Studio 的本地运行要求。`,
  };
  if (lang === 'zh-TW') return {
    title: `${gpu.name} 支援 DLSS 5 嗎？相容性與 Studio 執行要求`,
    description: `${gpu.name} 的 DLSS 5 狀態：${status}。查看 NVIDIA 來源、${gpu.vram_gb} GB 顯存說明，以及獨立 DLSS 5 Studio 的本機執行要求。`,
  };
  return {
    title: `${gpu.name} DLSS 5 Support & Studio Requirements`,
    description: `${gpu.name} DLSS 5 status: ${status}. Check NVIDIA sources, ${gpu.vram_gb} GB VRAM and separate local requirements for independent DLSS 5 Studio.`,
  };
}
