export const resources = {
  en: {
    translation: {
      nav: { home: "HOME", checker: "GPU CHECKER", matrix: "FEATURE MATRIX", faq: "FAQ", blog: "BLOG", games: "GAMES" },
      banner: {
        text: "DLSS 5 AI Slop Controversy: Where do you stand?",
        link: "Read Full Story"
      },
      hero: {
        badge: "Evidence-first GPU checker",
        title1: "DLSS 5 GPU evidence",
        title2: "with a source for every model",
        desc: "DLSS 5 is NVIDIA's neural rendering path: it reconstructs lighting, materials and detail with a model trained on paired game-engine and photoreal reference images. This checker maps 31 GeForce RTX models to the source behind each status — 6 confirmed, 9 unconfirmed, 16 outside the published scope.",
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
        s1_val: "31", s1_lbl: "GPU models tracked",
        s2_val: "Source", s2_lbl: "Every model has one",
        s3_val: "Evidence", s3_lbl: "Status with a citation"
      },
      about: {
        title1: "What is", title2: "DLSS 5?",
        p1: "DLSS 5 is NVIDIA's announced neural rendering path. This page records what NVIDIA has published and what remains unconfirmed.",
        p2: "NVIDIA describes 3D-Guided Neural Rendering as adding lighting, materials, and detail to rendered frames. This checker does not infer an internal hardware block or a universal result.",
        f1_title: "Blackwell Architecture Optimization",
        f1_desc: "Specifically designed to leverage 5th Gen Tensor Cores.",
        f2_title: "Published launch scope",
        f2_desc: "RTX 50 Series GPUs and GeForce NOW are the documented debut scope."
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
        a3: "NVIDIA describes 3D-Guided Neural Rendering as using color and motion-vector inputs to anchor lighting, materials and other output to 3D content frame by frame. Source: https://www.nvidia.com/en-us/geforce/news/dlss-5-3d-guided-neural-rendering/ (checked 2026-10-13).",
        q4: "Can RTX 3080 or RTX 4090 use DLSS 5?",
        a4: "Not confirmed. Current NVIDIA materials identify RTX 50 Series GPUs and GeForce NOW; RTX 40 support is described as planned, with no date.",
        q5: "Is DLSS 5 different from DLSS 4?",
        a5: "Yes, completely different goals. DLSS 4 is about performance (more frames per second via frame generation). DLSS 5 is about visual fidelity (better lighting and materials). On an RTX 50 series card you can use both simultaneously.",
        q6: "What games will support DLSS 5?",
        a6: "The tracker separates a launched title from announced plans. Open the games page for dated source entries instead of treating a preview list as current support.",
        q7: "Why did the DLSS 5 demo require two RTX 5090s?",
        a7: "The early demo was a preview build. Do not treat its demonstration setup as the shipping hardware requirement."
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
        badge: "以证据为先的 GPU 检测",
        title1: "DLSS 5 显卡证据",
        title2: "每个型号都有来源",
        desc: "DLSS 5 是 NVIDIA 的神经渲染路径：用模型重建光照、材质与细节，模型由游戏引擎画面与真实照片配对训练。本站把 31 款 GeForce RTX 型号逐一对应到状态背后的来源——6 款已确认、9 款未确认、16 款在已公布范围之外。",
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
        s1_val: "31", s1_lbl: "款 GPU 已追踪",
        s2_val: "来源", s2_lbl: "每款都有出处",
        s3_val: "证据", s3_lbl: "状态可核查"
      },
      about: {
        title1: "什么是", title2: "NVIDIA DLSS 5?",
        p1: "DLSS 5 是 NVIDIA 已公布的神经渲染路径。本页记录 NVIDIA 已公开的内容，并把尚未确认的部分单独标出。",
        p2: "NVIDIA 将 3D 引导神经渲染描述为向渲染画面加入光照、材质和细节。本检测器不会推断内部硬件模块，也不会承诺统一结果。",
        f1_title: "NVIDIA Blackwell 架构专属优化",
        f1_desc: "专为充分发挥 GeForce RTX 50 系列第五代 Tensor Core 潜能而设计。",
        f2_title: "已公布的首发范围",
        f2_desc: "RTX 50 系列显卡与 GeForce NOW 是资料中记录的首发范围。"
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
        a3: "NVIDIA 将 3D-Guided Neural Rendering 描述为使用颜色与运动矢量输入，让光照、材质等输出锚定 3D 内容并逐帧保持一致。来源：https://www.nvidia.com/en-us/geforce/news/dlss-5-3d-guided-neural-rendering/（复核日期 2026-10-13）。",
        q4: "GeForce RTX 3080 或 RTX 4090 可以使用 DLSS 5 吗？",
        a4: "尚未确认。当前 NVIDIA 资料点名 RTX 50 系列显卡与 GeForce NOW；资料表示计划扩展到 RTX 40 系列，但没有日期。",
        q5: "DLSS 5 和 DLSS 4 有什么区别？",
        a5: "两者的设计目标完全不同。DLSS 4 侧重于性能提升（通过 DLSS 帧生成获得更高的帧率），而 DLSS 5 则专注于视觉保真度（提供更逼真的光照和材质）。在 GeForce RTX 50 系列显卡上，您可以同时开启这两项 DLSS 技术。",
        q6: "哪些游戏将支持 DLSS 5？",
        a6: "本站把已上线作品与已宣布计划分开追踪。请查看游戏页面中的日期和来源，不要把预告名单当成当前支持列表。",
        q7: "为什么 DLSS 5 演示需要两张 GeForce RTX 5090？",
        a7: "早期演示使用的是预览版本。不要把演示时的配置当作正式版本的硬件要求。"
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
        badge: "以證據為先的 GPU 檢查",
        title1: "DLSS 5 顯示卡證據",
        title2: "每個型號都有來源",
        desc: "DLSS 5 是 NVIDIA 的神經渲染路徑：用模型重建光照、材質與細節，模型由遊戲引擎畫面與真實照片配對訓練。本站把 31 款 GeForce RTX 型號逐一對應到狀態背後的來源——6 款已確認、9 款未確認、16 款在已公佈範圍之外。",
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
        s1_val: "31", s1_lbl: "款 GPU 已追蹤",
        s2_val: "來源", s2_lbl: "每款都有出處",
        s3_val: "證據", s3_lbl: "狀態可核查"
      },
      about: {
        title1: "什麼是", title2: "DLSS 5?",
        p1: "DLSS 5 是 NVIDIA 已公布的神經渲染路徑。本頁記錄 NVIDIA 已公開的內容，並把尚未確認的部分分開標示。",
        p2: "NVIDIA 將 3D 引導神經渲染描述為向渲染畫面加入光照、材質和細節。本檢查器不會推斷內部硬體模組，也不承諾統一結果。",
        f1_title: "Blackwell 架構專屬最佳化",
        f1_desc: "專為充分發揮第五代 Tensor Core 潛能而設計。",
        f2_title: "已公布的首發範圍",
        f2_desc: "RTX 50 系列顯示卡與 GeForce NOW 是資料中記錄的首發範圍。"
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
        a3: "NVIDIA 將 3D-Guided Neural Rendering 描述為使用色彩與運動向量輸入，讓光照、材質等輸出錨定 3D 內容並逐幀保持一致。來源：https://www.nvidia.com/en-us/geforce/news/dlss-5-3d-guided-neural-rendering/（複核日期 2026-10-13）。",
        q4: "RTX 3080 或 RTX 4090 可以使用 DLSS 5 嗎？",
        a4: "尚未確認。目前 NVIDIA 資料點名 RTX 50 系列顯示卡與 GeForce NOW；資料表示計畫擴展到 RTX 40 系列，但沒有日期。",
        q5: "DLSS 5 和 DLSS 4 有什麼區別？",
        a5: "兩者的設計目標完全不同。DLSS 4 側重於效能提升（透過影格生成獲得更高的幀率），而 DLSS 5 則專注於視覺保真度（提供更逼真的光照和材質）。在 RTX 50 系列顯示卡上，您可以同時開啟這兩項技術。",
        q6: "哪些遊戲將支援 DLSS 5？",
        a6: "本站把已上線作品與已宣布計畫分開追蹤。請查看遊戲頁面的日期與來源，不要把預告名單當成目前支援列表。",
        q7: "為什麼 DLSS 5 演示需要兩張 RTX 5090？",
        a7: "早期展示使用的是預覽版本。不要把展示時的配置當作正式版本的硬體要求。"
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
        s1_val: "31", s1_lbl: "款 GPU 已追蹤",
        s2_val: "來源", s2_lbl: "每款都有出處",
        s3_val: "證據", s3_lbl: "狀態可核查"
      },
      about: {
        title1: "什麼是", title2: "DLSS 5?",
        p1: "DLSS 5 是 NVIDIA 已公布的神經渲染路徑。本頁記錄 NVIDIA 已公開的內容，並把尚未確認的部分分開標示。",
        p2: "NVIDIA 將 3D 引導神經渲染描述為向渲染畫面加入光照、材質和細節。本檢查器不會推斷內部硬體模組，也不承諾統一結果。",
        f1_title: "Blackwell 架構專屬最佳化",
        f1_desc: "專為充分發揮第五代 Tensor Core 潛能而設計。",
        f2_title: "已公布的首發範圍",
        f2_desc: "RTX 50 系列顯示卡與 GeForce NOW 是資料中記錄的首發範圍。"
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
        a3: "NVIDIA 將 3D-Guided Neural Rendering 描述為使用色彩與運動向量輸入，讓光照、材質等輸出錨定 3D 內容並逐幀保持一致。來源：https://www.nvidia.com/en-us/geforce/news/dlss-5-3d-guided-neural-rendering/（複核日期 2026-10-13）。",
        q4: "RTX 3080 或 RTX 4090 可以使用 DLSS 5 嗎？",
        a4: "尚未確認。目前 NVIDIA 資料點名 RTX 50 系列顯示卡與 GeForce NOW；資料表示計畫擴展到 RTX 40 系列，但沒有日期。",
        q5: "DLSS 5 和 DLSS 4 有什麼區別？",
        a5: "兩者的設計目標完全不同。DLSS 4 側重於效能提升（透過影格生成獲得更高的幀率），而 DLSS 5 則專注於視覺保真度（提供更逼真的光照和材質）。在 RTX 50 系列顯示卡上，您可以同時開啟這兩項技術。",
        q6: "哪些遊戲將支援 DLSS 5？",
        a6: "本站把已上線作品與已宣布計畫分開追蹤。請查看遊戲頁面的日期與來源，不要把預告名單當成目前支援列表。",
        q7: "為什麼 DLSS 5 演示需要兩張 RTX 5090？",
        a7: "早期展示使用的是預覽版本。不要把展示時的配置當作正式版本的硬體要求。"
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
        s1_val: "31", s1_lbl: "추적 GPU 모델",
        s2_val: "출처", s2_lbl: "모델별 근거",
        s3_val: "증거", s3_lbl: "인용 가능한 상태"
      },
      about: {
        title1: "DLSS 5란", title2: "무엇인가요?",
        p1: "DLSS 5는 NVIDIA가 발표한 신경망 렌더링 경로입니다. 이 페이지는 NVIDIA가 공개한 내용과 아직 확인되지 않은 내용을 나누어 기록합니다.",
        p2: "NVIDIA는 3D 유도 신경망 렌더링을 렌더링된 프레임에 조명, 재질, 디테일을 더하는 방식으로 설명합니다. 이 검사기는 내부 하드웨어 블록이나 보편적인 결과를 추정하지 않습니다.",
        f1_title: "Blackwell 아키텍처 최적화",
        f1_desc: "5세대 Tensor 코어를 활용하도록 특별히 설계되었습니다.",
        f2_title: "공개된 출시 범위",
        f2_desc: "RTX 50 시리즈 GPU와 GeForce NOW가 자료에 기록된 출시 범위입니다."
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
        a3: "NVIDIA는 3D-Guided Neural Rendering이 색상과 모션 벡터를 입력으로 사용해 조명과 재질 출력을 3D 콘텐츠에 맞추고 프레임마다 일관되게 유지한다고 설명합니다. 출처: https://www.nvidia.com/en-us/geforce/news/dlss-5-3d-guided-neural-rendering/ (확인일 2026-10-13).",
        q4: "RTX 3080 또는 RTX 4090에서 DLSS 5를 사용할 수 있나요?",
        a4: "확인되지 않았습니다. 현재 NVIDIA 자료는 RTX 50 시리즈 GPU와 GeForce NOW를 명시하며, RTX 40 지원은 날짜 없이 확대 계획으로 설명됩니다.",
        q5: "DLSS 5는 DLSS 4와 다른가요?",
        a5: "네, 목표가 완전히 다릅니다. DLSS 4는 성능(프레임 생성을 통한 초당 프레임 수 증가)에 중점을 둡니다. DLSS 5는 시각적 충실도(더 나은 조명 및 재질)에 중점을 둡니다. RTX 50 시리즈 카드에서는 두 가지를 동시에 사용할 수 있습니다.",
        q6: "어떤 게임이 DLSS 5를 지원하나요?",
        a6: "이 추적기는 출시된 타이틀과 발표된 계획을 구분합니다. 미리보기 목록을 현재 지원 목록으로 보지 말고 게임 페이지의 날짜와 출처를 확인하세요.",
        q7: "DLSS 5 데모에 두 개의 RTX 5090이 필요한 이유는 무엇인가요?",
        a7: "초기 데모는 프리뷰 빌드였습니다. 데모 구성은 출시 버전의 하드웨어 요구사항이 아닙니다."
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
        s1_val: "31", s1_lbl: "追跡中のGPUモデル",
        s2_val: "出典", s2_lbl: "各モデルに根拠",
        s3_val: "証拠", s3_lbl: "引用できる状態"
      },
      about: {
        title1: "DLSS 5", title2: "とは？",
        p1: "DLSS 5はNVIDIAが発表したニューラルレンダリングの経路です。このページでは、NVIDIAが公開した内容と未確認の内容を分けて記録します。",
        p2: "NVIDIAは3Dガイド付きニューラルレンダリングを、レンダリングされたフレームにライティング、マテリアル、ディテールを加えるものとして説明しています。このチェッカーは内部ハードウェアや一律の結果を推測しません。",
        f1_title: "Blackwellアーキテクチャの最適化",
        f1_desc: "第5世代Tensorコアを活用するように特別に設計されています。",
        f2_title: "公開されたローンチ範囲",
        f2_desc: "RTX 50シリーズGPUとGeForce NOWが資料に記載されたローンチ範囲です。"
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
        a3: "NVIDIAは3D-Guided Neural Renderingについて、色とモーションベクトルを入力にし、照明やマテリアルを3Dコンテンツに結び付けてフレームごとの一貫性を保つと説明しています。出典: https://www.nvidia.com/en-us/geforce/news/dlss-5-3d-guided-neural-rendering/（確認日 2026-10-13）。",
        q4: "RTX 3080またはRTX 4090でDLSS 5を使用できますか？",
        a4: "未確認です。現在のNVIDIA資料はRTX 50シリーズGPUとGeForce NOWを示し、RTX 40の対応は時期を示さない拡張計画として説明されています。",
        q5: "DLSS 5はDLSS 4と違いますか？",
        a5: "はい、目標がまったく異なります。DLSS 4はパフォーマンス（フレーム生成によるFPSの向上）に重点を置いています。DLSS 5は視覚的な忠実度（より良いライティングとマテリアル）に重点を置いています。RTX 50シリーズカードでは、両方を同時に使用できます。",
        q6: "どのゲームがDLSS 5をサポートしますか？",
        a6: "このトラッカーでは、提供開始済みのタイトルと発表済みの計画を分けています。予告リストを現在の対応一覧とみなさず、ゲームページの日付と出典を確認してください。",
        q7: "なぜDLSS 5のデモには2つのRTX 5090が必要だったのですか？",
        a7: "初期デモはプレビュービルドでした。デモ時の構成を製品版のハードウェア要件とみなさないでください。"
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
        s1_val: "31", s1_lbl: "GPU monitorizadas",
        s2_val: "Fuente", s2_lbl: "Una por modelo",
        s3_val: "Evidencia", s3_lbl: "Estado con cita"
      },
      about: {
        title1: "¿Qué es", title2: "DLSS 5?",
        p1: "DLSS 5 es la ruta de renderizado neuronal anunciada por NVIDIA. Esta página separa lo que NVIDIA ha publicado de lo que todavía no está confirmado.",
        p2: "NVIDIA describe el renderizado neuronal guiado por 3D como una forma de añadir iluminación, materiales y detalle a los fotogramas renderizados. Este comprobador no deduce bloques de hardware internos ni resultados universales.",
        f1_title: "Optimización de la Arquitectura Blackwell",
        f1_desc: "Diseñado específicamente para aprovechar los Tensor Cores de 5ª generación.",
        f2_title: "Alcance de lanzamiento publicado",
        f2_desc: "Las GPU RTX 50 y GeForce NOW son el alcance de debut documentado."
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
        a3: "NVIDIA describe 3D-Guided Neural Rendering como un sistema que usa color y vectores de movimiento para anclar la iluminación y los materiales al contenido 3D y mantener la coherencia entre fotogramas. Fuente: https://www.nvidia.com/en-us/geforce/news/dlss-5-3d-guided-neural-rendering/ (consultado el 2026-10-13).",
        q4: "¿Puede la RTX 3080 o RTX 4090 usar DLSS 5?",
        a4: "No confirmado. Los materiales actuales de NVIDIA mencionan las GPU RTX 50 y GeForce NOW; el soporte RTX 40 aparece como un plan futuro sin fecha.",
        q5: "¿Es DLSS 5 diferente de DLSS 4?",
        a5: "Sí, objetivos completamente diferentes. DLSS 4 se trata de rendimiento (más fotogramas por segundo a través de la generación de fotogramas). DLSS 5 se trata de fidelidad visual (mejor iluminación y materiales). En una tarjeta de la serie RTX 50 puedes usar ambos simultáneamente.",
        q6: "¿Qué juegos soportarán DLSS 5?",
        a6: "El rastreador separa títulos lanzados de planes anunciados. Consulta las fechas y fuentes de la página de juegos en lugar de tratar una lista preliminar como soporte actual.",
        q7: "¿Por qué la demostración de DLSS 5 requirió dos RTX 5090?",
        a7: "La demostración inicial era una versión preliminar. Su configuración no debe interpretarse como requisito de hardware de la versión comercial."
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
        s1_val: "31", s1_lbl: "GPU suivis",
        s2_val: "Source", s2_lbl: "Une par modèle",
        s3_val: "Preuve", s3_lbl: "État cité"
      },
      about: {
        title1: "Qu'est-ce que", title2: "le DLSS 5 ?",
        p1: "DLSS 5 est la voie de rendu neuronal annoncée par NVIDIA. Cette page sépare ce que NVIDIA a publié de ce qui reste non confirmé.",
        p2: "NVIDIA décrit le rendu neuronal guidé par la 3D comme une façon d’ajouter éclairage, matériaux et détails aux images rendues. Ce vérificateur ne déduit ni bloc matériel interne ni résultat universel.",
        f1_title: "Optimisation de l'Architecture Blackwell",
        f1_desc: "Spécialement conçu pour tirer parti des Tensor Cores de 5ème génération.",
        f2_title: "Périmètre de lancement publié",
        f2_desc: "Les GPU RTX 50 et GeForce NOW sont le périmètre de lancement documenté."
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
        a3: "NVIDIA décrit 3D-Guided Neural Rendering comme utilisant la couleur et les vecteurs de mouvement pour ancrer l’éclairage et les matériaux dans le contenu 3D et garder une cohérence entre les images. Source : https://www.nvidia.com/en-us/geforce/news/dlss-5-3d-guided-neural-rendering/ (vérifié le 2026-10-13).",
        q4: "Les RTX 3080 ou RTX 4090 peuvent-elles utiliser le DLSS 5 ?",
        a4: "Non confirmé. Les documents actuels de NVIDIA citent les GPU RTX 50 et GeForce NOW ; la prise en charge des RTX 40 est présentée comme un projet sans date.",
        q5: "Le DLSS 5 est-il différent du DLSS 4 ?",
        a5: "Oui, des objectifs complètement différents. Le DLSS 4 concerne les performances (plus d'images par seconde via la génération d'images). Le DLSS 5 concerne la fidélité visuelle (meilleur éclairage et matériaux). Sur une carte de la série RTX 50, vous pouvez utiliser les deux simultanément.",
        q6: "Quels jeux prendront en charge le DLSS 5 ?",
        a6: "Le suivi distingue les titres lancés des projets annoncés. Consultez les dates et les sources de la page des jeux plutôt qu’une liste préliminaire.",
        q7: "Pourquoi la démo du DLSS 5 a-t-elle nécessité deux RTX 5090 ?",
        a7: "La démonstration initiale était une version préliminaire. Sa configuration ne constitue pas la configuration matérielle de la version commerciale."
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
        desc: "Überprüfen Sie sofort, ob Ihre Hardware-Architektur für NVIDIAs veröffentlichter neuraler Rendering-Technologie der nächsten Generation bereit ist.",
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
        s1_val: "31", s1_lbl: "GPU-Modelle erfasst",
        s2_val: "Quelle", s2_lbl: "Für jedes Modell",
        s3_val: "Beleg", s3_lbl: "Status mit Zitat"
      },
      about: {
        title1: "Was ist", title2: "DLSS 5?",
        p1: "DLSS 5 ist der von NVIDIA angekündigte Pfad für neuronales Rendering. Diese Seite trennt veröffentlichte NVIDIA-Angaben von noch unbestätigten Punkten.",
        p2: "NVIDIA beschreibt 3D-geführtes neuronales Rendering als Ergänzung von Beleuchtung, Materialien und Details in gerenderten Bildern. Dieser Checker leitet weder interne Hardwareblöcke noch einheitliche Ergebnisse ab.",
        f1_title: "Blackwell-Architekturoptimierung",
        f1_desc: "Speziell entwickelt, um Tensor-Kerne der 5. Generation zu nutzen.",
        f2_title: "Veröffentlichter Startumfang",
        f2_desc: "RTX-50-GPUs und GeForce NOW bilden den dokumentierten Startumfang."
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
        a3: "NVIDIA beschreibt 3D-Guided Neural Rendering als Nutzung von Farbe und Bewegungsvektoren, um Beleuchtung und Materialien an 3D-Inhalte zu binden und die Konsistenz zwischen Frames zu halten. Quelle: https://www.nvidia.com/en-us/geforce/news/dlss-5-3d-guided-neural-rendering/ (geprüft am 2026-10-13).",
        q4: "Kann die RTX 3080 oder RTX 4090 DLSS 5 verwenden?",
        a4: "Nicht bestätigt. Die aktuellen NVIDIA-Materialien nennen RTX-50-GPUs und GeForce NOW; RTX-40-Unterstützung wird als undatierter Ausbauplan beschrieben.",
        q5: "Unterscheidet sich DLSS 5 von DLSS 4?",
        a5: "Ja, völlig unterschiedliche Ziele. Bei DLSS 4 geht es um Leistung (mehr Bilder pro Sekunde durch Frame-Generierung). Bei DLSS 5 geht es um visuelle Wiedergabetreue (bessere Beleuchtung und Materialien). Auf einer Karte der RTX 50-Serie können Sie beides gleichzeitig verwenden.",
        q6: "Welche Spiele werden DLSS 5 unterstützen?",
        a6: "Der Tracker trennt gestartete Titel von angekündigten Plänen. Prüfe die Datumsangaben und Quellen der Spiele-Seite, statt eine Vorschau als aktuellen Support zu behandeln.",
        q7: "Warum benötigte die DLSS 5-Demo zwei RTX 5090?",
        a7: "Die frühe Demo war ein Preview-Build. Ihre Konfiguration ist keine Hardwareanforderung der ausgelieferten Version."
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
        s1_val: "31", s1_lbl: "Seurattua GPU-mallia",
        s2_val: "Lähde", s2_lbl: "Jokaiselle mallille",
        s3_val: "Näyttö", s3_lbl: "Tila lähteellä"
      },
      about: {
        title1: "Mikä on", title2: "DLSS 5?",
        p1: "DLSS 5 on NVIDIAn ilmoittama neuroverkkopohjaisen renderöinnin polku. Tämä sivu erottaa NVIDIAn julkaisemat tiedot asioista, joita ei ole vielä vahvistettu.",
        p2: "NVIDIA kuvaa 3D-ohjattua neuroverkkorenderöintiä tapana lisätä valaistusta, materiaaleja ja yksityiskohtia renderöityihin kuviin. Tarkistin ei päättele sisäisiä laitteistolohkoja tai yleispätevää tulosta.",
        f1_title: "Blackwell-arkkitehtuurin optimointi",
        f1_desc: "Suunniteltu erityisesti hyödyntämään 5. sukupolven Tensor-ytimiä.",
        f2_title: "Julkaistu julkaisun laajuus",
        f2_desc: "RTX 50 -sarjan GPU:t ja GeForce NOW ovat dokumentoitu debyytin laajuus."
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
        a3: "NVIDIA kuvaa 3D-Guided Neural Rendering -tekniikkaa menetelmänä, joka käyttää väri- ja liikevektoritietoja valaistuksen ja materiaalien sitomiseen 3D-sisältöön sekä johdonmukaisuuden säilyttämiseen ruutujen välillä. Lähde: https://www.nvidia.com/en-us/geforce/news/dlss-5-3d-guided-neural-rendering/ (tarkistettu 2026-10-13).",
        q4: "Voiko RTX 3080 tai RTX 4090 käyttää DLSS 5:tä?",
        a4: "Ei vahvistettu. NVIDIAn nykyiset materiaalit nimeävät RTX 50 -sarjan GPU:t ja GeForce NOW:n; RTX 40 -tuki kuvataan ajankohdattomana laajennussuunnitelmana.",
        q5: "Eroaako DLSS 5 DLSS 4:stä?",
        a5: "Kyllä, täysin eri tavoitteet. DLSS 4 koskee suorituskykyä (enemmän ruutuja sekunnissa ruutujen luomisen kautta). DLSS 5 koskee visuaalista tarkkuutta (parempi valaistus ja materiaalit). RTX 50 -sarjan kortilla voit käyttää molempia samanaikaisesti.",
        q6: "Mitkä pelit tukevat DLSS 5:tä?",
        a6: "Seuranta erottaa julkaistut pelit ilmoitetuista suunnitelmista. Tarkista pelisivun päivämäärät ja lähteet sen sijaan, että pitäisit esikatselulistaa nykyisenä tukena.",
        q7: "Miksi DLSS 5 -demo vaati kaksi RTX 5090:tä?",
        a7: "Varhainen demo oli esikatseluversio. Sen kokoonpano ei ole toimitettavan version laitteistovaatimus."
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
