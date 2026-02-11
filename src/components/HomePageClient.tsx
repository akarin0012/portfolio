'use client';

import { useCallback, useState, type FormEvent } from 'react';
import { motion, Variants, MotionConfig } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { skillCategories, certifications } from '@/data/skills';
import { workExperiences } from '@/data/experience';
import { siteConfig, obfuscateEmail } from '@/config/site';
import { contactFormSchema, getFieldErrors, type ContactFormInput } from '@/lib/validations';
import { useRateLimit } from '@/hooks/useRateLimit';

// 共通アニメーション設定
const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const viewportOptions = {
  once: true,
  margin: '-50px' as const,
};

const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerParentSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

/**
 * Below-fold セクション（スキル・プロジェクト・お問い合わせ）
 * ヒーローセクションはServer Componentとして page.tsx で即座にレンダリング
 */
/** Formspree エンドポイント（環境変数で設定、未設定時はメールフォールバック） */
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

export function HomePageClient() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'rate-limited'>('idle');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormInput, string>>>({});
  const { checkRateLimit, getRetryAfterSeconds } = useRateLimit({
    maxRequests: 3,
    windowMs: 60_000, // 1分間に3回まで
  });

  const handleEmailClick = useCallback(() => {
    window.location.href = `mailto:${obfuscateEmail()}`;
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!FORMSPREE_ID) {
      handleEmailClick();
      return;
    }

    // Zod バリデーション
    const form = e.currentTarget;
    const formData = new FormData(form);
    const rawData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    const result = contactFormSchema.safeParse(rawData);
    if (!result.success) {
      setFieldErrors(getFieldErrors(result.error));
      return;
    }
    setFieldErrors({});

    // レートリミットチェック
    if (!checkRateLimit()) {
      setFormStatus('rate-limited');
      return;
    }

    setFormStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  }, [handleEmailClick, checkRateLimit]);

  return (
    <MotionConfig reducedMotion="user">
      {/* スキルセクション */}
      <section id="skills" aria-labelledby="skills-heading" className="mb-12 md:mb-20">
        <motion.h2
          id="skills-heading"
          className="mb-6 text-3xl font-bold text-heading md:mb-8 md:text-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeInUp}
        >
          スキル
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={staggerParent}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              className="rounded-lg border border-divider bg-surface-alt p-6"
              variants={fadeInUp}
            >
              <h3 className="mb-4 flex items-center text-xl font-semibold text-subheading">
                <span
                  className={`mr-3 h-3 w-3 rounded-full ${category.dotColor}`}
                />
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="text-body"
                  >
                    <div className="flex items-center">
                      <span
                        className={`mr-3 h-2 w-2 rounded-full ${category.dotColor}`}
                      />
                      <span className="font-medium">{skill.name}</span>
                      <span className="ml-auto text-sm text-muted">
                        {skill.duration}
                      </span>
                    </div>
                    {skill.progress !== undefined && (
                      <div className="ml-5 mt-1.5 flex items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-deep">
                          <div
                            className={`h-full rounded-full ${category.dotColor} transition-all duration-500`}
                            style={{ width: `${skill.progress}%` }}
                          />
                        </div>
                        <span className="text-xs tabular-nums text-muted">
                          {skill.progress}%
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* 資格 */}
        <motion.div
          className="mt-6 rounded-lg border border-divider bg-surface-alt p-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeInUp}
        >
          <h3 className="mb-4 text-xl font-semibold text-subheading">資格</h3>
          <ul className="space-y-2">
            {certifications.map((cert) => (
              <li key={cert.name} className="flex items-center text-body">
                <span className="mr-3 h-2 w-2 rounded-full bg-muted" />
                {cert.name}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      <hr className="my-12 border-divider-subtle md:my-20" aria-hidden="true" />

      {/* プロジェクト経験セクション */}
      <section id="projects" aria-labelledby="projects-heading" className="mb-12 md:mb-20">
        <motion.h2
          id="projects-heading"
          className="mb-6 text-3xl font-bold text-heading md:mb-8 md:text-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeInUp}
        >
          主なプロジェクト経験
        </motion.h2>
        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={staggerParentSlow}
        >
          {workExperiences.map((exp) => (
            <motion.div
              key={exp.projectName}
              className="rounded-lg border border-divider bg-surface-alt p-6"
              variants={fadeInUp}
            >
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
                  {exp.projectName}
                </span>
                <span className="text-sm text-caption">{exp.period}</span>
                <span className="text-sm text-caption">{exp.roleInfo}</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-subheading">
                {exp.title}
              </h3>
              <p className="mb-4 text-body">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded bg-surface-deep px-2 py-1 text-xs text-body"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <hr className="my-12 border-divider-subtle md:my-20" aria-hidden="true" />

      {/* お問い合わせセクション */}
      <section id="contact" aria-labelledby="contact-heading" className="mb-12 md:mb-20">
        <motion.h2
          id="contact-heading"
          className="mb-6 text-3xl font-bold text-heading md:mb-8 md:text-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeInUp}
        >
          お問い合わせ
        </motion.h2>
        <motion.div
          className="rounded-lg border border-divider bg-surface-alt p-6 md:p-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeInUp}
          transition={{ delay: 0.1 }}
        >
          <p className="mb-6 text-center text-base text-body md:text-lg">
            ご興味をお持ちいただけましたら、お気軽にお問い合わせください。
          </p>

          {formStatus === 'success' && (
            <div role="status" aria-live="polite" className="flex flex-col items-center gap-3 py-8 text-center">
              <CheckCircle2 className="h-10 w-10 text-success" aria-hidden="true" />
              <p className="text-lg font-medium text-heading">
                送信ありがとうございます
              </p>
              <p className="text-sm text-caption">
                内容を確認の上、ご連絡いたします。
              </p>
              <button
                type="button"
                onClick={() => setFormStatus('idle')}
                className="mt-2 text-sm text-accent transition-colors hover:text-accent-hover"
              >
                新しいメッセージを送る
              </button>
            </div>
          )}

          {formStatus !== 'success' && FORMSPREE_ID && (
            <form
              onSubmit={handleSubmit}
              className="mx-auto max-w-lg space-y-4"
              aria-busy={formStatus === 'sending'}
            >
              <div>
                <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-body">
                  お名前 <span className="text-danger">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  aria-invalid={!!fieldErrors.name}
                  aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                  className={`w-full rounded-lg border bg-surface px-4 py-2.5 text-sm text-heading placeholder-muted transition-colors focus:outline-none focus:ring-1 ${fieldErrors.name ? 'border-danger focus:border-danger/60 focus:ring-danger/30' : 'border-divider focus:border-accent/60 focus:ring-accent/30'}`}
                  placeholder="山田 太郎"
                  onChange={() => setFieldErrors((prev) => ({ ...prev, name: undefined }))}
                />
                {fieldErrors.name && (
                  <p id="contact-name-error" className="mt-1 text-xs text-danger" role="alert">
                    {fieldErrors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-body">
                  メールアドレス <span className="text-danger">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                  className={`w-full rounded-lg border bg-surface px-4 py-2.5 text-sm text-heading placeholder-muted transition-colors focus:outline-none focus:ring-1 ${fieldErrors.email ? 'border-danger focus:border-danger/60 focus:ring-danger/30' : 'border-divider focus:border-accent/60 focus:ring-accent/30'}`}
                  placeholder="example@email.com"
                  onChange={() => setFieldErrors((prev) => ({ ...prev, email: undefined }))}
                />
                {fieldErrors.email && (
                  <p id="contact-email-error" className="mt-1 text-xs text-danger" role="alert">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-body">
                  メッセージ <span className="text-danger">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  aria-invalid={!!fieldErrors.message}
                  aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                  className={`w-full resize-none rounded-lg border bg-surface px-4 py-2.5 text-sm text-heading placeholder-muted transition-colors focus:outline-none focus:ring-1 ${fieldErrors.message ? 'border-danger focus:border-danger/60 focus:ring-danger/30' : 'border-divider focus:border-accent/60 focus:ring-accent/30'}`}
                  placeholder="お問い合わせ内容をお書きください"
                  onChange={() => setFieldErrors((prev) => ({ ...prev, message: undefined }))}
                />
                {fieldErrors.message && (
                  <p id="contact-message-error" className="mt-1 text-xs text-danger" role="alert">
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              {formStatus === 'error' && (
                <div role="alert" aria-live="assertive" className="flex items-center gap-2 rounded-lg border border-danger/30 bg-danger/10 px-4 py-2.5 text-sm text-danger">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  送信に失敗しました。しばらく経ってから再度お試しください。
                </div>
              )}

              {formStatus === 'rate-limited' && (
                <div role="alert" aria-live="assertive" className="flex items-center gap-2 rounded-lg border border-warning/30 bg-warning/10 px-4 py-2.5 text-sm text-warning">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  送信回数の上限に達しました。{getRetryAfterSeconds()}秒後に再度お試しください。
                </div>
              )}

              <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row sm:justify-center">
                <button
                  type="submit"
                  disabled={formStatus === 'sending' || formStatus === 'rate-limited'}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-accent-hover active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  {formStatus === 'sending' ? '送信中...' : '送信する'}
                </button>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-divider bg-surface px-8 py-3 text-sm font-medium text-heading transition-all duration-300 hover:bg-surface-alt active:scale-95"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.425 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </a>
              </div>
            </form>
          )}

          {/* Formspree 未設定時: ボタン表示（プライマリCTA → セカンダリの順） */}
          {formStatus !== 'success' && !FORMSPREE_ID && (
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={handleEmailClick}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-accent-hover active:scale-95"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                お問い合わせ
              </button>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-divider bg-surface px-8 py-3.5 text-sm font-medium text-heading transition-all duration-300 hover:bg-surface-alt active:scale-95"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.425 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </a>
            </div>
          )}
        </motion.div>
      </section>
    </MotionConfig>
  );
}
