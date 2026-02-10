import { ProgrammingLanguage } from '@/data/projects';

type Props = {
  primaryLanguage: ProgrammingLanguage;
  techStack: string[];
};

export function ProjectTechBadges({ primaryLanguage, techStack }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
        {primaryLanguage}
      </span>
      {techStack.map((tech) => (
        <span
          key={tech}
          className="rounded-full bg-surface-alt px-2.5 py-1 text-xs text-body"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}
