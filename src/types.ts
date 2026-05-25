export type TalentCategory = 
  | 'Singers' 
  | 'DJs' 
  | 'Models' 
  | 'Dancers' 
  | 'MCs' 
  | 'Bands' 
  | 'Live Streamers' 
  | 'Agencies';

export interface TalentProfile {
  id: string;
  name: string;
  category: TalentCategory;
  location: string;
  imageUrl: string;
  videoUrl?: string;
  audioWaveform?: number[];
  audioDuration?: string;
  popularityScore: number;
  featured: boolean;
  avatarUrl: string;
}

export type QuestionType = 'text' | 'choice' | 'boolean' | 'file';

export interface FormQuestion {
  id: string;
  label: string;
  type: QuestionType;
  required: boolean;
  options?: string[]; // Used for multi-choice 'choice' type
  placeholder?: string;
  categoryFilter?: string; // e.g. "Only show for DJs"
  conditionalOn?: {
    questionId: string;
    value: string; // e.g., if 'Signed to Agency' equals 'Yes'
  };
}

export interface SubmittedApplication {
  id: string;
  fullName: string;
  email: string;
  category: TalentCategory | string;
  answers: Record<string, string>; // questionId -> answer
  mediaFile?: {
    name: string;
    size: string;
    type: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export type SupportedLanguage = 'en' | 'zh' | 'ru' | 'fr' | 'ar' | 'es';

export interface TranslationDict {
  hero: {
    titlePrefix: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    liveShow: string;
    concert: string;
    trustedText: string;
  };
  categories: {
    heading: string;
    headingAccent: string;
    viewAll: string;
  };
  network: {
    heading: string;
    headingAccent: string;
    countries: string;
    talents: string;
    venues: string;
    opportunities: string;
  };
  howItWorks: {
    heading: string;
    headingAccent: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  showcase: {
    heading: string;
    headingAccent: string;
    subtitle: string;
  };
  cta: {
    heading: string;
    headingAccent: string;
    buttonTalent: string;
    buttonAgency: string;
    buttonHire: string;
  };
  navbar: {
    home: string;
    talent: string;
    agencies: string;
    opportunities: string;
    about: string;
    contact: string;
    cta: string;
    adminMode: string;
  };
  application: {
    title: string;
    subtitle: string;
    applyAs: string;
    submitBtn: string;
    backBtn: string;
    nextBtn: string;
    successTitle: string;
    successDesc: string;
    closeBtn: string;
  };
}
