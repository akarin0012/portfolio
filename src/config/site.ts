/**
 * サイト全体で使用する設定値
 * SEO、OGP、構造化データなどで一貫した情報を提供するために使用
 */
export const siteConfig = {
  /** サイト名 */
  name: 'Akarin Portfolio',
  /** サイトの短い説明 */
  description:
    'C# / .NET / Next.js を軸に、洗練されたプロダクトを開発するエンジニアのポートフォリオ。',
  /** サイトのURL（末尾スラッシュなし） */
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://d19uazred58exm.cloudfront.net',
  /** OGP画像のパス */
  ogImage: '/og-image.png',
  /** 著者情報 */
  author: {
    name: '茅嶋 伸一郎',
    jobTitle: 'システムエンジニア',
    url: 'https://github.com/akarin0012',
  },
  /** SNSリンク */
  links: {
    github: 'https://github.com/akarin0012',
    twitter: '', // @username 形式（任意）
  },
  /** ロケール設定 */
  locale: 'ja_JP',
  /** サイトのキーワード */
  keywords: [
    'ポートフォリオ',
    'エンジニア',
    'システムエンジニア',
    'C#',
    '.NET',
    'Next.js',
    'TypeScript',
    'Web開発',
  ] as string[],
} as const;

/** サイトの完全なURL（パスを追加可能） */
export function absoluteUrl(path: string = ''): string {
  return `${siteConfig.url}${path}`;
}
