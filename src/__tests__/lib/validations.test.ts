import { describe, test, expect } from 'vitest';
import { contactFormSchema, getFieldErrors, formspreeIdSchema } from '@/lib/validations';

describe('contactFormSchema', () => {
  test('有効なデータをパースできる', () => {
    const data = {
      name: '山田 太郎',
      email: 'test@example.com',
      message: 'テストメッセージです。',
    };
    const result = contactFormSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  test('名前が空の場合はエラー', () => {
    const data = { name: '', email: 'test@example.com', message: 'テスト' };
    const result = contactFormSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  test('名前が空白のみの場合はエラー（trim後に空になる）', () => {
    const data = { name: '   ', email: 'test@example.com', message: 'テスト' };
    const result = contactFormSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  test('メールアドレスが不正な形式の場合はエラー', () => {
    const data = { name: '太郎', email: 'invalid-email', message: 'テスト' };
    const result = contactFormSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  test('メッセージが空の場合はエラー', () => {
    const data = { name: '太郎', email: 'test@example.com', message: '' };
    const result = contactFormSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  test('名前が100文字を超える場合はエラー', () => {
    const data = {
      name: 'あ'.repeat(101),
      email: 'test@example.com',
      message: 'テスト',
    };
    const result = contactFormSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  test('メッセージが5000文字を超える場合はエラー', () => {
    const data = {
      name: '太郎',
      email: 'test@example.com',
      message: 'あ'.repeat(5001),
    };
    const result = contactFormSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});

describe('getFieldErrors', () => {
  test('フィールドごとのエラーメッセージを返す', () => {
    const data = { name: '', email: 'invalid', message: '' };
    const result = contactFormSchema.safeParse(data);
    if (result.success) throw new Error('Expected failure');

    const errors = getFieldErrors(result.error);
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.message).toBeDefined();
  });

  test('有効なフィールドにはエラーが含まれない', () => {
    const data = { name: '太郎', email: 'invalid', message: 'テスト' };
    const result = contactFormSchema.safeParse(data);
    if (result.success) throw new Error('Expected failure');

    const errors = getFieldErrors(result.error);
    expect(errors.name).toBeUndefined();
    expect(errors.email).toBeDefined();
    expect(errors.message).toBeUndefined();
  });
});

describe('formspreeIdSchema', () => {
  test('英数字のみの ID を許可する', () => {
    expect(formspreeIdSchema.safeParse('xyzAbC123').success).toBe(true);
  });

  test('空文字列を拒否する', () => {
    expect(formspreeIdSchema.safeParse('').success).toBe(false);
  });

  test('特殊文字を含む ID を拒否する', () => {
    expect(formspreeIdSchema.safeParse('abc-123').success).toBe(false);
    expect(formspreeIdSchema.safeParse('abc 123').success).toBe(false);
    expect(formspreeIdSchema.safeParse('abc/123').success).toBe(false);
  });
});
