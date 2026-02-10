type Props = {
  title: string;
  children: React.ReactNode;
};

export function ProjectContentSection({ title, children }: Props) {
  return (
    <section className="space-y-3 rounded-xl border border-divider-subtle/80 bg-surface-inset/50 p-5">
      <h2 className="text-sm font-semibold text-heading md:text-base">{title}</h2>
      <div className="prose max-w-none prose-p:text-sm prose-li:text-sm prose-strong:text-heading prose-a:text-accent dark:prose-invert">
        {children}
      </div>
    </section>
  );
}
