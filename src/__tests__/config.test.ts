import { describe, it, expect } from 'vitest';
import {
  siteConfig,
  absoluteUrl,
  getCareerYear,
  getCopyrightYears,
  getSiteDescription,
  SITE_ESTABLISHED_YEAR,
  obfuscateEmail,
} from '@/config/site';

describe('siteConfig', () => {
  it('必須フィールドが定義されている', () => {
    expect(siteConfig.name).toBeTruthy();
    expect(siteConfig.url).toBeTruthy();
    expect(siteConfig.author.name).toBeTruthy();
    expect(siteConfig.author.nameEn).toBeTruthy();
    expect(siteConfig.author.jobTitle).toBeTruthy();
    expect(siteConfig.author.email).toBeTruthy();
    expect(siteConfig.author.careerStartDate).toBeTruthy();
    expect(siteConfig.locale).toBe('ja_JP');
    expect(siteConfig.language).toBe('ja');
  });

  it('URL がスラッシュで終わらない', () => {
    expect(siteConfig.url).not.toMatch(/\/$/);
  });

  it('キャリア開始日が有効な日付', () => {
    const date = new Date(siteConfig.author.careerStartDate);
    expect(date.toString()).not.toBe('Invalid Date');
    expect(date.getFullYear()).toBeGreaterThanOrEqual(2020);
  });

  it('キーワードが配列で、空でない', () => {
    expect(Array.isArray(siteConfig.keywords)).toBe(true);
    expect(siteConfig.keywords.length).toBeGreaterThan(0);
  });

  it('メールアドレスが有効な形式', () => {
    expect(siteConfig.author.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });
});

describe('absoluteUrl', () => {
  it('パスなしでベースURLを返す', () => {
    expect(absoluteUrl()).toBe(siteConfig.url);
  });

  it('パス付きで完全なURLを返す', () => {
    expect(absoluteUrl('/projects')).toBe(`${siteConfig.url}/projects`);
  });

  it('空文字列でベースURLを返す', () => {
    expect(absoluteUrl('')).toBe(siteConfig.url);
  });
});

describe('getCareerYear', () => {
  it('正の整数を返す', () => {
    const year = getCareerYear();
    expect(year).toBeGreaterThan(0);
    expect(Number.isInteger(year)).toBe(true);
  });

  it('妥当な範囲内（1〜20年目）', () => {
    const year = getCareerYear();
    expect(year).toBeGreaterThanOrEqual(1);
    expect(year).toBeLessThanOrEqual(20);
  });
});

describe('getCopyrightYears', () => {
  it('文字列を返す', () => {
    const years = getCopyrightYears();
    expect(typeof years).toBe('string');
  });

  it('開設年を含む', () => {
    const years = getCopyrightYears();
    expect(years).toContain(String(SITE_ESTABLISHED_YEAR));
  });

  it('形式が "YYYY" または "YYYY - YYYY"', () => {
    const years = getCopyrightYears();
    expect(years).toMatch(/^\d{4}( - \d{4})?$/);
  });
});

describe('getSiteDescription', () => {
  it('空でない文字列を返す', () => {
    const desc = getSiteDescription();
    expect(desc).toBeTruthy();
    expect(desc.length).toBeGreaterThan(50);
  });

  it('著者名を含む', () => {
    expect(getSiteDescription()).toContain('茅嶋');
  });
});

describe('obfuscateEmail', () => {
  it('有効なメールアドレスを返す', () => {
    const email = obfuscateEmail();
    expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('siteConfig のメールと一致する', () => {
    expect(obfuscateEmail()).toBe(siteConfig.author.email);
  });
});
