'use client';

import { type Variants, MotionConfig } from 'framer-motion';
import { SkillsSection } from '@/components/home/SkillsSection';
import { ExperienceSection } from '@/components/home/ExperienceSection';
import { ContactSection } from '@/components/home/ContactSection';

// 共通アニメーション設定
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const viewportOptions = {
  once: true,
  margin: '-50px' as const,
};

const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerParentSlow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

/**
 * Below-fold セクション（スキル・プロジェクト経験・お問い合わせ）
 * ヒーローセクションは Server Component として page.tsx で即座にレンダリング
 */
export function HomePageClient() {
  return (
    <MotionConfig reducedMotion="user">
      <SkillsSection
        fadeInUp={fadeInUp}
        staggerParent={staggerParent}
        viewportOptions={viewportOptions}
      />

      <hr className="my-12 border-divider-subtle md:my-20" aria-hidden="true" />

      <ExperienceSection
        fadeInUp={fadeInUp}
        staggerParentSlow={staggerParentSlow}
        viewportOptions={viewportOptions}
      />

      <hr className="my-12 border-divider-subtle md:my-20" aria-hidden="true" />

      <ContactSection
        fadeInUp={fadeInUp}
        viewportOptions={viewportOptions}
      />
    </MotionConfig>
  );
}
