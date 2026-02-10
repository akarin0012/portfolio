/**
 * 基準日から現在までの経過年数を計算する
 * 誕生日やキャリア開始日から年齢・経験年数を動的に算出するために使用
 */
function calcYearsSince(dateStr: string): number {
  const base = new Date(dateStr);
  const now = new Date();
  let years = now.getFullYear() - base.getFullYear();

  const hasNotReachedAnniversary =
    now.getMonth() < base.getMonth() ||
    (now.getMonth() === base.getMonth() && now.getDate() < base.getDate());

  if (hasNotReachedAnniversary) {
    years--;
  }
  return years;
}

/** サイト開設年（著作権表示に使用） */
export const SITE_ESTABLISHED_YEAR = 2024;

/**
 * サイト全体で使用する設定値
 * SEO、OGP、構造化データなどで一貫した情報を提供するために使用
 */
export const siteConfig = {
  /** サイト名 */
  name: 'Akarin Portfolio',
  /** サイトの短い説明は getSiteDescription() を使用 */
  /** サイトのURL（末尾スラッシュなし） */
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://akarin0012.com',
  /** OGP画像のパス */
  ogImage: '/og-image.png',
  /** 著者情報 */
  author: {
    name: '茅嶋 伸一郎',
    nameEn: 'Shinichiro Kayashima',
    jobTitle: 'システムエンジニア',
    jobTitleEn: 'Software Engineer',
    url: 'https://github.com/akarin0012',
    email: 'owatakbc@gmail.com',
    location: '東京都',
    /** キャリア開始日（経験年数の自動計算に使用） */
    careerStartDate: '2023-04-01',
  },
  /** SNSリンク */
  links: {
    github: 'https://github.com/akarin0012',
    /** X(Twitter) アカウントがある場合は '@username' 形式で設定 */
    twitter: undefined as string | undefined,
  },
  /** ロケール設定 */
  locale: 'ja_JP',
  /** 言語設定 */
  language: 'ja',
  /** サイトのカテゴリー */
  category: 'technology',
  /** サイトのキーワード（メイン技術スタック） */
  keywords: [
    // 名前・職種
    '茅嶋伸一郎',
    'システムエンジニア',
    'ソフトウェアエンジニア',
    'SE',
    'ポートフォリオ',
    // バックエンド
    'C#',
    '.NET',
    'ASP.NET',
    'ASP.NET Core',
    'ASP.NET Core MVC',
    'VB.NET',
    // フロントエンド
    'TypeScript',
    'JavaScript',
    'Next.js',
    'React',
    'HTML',
    'CSS',
    'Tailwind CSS',
    // データベース
    'SQL Server',
    'Oracle',
    'MySQL',
    // その他
    'Web開発',
    'Webアプリケーション',
    'フルスタック',
    '東京',
  ] as string[],
  /** 技術スタックは src/data/skills.ts に集約（getAllSkillNames() で取得） */
} as const;

/**
 * メールアドレスをランタイムで組み立てる（スクレイピング対策）
 * ソースコード上では分割して保持し、呼び出し時に結合する
 */
export function obfuscateEmail(): string {
  const [user, domain] = siteConfig.author.email.split('@');
  return `${user}@${domain}`;
}

/** サイトの完全なURL（パスを追加可能） */
export function absoluteUrl(path: string = ''): string {
  return `${siteConfig.url}${path}`;
}

/** 著者のキャリア経験年数（N年目）を取得 */
export function getCareerYear(): number {
  return calcYearsSince(siteConfig.author.careerStartDate) + 1;
}

/** 著作権表示用の年範囲を取得（例: "2024 - 2026" または "2024"） */
export function getCopyrightYears(): string {
  const currentYear = new Date().getFullYear();
  if (currentYear === SITE_ESTABLISHED_YEAR) {
    return String(SITE_ESTABLISHED_YEAR);
  }
  return `${SITE_ESTABLISHED_YEAR} - ${currentYear}`;
}

/** サイトの説明文を動的に生成（経験年数を含む） */
export function getSiteDescription(): string {
  const years = getCareerYear() - 1;
  return `茅嶋伸一郎のポートフォリオサイト。C#/.NET/ASP.NET Core/Next.js/TypeScriptを中心に、Webアプリケーション開発からシステム設計まで一貫して携わるシステムエンジニア。${years}年の実務経験を活かしたプロジェクト実績を掲載。`;
}
