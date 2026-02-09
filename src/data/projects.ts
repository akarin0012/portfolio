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
    repoUrl: 'https://github.com/akarin0012/portfolio',
    demoUrl: 'https://akarin0012.com',
    liveDemoType: 'external-link',
    thumbnailUrl: '/thumbnails/portfolio-showcase.svg',
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
    thumbnailUrl: '/thumbnails/sales-system.svg',
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
    repoUrl: 'https://github.com/akarin0012/portfolio/tree/main/public/demos/color-palette-generator',
    demoUrl: '/demos/color-palette-generator/index.html',
    liveDemoType: 'iframe',
    thumbnailUrl: '/thumbnails/color-palette.svg',
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
  {
    id: 'password-generator',
    title: 'パスワードジェネレータ',
    summary:
      'TypeScript で実装した、暗号学的に安全なパスワードを生成できる Web アプリケーション。強度インジケーターと履歴機能付き。',
    description:
      'Web Crypto API を活用し、暗号学的に安全な乱数でパスワードを生成するツールです。' +
      '文字数（8〜64文字）、文字種（大文字・小文字・数字・記号）をカスタマイズでき、' +
      '生成されたパスワードの強度をリアルタイムで表示します。' +
      '履歴機能により、直近5件のパスワードを保持し、ワンクリックでコピーできます。' +
      '型安全な TypeScript で実装し、DOM操作やイベントハンドリングのベストプラクティスを適用しています。',
    category: 'tool',
    primaryLanguage: 'TypeScript',
    techStack: ['TypeScript', 'HTML5', 'CSS3', 'Web Crypto API', 'Clipboard API'],
    tags: ['TypeScript', 'Frontend', 'Tool'],
    repoUrl: 'https://github.com/akarin0012/portfolio/tree/main/public/demos/password-generator',
    demoUrl: '/demos/password-generator/index.html',
    liveDemoType: 'iframe',
    thumbnailUrl: '/thumbnails/password-generator.svg',
    mermaidDiagram: `graph TD
  User[ユーザー設定] --> Options[オプション取得]
  Options --> Length[文字数: 8-64]
  Options --> CharSet[文字種選択]
  CharSet --> Upper[大文字 A-Z]
  CharSet --> Lower[小文字 a-z]
  CharSet --> Num[数字 0-9]
  CharSet --> Sym[記号 !@#$]
  Length --> Generate[パスワード生成]
  CharSet --> Generate
  Generate --> Crypto[Web Crypto API]
  Crypto --> Shuffle[Fisher-Yates シャッフル]
  Shuffle --> Display[画面表示]
  Display --> Strength[強度計算]
  Display --> History[履歴保存]
  Display --> Copy[クリップボードコピー]`,
    challenges:
      '暗号学的に安全な乱数生成のため、Math.random() ではなく Web Crypto API (crypto.getRandomValues) を使用しました。' +
      'また、各文字種から最低1文字を含めることを保証しつつ、最終的にシャッフルして偏りのないパスワードを生成するロジックの実装が課題でした。',
    learnings:
      'TypeScript の型システムを活用することで、DOM 操作や設定オブジェクトの型安全性を確保できました。' +
      'また、Fisher-Yates シャッフルアルゴリズムや Web Crypto API の使い方を学び、' +
      'セキュリティを考慮したフロントエンド実装の知見を得られました。',
    createdAt: '2026-02-01',
    updatedAt: '2026-02-06',
    featured: true,
    order: 4,
  },
  {
    id: 'pomodoro-timer',
    title: 'ポモドーロタイマー',
    summary:
      'React で構築した、集中と休息のリズムを管理するポモドーロテクニック用タイマーアプリ。円形プログレスバーとセッション管理機能付き。',
    description:
      'React（CDN版）を使用して構築したポモドーロタイマーです。' +
      '25分の作業セッション、5分の小休憩、15分の長休憩を自動で切り替え、' +
      '円形のプログレスバーでタイマーの残り時間を視覚的に表示します。' +
      '4セッションで1サイクルとし、セッション数・合計作業時間・完了サイクル数を記録します。' +
      'Web Audio API による通知音、モード切替、スキップ機能など、実用的な機能を備えています。' +
      'React の useState / useEffect / useCallback / useMemo / useRef を活用し、' +
      'コンポーネント分割と状態管理のベストプラクティスを適用しています。',
    category: 'tool',
    primaryLanguage: 'JavaScript',
    techStack: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Web Audio API'],
    tags: ['React', 'Frontend', 'Tool'],
    repoUrl: 'https://github.com/akarin0012/portfolio/tree/main/public/demos/pomodoro-timer',
    demoUrl: '/demos/pomodoro-timer/index.html',
    liveDemoType: 'iframe',
    thumbnailUrl: '/thumbnails/pomodoro-timer.svg',
    mermaidDiagram: `graph TD
  User[ユーザー操作] --> Mode{モード選択}
  Mode -->|作業| Work[25分タイマー]
  Mode -->|小休憩| Short[5分タイマー]
  Mode -->|長休憩| Long[15分タイマー]
  Work --> Countdown[カウントダウン]
  Short --> Countdown
  Long --> Countdown
  Countdown --> Complete[タイマー完了]
  Complete --> Audio[Web Audio API 通知音]
  Complete --> Check{セッション判定}
  Check -->|4回未満| NextShort[小休憩へ遷移]
  Check -->|4回完了| NextLong[長休憩へ遷移]
  NextShort --> Countdown
  NextLong --> Countdown`,
    challenges:
      'useEffect 内でのタイマー管理と、タイマー完了時の状態遷移ロジックの整合性を保つことが課題でした。' +
      'setInterval のクリーンアップと useCallback による関数の安定参照を適切に組み合わせることで、' +
      '意図しない再レンダリングやタイマーの二重起動を防止しています。',
    learnings:
      'React Hooks（useState, useEffect, useCallback, useMemo, useRef）を組み合わせた状態管理のパターンを深く理解できました。' +
      'また、Web Audio API を使ったブラウザ上での音声生成や、SVG を活用した円形プログレスバーの実装経験が得られました。' +
      'CDN 版 React でも十分にコンポーネント指向の設計ができることを実感しました。',
    createdAt: '2026-02-08',
    updatedAt: '2026-02-08',
    featured: true,
    order: 5,
  },
];

