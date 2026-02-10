import { describe, it, expect } from 'vitest';
import { projects } from '@/data/projects';
import { skillCategories, certifications, getAllSkillNames } from '@/data/skills';
import { workExperiences } from '@/data/experience';

describe('projects データ', () => {
  it('プロジェクトが1件以上存在する', () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it('各プロジェクトに必須フィールドがある', () => {
    for (const p of projects) {
      expect(p.id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.summary).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.primaryLanguage).toBeTruthy();
      expect(p.techStack.length).toBeGreaterThan(0);
      expect(p.tags.length).toBeGreaterThan(0);
    }
  });

  it('プロジェクト ID が一意', () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('ID がURLセーフな形式', () => {
    for (const p of projects) {
      expect(p.id).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('featured プロジェクトが少なくとも1件', () => {
    expect(projects.some((p) => p.featured)).toBe(true);
  });

  it('order が定義されている場合は一意', () => {
    const orders = projects.filter((p) => p.order != null).map((p) => p.order);
    expect(new Set(orders).size).toBe(orders.length);
  });

  it('createdAt が有効な日付形式（YYYY-MM-DD）', () => {
    for (const p of projects) {
      if (p.createdAt) {
        expect(p.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(new Date(p.createdAt).toString()).not.toBe('Invalid Date');
      }
    }
  });
});

describe('skills データ', () => {
  it('スキルカテゴリが1件以上', () => {
    expect(skillCategories.length).toBeGreaterThan(0);
  });

  it('各カテゴリに必須フィールドとスキルがある', () => {
    for (const cat of skillCategories) {
      expect(cat.title).toBeTruthy();
      expect(cat.dotColor).toBeTruthy();
      expect(cat.dotColor).toMatch(/^bg-/);
      expect(cat.skills.length).toBeGreaterThan(0);
    }
  });

  it('各スキルに name と duration がある', () => {
    for (const cat of skillCategories) {
      for (const skill of cat.skills) {
        expect(skill.name).toBeTruthy();
        expect(skill.duration).toBeTruthy();
      }
    }
  });

  it('progress が 0〜100 の範囲', () => {
    for (const cat of skillCategories) {
      for (const skill of cat.skills) {
        if (skill.progress !== undefined) {
          expect(skill.progress).toBeGreaterThanOrEqual(0);
          expect(skill.progress).toBeLessThanOrEqual(100);
        }
      }
    }
  });

  it('getAllSkillNames が全スキルを返す', () => {
    const allNames = getAllSkillNames();
    const expectedCount = skillCategories.reduce(
      (sum, cat) => sum + cat.skills.length,
      0,
    );
    expect(allNames.length).toBe(expectedCount);
  });

  it('資格が1件以上', () => {
    expect(certifications.length).toBeGreaterThan(0);
  });

  it('各資格に name がある', () => {
    for (const cert of certifications) {
      expect(cert.name).toBeTruthy();
    }
  });
});

describe('experience データ', () => {
  it('経験が1件以上', () => {
    expect(workExperiences.length).toBeGreaterThan(0);
  });

  it('各経験に必須フィールドがある', () => {
    for (const exp of workExperiences) {
      expect(exp.projectName).toBeTruthy();
      expect(exp.period).toBeTruthy();
      expect(exp.roleInfo).toBeTruthy();
      expect(exp.title).toBeTruthy();
      expect(exp.description).toBeTruthy();
      expect(exp.techStack.length).toBeGreaterThan(0);
    }
  });

  it('期間が妥当な形式', () => {
    for (const exp of workExperiences) {
      expect(exp.period).toMatch(/\d{4}年\d{1,2}月/);
    }
  });
});
