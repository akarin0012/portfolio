export type ProjectCategory =
  | 'web-app'
  | 'library'
  | 'game'
  | 'utility'
  | 'tool'
  | 'other';

export type ProgrammingLanguage =
  | 'TypeScript'
  | 'JavaScript'
  | 'C#'
  | 'Python'
  | 'Go'
  | 'Rust'
  | 'Java'
  | 'Other';

export type ProjectTag =
  | 'Next.js'
  | 'React'
  | 'Tailwind CSS'
  | 'Node.js'
  | 'JavaScript'
  | 'TypeScript'
  | 'ASP.NET Core'
  | 'Unity'
  | 'Prisma'
  | 'PostgreSQL'
  | 'Docker'
  | 'CI/CD'
  | 'Testing'
  | 'Frontend'
  | 'Backend'
  | 'Fullstack'
  | 'AI'
  | 'Game'
  | 'Tool'
  | 'Library'
  | 'CLI'
  | 'Other';

export type LiveDemoType = 'iframe' | 'external-link' | 'code-snippet';

export interface Project {
  id: string;
  slug?: string;
  title: string;
  summary: string;
  description: string;
  category: ProjectCategory;
  primaryLanguage: ProgrammingLanguage;
  techStack: string[];
  tags: ProjectTag[];
  repoUrl?: string;
  demoUrl?: string;
  liveDemoType?: LiveDemoType;
  thumbnailUrl?: string;
  images?: string[];
  mermaidDiagram?: string;
  challenges?: string;
  learnings?: string;
  createdAt?: string;
  updatedAt?: string;
  featured?: boolean;
  order?: number;
}

export const projects: Project[] = [
  {
    id: 'next-portfolio-showcase',
    title: 'Next.js ポートフォリオ Showcase',
    summary:
      'C# / .NET エンジニアとしての制作物を集約し、モダンな UI で閲覧できるポートフォリオプラットフォーム。',
    description:
      'Next.js App Router と Tailwind CSS を用いて構築したポートフォリオサイトです。' +
      'プロジェクトごとの詳細ページ、技術構成図、Live Demo などを通して、設計〜実装までのプロセスを丁寧に伝えることを重視しています。',
    category: 'web-app',
    primaryLanguage: 'TypeScript',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons'],
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Frontend', 'Fullstack'],
    repoUrl: 'https://github.com/akarin0012', // 実プロジェクトのリポジトリ URL に差し替え
    demoUrl: 'https://example.com', // デプロイ先に差し替え
    liveDemoType: 'external-link',
    thumbnailUrl: '/window.svg',
    mermaidDiagram: `graph TD
  A[Client] --> B[Next.js App Router]
  B --> C[Showcase Projects]
  C --> D[Project Detail Page]
  D --> E[GitHub Repository]
  D --> F[Live Demo iframe]`,
    challenges:
      '既存の職務経歴中心の構成から、制作物ベースのナビゲーションへと拡張する際に、' +
      '情報量が多くなりすぎないよう UI レイアウトとアニメーションのバランスを調整しました。',
    learnings:
      'App Router での動的ルーティングと、型安全なデータ定義（TypeScript）を組み合わせることで、' +
      '新しいプロジェクトをデータ追加だけで展開できる設計の有用性を再確認しました。',
    createdAt: '2025-12-01',
    updatedAt: '2026-02-01',
    featured: true,
    order: 1,
  },
  {
    id: 'aspnet-core-sales-system',
    title: '営業管理システム（ASP.NET Core MVC）',
    summary:
      '顧客・案件・スケジュールを一元管理する営業支援 Web アプリケーション。フロント〜バックエンドまでフルスタックで担当。',
    description:
      'ASP.NET Core MVC と SQL Server を用いて構築した営業管理システムです。' +
      'ユーザ管理画面、スケジュール画面、案件画面の実装から、Excel 出力・PDF 変換などの共有ライブラリ開発まで幅広く担当しました。',
    category: 'web-app',
    primaryLanguage: 'C#',
    techStack: ['ASP.NET Core MVC', 'C#', 'SQL Server', 'JavaScript', 'jQuery'],
    tags: ['ASP.NET Core', 'Backend', 'Frontend', 'Fullstack'],
    repoUrl: undefined, // クローズドな業務案件の場合は undefined のまま
    liveDemoType: 'code-snippet',
    thumbnailUrl: '/window.svg',
    mermaidDiagram: `graph LR
  Browser --> MVC[ASP.NET Core MVC]
  MVC --> Controller
  Controller --> Service
  Service --> DB[(SQL Server)]`,
    challenges:
      'レガシーな実装方針とモダンな ASP.NET Core の設計思想をすり合わせながら、' +
      '既存メンバーとの認識を合わせつつ安全にリファクタリングを進める点が難しかったです。',
    learnings:
      'ドメインごとに責務を整理し、コントローラからロジックを切り出すことで、' +
      'テストしやすく変更に強い設計になることを体感しました。',
    createdAt: '2024-01-15',
    updatedAt: '2024-05-30',
    featured: false,
    order: 2,
  },
  {
    id: 'color-palette-generator',
    title: 'カラーパレットジェネレータ',
    summary:
      'Vanilla JavaScript で実装した、ランダムなカラーパレットを生成・管理できるシンプルな Web アプリケーション。',
    description:
      'フレームワークを使わず、純粋な JavaScript（Vanilla JS）で実装したカラーパレットジェネレータです。' +
      'ランダムに生成された5色のパレットを表示し、お気に入りの色をロックして保持しながら新しいパレットを生成できます。' +
      '各カラーコードをワンクリックでクリップボードにコピーできる機能も実装しています。' +
      'DOM操作、イベントハンドリング、Clipboard API の活用など、JavaScript の基礎を学ぶのに適したプロジェクトです。',
    category: 'web-app',
    primaryLanguage: 'JavaScript',
    techStack: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'Clipboard API'],
    tags: ['Frontend', 'JavaScript', 'Tool'],
    repoUrl: 'https://github.com/akarin0012', // 実際のリポジトリ URL に差し替え
    demoUrl: '/demos/color-palette-generator/index.html',
    liveDemoType: 'iframe',
    thumbnailUrl: '/window.svg',
    mermaidDiagram: `graph TD
  User[ユーザー操作] --> Generate[パレット生成]
  Generate --> Random[ランダムカラー生成]
  Random --> Check{ロック状態確認}
  Check -->|ロック済み| Keep[既存色を保持]
  Check -->|未ロック| New[新色を生成]
  Keep --> Render[画面に表示]
  New --> Render
  Render --> Copy[クリップボードコピー]
  Render --> Lock[ロック/アンロック]`,
    challenges:
      'ロック機能を実装する際、状態管理を Set で行い、配列のインデックスとロック状態を適切に紐付ける必要がありました。' +
      'また、Clipboard API が使えない古いブラウザへのフォールバックとして、`document.execCommand` を使った実装も追加しました。',
    learnings:
      'フレームワークに頼らず Vanilla JavaScript で実装することで、DOM操作の基礎やイベントハンドリングの理解が深まりました。' +
      'また、状態管理のシンプルなパターン（Set を使ったロック管理）を学び、' +
      'ユーザー体験を向上させるための細かい機能（トースト通知、ホバーエフェクト）の実装経験も得られました。',
    createdAt: '2025-01-20',
    updatedAt: '2025-01-25',
    featured: true,
    order: 3,
  },
];

