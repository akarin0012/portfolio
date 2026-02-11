import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  isDesktop?: boolean;
  isExpanded?: boolean;
  children: ReactNode;
};

/** デスクトップサイドバーで折りたたみ可能なラベル */
export function CollapsibleLabel({ isDesktop, isExpanded, children }: Props) {
  if (!isDesktop) {
    return <span>{children}</span>;
  }

  return (
    <span
      className={cn(
        'overflow-hidden whitespace-nowrap transition-all duration-300',
        isExpanded ? 'w-auto opacity-100' : 'w-0 opacity-0',
      )}
    >
      {children}
    </span>
  );
}
