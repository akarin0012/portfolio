'use client';

import { useCallback, useState, type FormEvent } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { siteConfig, obfuscateEmail } from '@/config/site';
import { contactFormSchema, getFieldErrors, getValidatedFormspreeId, type ContactFormInput } from '@/lib/validations';
import { useRateLimit } from '@/hooks/useRateLimit';
import { GitHubIcon } from '@/components/icons/GitHubIcon';
import { ContactFormFields } from './ContactFormFields';
import { ContactStatusAlerts } from './ContactStatusAlerts';

/** Formspree エンドポイント（環境変数から取得・検証、無効時はメールフォールバック） */
const FORMSPREE_ID = getValidatedFormspreeId();

type Props = {
  fadeInUp: Variants;
  viewportOptions: { once: boolean; margin: string };
};

/** お問い合わせセクション */
export function ContactSection({ fadeInUp, viewportOptions }: Props) {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormInput, string>>>({});
  const { checkRateLimit, retryCountdown } = useRateLimit({
    maxRequests: 3,
    windowMs: 60_000,
  });

  const handleEmailClick = useCallback(() => {
    window.location.href = `mailto:${obfuscateEmail()}`;
  }, []);

  const handleClearError = useCallback((field: keyof ContactFormInput) => {
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!FORMSPREE_ID) {
      handleEmailClick();
      return;
    }

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

    // checkRateLimit() が false を返すとフック内でカウントダウンが自動開始される
    if (!checkRateLimit()) {
      return;
    }

    setFormStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      setFormStatus(res.ok ? 'success' : 'error');
      if (res.ok) form.reset();
    } catch {
      setFormStatus('error');
    }
  }, [handleEmailClick, checkRateLimit]);

  const isBusy = formStatus === 'sending' || retryCountdown > 0;

  return (
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
            <p className="text-lg font-medium text-heading">送信ありがとうございます</p>
            <p className="text-sm text-caption">内容を確認の上、ご連絡いたします。</p>
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
          <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-4" aria-busy={formStatus === 'sending'}>
            <ContactFormFields fieldErrors={fieldErrors} onClearError={handleClearError} />
            <ContactStatusAlerts formStatus={formStatus} retryAfterSeconds={retryCountdown} />

            <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row sm:justify-center">
              <button
                type="submit"
                disabled={isBusy}
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
                <GitHubIcon className="h-5 w-5" />
                GitHub
              </a>
            </div>
          </form>
        )}

        {/* Formspree 未設定時: ボタン表示 */}
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
              <GitHubIcon className="h-5 w-5" />
              GitHub
            </a>
          </div>
        )}
      </motion.div>
    </section>
  );
}
