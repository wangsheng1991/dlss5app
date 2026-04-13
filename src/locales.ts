export const resources = {
  en: {
    translation: {
      nav: { home: "HOME", checker: "GPU CHECKER", matrix: "FEATURE MATRIX", faq: "FAQ", blog: "BLOG", games: "GAMES" },
      banner: {
        text: "DLSS 5 AI Slop Controversy: Where do you stand?",
        link: "Read Full Story"
      },
      hero: {
        badge: "Neural Rendering Evolution",
        title1: "DLSS 5 Supported",
        title2: "Cards & GPU Checker",
        desc: "Instantly verify if your hardware architecture is ready for NVIDIA's next-generation Neural Texture Reconstruction and Frame Synthesis 3.0.",
        placeholder: "Enter GPU model (e.g. RTX 5090)",
        btn: "CHECK COMPATIBILITY",
        notFound: "GPU Not Found",
        notFoundDesc: "We couldn't find \"{{query}}\" in our database. Please try searching for a different model like \"RTX 5090\" or \"RTX 4080\".",
        arch: "Architecture",
        vram: "VRAM",
        supported: "Full DLSS 5 Neural Rendering support confirmed.",
        unsupported: "This GPU does not support DLSS 5 Neural Rendering."
      },
      stats: {
        s1_val: "4.2x", s1_lbl: "Performance Boost",
        s2_val: "Neural", s2_lbl: "Texture Reconstruction",
        s3_val: "Latency", s3_lbl: "Reduced by 60%"
      },
      about: {
        title1: "What is", title2: "DLSS 5?",
        p1: "DLSS 5 represents the absolute pinnacle of NVIDIA's AI-driven rendering research. Moving beyond simple frame generation, version 5 introduces Neural Scene Synthesis.",
        p2: "Unlike previous iterations that relied on motion vectors and temporal data, DLSS 5 leverages a new specialized hardware block in the Blackwell architecture—the Neural Flow Accelerator—to predict lighting and texture detail with pixel-perfect accuracy at 4K resolution.",
        f1_title: "Blackwell Architecture Optimization",
        f1_desc: "Specifically designed to leverage 5th Gen Tensor Cores.",
        f2_title: "Neural Texture Compression",
        f2_desc: "Reduces VRAM usage by up to 40% while increasing detail."
      },
      checker: {
        title1: "Supported", title2: "Cards",
        desc: "Live compatibility tracker for current and upcoming hardware.",
        col1: "GPU Model", col2: "Architecture", col3: "VRAM", col4: "DLSS 5 Status"
      },
      matrix: {
        title1: "Hardware", title2: "Feature Matrix",
        col1: "Feature", col2: "RTX 30 Series", col3: "RTX 40 Series", col4: "RTX 50 Series",
        badge: "NEXT-GEN",
        features: {
          nr: "DLSS 5 Neural Rendering",
          mfg: "DLSS 4.5 Dynamic MFG",
          fg4: "DLSS 4 Multi Frame Gen",
          fg3: "DLSS 3 Frame Generation",
          rr: "Ray Reconstruction",
          sr: "DLSS Super Resolution",
          fp8: "FP8 Precision"
        }
      },
      faq: {
        title1: "Frequently Asked", title2: "Questions",
        q1: "Does DLSS 5 require a new GPU?",
        a1: "Yes. DLSS 5 Neural Rendering is confirmed exclusively for RTX 50 series (Blackwell architecture). RTX 40 series support has not been confirmed by NVIDIA.",
        q2: "When does DLSS 5 launch?",
        a2: "NVIDIA announced a Fall 2026 release window. No specific date has been given.",
        q3: "What is DLSS 5 Neural Rendering?",
        a3: "DLSS 5 takes each frame's color data and motion vectors as input, then uses an AI model to add photoreal lighting, shadows, and material properties in real time at up to 4K. Jensen Huang called it 'the GPT moment for graphics.'",
        q4: "Can RTX 3080 or RTX 4090 use DLSS 5?",
        a4: "Not confirmed. NVIDIA's DLSS 5 announcements have focused exclusively on RTX 50 series hardware. RTX 40 support is unconfirmed; RTX 30 and older will not support it.",
        q5: "Is DLSS 5 different from DLSS 4?",
        a5: "Yes, completely different goals. DLSS 4 is about performance (more frames per second via frame generation). DLSS 5 is about visual fidelity (better lighting and materials). On an RTX 50 series card you can use both simultaneously.",
        q6: "What games will support DLSS 5?",
        a6: "15+ games confirmed at launch including Starfield, Hogwarts Legacy, Assassin's Creed Shadows, Resident Evil Requiem, and more. See the full games list above.",
        q7: "Why did the DLSS 5 demo require two RTX 5090s?",
        a7: "The GTC 2026 demo was a preview build, not the shipping version. One GPU ran the game, the other ran the DLSS 5 model. NVIDIA confirmed the shipping version will run on a single GPU."
      },
      footer: {
        copyright: "© 2026 NEURAL ARCHITECT. POWERED BY DLSS 5.",
        links: { arch: "Architecture", bench: "Benchmarks", comp: "Compatibility", support: "Support", privacy: "Privacy" }
      },
      status: {
        confirmed: "CONFIRMED", unconfirmed: "UNCONFIRMED", unsupported: "UNSUPPORTED"
      }
    }
  },
  "zh-CN": {
    translation: {
      nav: { home: "首页", checker: "GPU 检测", matrix: "特性矩阵", faq: "常见问题", blog: "博客", games: "游戏" },
      banner: {
        text: "DLSS 5 AI Slop 争议：你站哪边？",
        link: "阅读全文"
      },
      hero: {
        badge: "NVIDIA DLSS 神经渲染的演进",
        title1: "DLSS 5 显卡支持",
        title2: "与 GeForce GPU 检测",
        desc: "一键验证您的硬件架构，确认是否支持 NVIDIA 新一代 DLSS 5 神经纹理重建与帧生成 3.0 技术。",
        placeholder: "输入 GPU 型号 (例如: RTX 5090)",
        btn: "检查 DLSS 5 兼容性",
        notFound: "未找到匹配的 GPU",
        notFoundDesc: "我们的数据库中未能找到 \"{{query}}\"。请尝试搜索其他 NVIDIA GeForce 型号，例如 \"RTX 5090\" 或 \"RTX 4080\"。",
        arch: "架构",
        vram: "显存",
        supported: "已确认全面支持 NVIDIA DLSS 5 神经渲染。",
        unsupported: "此 GPU 不支持 NVIDIA DLSS 5 神经渲染。"
      },
      stats: {
        s1_val: "4.2x", s1_lbl: "DLSS 性能飞跃",
        s2_val: "神经", s2_lbl: "DLSS 纹理重建",
        s3_val: "延迟", s3_lbl: "大幅降低 60%"
      },
      about: {
        title1: "什么是", title2: "NVIDIA DLSS 5?",
        p1: "NVIDIA DLSS 5 是 NVIDIA 在 AI 驱动渲染领域的巅峰之作。它不仅超越了传统的 DLSS 帧生成技术，更引入了革命性的 DLSS 5 神经场景合成 (Neural Scene Synthesis)。",
        p2: "与以往依赖运动矢量和时域数据的 DLSS 版本不同，NVIDIA DLSS 5 充分利用了 GeForce RTX 50 系列 Blackwell 架构中全新的专用硬件模块——神经流加速器 (Neural Flow Accelerator)，能够在 4K 分辨率下以像素级精度实时预测光照和纹理细节。",
        f1_title: "NVIDIA Blackwell 架构专属优化",
        f1_desc: "专为充分发挥 GeForce RTX 50 系列第五代 Tensor Core 潜能而设计。",
        f2_title: "DLSS 5 神经纹理压缩",
        f2_desc: "在提升画面细节的同时，最高可降低 GeForce RTX 显卡 40% 的显存占用。"
      },
      checker: {
        title1: "DLSS 5 支持的", title2: "NVIDIA 显卡",
        desc: "实时追踪当前及未来 NVIDIA GeForce RTX 硬件的 DLSS 5 兼容性状态。",
        col1: "GeForce GPU 型号", col2: "架构", col3: "显存", col4: "DLSS 5 状态"
      },
      matrix: {
        title1: "NVIDIA 硬件", title2: "DLSS 特性矩阵",
        col1: "DLSS 特性", col2: "GeForce RTX 30 系列", col3: "GeForce RTX 40 系列", col4: "GeForce RTX 50 系列",
        badge: "下一代 DLSS",
        features: {
          nr: "DLSS 5 神经渲染",
          mfg: "DLSS 4.5 动态多帧生成",
          fg4: "DLSS 4 多帧生成",
          fg3: "DLSS 3 帧生成",
          rr: "DLSS 3.5 光线重建",
          sr: "DLSS 超分辨率",
          fp8: "FP8 精度"
        }
      },
      faq: {
        title1: "DLSS 5 常见", title2: "问题解答",
        q1: "DLSS 5 需要新的 NVIDIA 显卡吗？",
        a1: "是的。DLSS 5 神经渲染目前已确认由 NVIDIA GeForce RTX 50 系列（Blackwell 架构）独占。NVIDIA 尚未确认是否支持 RTX 40 系列。",
        q2: "NVIDIA DLSS 5 什么时候发布？",
        a2: "NVIDIA 宣布 DLSS 5 将于 2026 年秋季发布。目前尚未公布具体日期。",
        q3: "什么是 DLSS 5 神经渲染？",
        a3: "DLSS 5 将每一帧的颜色数据和运动矢量作为输入，然后使用 AI 模型在高达 4K 的分辨率下实时添加逼真的光照、阴影和材质属性。黄仁勋称 DLSS 5 为“图形领域的 GPT 时刻”。",
        q4: "GeForce RTX 3080 或 RTX 4090 可以使用 DLSS 5 吗？",
        a4: "尚未确认。NVIDIA 关于 DLSS 5 的公告完全集中在 GeForce RTX 50 系列硬件上。RTX 40 系列的 DLSS 5 支持尚未确认；RTX 30 及更早版本将不支持 DLSS 5。",
        q5: "DLSS 5 和 DLSS 4 有什么区别？",
        a5: "两者的设计目标完全不同。DLSS 4 侧重于性能提升（通过 DLSS 帧生成获得更高的帧率），而 DLSS 5 则专注于视觉保真度（提供更逼真的光照和材质）。在 GeForce RTX 50 系列显卡上，您可以同时开启这两项 DLSS 技术。",
        q6: "哪些游戏将支持 DLSS 5？",
        a6: "首发已确认支持 15 款以上 DLSS 5 游戏，包括《星空》、《霍格沃茨之遗》、《刺客信条：影》、《生化危机：安魂曲》等。完整 DLSS 5 游戏列表请参阅上方信息。",
        q7: "为什么 DLSS 5 演示需要两张 GeForce RTX 5090？",
        a7: "GTC 2026 上的 DLSS 5 演示使用的是早期预览版，并非最终发售版本。当时使用了一张 RTX 5090 运行游戏，另一张专门运行 DLSS 5 模型。NVIDIA 已确认最终的正式版本只需单张 GeForce RTX GPU 即可流畅运行 DLSS 5。"
      },
      footer: {
        copyright: "© 2026 NEURAL ARCHITECT. POWERED BY NVIDIA DLSS 5.",
        links: { arch: "架构", bench: "基准测试", comp: "兼容性", support: "技术支持", privacy: "隐私政策" }
      },
      status: {
        confirmed: "已确认", unconfirmed: "未确认", unsupported: "不支持"
      }
    }
  },
  "zh-TW": {
    translation: {
      nav: { home: "首頁", checker: "GPU 檢測", matrix: "特性矩陣", faq: "常見問題", blog: "網誌", games: "遊戲" },
      banner: {
        text: "DLSS 5 AI Slop 爭議：你站哪邊？",
        link: "閱讀全文"
      },
      hero: {
        badge: "神經渲染的演進",
        title1: "DLSS 5 顯示卡支援",
        title2: "與 GPU 相容性檢測",
        desc: "一鍵驗證您的硬體架構，確認是否支援 NVIDIA 新一代神經紋理重建與影格生成 3.0 技術。",
        placeholder: "輸入 GPU 型號 (例如: RTX 5090)",
        btn: "檢查相容性",
        notFound: "找不到匹配的 GPU",
        notFoundDesc: "我們在資料庫中找不到 \"{{query}}\"。請嘗試搜尋其他型號，例如 \"RTX 5090\" 或 \"RTX 4080\"。",
        arch: "架構",
        vram: "顯示記憶體",
        supported: "已確認全面支援 DLSS 5 神經渲染。",
        unsupported: "此 GPU 不支援 DLSS 5 神經渲染。"
      },
      stats: {
        s1_val: "4.2x", s1_lbl: "效能飛躍",
        s2_val: "神經", s2_lbl: "紋理重建",
        s3_val: "延遲", s3_lbl: "大幅降低 60%"
      },
      about: {
        title1: "什麼是", title2: "DLSS 5?",
        p1: "DLSS 5 是 NVIDIA 在 AI 驅動渲染領域的巔峰之作。它不僅超越了傳統的影格生成技術，更引入了革命性的神經場景合成 (Neural Scene Synthesis)。",
        p2: "與以往依賴運動向量和時域資料的版本不同，DLSS 5 充分利用了 Blackwell 架構中全新的專用硬體模組——神經流加速器 (Neural Flow Accelerator)，能夠在 4K 解析度下以像素級精度即時預測光照和紋理細節。",
        f1_title: "Blackwell 架構專屬最佳化",
        f1_desc: "專為充分發揮第五代 Tensor Core 潛能而設計。",
        f2_title: "神經紋理壓縮",
        f2_desc: "在提升畫面細節的同時，最高可降低 40% 的顯示記憶體佔用。"
      },
      checker: {
        title1: "支援的", title2: "顯示卡",
        desc: "即時追蹤目前及未來硬體的相容性狀態。",
        col1: "GPU 型號", col2: "架構", col3: "顯示記憶體", col4: "DLSS 5 狀態"
      },
      matrix: {
        title1: "硬體", title2: "特性矩陣",
        col1: "特性", col2: "RTX 30 系列", col3: "RTX 40 系列", col4: "RTX 50 系列",
        badge: "下一代",
        features: {
          nr: "DLSS 5 神經渲染",
          mfg: "DLSS 4.5 動態多影格生成",
          fg4: "DLSS 4 多影格生成",
          fg3: "DLSS 3 影格生成",
          rr: "光線重建",
          sr: "DLSS 超解析度",
          fp8: "FP8 精度"
        }
      },
      faq: {
        title1: "常見", title2: "問題解答",
        q1: "DLSS 5 需要新的顯示卡嗎？",
        a1: "是的。DLSS 5 神經渲染目前已確認由 RTX 50 系列（Blackwell 架構）獨佔。NVIDIA 尚未確認是否支援 RTX 40 系列。",
        q2: "DLSS 5 什麼時候發布？",
        a2: "NVIDIA 宣布將於 2026 年秋季發布。目前尚未公布具體日期。",
        q3: "什麼是 DLSS 5 神經渲染？",
        a3: "DLSS 5 將每一影格的顏色資料和運動向量作為輸入，然後使用 AI 模型在高達 4K 的解析度下即時添加逼真的光照、陰影和材質屬性。黃仁勳稱之為「圖形領域的 GPT 時刻」。",
        q4: "RTX 3080 或 RTX 4090 可以使用 DLSS 5 嗎？",
        a4: "尚未確認。NVIDIA 關於 DLSS 5 的公告完全集中在 RTX 50 系列硬體上。RTX 40 系列的支援尚未確認；RTX 30 及更早版本將不支援。",
        q5: "DLSS 5 和 DLSS 4 有什麼區別？",
        a5: "兩者的設計目標完全不同。DLSS 4 側重於效能提升（透過影格生成獲得更高的幀率），而 DLSS 5 則專注於視覺保真度（提供更逼真的光照和材質）。在 RTX 50 系列顯示卡上，您可以同時開啟這兩項技術。",
        q6: "哪些遊戲將支援 DLSS 5？",
        a6: "首發已確認支援 15 款以上遊戲，包括《星空》、《霍格華茲的傳承》、《刺客教條：暗影者》、《惡靈古堡：安魂曲》等。完整遊戲列表請參閱上方資訊。",
        q7: "為什麼 DLSS 5 演示需要兩張 RTX 5090？",
        a7: "GTC 2026 上的展示使用的是早期預覽版，並非最終發售版本。當時使用了一張 GPU 運行遊戲，另一張專門運行 DLSS 5 模型。NVIDIA 已確認最終的正式版本只需單張 GPU 即可流暢運行。"
      },
      footer: {
        copyright: "© 2026 NEURAL ARCHITECT. POWERED BY DLSS 5.",
        links: { arch: "架構", bench: "基準測試", comp: "相容性", support: "技術支援", privacy: "隱私權政策" }
      },
      status: {
        confirmed: "已確認", unconfirmed: "未確認", unsupported: "不支援"
      }
    }
  },
  "zh-HK": {
    translation: {
      nav: { home: "首頁", checker: "GPU 檢測", matrix: "特性矩陣", faq: "常見問題", blog: "網誌", games: "遊戲" },
      banner: {
        text: "DLSS 5 AI Slop 爭議：你站哪邊？",
        link: "閱讀全文"
      },
      hero: {
        badge: "神經渲染的演進",
        title1: "DLSS 5 顯示卡支援",
        title2: "與 GPU 相容性檢測",
        desc: "一鍵驗證您的硬體架構，確認是否支援 NVIDIA 新一代神經紋理重建與影格生成 3.0 技術。",
        placeholder: "輸入 GPU 型號 (例如: RTX 5090)",
        btn: "檢查相容性",
        notFound: "找不到匹配的 GPU",
        notFoundDesc: "我們在資料庫中找不到 \"{{query}}\"。請嘗試搜尋其他型號，例如 \"RTX 5090\" 或 \"RTX 4080\"。",
        arch: "架構",
        vram: "顯示記憶體",
        supported: "已確認全面支援 DLSS 5 神經渲染。",
        unsupported: "此 GPU 不支援 DLSS 5 神經渲染。"
      },
      stats: {
        s1_val: "4.2x", s1_lbl: "效能飛躍",
        s2_val: "神經", s2_lbl: "紋理重建",
        s3_val: "延遲", s3_lbl: "大幅降低 60%"
      },
      about: {
        title1: "什麼是", title2: "DLSS 5?",
        p1: "DLSS 5 是 NVIDIA 在 AI 驅動渲染領域的巔峰之作。它不僅超越了傳統的影格生成技術，更引入了革命性的神經場景合成 (Neural Scene Synthesis)。",
        p2: "與以往依賴運動向量和時域資料的版本不同，DLSS 5 充分利用了 Blackwell 架構中全新的專用硬體模組——神經流加速器 (Neural Flow Accelerator)，能夠在 4K 解析度下以像素級精度即時預測光照和紋理細節。",
        f1_title: "Blackwell 架構專屬最佳化",
        f1_desc: "專為充分發揮第五代 Tensor Core 潛能而設計。",
        f2_title: "神經紋理壓縮",
        f2_desc: "在提升畫面細節的同時，最高可降低 40% 的顯示記憶體佔用。"
      },
      checker: {
        title1: "支援的", title2: "顯示卡",
        desc: "即時追蹤目前及未來硬體的相容性狀態。",
        col1: "GPU 型號", col2: "架構", col3: "顯示記憶體", col4: "DLSS 5 狀態"
      },
      matrix: {
        title1: "硬體", title2: "特性矩陣",
        col1: "特性", col2: "RTX 30 系列", col3: "RTX 40 系列", col4: "RTX 50 系列",
        badge: "下一代",
        features: {
          nr: "DLSS 5 神經渲染",
          mfg: "DLSS 4.5 動態多影格生成",
          fg4: "DLSS 4 多影格生成",
          fg3: "DLSS 3 影格生成",
          rr: "光線重建",
          sr: "DLSS 超解析度",
          fp8: "FP8 精度"
        }
      },
      faq: {
        title1: "常見", title2: "問題解答",
        q1: "DLSS 5 需要新的顯示卡嗎？",
        a1: "是的。DLSS 5 神經渲染目前已確認由 RTX 50 系列（Blackwell 架構）獨佔。NVIDIA 尚未確認是否支援 RTX 40 系列。",
        q2: "DLSS 5 什麼時候發布？",
        a2: "NVIDIA 宣布將於 2026 年秋季發布。目前尚未公布具體日期。",
        q3: "什麼是 DLSS 5 神經渲染？",
        a3: "DLSS 5 將每一影格的顏色資料和運動向量作為輸入，然後使用 AI 模型在高達 4K 的解析度下即時添加逼真的光照、陰影和材質屬性。黃仁勳稱之為「圖形領域的 GPT 時刻」。",
        q4: "RTX 3080 或 RTX 4090 可以使用 DLSS 5 嗎？",
        a4: "尚未確認。NVIDIA 關於 DLSS 5 的公告完全集中在 RTX 50 系列硬體上。RTX 40 系列的支援尚未確認；RTX 30 及更早版本將不支援。",
        q5: "DLSS 5 和 DLSS 4 有什麼區別？",
        a5: "兩者的設計目標完全不同。DLSS 4 側重於效能提升（透過影格生成獲得更高的幀率），而 DLSS 5 則專注於視覺保真度（提供更逼真的光照和材質）。在 RTX 50 系列顯示卡上，您可以同時開啟這兩項技術。",
        q6: "哪些遊戲將支援 DLSS 5？",
        a6: "首發已確認支援 15 款以上遊戲，包括《星空》、《霍格華茲的傳承》、《刺客教條：暗影者》、《惡靈古堡：安魂曲》等。完整遊戲列表請參閱上方資訊。",
        q7: "為什麼 DLSS 5 演示需要兩張 RTX 5090？",
        a7: "GTC 2026 上的展示使用的是早期預覽版，並非最終發售版本。當時使用了一張 GPU 運行遊戲，另一張專門運行 DLSS 5 模型。NVIDIA 已確認最終的正式版本只需單張 GPU 即可流暢運行。"
      },
      footer: {
        copyright: "© 2026 NEURAL ARCHITECT. POWERED BY DLSS 5.",
        links: { arch: "架構", bench: "基準測試", comp: "相容性", support: "技術支援", privacy: "隱私權政策" }
      },
      status: {
        confirmed: "已確認", unconfirmed: "未確認", unsupported: "不支援"
      }
    }
  },
  "ko": {
    translation: {
      nav: { home: "홈", checker: "GPU 검사기", matrix: "기능 매트릭스", faq: "FAQ" },
      hero: {
        badge: "신경망 렌더링의 진화",
        title1: "DLSS 5 지원",
        title2: "그래픽 카드 및 GPU 검사기",
        desc: "귀하의 하드웨어 아키텍처가 NVIDIA의 차세대 신경망 텍스처 재구성 및 프레임 합성 3.0을 지원할 준비가 되었는지 즉시 확인하세요.",
        placeholder: "GPU 모델 입력 (예: RTX 5090)",
        btn: "호환성 확인",
        notFound: "GPU를 찾을 수 없음",
        notFoundDesc: "데이터베이스에서 \"{{query}}\"를 찾을 수 없습니다. \"RTX 5090\" 또는 \"RTX 4080\"과 같은 다른 모델을 검색해 보세요.",
        arch: "아키텍처",
        vram: "VRAM",
        supported: "DLSS 5 신경망 렌더링 완벽 지원 확인됨.",
        unsupported: "이 GPU는 DLSS 5 신경망 렌더링을 지원하지 않습니다."
      },
      stats: {
        s1_val: "4.2x", s1_lbl: "성능 향상",
        s2_val: "신경망", s2_lbl: "텍스처 재구성",
        s3_val: "지연 시간", s3_lbl: "60% 감소"
      },
      about: {
        title1: "DLSS 5란", title2: "무엇인가요?",
        p1: "DLSS 5는 NVIDIA의 AI 기반 렌더링 연구의 절대적인 정점을 나타냅니다. 단순한 프레임 생성을 넘어 버전 5는 신경망 장면 합성(Neural Scene Synthesis)을 도입합니다.",
        p2: "모션 벡터와 시간적 데이터에 의존했던 이전 반복과 달리, DLSS 5는 Blackwell 아키텍처의 새로운 특수 하드웨어 블록인 신경망 흐름 가속기(Neural Flow Accelerator)를 활용하여 4K 해상도에서 픽셀 단위의 정확도로 조명과 텍스처 디테일을 예측합니다.",
        f1_title: "Blackwell 아키텍처 최적화",
        f1_desc: "5세대 Tensor 코어를 활용하도록 특별히 설계되었습니다.",
        f2_title: "신경망 텍스처 압축",
        f2_desc: "디테일을 높이면서 VRAM 사용량을 최대 40%까지 줄입니다."
      },
      checker: {
        title1: "지원되는", title2: "그래픽 카드",
        desc: "현재 및 향후 하드웨어에 대한 실시간 호환성 추적기.",
        col1: "GPU 모델", col2: "아키텍처", col3: "VRAM", col4: "DLSS 5 상태"
      },
      matrix: {
        title1: "하드웨어", title2: "기능 매트릭스",
        col1: "기능", col2: "RTX 30 시리즈", col3: "RTX 40 시리즈", col4: "RTX 50 시리즈",
        badge: "차세대",
        features: {
          nr: "DLSS 5 신경망 렌더링",
          mfg: "DLSS 4.5 동적 다중 프레임 생성",
          fg4: "DLSS 4 다중 프레임 생성",
          fg3: "DLSS 3 프레임 생성",
          rr: "광선 재구성",
          sr: "DLSS 초해상도",
          fp8: "FP8 정밀도"
        }
      },
      faq: {
        title1: "자주 묻는", title2: "질문",
        q1: "DLSS 5를 사용하려면 새로운 GPU가 필요한가요?",
        a1: "네. DLSS 5 신경망 렌더링은 RTX 50 시리즈(Blackwell 아키텍처) 전용으로 확인되었습니다. RTX 40 시리즈 지원은 NVIDIA에서 확인하지 않았습니다.",
        q2: "DLSS 5는 언제 출시되나요?",
        a2: "NVIDIA는 2026년 가을 출시를 발표했습니다. 구체적인 날짜는 아직 정해지지 않았습니다.",
        q3: "DLSS 5 신경망 렌더링이란 무엇인가요?",
        a3: "DLSS 5는 각 프레임의 색상 데이터와 모션 벡터를 입력으로 받은 다음 AI 모델을 사용하여 최대 4K 해상도에서 실시간으로 사실적인 조명, 그림자 및 재질 속성을 추가합니다. 젠슨 황은 이를 '그래픽을 위한 GPT 모멘트'라고 불렀습니다.",
        q4: "RTX 3080 또는 RTX 4090에서 DLSS 5를 사용할 수 있나요?",
        a4: "확인되지 않았습니다. NVIDIA의 DLSS 5 발표는 전적으로 RTX 50 시리즈 하드웨어에 집중되었습니다. RTX 40 지원은 확인되지 않았으며 RTX 30 및 이전 버전은 지원하지 않습니다.",
        q5: "DLSS 5는 DLSS 4와 다른가요?",
        a5: "네, 목표가 완전히 다릅니다. DLSS 4는 성능(프레임 생성을 통한 초당 프레임 수 증가)에 중점을 둡니다. DLSS 5는 시각적 충실도(더 나은 조명 및 재질)에 중점을 둡니다. RTX 50 시리즈 카드에서는 두 가지를 동시에 사용할 수 있습니다.",
        q6: "어떤 게임이 DLSS 5를 지원하나요?",
        a6: "스타필드, 호그와트 레거시, 어쌔신 크리드 섀도우, 레지던트 이블 레퀴엠 등 15개 이상의 게임이 출시 시점에 지원될 예정입니다. 위의 전체 게임 목록을 참조하세요.",
        q7: "DLSS 5 데모에 두 개의 RTX 5090이 필요한 이유는 무엇인가요?",
        a7: "GTC 2026 데모는 최종 출시 버전이 아닌 프리뷰 빌드였습니다. 하나의 GPU는 게임을 실행하고 다른 하나는 DLSS 5 모델을 실행했습니다. NVIDIA는 최종 출시 버전이 단일 GPU에서 실행될 것이라고 확인했습니다."
      },
      footer: {
        copyright: "© 2026 NEURAL ARCHITECT. POWERED BY DLSS 5.",
        links: { arch: "아키텍처", bench: "벤치마크", comp: "호환성", support: "지원", privacy: "개인정보 보호" }
      },
      status: {
        confirmed: "확인됨", unconfirmed: "미확인", unsupported: "지원하지 않음"
      }
    }
  },
  "ja": {
    translation: {
      nav: { home: "ホーム", checker: "GPU チェッカー", matrix: "機能マトリックス", faq: "FAQ" },
      hero: {
        badge: "ニューラルレンダリングの進化",
        title1: "DLSS 5 対応",
        title2: "カード & GPU チェッカー",
        desc: "お使いのハードウェアアーキテクチャが、NVIDIAの次世代ニューラルテクスチャ再構築およびフレーム合成3.0に対応しているか、今すぐ確認してください。",
        placeholder: "GPUモデルを入力 (例: RTX 5090)",
        btn: "互換性をチェック",
        notFound: "GPUが見つかりません",
        notFoundDesc: "データベースに \"{{query}}\" が見つかりませんでした。\"RTX 5090\" や \"RTX 4080\" などの別のモデルを検索してみてください。",
        arch: "アーキテクチャ",
        vram: "VRAM",
        supported: "DLSS 5 ニューラルレンダリングの完全サポートが確認されました。",
        unsupported: "このGPUはDLSS 5 ニューラルレンダリングをサポートしていません。"
      },
      stats: {
        s1_val: "4.2x", s1_lbl: "パフォーマンス向上",
        s2_val: "ニューラル", s2_lbl: "テクスチャ再構築",
        s3_val: "レイテンシ", s3_lbl: "60%削減"
      },
      about: {
        title1: "DLSS 5", title2: "とは？",
        p1: "DLSS 5は、NVIDIAのAI駆動レンダリング研究の絶対的な頂点です。単なるフレーム生成を超え、バージョン5ではニューラルシーン合成 (Neural Scene Synthesis) が導入されています。",
        p2: "モーションベクトルと時間データに依存していた以前のバージョンとは異なり、DLSS 5はBlackwellアーキテクチャの新しい専用ハードウェアブロックであるニューラルフローアクセラレータを活用し、4K解像度でピクセル単位の精度でライティングとテクスチャのディテールを予測します。",
        f1_title: "Blackwellアーキテクチャの最適化",
        f1_desc: "第5世代Tensorコアを活用するように特別に設計されています。",
        f2_title: "ニューラルテクスチャ圧縮",
        f2_desc: "ディテールを向上させながら、VRAM使用量を最大40%削減します。"
      },
      checker: {
        title1: "対応", title2: "カード",
        desc: "現在および今後のハードウェアのリアルタイム互換性トラッカー。",
        col1: "GPUモデル", col2: "アーキテクチャ", col3: "VRAM", col4: "DLSS 5 ステータス"
      },
      matrix: {
        title1: "ハードウェア", title2: "機能マトリックス",
        col1: "機能", col2: "RTX 30 シリーズ", col3: "RTX 40 シリーズ", col4: "RTX 50 シリーズ",
        badge: "次世代",
        features: {
          nr: "DLSS 5 ニューラルレンダリング",
          mfg: "DLSS 4.5 動的マルチフレーム生成",
          fg4: "DLSS 4 マルチフレーム生成",
          fg3: "DLSS 3 フレーム生成",
          rr: "レイ再構築",
          sr: "DLSS 超解像",
          fp8: "FP8 精度"
        }
      },
      faq: {
        title1: "よくある", title2: "質問",
        q1: "DLSS 5には新しいGPUが必要ですか？",
        a1: "はい。DLSS 5ニューラルレンダリングは、RTX 50シリーズ（Blackwellアーキテクチャ）専用であることが確認されています。RTX 40シリーズのサポートはNVIDIAによって確認されていません。",
        q2: "DLSS 5はいつリリースされますか？",
        a2: "NVIDIAは2026年秋のリリースを発表しました。具体的な日付はまだ発表されていません。",
        q3: "DLSS 5ニューラルレンダリングとは何ですか？",
        a3: "DLSS 5は、各フレームのカラーデータとモーションベクトルを入力として受け取り、AIモデルを使用して、最大4K解像度でリアルなライティング、シャドウ、マテリアルプロパティをリアルタイムで追加します。ジェンスン・フアンはこれを「グラフィックスにおけるGPTの瞬間」と呼びました。",
        q4: "RTX 3080またはRTX 4090でDLSS 5を使用できますか？",
        a4: "確認されていません。NVIDIAのDLSS 5の発表は、RTX 50シリーズのハードウェアに完全に焦点を当てています。RTX 40のサポートは未確認であり、RTX 30以前はサポートされません。",
        q5: "DLSS 5はDLSS 4と違いますか？",
        a5: "はい、目標がまったく異なります。DLSS 4はパフォーマンス（フレーム生成によるFPSの向上）に重点を置いています。DLSS 5は視覚的な忠実度（より良いライティングとマテリアル）に重点を置いています。RTX 50シリーズカードでは、両方を同時に使用できます。",
        q6: "どのゲームがDLSS 5をサポートしますか？",
        a6: "Starfield、Hogwarts Legacy、Assassin's Creed Shadows、Resident Evil Requiemなど、15以上のゲームがローンチ時にサポートされることが確認されています。上記の完全なゲームリストをご覧ください。",
        q7: "なぜDLSS 5のデモには2つのRTX 5090が必要だったのですか？",
        a7: "GTC 2026のデモはプレビュービルドであり、出荷バージョンではありませんでした。1つのGPUがゲームを実行し、もう1つのGPUがDLSS 5モデルを実行しました。NVIDIAは、出荷バージョンが単一のGPUで実行されることを確認しました。"
      },
      footer: {
        copyright: "© 2026 NEURAL ARCHITECT. POWERED BY DLSS 5.",
        links: { arch: "アーキテクチャ", bench: "ベンチマーク", comp: "互換性", support: "サポート", privacy: "プライバシー" }
      },
      status: {
        confirmed: "確認済み", unconfirmed: "未確認", unsupported: "非対応"
      }
    }
  },
  "es": {
    translation: {
      nav: { home: "INICIO", checker: "COMPROBADOR GPU", matrix: "MATRIZ DE FUNCIONES", faq: "FAQ" },
      hero: {
        badge: "Evolución del Renderizado Neuronal",
        title1: "Tarjetas Compatibles",
        title2: "con DLSS 5",
        desc: "Verifica al instante si tu arquitectura de hardware está lista para la Reconstrucción de Texturas Neuronales y la Síntesis de Fotogramas 3.0 de próxima generación de NVIDIA.",
        placeholder: "Introduce el modelo de GPU (ej. RTX 5090)",
        btn: "COMPROBAR COMPATIBILIDAD",
        notFound: "GPU No Encontrada",
        notFoundDesc: "No pudimos encontrar \"{{query}}\" en nuestra base de datos. Intenta buscar un modelo diferente como \"RTX 5090\" o \"RTX 4080\".",
        arch: "Arquitectura",
        vram: "VRAM",
        supported: "Soporte completo para Renderizado Neuronal DLSS 5 confirmado.",
        unsupported: "Esta GPU no soporta el Renderizado Neuronal DLSS 5."
      },
      stats: {
        s1_val: "4.2x", s1_lbl: "Aumento de Rendimiento",
        s2_val: "Neuronal", s2_lbl: "Reconstrucción de Texturas",
        s3_val: "Latencia", s3_lbl: "Reducida en un 60%"
      },
      about: {
        title1: "¿Qué es", title2: "DLSS 5?",
        p1: "DLSS 5 representa el pináculo absoluto de la investigación de renderizado impulsado por IA de NVIDIA. Más allá de la simple generación de fotogramas, la versión 5 introduce la Síntesis de Escenas Neuronales.",
        p2: "A diferencia de las iteraciones anteriores que dependían de vectores de movimiento y datos temporales, DLSS 5 aprovecha un nuevo bloque de hardware especializado en la arquitectura Blackwell, el Acelerador de Flujo Neuronal, para predecir la iluminación y los detalles de las texturas con precisión de píxeles a resolución 4K.",
        f1_title: "Optimización de la Arquitectura Blackwell",
        f1_desc: "Diseñado específicamente para aprovechar los Tensor Cores de 5ª generación.",
        f2_title: "Compresión de Texturas Neuronal",
        f2_desc: "Reduce el uso de VRAM hasta en un 40% mientras aumenta el detalle."
      },
      checker: {
        title1: "Tarjetas", title2: "Compatibles",
        desc: "Rastreador de compatibilidad en vivo para hardware actual y próximo.",
        col1: "Modelo de GPU", col2: "Arquitectura", col3: "VRAM", col4: "Estado DLSS 5"
      },
      matrix: {
        title1: "Matriz de Funciones", title2: "de Hardware",
        col1: "Función", col2: "Serie RTX 30", col3: "Serie RTX 40", col4: "Serie RTX 50",
        badge: "PRÓXIMA GEN",
        features: {
          nr: "Renderizado Neuronal DLSS 5",
          mfg: "Generación Dinámica de Fotogramas DLSS 4.5",
          fg4: "Generación Múltiple de Fotogramas DLSS 4",
          fg3: "Generación de Fotogramas DLSS 3",
          rr: "Reconstrucción de Rayos",
          sr: "Súper Resolución DLSS",
          fp8: "Precisión FP8"
        }
      },
      faq: {
        title1: "Preguntas", title2: "Frecuentes",
        q1: "¿DLSS 5 requiere una nueva GPU?",
        a1: "Sí. El Renderizado Neuronal DLSS 5 está confirmado exclusivamente para la serie RTX 50 (arquitectura Blackwell). El soporte para la serie RTX 40 no ha sido confirmado por NVIDIA.",
        q2: "¿Cuándo se lanza DLSS 5?",
        a2: "NVIDIA anunció una ventana de lanzamiento para el otoño de 2026. No se ha dado una fecha específica.",
        q3: "¿Qué es el Renderizado Neuronal DLSS 5?",
        a3: "DLSS 5 toma los datos de color y los vectores de movimiento de cada fotograma como entrada, luego usa un modelo de IA para agregar iluminación, sombras y propiedades de materiales fotorrealistas en tiempo real a hasta 4K. Jensen Huang lo llamó 'el momento GPT para los gráficos'.",
        q4: "¿Puede la RTX 3080 o RTX 4090 usar DLSS 5?",
        a4: "No confirmado. Los anuncios de DLSS 5 de NVIDIA se han centrado exclusivamente en el hardware de la serie RTX 50. El soporte para RTX 40 no está confirmado; RTX 30 y anteriores no lo soportarán.",
        q5: "¿Es DLSS 5 diferente de DLSS 4?",
        a5: "Sí, objetivos completamente diferentes. DLSS 4 se trata de rendimiento (más fotogramas por segundo a través de la generación de fotogramas). DLSS 5 se trata de fidelidad visual (mejor iluminación y materiales). En una tarjeta de la serie RTX 50 puedes usar ambos simultáneamente.",
        q6: "¿Qué juegos soportarán DLSS 5?",
        a6: "Más de 15 juegos confirmados en el lanzamiento, incluyendo Starfield, Hogwarts Legacy, Assassin's Creed Shadows, Resident Evil Requiem y más. Consulta la lista completa de juegos arriba.",
        q7: "¿Por qué la demostración de DLSS 5 requirió dos RTX 5090?",
        a7: "La demostración de GTC 2026 fue una versión preliminar, no la versión final. Una GPU ejecutó el juego, la otra ejecutó el modelo DLSS 5. NVIDIA confirmó que la versión final se ejecutará en una sola GPU."
      },
      footer: {
        copyright: "© 2026 NEURAL ARCHITECT. POWERED BY DLSS 5.",
        links: { arch: "Arquitectura", bench: "Benchmarks", comp: "Compatibilidad", support: "Soporte", privacy: "Privacidad" }
      },
      status: {
        confirmed: "CONFIRMADO", unconfirmed: "NO CONFIRMADO", unsupported: "NO SOPORTADO"
      }
    }
  },
  "fr": {
    translation: {
      nav: { home: "ACCUEIL", checker: "VÉRIFICATEUR GPU", matrix: "MATRICE DES FONCTIONNALITÉS", faq: "FAQ" },
      hero: {
        badge: "Évolution du Rendu Neuronal",
        title1: "Cartes Compatibles",
        title2: "DLSS 5",
        desc: "Vérifiez instantanément si votre architecture matérielle est prête pour la Reconstitution de Textures Neuronales et la Synthèse d'Images 3.0 de nouvelle génération de NVIDIA.",
        placeholder: "Entrez le modèle de GPU (ex. RTX 5090)",
        btn: "VÉRIFIER LA COMPATIBILITÉ",
        notFound: "GPU Non Trouvé",
        notFoundDesc: "Nous n'avons pas pu trouver \"{{query}}\" dans notre base de données. Veuillez essayer de rechercher un autre modèle comme \"RTX 5090\" ou \"RTX 4080\".",
        arch: "Architecture",
        vram: "VRAM",
        supported: "Prise en charge complète du Rendu Neuronal DLSS 5 confirmée.",
        unsupported: "Ce GPU ne prend pas en charge le Rendu Neuronal DLSS 5."
      },
      stats: {
        s1_val: "4.2x", s1_lbl: "Gain de Performances",
        s2_val: "Neuronale", s2_lbl: "Reconstitution de Textures",
        s3_val: "Latence", s3_lbl: "Réduite de 60%"
      },
      about: {
        title1: "Qu'est-ce que", title2: "le DLSS 5 ?",
        p1: "Le DLSS 5 représente le summum absolu de la recherche de NVIDIA en matière de rendu piloté par l'IA. Allant au-delà de la simple génération d'images, la version 5 introduit la Synthèse de Scène Neuronale.",
        p2: "Contrairement aux itérations précédentes qui s'appuyaient sur des vecteurs de mouvement et des données temporelles, le DLSS 5 exploite un nouveau bloc matériel spécialisé dans l'architecture Blackwell — l'Accélérateur de Flux Neuronal — pour prédire l'éclairage et les détails des textures avec une précision au pixel près en résolution 4K.",
        f1_title: "Optimisation de l'Architecture Blackwell",
        f1_desc: "Spécialement conçu pour tirer parti des Tensor Cores de 5ème génération.",
        f2_title: "Compression de Textures Neuronale",
        f2_desc: "Réduit l'utilisation de la VRAM jusqu'à 40 % tout en augmentant les détails."
      },
      checker: {
        title1: "Cartes", title2: "Compatibles",
        desc: "Suivi de compatibilité en direct pour le matériel actuel et à venir.",
        col1: "Modèle de GPU", col2: "Architecture", col3: "VRAM", col4: "Statut DLSS 5"
      },
      matrix: {
        title1: "Matrice des Fonctionnalités", title2: "Matérielles",
        col1: "Fonctionnalité", col2: "Série RTX 30", col3: "Série RTX 40", col4: "Série RTX 50",
        badge: "NEXT-GEN",
        features: {
          nr: "Rendu Neuronal DLSS 5",
          mfg: "Génération Dynamique d'Images DLSS 4.5",
          fg4: "Génération Multiple d'Images DLSS 4",
          fg3: "Génération d'Images DLSS 3",
          rr: "Reconstitution de Rayons",
          sr: "Super Résolution DLSS",
          fp8: "Précision FP8"
        }
      },
      faq: {
        title1: "Foire Aux", title2: "Questions",
        q1: "Le DLSS 5 nécessite-t-il un nouveau GPU ?",
        a1: "Oui. Le Rendu Neuronal DLSS 5 est confirmé exclusivement pour la série RTX 50 (architecture Blackwell). La prise en charge de la série RTX 40 n'a pas été confirmée par NVIDIA.",
        q2: "Quand le DLSS 5 sera-t-il lancé ?",
        a2: "NVIDIA a annoncé une fenêtre de sortie pour l'automne 2026. Aucune date précise n'a été communiquée.",
        q3: "Qu'est-ce que le Rendu Neuronal DLSS 5 ?",
        a3: "Le DLSS 5 prend les données de couleur et les vecteurs de mouvement de chaque image en entrée, puis utilise un modèle d'IA pour ajouter un éclairage, des ombres et des propriétés de matériaux photoréalistes en temps réel jusqu'en 4K. Jensen Huang l'a appelé 'le moment GPT pour les graphismes'.",
        q4: "Les RTX 3080 ou RTX 4090 peuvent-elles utiliser le DLSS 5 ?",
        a4: "Non confirmé. Les annonces de NVIDIA concernant le DLSS 5 se sont concentrées exclusivement sur le matériel de la série RTX 50. La prise en charge des RTX 40 n'est pas confirmée ; les RTX 30 et antérieures ne le prendront pas en charge.",
        q5: "Le DLSS 5 est-il différent du DLSS 4 ?",
        a5: "Oui, des objectifs complètement différents. Le DLSS 4 concerne les performances (plus d'images par seconde via la génération d'images). Le DLSS 5 concerne la fidélité visuelle (meilleur éclairage et matériaux). Sur une carte de la série RTX 50, vous pouvez utiliser les deux simultanément.",
        q6: "Quels jeux prendront en charge le DLSS 5 ?",
        a6: "Plus de 15 jeux confirmés au lancement, dont Starfield, Hogwarts Legacy, Assassin's Creed Shadows, Resident Evil Requiem, etc. Consultez la liste complète des jeux ci-dessus.",
        q7: "Pourquoi la démo du DLSS 5 a-t-elle nécessité deux RTX 5090 ?",
        a7: "La démo de la GTC 2026 était une version préliminaire, pas la version finale. Un GPU faisait tourner le jeu, l'autre exécutait le modèle DLSS 5. NVIDIA a confirmé que la version finale fonctionnera sur un seul GPU."
      },
      footer: {
        copyright: "© 2026 NEURAL ARCHITECT. POWERED BY DLSS 5.",
        links: { arch: "Architecture", bench: "Benchmarks", comp: "Compatibilité", support: "Support", privacy: "Confidentialité" }
      },
      status: {
        confirmed: "CONFIRMÉ", unconfirmed: "NON CONFIRMÉ", unsupported: "NON SUPPORTÉ"
      }
    }
  },
  "de": {
    translation: {
      nav: { home: "START", checker: "GPU-CHECKER", matrix: "FUNKTIONSMATRIX", faq: "FAQ" },
      hero: {
        badge: "Evolution des Neuralen Renderings",
        title1: "DLSS 5 Unterstützte",
        title2: "Karten & GPU-Checker",
        desc: "Überprüfen Sie sofort, ob Ihre Hardware-Architektur für NVIDIAs Neural Texture Reconstruction und Frame Synthesis 3.0 der nächsten Generation bereit ist.",
        placeholder: "GPU-Modell eingeben (z.B. RTX 5090)",
        btn: "KOMPATIBILITÄT PRÜFEN",
        notFound: "GPU nicht gefunden",
        notFoundDesc: "Wir konnten \"{{query}}\" in unserer Datenbank nicht finden. Bitte versuchen Sie nach einem anderen Modell wie \"RTX 5090\" oder \"RTX 4080\" zu suchen.",
        arch: "Architektur",
        vram: "VRAM",
        supported: "Volle Unterstützung für DLSS 5 Neural Rendering bestätigt.",
        unsupported: "Diese GPU unterstützt kein DLSS 5 Neural Rendering."
      },
      stats: {
        s1_val: "4.2x", s1_lbl: "Leistungsschub",
        s2_val: "Neurale", s2_lbl: "Texturrekonstruktion",
        s3_val: "Latenz", s3_lbl: "Um 60% reduziert"
      },
      about: {
        title1: "Was ist", title2: "DLSS 5?",
        p1: "DLSS 5 stellt den absoluten Höhepunkt von NVIDIAs KI-gesteuerter Rendering-Forschung dar. Über die einfache Frame-Generierung hinaus führt Version 5 die Neurale Szenensynthese ein.",
        p2: "Im Gegensatz zu früheren Iterationen, die auf Bewegungsvektoren und temporalen Daten basierten, nutzt DLSS 5 einen neuen spezialisierten Hardwareblock in der Blackwell-Architektur – den Neural Flow Accelerator –, um Beleuchtung und Texturdetails mit pixelgenauer Präzision in 4K-Auflösung vorherzusagen.",
        f1_title: "Blackwell-Architekturoptimierung",
        f1_desc: "Speziell entwickelt, um Tensor-Kerne der 5. Generation zu nutzen.",
        f2_title: "Neurale Texturkompression",
        f2_desc: "Reduziert die VRAM-Nutzung um bis zu 40% bei gleichzeitiger Erhöhung der Details."
      },
      checker: {
        title1: "Unterstützte", title2: "Karten",
        desc: "Live-Kompatibilitäts-Tracker für aktuelle und kommende Hardware.",
        col1: "GPU-Modell", col2: "Architektur", col3: "VRAM", col4: "DLSS 5 Status"
      },
      matrix: {
        title1: "Hardware", title2: "Funktionsmatrix",
        col1: "Funktion", col2: "RTX 30 Serie", col3: "RTX 40 Serie", col4: "RTX 50 Serie",
        badge: "NEXT-GEN",
        features: {
          nr: "DLSS 5 Neural Rendering",
          mfg: "DLSS 4.5 Dynamic MFG",
          fg4: "DLSS 4 Multi Frame Gen",
          fg3: "DLSS 3 Frame Generation",
          rr: "Ray Reconstruction",
          sr: "DLSS Super Resolution",
          fp8: "FP8-Präzision"
        }
      },
      faq: {
        title1: "Häufig gestellte", title2: "Fragen",
        q1: "Benötigt DLSS 5 eine neue GPU?",
        a1: "Ja. DLSS 5 Neural Rendering ist exklusiv für die RTX 50-Serie (Blackwell-Architektur) bestätigt. Die Unterstützung für die RTX 40-Serie wurde von NVIDIA nicht bestätigt.",
        q2: "Wann erscheint DLSS 5?",
        a2: "NVIDIA kündigte ein Veröffentlichungsfenster für Herbst 2026 an. Ein genaues Datum wurde noch nicht genannt.",
        q3: "Was ist DLSS 5 Neural Rendering?",
        a3: "DLSS 5 nimmt die Farbdaten und Bewegungsvektoren jedes Frames als Eingabe und verwendet dann ein KI-Modell, um fotorealistische Beleuchtung, Schatten und Materialeigenschaften in Echtzeit bei bis zu 4K hinzuzufügen. Jensen Huang nannte es 'den GPT-Moment für Grafiken'.",
        q4: "Kann die RTX 3080 oder RTX 4090 DLSS 5 verwenden?",
        a4: "Nicht bestätigt. NVIDIAs Ankündigungen zu DLSS 5 konzentrierten sich ausschließlich auf Hardware der RTX 50-Serie. Die Unterstützung für RTX 40 ist unbestätigt; RTX 30 und älter werden es nicht unterstützen.",
        q5: "Unterscheidet sich DLSS 5 von DLSS 4?",
        a5: "Ja, völlig unterschiedliche Ziele. Bei DLSS 4 geht es um Leistung (mehr Bilder pro Sekunde durch Frame-Generierung). Bei DLSS 5 geht es um visuelle Wiedergabetreue (bessere Beleuchtung und Materialien). Auf einer Karte der RTX 50-Serie können Sie beides gleichzeitig verwenden.",
        q6: "Welche Spiele werden DLSS 5 unterstützen?",
        a6: "Über 15 Spiele zum Start bestätigt, darunter Starfield, Hogwarts Legacy, Assassin's Creed Shadows, Resident Evil Requiem und mehr. Siehe die vollständige Spieleliste oben.",
        q7: "Warum benötigte die DLSS 5-Demo zwei RTX 5090?",
        a7: "Die GTC 2026-Demo war ein Preview-Build, nicht die finale Version. Eine GPU führte das Spiel aus, die andere das DLSS 5-Modell. NVIDIA bestätigte, dass die finale Version auf einer einzigen GPU laufen wird."
      },
      footer: {
        copyright: "© 2026 NEURAL ARCHITECT. POWERED BY DLSS 5.",
        links: { arch: "Architektur", bench: "Benchmarks", comp: "Kompatibilität", support: "Support", privacy: "Datenschutz" }
      },
      status: {
        confirmed: "BESTÄTIGT", unconfirmed: "UNBESTÄTIGT", unsupported: "NICHT UNTERSTÜTZT"
      }
    }
  },
  "fi": {
    translation: {
      nav: { home: "KOTI", checker: "GPU-TARKISTIN", matrix: "OMINAISUUSMATRIISI", faq: "UKK" },
      hero: {
        badge: "Neuraalisen Renderöinnin Evoluutio",
        title1: "DLSS 5 Tuetut",
        title2: "Kortit & GPU-tarkistin",
        desc: "Tarkista välittömästi, onko laitteistoarkkitehtuurisi valmis NVIDIAn seuraavan sukupolven neuraaliseen tekstuurien uudelleenrakentamiseen ja Frame Synthesis 3.0:aan.",
        placeholder: "Syötä GPU-malli (esim. RTX 5090)",
        btn: "TARKISTA YHTEENSOPIVUUS",
        notFound: "GPU:ta ei löytynyt",
        notFoundDesc: "Emme löytäneet mallia \"{{query}}\" tietokannastamme. Kokeile hakea toista mallia, kuten \"RTX 5090\" tai \"RTX 4080\".",
        arch: "Arkkitehtuuri",
        vram: "VRAM",
        supported: "Täysi DLSS 5 Neural Rendering -tuki vahvistettu.",
        unsupported: "Tämä GPU ei tue DLSS 5 Neural Rendering -tekniikkaa."
      },
      stats: {
        s1_val: "4.2x", s1_lbl: "Suorituskyvyn lisäys",
        s2_val: "Neuraalinen", s2_lbl: "Tekstuurien uudelleenrakennus",
        s3_val: "Viive", s3_lbl: "Vähentynyt 60%"
      },
      about: {
        title1: "Mikä on", title2: "DLSS 5?",
        p1: "DLSS 5 edustaa NVIDIAn tekoälypohjaisen renderöintitutkimuksen ehdotonta huippua. Siirtyen pelkän ruutujen luomisen yli, versio 5 esittelee neuraalisen näkymän synteesin.",
        p2: "Toisin kuin aiemmat iteraatiot, jotka luottivat liikevektoreihin ja ajalliseen dataan, DLSS 5 hyödyntää Blackwell-arkkitehtuurin uutta erikoistunutta laitteistolohkoa – Neural Flow Acceleratoria – ennustaakseen valaistuksen ja tekstuurien yksityiskohdat pikselintarkasti 4K-resoluutiolla.",
        f1_title: "Blackwell-arkkitehtuurin optimointi",
        f1_desc: "Suunniteltu erityisesti hyödyntämään 5. sukupolven Tensor-ytimiä.",
        f2_title: "Neuraalinen tekstuurien pakkaus",
        f2_desc: "Vähentää VRAM-muistin käyttöä jopa 40 % lisäten samalla yksityiskohtia."
      },
      checker: {
        title1: "Tuetut", title2: "Kortit",
        desc: "Reaaliaikainen yhteensopivuusseuranta nykyiselle ja tulevalle laitteistolle.",
        col1: "GPU-malli", col2: "Arkkitehtuuri", col3: "VRAM", col4: "DLSS 5 Tila"
      },
      matrix: {
        title1: "Laitteiston", title2: "Ominaisuusmatriisi",
        col1: "Ominaisuus", col2: "RTX 30 -sarja", col3: "RTX 40 -sarja", col4: "RTX 50 -sarja",
        badge: "SEURAAVA SUKUPOLVI",
        features: {
          nr: "DLSS 5 Neural Rendering",
          mfg: "DLSS 4.5 Dynamic MFG",
          fg4: "DLSS 4 Multi Frame Gen",
          fg3: "DLSS 3 Frame Generation",
          rr: "Ray Reconstruction",
          sr: "DLSS Super Resolution",
          fp8: "FP8-tarkkuus"
        }
      },
      faq: {
        title1: "Usein Kysytyt", title2: "Kysymykset",
        q1: "Vaatiiko DLSS 5 uuden GPU:n?",
        a1: "Kyllä. DLSS 5 Neural Rendering on vahvistettu yksinomaan RTX 50 -sarjalle (Blackwell-arkkitehtuuri). NVIDIA ei ole vahvistanut RTX 40 -sarjan tukea.",
        q2: "Milloin DLSS 5 julkaistaan?",
        a2: "NVIDIA ilmoitti julkaisuikkunaksi syksyn 2026. Tarkkaa päivämäärää ei ole annettu.",
        q3: "Mikä on DLSS 5 Neural Rendering?",
        a3: "DLSS 5 ottaa kunkin ruudun väritiedot ja liikevektorit syötteenä ja käyttää sitten tekoälymallia lisätäkseen fotorealistisen valaistuksen, varjot ja materiaaliominaisuudet reaaliajassa jopa 4K-tarkkuudella. Jensen Huang kutsui sitä 'grafiikan GPT-hetkeksi'.",
        q4: "Voiko RTX 3080 tai RTX 4090 käyttää DLSS 5:tä?",
        a4: "Ei vahvistettu. NVIDIAn DLSS 5 -ilmoitukset ovat keskittyneet yksinomaan RTX 50 -sarjan laitteistoon. RTX 40 -tukea ei ole vahvistettu; RTX 30 ja vanhemmat eivät tue sitä.",
        q5: "Eroaako DLSS 5 DLSS 4:stä?",
        a5: "Kyllä, täysin eri tavoitteet. DLSS 4 koskee suorituskykyä (enemmän ruutuja sekunnissa ruutujen luomisen kautta). DLSS 5 koskee visuaalista tarkkuutta (parempi valaistus ja materiaalit). RTX 50 -sarjan kortilla voit käyttää molempia samanaikaisesti.",
        q6: "Mitkä pelit tukevat DLSS 5:tä?",
        a6: "Yli 15 peliä vahvistettu julkaisussa, mukaan lukien Starfield, Hogwarts Legacy, Assassin's Creed Shadows, Resident Evil Requiem ja paljon muuta. Katso koko peliluettelo yltä.",
        q7: "Miksi DLSS 5 -demo vaati kaksi RTX 5090:tä?",
        a7: "GTC 2026 -demo oli esikatseluversio, ei lopullinen julkaisuversio. Yksi GPU suoritti peliä, toinen suoritti DLSS 5 -mallia. NVIDIA vahvisti, että lopullinen versio toimii yhdellä GPU:lla."
      },
      footer: {
        copyright: "© 2026 NEURAL ARCHITECT. POWERED BY DLSS 5.",
        links: { arch: "Arkkitehtuuri", bench: "Vertailut", comp: "Yhteensopivuus", support: "Tuki", privacy: "Tietosuoja" }
      },
      status: {
        confirmed: "VAHVISTETTU", unconfirmed: "EI VAHVISTETTU", unsupported: "EI TUETTU"
      }
    }
  }
};
