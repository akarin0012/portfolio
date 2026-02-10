import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';
import { getAllSkillNames } from '@/data/skills';

// 静的書き出し（output: 'export'）に必要
export const dynamic = 'force-static';

export const alt = `${siteConfig.author.name} - ${siteConfig.author.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const topSkills = getAllSkillNames().slice(0, 8);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #18181b 0%, #09090b 50%, #0c0a1a 100%)',
          fontFamily: 'sans-serif',
          color: '#fafafa',
          padding: '60px',
        }}
      >
        {/* 装飾: 左上のドットパターン */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '300px',
            height: '300px',
            opacity: 0.08,
            background:
              'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            display: 'flex',
          }}
        />

        {/* 装飾: 右下のグラデーション */}
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* メインコンテンツ */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            zIndex: 1,
          }}
        >
          {/* サイト名 */}
          <div
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#3b82f6',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            Portfolio
          </div>

          {/* 著者名 */}
          <div
            style={{
              fontSize: '56px',
              fontWeight: 700,
              lineHeight: 1.2,
              display: 'flex',
            }}
          >
            {siteConfig.author.nameEn}
          </div>

          {/* 肩書 */}
          <div
            style={{
              fontSize: '24px',
              color: '#a1a1aa',
              display: 'flex',
            }}
          >
            {siteConfig.author.jobTitleEn}
          </div>

          {/* スキルバッジ */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '16px',
              maxWidth: '800px',
            }}
          >
            {topSkills.map((skill) => (
              <div
                key={skill}
                style={{
                  display: 'flex',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  border: '1px solid #3f3f46',
                  fontSize: '14px',
                  color: '#d4d4d8',
                  background: 'rgba(63,63,70,0.3)',
                }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* フッター */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: '#71717a',
          }}
        >
          <span>{siteConfig.url.replace('https://', '')}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
