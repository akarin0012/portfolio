/** 個別スキルの定義 */
export interface Skill {
  /** スキル名 */
  name: string;
  /** 経験期間（例: "3年", "2年4ヶ月", "学習中"） */
  duration: string;
}

/** スキルカテゴリの定義 */
export interface SkillCategory {
  /** カテゴリ名 */
  title: string;
  /** カテゴリドットの Tailwind カラークラス（bg-xxx-500 形式） */
  dotColor: string;
  /** スキル一覧（経験期間が長い順に並べる） */
  skills: Skill[];
}

/** 資格の定義 */
export interface Certification {
  name: string;
}

/**
 * スキルカテゴリ一覧
 * HomePageClient のスキルセクションと siteConfig の構造化データで共有
 */
export const skillCategories: SkillCategory[] = [
  {
    title: 'バックエンド',
    dotColor: 'bg-blue-500',
    skills: [
      { name: 'C#', duration: '3年' },
      { name: 'VB.NET', duration: '3年' },
      { name: 'ASP.NET', duration: '2年4ヶ月' },
      { name: 'ASP.NET Core MVC', duration: '5ヶ月' },
      { name: 'VBScript', duration: '2年4ヶ月' },
    ],
  },
  {
    title: 'フロントエンド',
    dotColor: 'bg-green-500',
    skills: [
      { name: 'HTML/CSS', duration: '3年' },
      { name: 'JavaScript', duration: '3年' },
      { name: 'jQuery', duration: '2年4ヶ月' },
      { name: 'TypeScript', duration: '学習中' },
      { name: 'Next.js', duration: '学習中' },
    ],
  },
  {
    title: 'データベース',
    dotColor: 'bg-purple-500',
    skills: [
      { name: 'Oracle', duration: '2年8ヶ月' },
      { name: 'SQL Server', duration: '8ヶ月' },
      { name: 'MySQL', duration: '研修経験' },
    ],
  },
  {
    title: 'その他',
    dotColor: 'bg-orange-500',
    skills: [
      { name: 'Git/GitHub', duration: '3年' },
      { name: 'Unity（ローコード）', duration: '8ヶ月' },
      { name: 'kintone', duration: '8ヶ月' },
      { name: 'Python', duration: '4ヶ月' },
      { name: 'AWS', duration: '学習中' },
      { name: 'GitHub Actions', duration: '学習中' },
    ],
  },
];

/** 保有資格一覧 */
export const certifications: Certification[] = [
  { name: 'HTML5プロフェッショナル認定 レベル1' },
  { name: '普通自動車免許' },
];

/**
 * 全スキル名をフラットな配列として取得
 * JSON-LD 構造化データ（siteConfig）で使用
 */
export function getAllSkillNames(): string[] {
  return skillCategories.flatMap((category) =>
    category.skills.map((skill) => skill.name),
  );
}
