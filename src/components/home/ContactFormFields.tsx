import type { ContactFormInput } from '@/lib/validations';

type Props = {
  fieldErrors: Partial<Record<keyof ContactFormInput, string>>;
  onClearError: (field: keyof ContactFormInput) => void;
};

/** 入力フィールドのスタイル */
const baseInputClass =
  'w-full rounded-lg border bg-surface px-4 py-2.5 text-sm text-heading placeholder-muted transition-colors focus:outline-none focus:ring-1';
const normalBorder = 'border-divider focus:border-accent/60 focus:ring-accent/30';
const errorBorder = 'border-danger focus:border-danger/60 focus:ring-danger/30';

function getInputClass(hasError: boolean): string {
  return `${baseInputClass} ${hasError ? errorBorder : normalBorder}`;
}

/** 個別フォームフィールド */
function FormFieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-xs text-danger" role="alert">
      {message}
    </p>
  );
}

/** お問い合わせフォームの入力フィールド群 */
export function ContactFormFields({ fieldErrors, onClearError }: Props) {
  return (
    <>
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
          className={getInputClass(!!fieldErrors.name)}
          placeholder="山田 太郎"
          onChange={() => onClearError('name')}
        />
        <FormFieldError id="contact-name-error" message={fieldErrors.name} />
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
          className={getInputClass(!!fieldErrors.email)}
          placeholder="example@email.com"
          onChange={() => onClearError('email')}
        />
        <FormFieldError id="contact-email-error" message={fieldErrors.email} />
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
          className={`${getInputClass(!!fieldErrors.message)} resize-none`}
          placeholder="お問い合わせ内容をお書きください"
          onChange={() => onClearError('message')}
        />
        <FormFieldError id="contact-message-error" message={fieldErrors.message} />
      </div>
    </>
  );
}
