import { test, expect } from '@playwright/test';

test.describe('ホームページ', () => {
  test('ページが正しく表示される', async ({ page }) => {
    await page.goto('/');

    // ヒーローセクションの確認
    await expect(page.locator('h1')).toContainText('茅嶋 伸一郎');
    await expect(page.locator('text=システムエンジニア')).toBeVisible();
  });

  test('ナビゲーションリンクが機能する', async ({ page }) => {
    await page.goto('/');

    // スキルセクションへのリンク
    const skillsLink = page.locator('a[href="#skills"]');
    await expect(skillsLink).toBeVisible();
  });

  test('スキルセクションが表示される', async ({ page }) => {
    await page.goto('/');

    // スキルセクションが読み込まれるまで待機
    const skillsHeading = page.locator('#skills-heading');
    await expect(skillsHeading).toBeVisible({ timeout: 10000 });
    await expect(skillsHeading).toContainText('スキル');
  });

  test('お問い合わせフォームが表示される', async ({ page }) => {
    await page.goto('/');

    // お問い合わせセクションの確認
    const contactHeading = page.locator('#contact-heading');
    await expect(contactHeading).toBeVisible({ timeout: 10000 });
    await expect(contactHeading).toContainText('お問い合わせ');
  });

  test('ページタイトルが正しい', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/茅嶋 伸一郎/);
  });

  test('メタデータが設定されている', async ({ page }) => {
    await page.goto('/');

    // description メタタグの確認
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);
  });
});

test.describe('制作物ページ', () => {
  test('制作物一覧ページが表示される', async ({ page }) => {
    await page.goto('/projects');

    await expect(page.locator('text=制作物ギャラリー')).toBeVisible({ timeout: 10000 });
  });
});

test.describe('404ページ', () => {
  test('存在しないページで404が表示される', async ({ page }) => {
    const response = await page.goto('/nonexistent-page');
    expect(response?.status()).toBe(404);
  });
});
