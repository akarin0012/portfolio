import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: Props) {
  return (
    <nav aria-label="パンくずリスト" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-400">
        <li>
          <Link
            href="/"
            className="inline-flex items-center gap-1 transition-colors hover:text-zinc-100"
            aria-label="ホーム"
          >
            <Home className="h-3.5 w-3.5" />
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3 text-zinc-600" aria-hidden="true" />
              {isLast || !item.href ? (
                <span className="text-zinc-200" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-zinc-100"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
