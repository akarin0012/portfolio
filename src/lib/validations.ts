import { z } from 'zod';

/**
 * Formspree ID のバリデーション
 * Formspree のフォーム ID は英数字のみで構成される
 */
export const formspreeIdSchema = z
  .string()
  .regex(/^[a-zA-Z0-9]+$/, 'Formspree ID の形式が不正です');

/**
 * 環境変数の Formspree ID を検証して返す（無効な場合は undefined）
 */
export function getValidatedFormspreeId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  if (!id) return undefined;
  const result = formspreeIdSchema.safeParse(id);
  return result.success ? result.data : undefined;
}

/** お問い合わせフォームのバリデーションスキーマ */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'お名前を入力してください')
    .max(100, 'お名前は100文字以内で入力してください'),
  email: z
    .string()
    .trim()
    .min(1, 'メールアドレスを入力してください')
    .email('正しいメールアドレスの形式で入力してください'),
  message: z
    .string()
    .trim()
    .min(1, 'メッセージを入力してください')
    .max(5000, 'メッセージは5000文字以内で入力してください'),
});

/** お問い合わせフォームの入力型 */
export type ContactFormInput = z.infer<typeof contactFormSchema>;

/** バリデーションエラーをフィールドごとのメッセージに変換 */
export function getFieldErrors(
  error: z.ZodError<ContactFormInput>,
): Partial<Record<keyof ContactFormInput, string>> {
  const fieldErrors: Partial<Record<keyof ContactFormInput, string>> = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as keyof ContactFormInput | undefined;
    if (field && !fieldErrors[field]) {
      fieldErrors[field] = issue.message;
    }
  }
  return fieldErrors;
}
