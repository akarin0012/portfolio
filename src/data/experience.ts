/** 業務プロジェクト経験の定義 */
export interface WorkExperience {
  /** プロジェクト名 */
  projectName: string;
  /** 期間（例: "2023年7月 - 2025年10月（2年4ヶ月）"） */
  period: string;
  /** 役割とチーム規模（例: "SE | チーム規模: 21名"） */
  roleInfo: string;
  /** プロジェクトのサブタイトル */
  title: string;
  /** 担当内容の説明 */
  description: string;
  /** 使用技術一覧 */
  techStack: string[];
}

/**
 * 業務プロジェクト経験一覧
 * HomePageClient のプロジェクト経験セクションで使用
 */
export const workExperiences: WorkExperience[] = [
  {
    projectName: '社内用資材工程管理アプリ',
    period: '2025年11月 - 2026年2月（4ヶ月）',
    roleInfo: 'SE | チーム規模: 3名',
    title: 'Windowsフォームアプリ開発',
    description:
      '設計書の新規作成・更新（要件定義書、基本設計書、詳細設計書）、' +
      'Windowsフォームを用いたUI開発（マルチコンボボックス等）、既存コードのリファクタリングを担当。',
    techStack: ['VB.NET', 'Windows Forms', 'Oracle'],
  },
  {
    projectName: '通信業プロビジョニングシステム保守',
    period: '2024年12月 - 2025年3月（4ヶ月）',
    roleInfo: 'オペレータ | チーム規模: 13名',
    title: 'システム保守・運用',
    description:
      '新規サービス追加・既存サービス変更対応、RPA操作・エビデンス作成プログラム開発、' +
      '脆弱性調査・対策資料作成、定期メンテナンス対応（Windowsアップデート、障害確認）を担当。',
    techStack: ['JavaScript', 'Python', 'Windows', 'Linux'],
  },
  {
    projectName: '建設業向け資機材管理システム',
    period: '2024年4月 - 2024年11月（8ヶ月）',
    roleInfo: 'SE | チーム規模: 9名',
    title: 'Unity × kintone連携開発',
    description:
      '開発環境構築、画面モック作成、DB設計（ER図作成）、Unityとkintoneを連携したデータ送受信処理の実装、' +
      '本番環境でのユーザ・現場情報管理を担当。',
    techStack: ['Unity', 'kintone', 'JavaScript', 'Oracle'],
  },
  {
    projectName: '営業管理システム',
    period: '2023年9月 - 2024年1月（5ヶ月）',
    roleInfo: 'PG | チーム規模: 7名',
    title: 'ASP.NET Core MVC フルスタック開発',
    description:
      'フロントエンド・バックエンドのフルスタック開発、ユーザ管理画面・スケジュール画面・案件画面の実装、' +
      '共有ライブラリの開発・テスト（Excel出力、JSON読み込み、PDF変換）、単体テスト・総合テストの実施を担当。',
    techStack: [
      'ASP.NET Core MVC',
      'C#',
      'HTML/CSS',
      'JavaScript',
      'jQuery',
      'SQL Server',
    ],
  },
  {
    projectName: '建設業向け帳票管理システム',
    period: '2023年7月 - 2025年10月（2年4ヶ月）',
    roleInfo: 'SE | チーム規模: 21名',
    title: 'Webアプリケーション開発・保守',
    description:
      'データ参照・出力機能の追加、Dropbox対応化機能の追加、DB移行に伴うデータ連携用パッチファイルの開発・改修、' +
      'システムマニュアルの作成・更新、本番環境へのデプロイ・運用を担当。',
    techStack: [
      'ASP.NET',
      'VB.NET',
      'VBScript',
      'HTML/CSS',
      'JavaScript',
      'jQuery',
      'Oracle',
      'SQL Server',
    ],
  },
];
