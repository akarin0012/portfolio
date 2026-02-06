/**
 * サイト全体で使用する設定値
 * SEO、OGP、構造化データなどで一貫した情報を提供するために使用
 */
export const siteConfig = {
  /** サイト名 */
  name: 'Akarin Portfolio',
  /** サイトの短い説明（検索結果に表示、120〜160文字推奨） */
  description:
    '茅嶋伸一郎のポートフォリオサイト。C#/.NET/ASP.NET Core/Next.js/TypeScriptを中心に、Webアプリケーション開発からシステム設計まで一貫して携わるシステムエンジニア。3年の実務経験を活かしたプロジェクト実績を掲載。',
  /** サイトのURL（末尾スラッシュなし） */
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://d19uazred58exm.cloudfront.net',
  /** OGP画像のパス */
  ogImage: '/og-image.png',
  /** 著者情報 */
  author: {
    name: '茅嶋 伸一郎',
    nameEn: 'Shinichiro Kayashima',
    jobTitle: 'システムエンジニア',
    jobTitleEn: 'Software Engineer',
    url: 'https://github.com/akarin0012',
    email: '', // 公開する場合は設定
    location: '東京都',
    experienceYears: 3,
  },
  /** SNSリンク */
  links: {
    github: 'https://github.com/akarin0012',
    twitter: '', // @username 形式（任意）
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
  /** 技術スタック（構造化データ用） */
  skills: {
    backend: ['C#', 'VB.NET', 'ASP.NET', 'ASP.NET Core MVC', 'VBScript'],
    frontend: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'HTML', 'CSS', 'jQuery', 'Tailwind CSS'],
    database: ['SQL Server', 'Oracle', 'MySQL'],
    other: ['Git', 'GitHub', 'GitHub Actions', 'AWS', 'Unity', 'kintone', 'Python'],
  },
} as const;

/** サイトの完全なURL（パスを追加可能） */
export function absoluteUrl(path: string = ''): string {
  return `${siteConfig.url}${path}`;
}
