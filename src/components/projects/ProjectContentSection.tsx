type Props = {
  title: string;
  children: React.ReactNode;
};

export function ProjectContentSection({ title, children }: Props) {
  return (
    <section className="space-y-3 rounded-xl border border-zinc-800/80 bg-zinc-950/50 p-5">
      <h2 className="text-sm font-semibold text-zinc-100 md:text-base">{title}</h2>
      <div className="prose prose-invert max-w-none prose-p:text-sm prose-li:text-sm prose-strong:text-zinc-100 prose-a:text-blue-300">
        {children}
      </div>
    </section>
  );
}

