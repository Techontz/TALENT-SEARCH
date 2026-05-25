import { TalentProfile, FormQuestion, SubmittedApplication, TranslationDict, SupportedLanguage } from './types';

export const INITIAL_TALENTS: TalentProfile[] = [
  {
    id: 't1',
    name: 'Aria Bennett',
    category: 'Singers',
    location: 'New York, US',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&h=400&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-singing-into-vintage-microphone-43758-large.mp4',
    audioWaveform: [30, 45, 20, 60, 80, 45, 30, 50, 90, 100, 65, 40, 55, 75, 20, 35, 60, 50, 85, 30],
    audioDuration: '02:45',
    popularityScore: 98,
    featured: true,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 't2',
    name: 'DJ Kaelen',
    category: 'DJs',
    location: 'Berlin, DE',
    imageUrl: 'https://images.unsplash.com/photo-1516873240891-4bf014598ab4?auto=format&fit=crop&w=400&h=400&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dj-playing-music-on-a-sound-mixer-facing-crowd-41712-large.mp4',
    audioWaveform: [40, 60, 80, 50, 30, 70, 95, 80, 60, 40, 50, 85, 90, 100, 70, 50, 40, 60, 80, 90],
    audioDuration: '04:12',
    popularityScore: 99,
    featured: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 't3',
    name: 'Valentina Rossi',
    category: 'Models',
    location: 'Milan, IT',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80',
    popularityScore: 96,
    featured: true,
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 't4',
    name: 'Yuki Takahashi',
    category: 'Dancers',
    location: 'Tokyo, JP',
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&h=400&q=80',
    popularityScore: 94,
    featured: false,
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 't5',
    name: 'Marcus Vibe',
    category: 'MCs',
    location: 'London, UK',
    imageUrl: 'https://images.unsplash.com/photo-1543794327-59a91fb7de1d?auto=format&fit=crop&w=400&h=400&q=80',
    popularityScore: 95,
    featured: true,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 't6',
    name: 'Midnight Oceans',
    category: 'Bands',
    location: 'Sydney, AU',
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=400&h=400&q=80',
    popularityScore: 97,
    featured: false,
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 't7',
    name: 'Zoe Streamer',
    category: 'Live Streamers',
    location: 'Seoul, KR',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&h=400&q=80',
    popularityScore: 92,
    featured: true,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 't8',
    name: 'Nexus Management',
    category: 'Agencies',
    location: 'Paris, FR',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&h=400&q=80',
    popularityScore: 93,
    featured: false,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80'
  }
];

export const INITIAL_QUESTIONS: FormQuestion[] = [
  {
    id: 'q1',
    label: 'Primary Stage/Artistic Name',
    type: 'text',
    required: true,
    placeholder: 'e.g. DJ Eclipse, Aria Gold'
  },
  {
    id: 'q2',
    label: 'Select Your Primary Performance Role',
    type: 'choice',
    required: true,
    options: ['Singer', 'DJ', 'Model', 'Dancer', 'MC', 'Band', 'Live Streamer']
  },
  {
    id: 'q3',
    label: 'Are you currently signed to an exclusive talent agency?',
    type: 'boolean',
    required: true
  },
  {
    id: 'q4',
    label: 'Please specify your exclusive agency name',
    type: 'text',
    required: false,
    placeholder: 'e.g. CAA, WME, Nexus Management',
    conditionalOn: {
      questionId: 'q3',
      value: 'true' // Show if Signed is true
    }
  },
  {
    id: 'q5',
    label: 'Upload Audio/Video Performance Demo File',
    type: 'file',
    required: true
  },
  {
    id: 'q6',
    label: 'Brief Bio or Career Highlights',
    type: 'text',
    required: true,
    placeholder: 'Summarize your concerts, awards, or live streaming records in 2-3 short sentences.'
  },
  {
    id: 'q7',
    label: 'Current Instagram / Portfolio URL',
    type: 'text',
    required: false,
    placeholder: 'https://instagram.com/yourhandle'
  }
];

export const INITIAL_APPLICATIONS: SubmittedApplication[] = [
  {
    id: 'app-001',
    fullName: 'David Sterling (DJ Sterling)',
    email: 'sterling@vibe.fm',
    category: 'DJs',
    answers: {
      'q1': 'DJ Sterling',
      'q2': 'DJ',
      'q3': 'false',
      'q6': 'Played at Tomorrowland mainstage warmup, 10M+ local streams.',
      'q7': 'https://instagram.com/djsterling_official'
    },
    mediaFile: {
      name: 'sterling_tomorrow_mix_2026.mp3',
      size: '14.2 MB',
      type: 'audio/mpeg'
    },
    status: 'pending',
    submittedAt: '2026-05-24T09:12:00Z'
  },
  {
    id: 'app-002',
    fullName: 'Lana Dubois (Lana Woods)',
    email: 'lana.vocals@icloud.com',
    category: 'Singers',
    answers: {
      'q1': 'Lana Woods',
      'q2': 'Singer',
      'q3': 'true',
      'q4': 'Nexus Management',
      'q6': 'Lead jazz soprano featured in Vogue Berlin and Paris Fashion Week acoustic sessions.',
      'q7': 'https://instagram.com/lanawoods_vocals'
    },
    mediaFile: {
      name: 'live_vogue_session_acoustic_uncompressed.wav',
      size: '48.9 MB',
      type: 'audio/wav'
    },
    status: 'approved',
    submittedAt: '2026-05-23T14:32:00Z'
  },
  {
    id: 'app-003',
    fullName: 'Vance Grayson',
    email: 'vance@ultra.tw',
    category: 'Models',
    answers: {
      'q1': 'Vance G',
      'q2': 'Model',
      'q3': 'false',
      'q6': 'Walked for Balenciaga FW 24 and Prada Mens capsule release.',
      'q7': 'https://instagram.com/vance.gray'
    },
    status: 'rejected',
    submittedAt: '2026-05-22T11:04:00Z'
  }
];

export const SHOWCASE_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    title: 'Stadium Rock Concerts',
    tag: 'Live Band'
  },
  {
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    title: 'Ultra Electronic Festival',
    tag: 'DJs'
  },
  {
    url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
    title: 'Luxury Runway Shows',
    tag: 'Models'
  },
  {
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    title: 'High-Energy Dance Revues',
    tag: 'Dancers'
  }
];

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDict> = {
  en: {
    hero: {
      titlePrefix: 'Global Entertainment',
      titleAccent: 'Marketplace',
      subtitle: 'Jobs & Gigs for Entertainment Artists',
      ctaPrimary: 'Join Now',
      ctaSecondary: 'Hire Talent',
      liveShow: 'Live Show',
      concert: 'Concert',
      trustedText: 'Trusted by 10K+ Talents & 2K+ Venues'
    },
    categories: {
      heading: 'Explore',
      headingAccent: 'Top Talent',
      viewAll: 'View All Talent'
    },
    network: {
      heading: 'Global',
      headingAccent: 'Network',
      countries: 'Countries',
      talents: 'Talents',
      venues: 'Venues',
      opportunities: 'Opportunities'
    },
    howItWorks: {
      heading: 'How It',
      headingAccent: 'Works',
      step1Title: 'Create Profile',
      step1Desc: 'Showcase your portfolio, high-fidelity media demos, and experience level with cinematic design.',
      step2Title: 'Upload Media',
      step2Desc: 'Deliver crystal clear audio, video highlights, and high-contrast headshots safely to top scouts.',
      step3Title: 'Get Opportunities',
      step3Desc: 'Secure international booking contracts, high-visibility stage invitations, and agency deals.'
    },
    showcase: {
      heading: 'Premium',
      headingAccent: 'Showcase',
      subtitle: 'Immersive global spectacles curated across our entertainment ecosystem'
    },
    cta: {
      heading: 'Ready To Go',
      headingAccent: 'Global?',
      buttonTalent: 'Join as Talent',
      buttonAgency: 'Join as Agency',
      buttonHire: 'Hire Talent'
    },
    navbar: {
      home: 'Home',
      talent: 'Talent',
      agencies: 'Agencies',
      opportunities: 'Opportunities',
      about: 'About',
      contact: 'Contact',
      cta: 'Join Now',
      adminMode: 'Admin Portal'
    },
    application: {
      title: 'Global Application Form',
      subtitle: 'Step into the international limelight. Requisition review takes 24-48 hours.',
      applyAs: 'Apply As',
      submitBtn: 'Submit Application',
      backBtn: 'Back',
      nextBtn: 'Next Step',
      successTitle: 'Submission Successful!',
      successDesc: 'Your application with loaded media is safely delivered onto our local secure registers.',
      closeBtn: 'Close Form'
    }
  },
  zh: {
    hero: {
      titlePrefix: '全球娱乐艺人',
      titleAccent: '交易市场',
      subtitle: '连接娱乐艺人的工作与演出机会',
      ctaPrimary: '立即加入',
      ctaSecondary: '挑选艺人',
      liveShow: '現場演出',
      concert: '演唱會',
      trustedText: '超過 10K+ 位頂尖藝人與 2K+ 家高端場館的共同信赖'
    },
    categories: {
      heading: '探索',
      headingAccent: '顶尖才华',
      viewAll: '浏览全部艺人'
    },
    network: {
      heading: '全球',
      headingAccent: '网络',
      countries: '国家和地区',
      talents: '艺术人才',
      venues: '演出场馆',
      opportunities: '商业演常'
    },
    howItWorks: {
      heading: '合作',
      headingAccent: '机制',
      step1Title: '创建档案',
      step1Desc: '以电影级的精美排版展示您的演艺档案、高保真作品集与演艺履历。',
      step2Title: '上传作品',
      step2Desc: '快速、安全地将高保真音频、舞台花絮视频和高清艺术照传递给高端选拔决策者。',
      step3Title: '获取机会',
      step3Desc: '签下国际演出合同、站上主流聚光灯舞台，并与顶尖跨国经纪公司深度合作。'
    },
    showcase: {
      heading: '独家',
      headingAccent: '名流之夜',
      subtitle: '横跨我们娱乐生态系统并由专业制作團隊策劃的沉浸式全球盛典'
    },
    cta: {
      heading: '准备好走向',
      headingAccent: '世界了吗？',
      buttonTalent: '作为艺人加入',
      buttonAgency: '作为经纪加入',
      buttonHire: '直聘优秀人才'
    },
    navbar: {
      home: '主页',
      talent: '优秀人才',
      agencies: '经纪公司',
      opportunities: '商业演常',
      about: '关于我们',
      contact: '联系我们',
      cta: '立即加入',
      adminMode: '管理员控制台'
    },
    application: {
      title: '全球入驻申请表',
      subtitle: '迈上海纳百川的国际舞台。审核小组将在 24-48 小时内为您专业评估。',
      applyAs: '申请身份',
      submitBtn: '提交入驻申请',
      backBtn: '返回',
      nextBtn: '下一步',
      successTitle: '申请提交成功！',
      successDesc: '您的高保真作品及演艺资料已安全存入我们的全球安全数据库中。',
      closeBtn: '关闭窗口'
    }
  },
  ru: {
    hero: {
      titlePrefix: 'Глобальный Рыночный',
      titleAccent: 'Маркетплейс',
      subtitle: 'Работа и выступления для артистов эстрады',
      ctaPrimary: 'Вступить Сейчас',
      ctaSecondary: 'Нанять Талант',
      liveShow: 'Живое Шоу',
      concert: 'Концерт',
      trustedText: 'Нам доверяют 10К+ артистов и 2К+ площадок по всему миру'
    },
    categories: {
      heading: 'Исследуйте',
      headingAccent: 'Лучшие Категории',
      viewAll: 'Посмотреть всех'
    },
    network: {
      heading: 'Глобальная',
      headingAccent: 'Сеть',
      countries: 'Страны',
      talents: 'Таланты',
      venues: 'Площадки',
      opportunities: 'Контракты'
    },
    howItWorks: {
      heading: 'Как это',
      headingAccent: 'Работает',
      step1Title: 'Создайте Профиль',
      step1Desc: 'Красиво оформите свое портфолио, медиа-демо высокого качества и опыт работы.',
      step2Title: 'Загрузите Шоурил',
      step2Desc: 'Отправляйте записи выступлений, видеофайлы и снимки напрямую букерам высшего уровня.',
      step3Title: 'Получите Сцену',
      step3Desc: 'Заключайте международные контракты, получайте приглашения на фестивали и предложения лейблов.'
    },
    showcase: {
      heading: 'Премиум',
      headingAccent: 'Шоукейс',
      subtitle: 'Курируемые потрясающие зрелища по всей нашей глобальной развлекательной сети'
    },
    cta: {
      heading: 'Готовы выйти на',
      headingAccent: 'Мировой Уровень?',
      buttonTalent: 'Стать Артистом',
      buttonAgency: 'Стать Агентством',
      buttonHire: 'Пригласить Талант'
    },
    navbar: {
      home: 'Главная',
      talent: 'Таланты',
      agencies: 'Агентства',
      opportunities: 'Выступления',
      about: 'О Нас',
      contact: 'Контакты',
      cta: 'Вступить',
      adminMode: 'Админ Портал'
    },
    application: {
      title: 'Глобальная Форма Заявки',
      subtitle: 'Сделайте шаг навстречу международным букингам. Рассмотрение занимает 24-48 часов.',
      applyAs: 'Роль регистрации',
      submitBtn: 'Отправить заявку',
      backBtn: 'Назад',
      nextBtn: 'Далее',
      successTitle: 'Успешно отправлено!',
      successDesc: 'Ваша заявка и качественные демо-записи были надежно сохранены в реестре базы данных.',
      closeBtn: 'Закрыть форму'
    }
  },
  fr: {
    hero: {
      titlePrefix: 'Marché d’Artistes',
      titleAccent: 'Mondial',
      subtitle: 'Emplois & Concerts pour les Artistes du Spectacle',
      ctaPrimary: 'Rejoindre',
      ctaSecondary: 'Embaucher',
      liveShow: 'Live Show',
      concert: 'Concert',
      trustedText: 'Plébiscité par 10K+ Talents & 2K+ Salles de prestige'
    },
    categories: {
      heading: 'Découvrir',
      headingAccent: 'Elite Artistique',
      viewAll: 'Tous les Talents'
    },
    network: {
      heading: 'Réseau',
      headingAccent: 'International',
      countries: 'Pays',
      talents: 'Artistes',
      venues: 'Salles',
      opportunities: 'Opportunités'
    },
    howItWorks: {
      heading: 'Comment ça',
      headingAccent: 'Marche',
      step1Title: 'Profil Cinématique',
      step1Desc: 'Exprimez votre style unique, mettez en avant vos meilleures scènes et détails d’expérience.',
      step2Title: 'Diffusez les Médias',
      step2Desc: 'Fournissez des fichiers musicaux clairs, démos vidéo en haute définition à nos directeurs de casting.',
      step3Title: 'Décrochez un Contrat',
      step3Desc: 'Acquérez d’incroyables contrats de booking internationaux, des résidences et des collaborations prestigieuses.'
    },
    showcase: {
      heading: 'Vitrine',
      headingAccent: 'Prestige',
      subtitle: 'Des spectacles immersifs produits à travers notre écosystème mondial du divertissement'
    },
    cta: {
      heading: 'Prêt à Développer votre',
      headingAccent: 'Audience ?',
      buttonTalent: 'Inscrire Talent',
      buttonAgency: 'Inscrire Agence',
      buttonHire: 'Rejoindre Castings'
    },
    navbar: {
      home: 'Accueil',
      talent: 'Talents',
      agencies: 'Agences',
      opportunities: 'Projets',
      about: 'À propos',
      contact: 'Contact',
      cta: 'Rejoindre',
      adminMode: 'Panel Admin'
    },
    application: {
      title: 'Formulaire de Recrutement Global',
      subtitle: 'Entrez sous les projecteurs mondiaux. L’analyse prend généralement de 24 à 48 heures.',
      applyAs: 'Formuler en tant que',
      submitBtn: 'Soumettre la Demande',
      backBtn: 'Retour',
      nextBtn: 'Étape Suivante',
      successTitle: 'Formulaire Transmis !',
      successDesc: 'Votre demande avec portfolio chargé a été transmise avec succès dans notre base globale.',
      closeBtn: 'Quitter'
    }
  },
  ar: {
    hero: {
      titlePrefix: 'المنصة العالمية للمواهب',
      titleAccent: 'والترفيه',
      subtitle: 'وظائف وعروض لفناني الترفيه والمشهد الفني',
      ctaPrimary: 'انضم الآن',
      ctaSecondary: 'احجز موهبة',
      liveShow: 'عرض مباشر',
      concert: 'حفلة موسيقية',
      trustedText: 'موثوق من قبل 10K+ موهبة عالمية و 2K+ من أرقى الصالات'
    },
    categories: {
      heading: 'استكشف',
      headingAccent: 'نخبة المواهب',
      viewAll: 'عرض جميع الفعاليات'
    },
    network: {
      heading: 'الشبكة',
      headingAccent: 'العالمية',
      countries: 'دولة',
      talents: 'موهبة',
      venues: 'صالات حفلات',
      opportunities: 'فرصة عمل'
    },
    howItWorks: {
      heading: 'آلية',
      headingAccent: 'العمل',
      step1Title: 'أنشئ ملفك الفني',
      step1Desc: 'اعرض أعمالك الموسيقية ومقاطع الفيديو بجودة سينمائية مذهلة وتفاصيل رصيدك المهني.',
      step2Title: 'حمّل وسائطك الفنية',
      step2Desc: 'قدّم مقاطعك الصوتية وتسجيلاتك المرئية بوضوح متناهٍ مباشرة لصناع القرار الفني.',
      step3Title: 'احصد الفرص الدولية',
      step3Desc: 'احصل على عقود تجارية عالمية وعروض تقديمية مشهورة وشراكات مع كبرى الوكالات الاحترافية.'
    },
    showcase: {
      heading: 'العروض',
      headingAccent: 'الفاخرة',
      subtitle: 'أمسيات استثنائية وعروض تفاعلية ومؤثرة تدار بأرقى دقة للمشاهدين'
    },
    cta: {
      heading: 'هل أنت جاهز للانطلاق',
      headingAccent: 'نحو العالمية؟',
      buttonTalent: 'انضم كموهبة',
      buttonAgency: 'انضم كوكالة فنية',
      buttonHire: 'ابحث عن مواهب'
    },
    navbar: {
      home: 'الرئيسية',
      talent: 'المواهب',
      agencies: 'الوكالات',
      opportunities: 'الفرص الفنية',
      about: 'من نحن',
      contact: 'تواصل معنا',
      cta: 'انضم الآن',
      adminMode: 'لوحة التحكم'
    },
    application: {
      title: 'طلب الانضمام العالمي',
      subtitle: 'ابدأ مشوارك تحت الأضواء العالمية الباهرة. تستغرق المراجعة الفنية بين 24 إلى 48 ساعة.',
      applyAs: 'التقدم بصفة',
      submitBtn: 'إرسال طلب الترشيح',
      backBtn: 'السابق',
      nextBtn: 'الخطوة التالية',
      successTitle: 'تم إرسال طلبك بنجاح!',
      successDesc: 'لقد تم حفظ وتوجيه ملفك المرفق بالوسائط بأمان تام في قاعدة السجلات الفنية المركزية.',
      closeBtn: 'إغلاق النافذة'
    }
  },
  es: {
    hero: {
      titlePrefix: 'Mercado Global de',
      titleAccent: 'Entretenimiento',
      subtitle: 'Trabajos y Eventos para Artistas del Entretenimiento',
      ctaPrimary: 'Únete Ahora',
      ctaSecondary: 'Contratar Talento',
      liveShow: 'Espectáculo',
      concert: 'Concierto',
      trustedText: 'Con la confianza de más de 10K+ artistas y 2K+ escenarios premium'
    },
    categories: {
      heading: 'Explorar',
      headingAccent: 'Talentos Premium',
      viewAll: 'Ver todos los talentos'
    },
    network: {
      heading: 'Red',
      headingAccent: 'Globalizada',
      countries: 'Países',
      talents: 'Artistas',
      venues: 'Escenarios',
      opportunities: 'Contratos'
    },
    howItWorks: {
      heading: 'Cómo',
      headingAccent: 'Funciona',
      step1Title: 'Crea tu Perfil',
      step1Desc: 'Muestra tu portafolio, demostraciones multimedia de alta definición e historial con un diseño de película.',
      step2Title: 'Carga Demos',
      step2Desc: 'Envía archivos de audio y fragmentos de video con calidad extraordinaria a los reclutadores clave.',
      step3Title: 'Consigue Ofertas',
      step3Desc: 'Consigue jugosos contratos internacionales, residencias en resorts de lujo e invitaciones a grandes estadios.'
    },
    showcase: {
      heading: 'Gala',
      headingAccent: 'Estelar',
      subtitle: 'Espectáculos inmersivos de prestigio coordinados para audiencias exclusivas'
    },
    cta: {
      heading: '¿Listo Para Trascender',
      headingAccent: 'Fronteras?',
      buttonTalent: 'Registrarse como Talento',
      buttonAgency: 'Registrarse como Agencia',
      buttonHire: 'Buscar Artistas'
    },
    navbar: {
      home: 'Inicio',
      talent: 'Talento',
      agencies: 'Agencias',
      opportunities: 'Audiciones',
      about: 'Nosotros',
      contact: 'Contacto',
      cta: 'Unete Ya',
      adminMode: 'Admin Portal'
    },
    application: {
      title: 'Formulario de Selección Mundial',
      subtitle: 'Da el salto al escenario global. Nuestro tribunal de audición revisará tu material en 24-48 horas.',
      applyAs: 'Aplicar como',
      submitBtn: 'Enviar Postulación',
      backBtn: 'Volver',
      nextBtn: 'Siguiente',
      successTitle: '¡Aplicación Enviada con Éxito!',
      successDesc: 'Tus credenciales y archivos han sido cargados de forma segura en nuestro nodo de audición internacional.',
      closeBtn: 'Cerrar'
    }
  }
};
