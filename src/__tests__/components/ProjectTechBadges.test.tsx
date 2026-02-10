import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectTechBadges } from '@/components/projects/ProjectTechBadges';

describe('ProjectTechBadges', () => {
  it('主要言語バッジが表示される', () => {
    render(
      <ProjectTechBadges
        primaryLanguage="TypeScript"
        techStack={['Next.js', 'React']}
      />,
    );

    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('技術スタックのバッジが全て表示される', () => {
    render(
      <ProjectTechBadges
        primaryLanguage="TypeScript"
        techStack={['Next.js', 'React', 'Tailwind CSS']}
      />,
    );

    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
  });

  it('空の技術スタックでも主要言語バッジは表示される', () => {
    render(
      <ProjectTechBadges
        primaryLanguage="JavaScript"
        techStack={[]}
      />,
    );

    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });
});
