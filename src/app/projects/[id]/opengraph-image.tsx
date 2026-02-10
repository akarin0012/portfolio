import { ImageResponse } from 'next/og';
import { projects } from '@/data/projects';
import { siteConfig } from '@/config/site';

// 静的書き出し（output: 'export'）に必要
export const dynamic = 'force-static';

export const alt = 'Project OG Image';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

/** カテゴリ別の色設定 */
const categoryColors: Record<string, string> = {
  'web-app': '#3b82f6',
  library: '#8b5cf6',
  game: '#f59e0b',
  utility: '#10b981',
  tool: '#ef4444',
  other: '#6b7280',
};

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#18181b',
            color: '#fafafa',
            fontSize: '32px',
            fontFamily: 'sans-serif',
          }}
        >
          Project Not Found
        </div>
      ),
      { ...size },
    );
  }

  const accentColor = categoryColors[project.category] || '#3b82f6';
  const displayTech = project.techStack.slice(0, 6);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #18181b 0%, #09090b 50%, #0c0a1a 100%)',
          fontFamily: 'sans-serif',
          color: '#fafafa',
          padding: '60px',
        }}
      >
        {/* アクセントライン（上部） */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: accentColor,
            display: 'flex',
          }}
        />

        {/* 装飾: 右上のグラデーション円 */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accentColor}22 0%, transparent 70%)`,
            display: 'flex',
          }}
        />

        {/* メインコンテンツ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', zIndex: 1 }}>
          {/* カテゴリバッジ + 言語 */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div
              style={{
                display: 'flex',
                padding: '4px 14px',
                borderRadius: '16px',
                background: `${accentColor}22`,
                border: `1px solid ${accentColor}66`,
                fontSize: '14px',
                fontWeight: 600,
                color: accentColor,
              }}
            >
              {project.category.toUpperCase()}
            </div>
            <div
              style={{
                display: 'flex',
                padding: '4px 14px',
                borderRadius: '16px',
                border: '1px solid #3f3f46',
                fontSize: '14px',
                color: '#d4d4d8',
              }}
            >
              {project.primaryLanguage}
            </div>
          </div>

          {/* プロジェクトタイトル */}
          <div
            style={{
              fontSize: '48px',
              fontWeight: 700,
              lineHeight: 1.2,
              maxWidth: '900px',
              display: 'flex',
            }}
          >
            {project.title}
          </div>

          {/* サマリー */}
          <div
            style={{
              fontSize: '20px',
              color: '#a1a1aa',
              lineHeight: 1.5,
              maxWidth: '800px',
              display: 'flex',
            }}
          >
            {project.summary.length > 100
              ? project.summary.slice(0, 100) + '...'
              : project.summary}
          </div>
        </div>

        {/* フッター: 技術スタック + サイト名 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            zIndex: 1,
          }}
        >
          {/* 技術バッジ */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              maxWidth: '700px',
            }}
          >
            {displayTech.map((tech) => (
              <div
                key={tech}
                style={{
                  display: 'flex',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  border: '1px solid #3f3f46',
                  fontSize: '13px',
                  color: '#a1a1aa',
                  background: 'rgba(63,63,70,0.3)',
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          {/* サイト名 */}
          <div
            style={{
              display: 'flex',
              fontSize: '14px',
              color: '#71717a',
              whiteSpace: 'nowrap',
            }}
          >
            {siteConfig.url.replace('https://', '')}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
