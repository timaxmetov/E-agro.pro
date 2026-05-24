"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useInView, animate, useMotionValue } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  Droplets,
  Globe2,
  Linkedin,
  Mail,
  Menu,
  PackageOpen,
  Phone,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Sprout,
  Tractor,
  User,
  X,
  XCircle
} from "lucide-react";

type Lang = "tr" | "en" | "ru";

// Prefix local public assets with basePath (set at build time by next.config.mjs).
// Required because Next/Image with unoptimized:true + output:export does NOT auto-prepend basePath.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (p: string) => `${BASE_PATH}${p}`;

const UNSPLASH = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

const photos = {
  howItWorks: [
    UNSPLASH("1466692476868-aef1dfb1e735"), // aerial farmland — catalog overview
    UNSPLASH("1450101499163-c8848c66ca85"), // handshake — verification
    UNSPLASH("1554260570-9140fd3b7614")     // corporate / direct B2B
  ],
  categories: [
    UNSPLASH("1594771804886-a933bb2d609b"), // green tractor with hay baler in golden field
    UNSPLASH("1692369584496-3216a88f94c1"), // center pivot irrigation over green corn field
    UNSPLASH("1591754060004-f91c95f5cf05"), // industrial greenhouse interior with grow lights
    UNSPLASH("1684607961356-1d99dc31aee2")  // row of grain storage silos
  ],
  team: [
    "from-emerald-500 to-teal-600",
    "from-sky-500 to-indigo-600",
    "from-amber-500 to-orange-600",
    "from-rose-500 to-pink-600"
  ]
};

const marketFlags: Record<string, string> = {
  Турция: "🇹🇷", Turkey: "🇹🇷", Türkiye: "🇹🇷",
  Азербайджан: "🇦🇿", Azerbaijan: "🇦🇿", Azerbaycan: "🇦🇿",
  Казахстан: "🇰🇿", Kazakhstan: "🇰🇿", Kazakistan: "🇰🇿",
  Узбекистан: "🇺🇿", Uzbekistan: "🇺🇿", Özbekistan: "🇺🇿",
  Кыргызстан: "🇰🇬", Kyrgyzstan: "🇰🇬", Kırgızistan: "🇰🇬",
  Россия: "🇷🇺", Russia: "🇷🇺", Rusya: "🇷🇺",
  "Саудовская Аравия": "🇸🇦", "Saudi Arabia": "🇸🇦", "Suudi Arabistan": "🇸🇦",
  ОАЭ: "🇦🇪", UAE: "🇦🇪", BAE: "🇦🇪",
  Китай: "🇨🇳", China: "🇨🇳", Çin: "🇨🇳"
};

const marketKpis: Record<string, string> = {
  "🇹🇷": "$1.2B export",
  "🇦🇿": "$140M demand",
  "🇰🇿": "$320M import",
  "🇺🇿": "$280M import",
  "🇰🇬": "$90M import",
  "🇷🇺": "$650M import",
  "🇸🇦": "$480M import",
  "🇦🇪": "$210M import",
  "🇨🇳": "$1.8B supply"
};

// ============ COPY ============

const copy = {
  ru: {
    nav: ["Как работает", "Категории", "Рынки", "Roadmap", "Контакты"],
    cta: "Связаться",
    heroBadge: "MVP Live · Алматы и Анталья · Seed Open",
    heroBrand: "e-Agro PRO · Информационный посредник",
    heroTitle: "Глобальная цепочка агропоставок",
    heroSubline: "Цифровая B2B-экосистема для прямого импорта. Турецкие заводы → СНГ и MENA. Без посредников, рисков и переплат.",
    heroMission: "Миссия: сделать агробизнес прозрачным, технологичным и доступным.",
    primaryCta: "Узнать вашу цену",
    secondaryCta: "Я завод",
    stickyCta: "Узнать вашу цену",
    trustPills: ["100+ заводов с KYB", "UN / EU / OFAC", "Прямой SWIFT"],
    sections: {
      how: "Как это работает",
      howSub: "Три шага между вами и заводом",
      categories: "Что продаём",
      categoriesSub: "Только тяжёлое оборудование. Никакой химии, дронов и санкционных рисков.",
      markets: "Где работаем",
      marketsSub: "Тюркский коридор сейчас. Глобальная экспансия — следующий шаг.",
      calculator: "Сколько вы сэкономите?",
      calculatorSub: "Подвиньте слайдер — увидите экономию через прямую закупку.",
      roadmap: "Дорожная карта 2026 — 2029",
      roadmapSub: "От тюркского коридора до глобальной экосистемы аграрной торговли.",
      investor: "Открытый раунд · Информационный посредник",
      team: "Команда",
      finalTitle: "С чего начнём?"
    },
    how: [
      ["1", "Выбираете завод", "Каталог из 100+ верифицированных заводов с прозрачной картой производства."],
      ["2", "Мы проверяем", "Sanayi Sicil / Kapasite Raporu, санкционный скрининг UN/EU/OFAC/UK, видео-валидация при сомнениях."],
      ["3", "Платите напрямую", "B2B-платёж SWIFT/IBAN между вами и заводом. Поддержка Incoterms 2020 и SGS pre-shipment."]
    ],
    categories: [
      ["Тракторы и комбайны", "от $50K"],
      ["Системы орошения", "от $30K"],
      ["Промышленные теплицы", "от $100K"],
      ["Линии переработки", "от $20K"]
    ],
    whitelist: {
      yesTitle: "Продаём",
      noTitle: "Не продаём",
      yes: ["Тракторы и комбайны", "Pivot и капельное орошение", "Промышленные теплицы под ключ", "Линии переработки урожая", "Генераторы и оборудование"],
      no: ["Семена", "Удобрения и агрохимия", "Любые дроны (Dual-Use)", "Живой скот", "Продукты питания"]
    },
    proof: [
      { value: 100, label: "верифицированных заводов", suffix: "+" },
      { value: 40, label: "средняя экономия", suffix: "%" },
      { value: 0, label: "посредников между вами и заводом", suffix: "" }
    ],
    marketsTurkicTitle: "Тюркский коридор · 2026 — 2028",
    marketsGlobalTitle: "Глобальная экспансия · 2029 +",
    marketsTurkic: ["Турция", "Азербайджан", "Казахстан", "Узбекистан", "Кыргызстан"],
    marketsGlobal: ["Китай", "Саудовская Аравия", "ОАЭ", "Россия"],
    corridor: "Турция → Азербайджан → Казахстан → Узбекистан → Кыргызстан",
    corridorTitle: "Активный коридор · Тюркский мир",
    corridorHint: "Наведите на узел",
    corridorHubLabel: "Хаб",
    corridorNodes: {
      ist: { name: "Турция", detail: "Анталья · Бурса · Измир — заводы-партнёры" },
      bak: { name: "Азербайджан", detail: "Баку — логистический хаб" },
      alm: { name: "Казахстан", detail: "Алматы · Астана — операционные центры" },
      tas: { name: "Узбекистан", detail: "Ташкент · Самарканд — растущий спрос" },
      bis: { name: "Кыргызстан", detail: "Бишкек — региональный покупатель" }
    },
    roadmap: [
      {
        year: "2026",
        phase: "Фундамент",
        tag: "Бесплатный каталог",
        progress: 0.22,
        bullets: [
          "MVP с каталогом 100+ верифицированных заводов",
          "KYB-аудит и санкционный скрининг UN/EU/OFAC",
          "Запуск тюркского коридора (🇹🇷🇦🇿🇰🇿🇺🇿🇰🇬)",
          "Офисы Анталья и Алматы"
        ]
      },
      {
        year: "2027",
        phase: "Монетизация",
        tag: "Подписки + Verified",
        progress: 0.05,
        bullets: [
          "Тарифы Silver $250 / Gold $1000 / Diamond $2000",
          "Verified Supplier бейджи и рейтинги",
          "White Glove сервис для KOBİ",
          "Sales-офис в Ташкенте"
        ]
      },
      {
        year: "2028",
        phase: "Масштаб",
        tag: "Trade Finance",
        progress: 0,
        bullets: [
          "Эскроу-комиссия и BNPL-факторинг",
          "API логистики (CDEK, Turkish Cargo, AsstrA)",
          "Control Tower для отслеживания грузов",
          "Полная операция в тюркском мире"
        ]
      },
      {
        year: "2029",
        phase: "Глобальная экспансия",
        tag: "Series A · Data",
        progress: 0,
        bullets: [
          "🇨🇳 Joint Venture с Alibaba — выход в Китай",
          "🇸🇦🇦🇪 MENA: Эр-Рияд, ОАЭ, арабская версия",
          "🇷🇺 Россия и СНГ",
          "Series A $3-5M @ $50M оценка"
        ]
      }
    ],
    investorPills: ["Seed $470K", "Runway 24 мес", "$5.5M GMV target", "Safe Harbor model"],
    investorCta: "Запросить deck",
    team: [
      ["Eldos Kenzhakhmetov", "CEO"],
      ["Alexander", "CTO"],
      ["Timur Akhmetov", "COO & CPO"],
      ["Telman Kadim", "Türkiye Manager"]
    ],
    personas: [
      { label: "Я ищу технику", href: "#calculator" },
      { label: "Я завод", href: "#calculator" }
    ],
    calculator: {
      volumeLabel: "Годовой объём закупок",
      volumeUnit: "USD",
      categoryLabel: "Категория",
      categories: ["Тракторы и комбайны", "Системы орошения", "Промышленные теплицы", "Линии переработки"],
      currentLabel: "Маржа посредников",
      savingsLabel: "Ваша экономия в год",
      ctaLabel: "Полный отчёт",
      liveLabel: "Живой расчёт",
      steps: ["Расчёт", "Профиль", "Контакты"],
      stepHeaders: ["Подвиньте слайдер", "Кто вы?", "Куда отправить?"],
      roleLabel: "Роль",
      roles: ["Покупатель", "Завод", "Дилер", "Инвестор"],
      countryLabel: "Страна",
      countries: ["Казахстан", "Узбекистан", "Турция", "Азербайджан", "Россия", "ОАЭ", "Китай", "Другое"],
      nameLabel: "Имя и компания",
      emailLabel: "Корпоративная почта",
      phoneLabel: "WhatsApp / телефон",
      next: "Далее",
      back: "Назад",
      submit: "Отправить",
      successTitle: "Готово.",
      successText: "Полный отчёт придёт на info@e-agro.pro в течение 24 часов.",
      ofProcurement: "от годовой закупки"
    },
    footer: {
      tagline: "Информационный посредник между турецкими заводами и покупателями СНГ/MENA.",
      copyright: "© 2026 E-AGRO PRO · TECHNOEXPORT LLC"
    },
    heroCardRegion: "Турция / Тюркский мир",
    heroCardTitle: "Verified · Hard Goods",
    liveRfqLabel: "Заявка"
  },
  en: {
    nav: ["How it works", "Categories", "Markets", "Roadmap", "Contact"],
    cta: "Contact",
    heroBadge: "MVP Live · Almaty & Antalya · Seed Open",
    heroBrand: "e-Agro PRO · Information Intermediary",
    heroTitle: "Global agri-supply chain",
    heroSubline: "Digital B2B ecosystem for direct import. Turkish factories → CIS & MENA. No intermediaries, no risk, no markups.",
    heroMission: "Mission: make agribusiness transparent, technological, and accessible.",
    primaryCta: "Get your price",
    secondaryCta: "I'm a factory",
    stickyCta: "Get your price",
    trustPills: ["100+ KYB-audited factories", "UN / EU / OFAC", "Direct SWIFT"],
    sections: {
      how: "How it works",
      howSub: "Three steps between you and the factory",
      categories: "What we sell",
      categoriesSub: "Hardware only. No chemistry, drones, or sanctions risk.",
      markets: "Where we operate",
      marketsSub: "Turkic corridor today. Global expansion next.",
      calculator: "How much you save",
      calculatorSub: "Drag the slider — see your savings from direct procurement.",
      roadmap: "Roadmap 2026 — 2029",
      roadmapSub: "From Turkic corridor to global agricultural-trade ecosystem.",
      investor: "Open round · Information Intermediary",
      team: "Team",
      finalTitle: "Where do we start?"
    },
    how: [
      ["1", "Pick a factory", "Catalog of 100+ KYB-audited factories with a transparent production profile."],
      ["2", "We verify", "Local docs (Sanayi Sicil / Kapasite Raporu), sanctions screening UN/EU/OFAC/UK, video validation on demand."],
      ["3", "Pay direct", "B2B SWIFT/IBAN payment between you and the factory. Incoterms 2020 and SGS pre-shipment supported."]
    ],
    categories: [
      ["Tractors & Harvesters", "from $50K"],
      ["Irrigation Systems", "from $30K"],
      ["Industrial Greenhouses", "from $100K"],
      ["Processing Lines", "from $20K"]
    ],
    whitelist: {
      yesTitle: "We sell",
      noTitle: "We don't",
      yes: ["Tractors & harvesters", "Pivot & drip irrigation", "Turnkey greenhouses", "Processing lines", "Generators & ancillaries"],
      no: ["Seeds", "Fertilizer & agrochemistry", "Any drones (Dual-Use)", "Livestock", "Food products"]
    },
    proof: [
      { value: 100, label: "verified factories", suffix: "+" },
      { value: 40, label: "average saving", suffix: "%" },
      { value: 0, label: "intermediaries between you and the factory", suffix: "" }
    ],
    marketsTurkicTitle: "Turkic corridor · 2026 — 2028",
    marketsGlobalTitle: "Global expansion · 2029 +",
    marketsTurkic: ["Turkey", "Azerbaijan", "Kazakhstan", "Uzbekistan", "Kyrgyzstan"],
    marketsGlobal: ["China", "Saudi Arabia", "UAE", "Russia"],
    corridor: "Turkey → Azerbaijan → Kazakhstan → Uzbekistan → Kyrgyzstan",
    corridorTitle: "Active corridor · Turkic world",
    corridorHint: "Hover a node",
    corridorHubLabel: "Hub",
    corridorNodes: {
      ist: { name: "Turkey", detail: "Antalya · Bursa · İzmir — factory partners" },
      bak: { name: "Azerbaijan", detail: "Baku — logistics hub" },
      alm: { name: "Kazakhstan", detail: "Almaty · Astana — operations centers" },
      tas: { name: "Uzbekistan", detail: "Tashkent · Samarkand — rising demand" },
      bis: { name: "Kyrgyzstan", detail: "Bishkek — regional buyer" }
    },
    roadmap: [
      {
        year: "2026",
        phase: "Foundation",
        tag: "Free catalog",
        progress: 0.22,
        bullets: [
          "MVP with catalog of 100+ verified factories",
          "KYB audit and sanctions screening UN/EU/OFAC",
          "Launch of Turkic corridor (🇹🇷🇦🇿🇰🇿🇺🇿🇰🇬)",
          "Offices in Antalya and Almaty"
        ]
      },
      {
        year: "2027",
        phase: "Monetization",
        tag: "Subscriptions + Verified",
        progress: 0.05,
        bullets: [
          "Tariffs Silver $250 / Gold $1000 / Diamond $2000",
          "Verified Supplier badges and ratings",
          "White Glove service for SMEs",
          "Sales office in Tashkent"
        ]
      },
      {
        year: "2028",
        phase: "Scale",
        tag: "Trade Finance",
        progress: 0,
        bullets: [
          "Escrow commission and BNPL factoring",
          "Logistics API (CDEK, Turkish Cargo, AsstrA)",
          "Control Tower for shipment tracking",
          "Full operations in Turkic world"
        ]
      },
      {
        year: "2029",
        phase: "Global expansion",
        tag: "Series A · Data",
        progress: 0,
        bullets: [
          "🇨🇳 Joint Venture with Alibaba — entry into China",
          "🇸🇦🇦🇪 MENA: Riyadh, UAE, Arabic version",
          "🇷🇺 Russia and CIS",
          "Series A $3-5M @ $50M valuation"
        ]
      }
    ],
    investorPills: ["Seed $470K", "24-month runway", "$5.5M GMV target", "Safe Harbor model"],
    investorCta: "Request the deck",
    team: [
      ["Eldos Kenzhakhmetov", "CEO"],
      ["Alexander", "CTO"],
      ["Timur Akhmetov", "COO & CPO"],
      ["Telman Kadim", "Türkiye Manager"]
    ],
    personas: [
      { label: "I'm a buyer", href: "#calculator" },
      { label: "I'm a factory", href: "#calculator" }
    ],
    calculator: {
      volumeLabel: "Annual procurement volume",
      volumeUnit: "USD",
      categoryLabel: "Category",
      categories: ["Tractors & Harvesters", "Irrigation Systems", "Industrial Greenhouses", "Processing Lines"],
      currentLabel: "Intermediary margin",
      savingsLabel: "Your annual savings",
      ctaLabel: "Full report",
      liveLabel: "Live calculator",
      steps: ["Calculate", "Profile", "Contact"],
      stepHeaders: ["Drag the slider", "Who are you?", "Where to send?"],
      roleLabel: "Role",
      roles: ["Buyer", "Factory", "Dealer", "Investor"],
      countryLabel: "Country",
      countries: ["Kazakhstan", "Uzbekistan", "Turkey", "Azerbaijan", "Russia", "UAE", "China", "Other"],
      nameLabel: "Name & company",
      emailLabel: "Corporate email",
      phoneLabel: "WhatsApp / phone",
      next: "Continue",
      back: "Back",
      submit: "Send",
      successTitle: "Done.",
      successText: "Your full report will arrive at info@e-agro.pro within 24 hours.",
      ofProcurement: "of annual procurement"
    },
    footer: {
      tagline: "Information intermediary between Turkish factories and CIS/MENA buyers.",
      copyright: "© 2026 E-AGRO PRO · TECHNOEXPORT LLC"
    },
    heroCardRegion: "Turkey / Turkic world",
    heroCardTitle: "Verified · Hard Goods",
    liveRfqLabel: "Live RFQ"
  },
  tr: {
    nav: ["Nasıl çalışır", "Kategoriler", "Pazarlar", "Yol Haritası", "İletişim"],
    cta: "İletişim",
    heroBadge: "MVP Yayında · Almatı & Antalya · Seed Açık",
    heroBrand: "e-Agro PRO · Bilgi Aracısı",
    heroTitle: "Global tarım tedarik zinciri",
    heroSubline: "Doğrudan ithalat için dijital B2B ekosistem. Türk fabrikalar → BDT ve MENA. Aracısız, risksiz, marjsız.",
    heroMission: "Misyonumuz: tarımı şeffaf, teknolojik ve erişilebilir kılmak.",
    primaryCta: "Fiyatınızı öğrenin",
    secondaryCta: "Fabrikayım",
    stickyCta: "Fiyatınızı öğrenin",
    trustPills: ["100+ KYB fabrika", "UN / EU / OFAC", "Doğrudan SWIFT"],
    sections: {
      how: "Nasıl çalışır",
      howSub: "Sizinle fabrika arasında üç adım",
      categories: "Ne satıyoruz",
      categoriesSub: "Sadece ağır ekipman. Kimyasal, drone veya yaptırım riski yok.",
      markets: "Nerede faaliyetteyiz",
      marketsSub: "Bugün Türk koridoru. Sonraki adım global açılım.",
      calculator: "Ne kadar tasarruf?",
      calculatorSub: "Slider'ı sürükleyin — doğrudan tedarikten tasarrufu görün.",
      roadmap: "Yol Haritası 2026 — 2029",
      roadmapSub: "Türk koridorundan global tarım ticaret ekosistemine.",
      investor: "Açık tur · Bilgi Aracısı",
      team: "Ekip",
      finalTitle: "Nereden başlayalım?"
    },
    how: [
      ["1", "Fabrika seçin", "100+ KYB doğrulanmış fabrika ile şeffaf üretim profilleri."],
      ["2", "Doğrularız", "Yerel belgeler (Sanayi Sicil / Kapasite Raporu), yaptırım taraması UN/EU/OFAC/UK, gerektiğinde video doğrulama."],
      ["3", "Doğrudan ödeyin", "Sizinle fabrika arasında SWIFT/IBAN B2B ödeme. Incoterms 2020 ve SGS pre-shipment desteği."]
    ],
    categories: [
      ["Traktör ve biçerdöverler", "$50K'dan"],
      ["Sulama sistemleri", "$30K'dan"],
      ["Endüstriyel seralar", "$100K'dan"],
      ["İşleme hatları", "$20K'dan"]
    ],
    whitelist: {
      yesTitle: "Satıyoruz",
      noTitle: "Satmıyoruz",
      yes: ["Traktör ve biçerdöverler", "Pivot ve damla sulama", "Anahtar teslim seralar", "İşleme hatları", "Jeneratör ve yardımcı ekipman"],
      no: ["Tohum", "Gübre ve agrokimyasallar", "Her türlü drone (Dual-Use)", "Canlı hayvan", "Gıda ürünleri"]
    },
    proof: [
      { value: 100, label: "doğrulanmış fabrika", suffix: "+" },
      { value: 40, label: "ortalama tasarruf", suffix: "%" },
      { value: 0, label: "sizinle fabrika arasında aracı", suffix: "" }
    ],
    marketsTurkicTitle: "Türk koridoru · 2026 — 2028",
    marketsGlobalTitle: "Global açılım · 2029 +",
    marketsTurkic: ["Türkiye", "Azerbaycan", "Kazakistan", "Özbekistan", "Kırgızistan"],
    marketsGlobal: ["Çin", "Suudi Arabistan", "BAE", "Rusya"],
    corridor: "Türkiye → Azerbaycan → Kazakistan → Özbekistan → Kırgızistan",
    corridorTitle: "Aktif koridor · Türk dünyası",
    corridorHint: "Düğüme gelin",
    corridorHubLabel: "Hub",
    corridorNodes: {
      ist: { name: "Türkiye", detail: "Antalya · Bursa · İzmir — fabrika partnerleri" },
      bak: { name: "Azerbaycan", detail: "Bakü — lojistik merkezi" },
      alm: { name: "Kazakistan", detail: "Almatı · Astana — operasyon merkezleri" },
      tas: { name: "Özbekistan", detail: "Taşkent · Semerkant — büyüyen talep" },
      bis: { name: "Kırgızistan", detail: "Bişkek — bölgesel alıcı" }
    },
    roadmap: [
      {
        year: "2026",
        phase: "Temel",
        tag: "Ücretsiz katalog",
        progress: 0.22,
        bullets: [
          "100+ doğrulanmış fabrika ile MVP kataloğu",
          "KYB denetimi ve UN/EU/OFAC yaptırım taraması",
          "Türk koridorunun lansmanı (🇹🇷🇦🇿🇰🇿🇺🇿🇰🇬)",
          "Antalya ve Almatı ofisleri"
        ]
      },
      {
        year: "2027",
        phase: "Monetizasyon",
        tag: "Abonelik + Verified",
        progress: 0.05,
        bullets: [
          "Tarifeler Silver $250 / Gold $1000 / Diamond $2000",
          "Verified Supplier rozetleri ve puanlama",
          "KOBİ için White Glove hizmeti",
          "Taşkent'te satış ofisi"
        ]
      },
      {
        year: "2028",
        phase: "Ölçeklenme",
        tag: "Trade Finance",
        progress: 0,
        bullets: [
          "Escrow komisyonu ve BNPL faktoring",
          "Lojistik API (CDEK, Turkish Cargo, AsstrA)",
          "Sevkiyat takibi için Control Tower",
          "Türk dünyasında tam operasyon"
        ]
      },
      {
        year: "2029",
        phase: "Global açılım",
        tag: "Series A · Data",
        progress: 0,
        bullets: [
          "🇨🇳 Alibaba ile Joint Venture — Çin'e giriş",
          "🇸🇦🇦🇪 MENA: Riyad, BAE, Arapça versiyon",
          "🇷🇺 Rusya ve BDT",
          "Series A $3-5M @ $50M değerleme"
        ]
      }
    ],
    investorPills: ["Seed $470K", "24 aylık runway", "$5.5M GMV hedef", "Safe Harbor model"],
    investorCta: "Deck'i talep edin",
    team: [
      ["Eldos Kenzhakhmetov", "CEO"],
      ["Alexander", "CTO"],
      ["Timur Akhmetov", "COO & CPO"],
      ["Telman Kadim", "Türkiye Manager"]
    ],
    personas: [
      { label: "Alıcıyım", href: "#calculator" },
      { label: "Fabrikayım", href: "#calculator" }
    ],
    calculator: {
      volumeLabel: "Yıllık tedarik hacmi",
      volumeUnit: "USD",
      categoryLabel: "Kategori",
      categories: ["Traktör ve biçerdöverler", "Sulama sistemleri", "Endüstriyel seralar", "İşleme hatları"],
      currentLabel: "Aracı marjı",
      savingsLabel: "Yıllık tasarrufunuz",
      ctaLabel: "Tam rapor",
      liveLabel: "Canlı hesaplayıcı",
      steps: ["Hesapla", "Profil", "İletişim"],
      stepHeaders: ["Slider'ı sürükleyin", "Kimsiniz?", "Nereye?"],
      roleLabel: "Rol",
      roles: ["Alıcı", "Fabrika", "Bayi", "Yatırımcı"],
      countryLabel: "Ülke",
      countries: ["Kazakistan", "Özbekistan", "Türkiye", "Azerbaycan", "Rusya", "BAE", "Çin", "Diğer"],
      nameLabel: "İsim ve şirket",
      emailLabel: "Kurumsal e-posta",
      phoneLabel: "WhatsApp / telefon",
      next: "Devam",
      back: "Geri",
      submit: "Gönder",
      successTitle: "Tamam.",
      successText: "Tam rapor 24 saat içinde info@e-agro.pro adresine gelecek.",
      ofProcurement: "yıllık tedarikten"
    },
    footer: {
      tagline: "Türk fabrikaları ile BDT/MENA alıcıları arasında bilgi aracısı.",
      copyright: "© 2026 E-AGRO PRO · TECHNOEXPORT LLC"
    },
    heroCardRegion: "Türkiye / Türk dünyası",
    heroCardTitle: "Verified · Hard Goods",
    liveRfqLabel: "Canlı RFQ"
  }
} as const;

const anchors = ["how", "categories", "markets", "roadmap", "contacts"];

const partnerGradients = [
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-sky-500 to-indigo-600",
  "from-rose-500 to-pink-600",
  "from-violet-500 to-purple-600",
  "from-lime-500 to-green-600"
];

const partnerLogos = [
  "Antalya Tarım", "BurdurAgri", "Konya Makine", "Almaty AgroTech",
  "Tashkent Harvest", "Bishkek Fields", "Adana Export", "Astana Grain",
  "Baku Trade", "Samarkand Co", "Bursa Implements", "Karaganda Co"
];

// ============ Helpers ============

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ to, prefix = "", suffix = "", decimals = 0, duration = 1.6 }: { to: number; prefix?: string; suffix?: string; decimals?: number; duration?: number; }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(mv, to, { duration, ease: "easeOut", onUpdate: (l) => setDisplay(l) });
    return c.stop;
  }, [inView, to, duration, mv]);
  const f = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString();
  return <span ref={ref}>{prefix}{f}{suffix}</span>;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

function LogoMarquee({ logos }: { logos: readonly string[] }) {
  // Triplicate so manual scroll has runway in both directions and the auto-loop is seamless.
  const tripled = [...logos, ...logos, ...logos];
  const containerRef = useRef<HTMLDivElement>(null);
  const userIdleTimer = useRef<number | null>(null);
  const isPausedByUser = useRef(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Start in the middle copy so manual scroll has equal runway both ways.
    const oneCopy = el.scrollWidth / 3;
    el.scrollLeft = oneCopy;

    let raf = 0;
    let prev = performance.now();
    const SPEED = 28; // px / second
    const tick = (now: number) => {
      const dt = (now - prev) / 1000;
      prev = now;
      if (!hovered && !isPausedByUser.current) {
        el.scrollLeft += SPEED * dt;
        // Keep within the middle copy by wrapping on the seam between copy 2 → copy 3.
        if (el.scrollLeft >= oneCopy * 2) el.scrollLeft -= oneCopy;
        if (el.scrollLeft <= 0) el.scrollLeft += oneCopy;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hovered]);

  const pauseFromUser = () => {
    isPausedByUser.current = true;
    if (userIdleTimer.current) window.clearTimeout(userIdleTimer.current);
    userIdleTimer.current = window.setTimeout(() => {
      isPausedByUser.current = false;
    }, 1600);
  };

  // Drag-to-scroll for mouse (desktop): native scroll handles touch already.
  const dragState = useRef({ down: false, startX: 0, startLeft: 0 });
  const onMouseDown = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    dragState.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft };
    pauseFromUser();
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragState.current.down) return;
    const el = containerRef.current;
    if (!el) return;
    el.scrollLeft = dragState.current.startLeft - (e.clientX - dragState.current.startX);
  };
  const stopDrag = () => {
    dragState.current.down = false;
  };

  return (
    <div className="border-y border-agro-border bg-white/70 py-5 sm:py-7">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-agro-bg to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-agro-bg to-transparent sm:w-24" />
        <div
          ref={containerRef}
          className="no-scrollbar scroll-momentum flex select-none items-center gap-4 overflow-x-auto py-1 sm:gap-8"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); stopDrag(); }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onTouchStart={pauseFromUser}
          onTouchMove={pauseFromUser}
          onWheel={pauseFromUser}
          style={{ cursor: dragState.current.down ? "grabbing" : "grab" }}
        >
          {tripled.map((name, i) => {
            const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
            const grad = partnerGradients[i % partnerGradients.length];
            return (
              <div key={`${name}-${i}`} className="flex flex-none items-center gap-2.5 whitespace-nowrap rounded-xl border border-agro-border bg-white px-3 py-2 text-xs font-extrabold uppercase tracking-[0.1em] text-neutral-700 shadow-panel sm:gap-3 sm:px-4 sm:py-2.5 sm:text-sm">
                <span className={`flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-gradient-to-br ${grad} text-[10px] font-extrabold tracking-normal text-white shadow-glow sm:h-8 sm:w-8 sm:text-xs`}>
                  {initials}
                </span>
                {name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============ Corridor map ============

type CorridorNode = { id: string; name: string; detail: string; cx: number; cy: number };

function CorridorMap({ nodes, title, caption, hint, hubLabel }: { nodes: CorridorNode[]; title: string; caption: string; hint: string; hubLabel: string }) {
  const [active, setActive] = useState<string | null>(null);
  const pathD = `M ${nodes.map(n => `${n.cx},${n.cy}`).join(" L ")}`;
  return (
    <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-agro-border bg-white shadow-soft sm:min-h-[460px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(85,185,71,0.22),transparent_45%),radial-gradient(circle_at_30%_60%,rgba(47,107,47,0.14),transparent_40%)]" />
      <svg viewBox="0 0 800 460" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#55B947" />
            <stop offset="100%" stopColor="#2F6B2F" />
          </linearGradient>
        </defs>
        <path d={pathD} fill="none" stroke="url(#cg)" strokeWidth="2.4" strokeLinecap="round" opacity="0.45" />
        <path d={pathD} fill="none" stroke="#2F6B2F" strokeWidth="2.4" strokeLinecap="round" className="corridor-path" opacity="0.85" />
        {[0, 0.33, 0.66].map((d, i) => (
          <circle key={i} r="5" fill="#55B947" stroke="white" strokeWidth="1.5">
            <animateMotion dur="6s" begin={`${d * 6}s`} repeatCount="indefinite" path={pathD} />
          </circle>
        ))}
      </svg>
      {nodes.map((node, idx) => (
        <button
          key={node.id}
          onMouseEnter={() => setActive(node.id)}
          onMouseLeave={() => setActive(null)}
          onFocus={() => setActive(node.id)}
          onBlur={() => setActive(null)}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${(node.cx / 800) * 100}%`, top: `${(node.cy / 460) * 100}%` }}
          aria-label={node.name}
          type="button"
        >
          <span className="relative block h-4 w-4">
            <span className="node-pulse absolute inset-0 rounded-full" />
            <span className="absolute inset-0 rounded-full bg-agro-green ring-4 ring-white shadow-panel" />
          </span>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: active === node.id ? 1 : 0, y: active === node.id ? 0 : 6 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute left-1/2 top-6 z-20 w-40 -translate-x-1/2 rounded-xl border border-agro-border bg-white p-3 text-left shadow-soft"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-agro-dark">{`${hubLabel} ${idx + 1}`}</p>
            <p className="mt-1 text-sm font-extrabold text-agro-text">{node.name}</p>
            <p className="mt-1 text-xs leading-5 text-neutral-600">{node.detail}</p>
          </motion.div>
        </button>
      ))}
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-end justify-between gap-3 rounded-2xl bg-white/92 p-4 shadow-panel backdrop-blur sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-agro-dark sm:text-xs">{caption}</p>
          <h3 className="mt-1 text-base font-extrabold sm:text-xl">{title}</h3>
        </div>
        <p className="flex items-center gap-2 text-[10px] font-semibold text-neutral-500">
          <Sparkles className="h-4 w-4 text-agro-green" />
          {hint}
        </p>
      </div>
    </div>
  );
}

// ============ Calculator ============

function formatCurrency(value: number, lang: Lang) {
  const locale = lang === "ru" ? "ru-RU" : lang === "tr" ? "tr-TR" : "en-US";
  return new Intl.NumberFormat(locale, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function SavingsCalculator({ lang, title, intro }: { lang: Lang; title: string; intro: string }) {
  const c = copy[lang].calculator;
  const [volume, setVolume] = useState(500000);
  const [marginPct, setMarginPct] = useState(22);
  const [category, setCategory] = useState<string>(c.categories[0]);
  const savings = useMemo(() => Math.round((volume * marginPct) / 100 * 0.65), [volume, marginPct]);
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <section id="calculator" className="bg-white py-14 sm:py-20">
      <div className="section-shell">
        <FadeIn className="mb-6 max-w-2xl sm:mb-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-agro-text sm:text-3xl lg:text-4xl">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">{intro}</p>
        </FadeIn>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <FadeIn className="rounded-3xl border border-agro-border bg-agro-bg p-5 shadow-panel sm:p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-agro-green/12">
                <Calculator className="h-4 w-4 text-agro-green" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-agro-dark">{c.liveLabel}</p>
            </div>

            <label className="block">
              <span className="text-sm font-bold text-agro-text">{c.volumeLabel}</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-agro-text sm:text-3xl">{formatCurrency(volume, lang)}</span>
                <span className="text-[10px] font-semibold text-neutral-500">{c.volumeUnit}</span>
              </div>
              <input type="range" min={50000} max={5000000} step={50000} value={volume} onChange={e => setVolume(Number(e.target.value))} className="mt-3 w-full accent-agro-green" />
              <div className="mt-1 flex justify-between text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                <span>$50k</span><span>$5M</span>
              </div>
            </label>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-5">
              <label className="block">
                <span className="text-sm font-bold text-agro-text">{c.categoryLabel}</span>
                <select value={category} onChange={e => setCategory(e.target.value)} className="mt-2 w-full rounded-lg border border-agro-border bg-white px-3 py-3 text-sm font-bold outline-none focus:border-agro-green">
                  {c.categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-bold text-agro-text">{c.currentLabel}</span>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-agro-text">{marginPct}%</span>
                  <span className="text-[10px] font-semibold text-neutral-500">10–45%</span>
                </div>
                <input type="range" min={10} max={45} step={1} value={marginPct} onChange={e => setMarginPct(Number(e.target.value))} className="mt-2 w-full accent-agro-green" />
              </label>
            </div>

            <div className="mt-6 rounded-2xl bg-agro-dark p-5 text-white sm:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">{c.savingsLabel}</p>
              <p className="mt-2 text-3xl font-extrabold sm:text-5xl">{formatCurrency(savings, lang)}</p>
              <p className="mt-2 text-[10px] font-semibold text-white/60">≈ {Math.round((savings / volume) * 100)}% {c.ofProcurement}</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="rounded-3xl border border-agro-border bg-white p-5 shadow-panel sm:p-7">
            <div className="mb-5 flex items-center gap-2">
              {c.steps.map((label, i) => {
                const reached = step >= i;
                const isLast = i === c.steps.length - 1;
                return (
                  <div key={label} className="flex flex-1 items-center gap-2">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold ${reached ? "bg-agro-green text-white" : "bg-agro-bg text-neutral-500"}`}>{i + 1}</div>
                    <span className={`hidden text-xs font-bold uppercase tracking-[0.12em] sm:inline ${reached ? "text-agro-dark" : "text-neutral-400"}`}>{label}</span>
                    {!isLast && <div className={`h-px flex-1 ${reached ? "bg-agro-green" : "bg-agro-border"}`} />}
                  </div>
                );
              })}
            </div>

            <form onSubmit={e => { e.preventDefault(); setStep(3); }}>
              {step === 0 && (
                <div className="grid gap-4">
                  <p className="text-base font-extrabold sm:text-lg">{c.stepHeaders[0]}</p>
                  <p className="text-sm text-neutral-600">{c.ctaLabel}: <strong>{formatCurrency(savings, lang)}</strong></p>
                  <button type="button" onClick={() => setStep(1)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-agro-green px-6 py-3.5 text-sm font-extrabold text-white shadow-panel hover:shadow-glow">
                    {c.next} <ArrowRight size={18} />
                  </button>
                </div>
              )}
              {step === 1 && (
                <div className="grid gap-4">
                  <p className="text-base font-extrabold sm:text-lg">{c.stepHeaders[1]}</p>
                  <div>
                    <span className="text-sm font-bold text-agro-text">{c.roleLabel}</span>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {c.roles.map(r => (
                        <button key={r} type="button" onClick={() => setRole(r)} className={`rounded-lg border px-4 py-3 text-sm font-bold ${role === r ? "border-agro-green bg-agro-green/10 text-agro-dark" : "border-agro-border bg-white text-neutral-700 hover:border-agro-green/50"}`}>{r}</button>
                      ))}
                    </div>
                  </div>
                  <label className="block">
                    <span className="text-sm font-bold text-agro-text">{c.countryLabel}</span>
                    <select value={country} onChange={e => setCountry(e.target.value)} className="mt-2 w-full rounded-lg border border-agro-border bg-white px-3 py-3 text-sm font-bold outline-none focus:border-agro-green" required>
                      <option value="">—</option>
                      {c.countries.map(co => <option key={co} value={co}>{co}</option>)}
                    </select>
                  </label>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(0)} className="rounded-lg border border-agro-border bg-white px-5 py-3 text-sm font-bold text-neutral-700">{c.back}</button>
                    <button type="button" disabled={!role || !country} onClick={() => setStep(2)} className="flex-1 rounded-lg bg-agro-green px-5 py-3 text-sm font-extrabold text-white shadow-panel disabled:cursor-not-allowed disabled:opacity-50">{c.next}</button>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="grid gap-4">
                  <p className="text-base font-extrabold sm:text-lg">{c.stepHeaders[2]}</p>
                  {[
                    { lbl: c.nameLabel, Icon: User, v: name, set: setName, type: "text", req: true },
                    { lbl: c.emailLabel, Icon: Mail, v: email, set: setEmail, type: "email", req: true },
                    { lbl: c.phoneLabel, Icon: Phone, v: phone, set: setPhone, type: "tel", req: false }
                  ].map(({ lbl, Icon, v, set, type, req }) => (
                    <label key={lbl} className="block">
                      <span className="text-sm font-bold text-agro-text">{lbl}</span>
                      <div className="mt-2 flex items-center gap-2 rounded-lg border border-agro-border bg-white px-3">
                        <Icon className="h-4 w-4 text-neutral-400" />
                        <input type={type} value={v} onChange={e => set(e.target.value)} className="w-full py-3 text-sm font-semibold outline-none" required={req} />
                      </div>
                    </label>
                  ))}
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="rounded-lg border border-agro-border bg-white px-5 py-3 text-sm font-bold text-neutral-700">{c.back}</button>
                    <button type="submit" disabled={!name || !email} className="flex-1 rounded-lg bg-agro-green px-5 py-3 text-sm font-extrabold text-white shadow-panel disabled:cursor-not-allowed disabled:opacity-50">{c.submit}</button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid gap-3 rounded-2xl bg-agro-green/12 p-6 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-agro-green" />
                  <p className="text-lg font-extrabold">{c.successTitle}</p>
                  <p className="text-sm text-neutral-700">{c.successText}</p>
                </motion.div>
              )}
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ============ MAIN ============

export default function CorporateSite() {
  const [lang, setLang] = useState<Lang>("ru");
  const [open, setOpen] = useState(false);
  const t = copy[lang];
  const nav = useMemo(() => t.nav.map((label, index) => ({ label, href: `#${anchors[index]}` })), [t.nav]);

  const corridorNodes: CorridorNode[] = useMemo(() => [
    { id: "ist", name: t.corridorNodes.ist.name, detail: t.corridorNodes.ist.detail, cx: 90, cy: 270 },
    { id: "bak", name: t.corridorNodes.bak.name, detail: t.corridorNodes.bak.detail, cx: 270, cy: 250 },
    { id: "alm", name: t.corridorNodes.alm.name, detail: t.corridorNodes.alm.detail, cx: 470, cy: 170 },
    { id: "tas", name: t.corridorNodes.tas.name, detail: t.corridorNodes.tas.detail, cx: 560, cy: 250 },
    { id: "bis", name: t.corridorNodes.bis.name, detail: t.corridorNodes.bis.detail, cx: 690, cy: 220 }
  ], [t.corridorNodes]);

  const howIcons = [Search, ShieldCheck, Globe2];
  const categoryIcons = [Tractor, Droplets, Sprout, PackageOpen];

  return (
    <main className="min-h-screen bg-agro-bg pb-20 text-agro-text sm:pb-0">
      <ScrollProgress />

      {/* HEADER */}
      <header className="glass-nav fixed left-0 right-0 top-0 z-50">
        <div className="section-shell flex h-16 items-center justify-between gap-3 sm:h-20 sm:gap-5">
          <a href="#" className="flex items-center">
            <Image src={asset("/eagro-logo.png")} alt="E-AGRO PRO" width={145} height={60} priority className="h-9 w-auto object-contain sm:h-12" />
          </a>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-neutral-800 lg:flex">
            {nav.map(item => (
              <a key={item.href} href={item.href} className="transition hover:text-agro-dark">{item.label}</a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <select aria-label="Language" value={lang} onChange={e => setLang(e.target.value as Lang)} className="rounded-lg border border-agro-border bg-white px-3 py-2 text-sm font-bold outline-none">
              <option value="ru">RU</option><option value="tr">TR</option><option value="en">EN</option>
            </select>
            <a href="#calculator" className="rounded-lg bg-agro-green px-5 py-3 text-sm font-bold text-white shadow-panel transition hover:bg-agro-dark">{t.primaryCta}</a>
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <select aria-label="Language" value={lang} onChange={e => setLang(e.target.value as Lang)} className="rounded-lg border border-agro-border bg-white px-2 py-1.5 text-xs font-bold outline-none">
              <option value="ru">RU</option><option value="tr">TR</option><option value="en">EN</option>
            </select>
            <button aria-label="Menu" onClick={() => setOpen(v => !v)} className="rounded-lg border border-agro-border bg-white p-2">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t border-agro-border bg-white px-5 py-4 lg:hidden">
            <div className="grid gap-2 text-sm font-bold">
              {nav.map(item => (
                <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 hover:bg-agro-bg">{item.label}</a>
              ))}
              <a href="#calculator" onClick={() => setOpen(false)} className="mt-2 rounded-lg bg-agro-green px-3 py-3 text-center text-white shadow-panel">{t.primaryCta}</a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden pt-20 sm:pt-28">
        <div className="absolute inset-0 opacity-[0.18]">
          <Image src={asset("/reference-background.png")} alt="" fill priority className="object-cover object-top" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/96 to-white/72" />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4 }} className="absolute -top-12 -right-12 h-72 w-72 rounded-full bg-agro-green/12 blur-3xl" />

        <div className="section-shell relative grid items-center gap-8 py-8 sm:py-14 lg:min-h-[640px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <FadeIn className="min-w-0">
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 rounded-full border border-agro-green/40 bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-agro-dark backdrop-blur sm:px-4 sm:py-1.5 sm:text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-agro-green opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-agro-green" />
              </span>
              {t.heroBadge}
            </motion.div>

            <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-agro-dark sm:mt-5 sm:text-sm">{t.heroBrand}</p>

            <h1 className="mt-2 max-w-3xl break-words text-[2rem] font-extrabold leading-[1.05] tracking-tight text-agro-text sm:mt-3 sm:text-5xl lg:text-[3.75rem]">
              {t.heroTitle}
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-700 sm:mt-5 sm:text-base sm:leading-7">{t.heroSubline}</p>

            <p className="mt-3 max-w-2xl text-xs italic text-neutral-500 sm:text-sm">{t.heroMission}</p>

            <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center">
              <a href="#calculator" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-agro-green px-7 py-4 text-sm font-extrabold text-white shadow-panel transition hover:shadow-glow sm:w-auto">
                {t.primaryCta} <ArrowRight size={18} />
              </a>
              <a href="#calculator" className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-agro-border bg-white/90 px-7 py-4 text-sm font-extrabold text-agro-dark transition hover:border-agro-green sm:w-auto">
                {t.secondaryCta}
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 sm:mt-8">
              {t.trustPills.map(p => (
                <span key={p} className="inline-flex items-center gap-1.5 rounded-full border border-agro-border bg-white/80 px-3 py-1.5 text-xs font-bold text-agro-dark backdrop-blur">
                  <CheckCircle2 className="h-3.5 w-3.5 text-agro-green" />{p}
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="relative min-w-0">
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="overflow-hidden rounded-[24px] border border-white/80 bg-white/70 p-2 shadow-soft backdrop-blur sm:p-3">
              <div className="relative aspect-[1.16] overflow-hidden rounded-[20px]">
                <Image src={asset("/hero-machinery.png")} alt="Agricultural machinery" fill priority className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/24 to-transparent" />
                <div className="absolute bottom-4 left-4 rounded-2xl bg-white/90 p-3 shadow-panel backdrop-blur sm:p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-agro-dark sm:text-xs">{t.heroCardRegion}</p>
                  <p className="mt-1 text-sm font-extrabold sm:text-lg">{t.heroCardTitle}</p>
                </div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className="absolute right-4 top-4 rounded-xl bg-agro-green px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-panel sm:text-xs">
                  <span className="mr-1 inline-block h-1.5 w-1.5 animate-blink rounded-full bg-white" />{t.liveRfqLabel}
                </motion.div>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      <LogoMarquee logos={partnerLogos} />

      {/* HOW IT WORKS */}
      <section id="how" className="section-shell py-14 sm:py-20">
        <FadeIn className="mb-8 max-w-2xl sm:mb-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-agro-text sm:text-3xl lg:text-4xl">{t.sections.how}</h2>
          <p className="mt-2 text-sm text-neutral-600 sm:text-base">{t.sections.howSub}</p>
        </FadeIn>
        <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
          {t.how.map(([num, title, text], i) => {
            const I = howIcons[i];
            return (
              <FadeIn key={num} delay={i * 0.08} className="h-full">
                <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 220, damping: 16 }} className="group relative h-full min-h-[300px] overflow-hidden rounded-2xl shadow-panel">
                  <Image src={photos.howItWorks[i]} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(min-width: 768px) 33vw, 100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-agro-dark via-agro-dark/80 to-agro-dark/20" />
                  <div className="relative flex h-full flex-col justify-between p-5 text-white sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                        <I className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-3xl font-extrabold text-white/30 sm:text-5xl">{num}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold sm:text-xl">{title}</h3>
                      <p className="mt-2 text-sm leading-5 text-white/90">{text}</p>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* CATEGORIES + WHITELIST */}
      <section id="categories" className="bg-white py-14 sm:py-20">
        <div className="section-shell">
          <FadeIn className="mb-8 max-w-2xl sm:mb-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-agro-text sm:text-3xl lg:text-4xl">{t.sections.categories}</h2>
            <p className="mt-2 text-sm text-neutral-600 sm:text-base">{t.sections.categoriesSub}</p>
          </FadeIn>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
            {t.categories.map(([title, ticket], i) => {
              const I = categoryIcons[i];
              return (
                <FadeIn key={title} delay={i * 0.06} className="h-full">
                  <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 220, damping: 16 }} className="group relative h-full min-h-[260px] overflow-hidden rounded-2xl shadow-panel">
                    <Image src={photos.categories[i]} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(min-width: 1024px) 25vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-agro-dark via-agro-dark/65 to-agro-dark/10" />
                    <div className="relative flex h-full flex-col justify-between p-5 text-white">
                      <div className="flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                          <I className="h-5 w-5 text-white" />
                        </div>
                        <span className="rounded-full bg-agro-green px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white shadow-glow sm:text-xs">{ticket}</span>
                      </div>
                      <h3 className="text-base font-extrabold sm:text-lg">{title}</h3>
                    </div>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.2}>
            <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-agro-green/30 bg-agro-green/8 p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-agro-green" />
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-agro-dark">{t.whitelist.yesTitle}</p>
                </div>
                <ul className="grid gap-2.5">
                  {t.whitelist.yes.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm font-bold text-agro-text">
                      <span className="h-1.5 w-1.5 rounded-full bg-agro-green" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-rose-500" />
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-rose-600">{t.whitelist.noTitle}</p>
                </div>
                <ul className="grid gap-2.5">
                  {t.whitelist.no.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm font-bold text-neutral-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                      <span className="line-through decoration-rose-400 decoration-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PROOF STRIP */}
      <section className="section-shell py-10 sm:py-14">
        <div className="grid gap-0 overflow-hidden rounded-2xl border border-agro-border bg-white shadow-soft sm:grid-cols-3">
          {t.proof.map((p, i) => (
            <FadeIn key={p.label} delay={i * 0.08} className={`p-6 text-center sm:text-left ${i > 0 ? "border-t border-agro-border sm:border-l sm:border-t-0" : ""}`}>
              <p className="text-3xl font-extrabold text-agro-green sm:text-4xl lg:text-5xl">
                <AnimatedCounter to={p.value} suffix={p.suffix} />
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500 sm:text-sm sm:tracking-[0.14em]">{p.label}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <SavingsCalculator lang={lang} title={t.sections.calculator} intro={t.sections.calculatorSub} />

      {/* MARKETS — Turkic + Global tiers */}
      <section id="markets" className="section-shell py-14 sm:py-20">
        <FadeIn className="mb-8 max-w-2xl sm:mb-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-agro-text sm:text-3xl lg:text-4xl">{t.sections.markets}</h2>
          <p className="mt-2 text-sm text-neutral-600 sm:text-base">{t.sections.marketsSub}</p>
        </FadeIn>
        <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-8">
          <div className="grid gap-5">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-agro-green/12 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-agro-dark sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-agro-green animate-pulse" />
                {t.marketsTurkicTitle}
              </p>
              <div className="grid gap-2.5 sm:gap-3">
                {t.marketsTurkic.map(market => {
                  const flag = marketFlags[market] || "🌐";
                  const kpi = marketKpis[flag];
                  return (
                    <motion.div key={market} whileHover={{ x: 4, scale: 1.01 }} transition={{ type: "spring", stiffness: 240, damping: 18 }} className="flex items-center gap-3 rounded-xl border-l-4 border-agro-green bg-white p-3 font-bold shadow-panel sm:p-4">
                      <span className="text-xl leading-none sm:text-2xl">{flag}</span>
                      <span className="min-w-0 flex-1 truncate text-xs sm:text-sm">{market}</span>
                      {kpi && <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-agro-dark">{kpi}</span>}
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-neutral-200 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-neutral-600 sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
                {t.marketsGlobalTitle}
              </p>
              <div className="grid gap-2.5 sm:gap-3">
                {t.marketsGlobal.map(market => {
                  const flag = marketFlags[market] || "🌐";
                  const kpi = marketKpis[flag];
                  return (
                    <motion.div key={market} whileHover={{ x: 4, scale: 1.01 }} transition={{ type: "spring", stiffness: 240, damping: 18 }} className="flex items-center gap-3 rounded-xl border-l-4 border-neutral-300 bg-white p-3 font-bold opacity-80 shadow-panel sm:p-4">
                      <span className="text-xl leading-none sm:text-2xl">{flag}</span>
                      <span className="min-w-0 flex-1 truncate text-xs sm:text-sm">{market}</span>
                      {kpi && <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-neutral-500">{kpi}</span>}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
          <FadeIn>
            <CorridorMap nodes={corridorNodes} title={t.corridorTitle} caption={t.corridor} hint={t.corridorHint} hubLabel={t.corridorHubLabel} />
          </FadeIn>
        </div>
      </section>

      {/* ROADMAP — expanded */}
      <section id="roadmap" className="bg-white py-14 sm:py-20">
        <div className="section-shell">
          <FadeIn className="mb-8 max-w-2xl sm:mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-agro-green/12 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-agro-dark sm:text-xs">
              <Rocket className="h-3.5 w-3.5" /> Roadmap
            </div>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-agro-text sm:text-3xl lg:text-4xl">{t.sections.roadmap}</h2>
            <p className="mt-2 text-sm text-neutral-600 sm:text-base">{t.sections.roadmapSub}</p>
          </FadeIn>
          <div className="relative">
            <div className="pointer-events-none absolute left-0 right-0 top-[70px] hidden h-px bg-gradient-to-r from-agro-green/0 via-agro-green/60 to-agro-green/0 lg:block" />
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
              {t.roadmap.map((phase, i) => {
                const active = phase.progress > 0;
                return (
                  <FadeIn key={phase.year} delay={i * 0.08} className="h-full">
                    <motion.div
                      whileHover={{ y: -8 }}
                      transition={{ type: "spring", stiffness: 220, damping: 16 }}
                      className={`hover-lift relative h-full overflow-hidden rounded-2xl border p-5 shadow-panel sm:p-6 ${
                        active ? "border-agro-green bg-white" : "border-agro-border bg-agro-bg"
                      }`}
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <p className={`text-2xl font-extrabold sm:text-3xl ${active ? "text-agro-green" : "text-neutral-500"}`}>{phase.year}</p>
                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-extrabold ${
                            phase.progress >= 0.5
                              ? "bg-agro-green text-white"
                              : phase.progress > 0
                              ? "border-2 border-agro-green bg-white text-agro-dark"
                              : "border-2 border-agro-border bg-white text-neutral-400"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="text-base font-extrabold leading-snug sm:text-lg">{phase.phase}</p>
                      <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-agro-green/12 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-agro-dark">
                        {phase.tag}
                      </span>
                      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${phase.progress * 100}%` }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 + i * 0.06 }}
                          className="h-full rounded-full bg-gradient-to-r from-agro-green to-agro-dark"
                        />
                      </div>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-agro-dark">{Math.round(phase.progress * 100)}%</p>
                      <ul className="mt-4 grid gap-2 border-t border-agro-border pt-4">
                        {phase.bullets.map((b: string) => (
                          <li key={b} className="flex items-start gap-2 text-xs leading-5 text-neutral-700 sm:text-sm sm:leading-6">
                            <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-agro-green" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="bg-white py-14 sm:py-20">
        <div className="section-shell">
          <FadeIn className="mb-8 max-w-2xl sm:mb-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-agro-text sm:text-3xl lg:text-4xl">{t.sections.team}</h2>
          </FadeIn>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
            {t.team.map(([name, role], i) => {
              const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("");
              const gradient = photos.team[i % photos.team.length];
              return (
                <FadeIn key={name} delay={i * 0.05}>
                  <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 220, damping: 16 }} className="hover-lift group relative h-full overflow-hidden rounded-2xl border border-agro-border bg-white p-5 shadow-panel">
                    <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${gradient}`} />
                    <div className="flex items-center gap-4">
                      <div className={`flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-lg font-extrabold text-white shadow-glow`}>
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-extrabold leading-tight">{name}</h3>
                        <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-agro-dark">{role}</p>
                      </div>
                      <a href="#" aria-label="LinkedIn" className="ml-auto flex h-9 w-9 flex-none items-center justify-center rounded-xl border border-agro-border bg-white text-agro-dark transition hover:border-agro-green hover:text-agro-green">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </div>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA — 2 personas */}
      <section id="contacts" className="section-shell py-14 sm:py-20">
        <FadeIn className="overflow-hidden rounded-3xl bg-agro-dark p-6 text-white shadow-soft sm:rounded-[28px] sm:p-10 lg:p-14">
          <h2 className="max-w-3xl text-2xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{t.sections.finalTitle}</h2>
          <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
            {t.personas.map((p, i) => (
              <motion.a key={p.label} href={p.href} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 220, damping: 16 }} className={`group flex items-center justify-between gap-3 rounded-2xl px-5 py-4 text-sm font-extrabold shadow-panel sm:px-6 sm:py-5 sm:text-base ${i === 0 ? "bg-agro-green text-white hover:shadow-glow" : "bg-white/10 text-white backdrop-blur hover:bg-white/20"}`}>
                <span>{p.label}</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </motion.a>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-agro-border bg-white">
        <div className="section-shell flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:py-8">
          <div className="flex items-center gap-4">
            <Image src={asset("/eagro-logo.png")} alt="E-AGRO PRO" width={120} height={50} className="h-8 w-auto object-contain sm:h-10" />
            <p className="hidden text-xs leading-5 text-neutral-600 sm:block sm:max-w-xs">{t.footer.tagline}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs leading-6 text-neutral-700 sm:text-sm">
            <a href="https://wa.me/77758880910" className="hover:text-agro-dark">WhatsApp</a>
            <a href="https://t.me/timaxmetov" className="hover:text-agro-dark">Telegram</a>
            <a href="mailto:info@e-agro.pro" className="hover:text-agro-dark">info@e-agro.pro</a>
            <span className="text-neutral-400">{t.footer.copyright}</span>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-agro-border bg-white/95 p-3 shadow-[0_-12px_30px_rgba(29,29,31,0.12)] backdrop-blur sm:hidden">
        <a href="#calculator" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-agro-green px-4 py-3 text-sm font-extrabold text-white shadow-panel">
          <Calculator className="h-4 w-4" /> {t.stickyCta}
        </a>
        <a href="https://wa.me/77758880910" aria-label="WhatsApp" className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-agro-border bg-white text-agro-dark">
          <Phone className="h-5 w-5" />
        </a>
      </div>
    </main>
  );
}
