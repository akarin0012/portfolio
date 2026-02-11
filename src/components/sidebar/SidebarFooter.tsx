import { FileText, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CollapsibleLabel } from './CollapsibleLabel';

type Props = {
  isDark: boolean;
  toggleTheme: () => void;
  isDesktop?: boolean;
  isDesktopExpanded?: boolean;
};

const itemClass =
  'flex min-h-11 items-center gap-3 rounded-lg px-3 py-3 text-sm text-caption transition-colors hover:bg-surface-alt/50 hover:text-subheading';

/** 折りたたみ時のみ title を表示するヘルパー */
function getCollapsedTitle(isDesktop?: boolean, isExpanded?: boolean, label?: string): string | undefined {
  return isDesktop && !isExpanded ? label : undefined;
}

/** サイドバーフッター: テーマ切替 + PDF リンク */
export function SidebarFooter({ isDark, toggleTheme, isDesktop, isDesktopExpanded }: Props) {
  const themeLabel = isDark ? 'ライトモード' : 'ダークモード';
  const ThemeIcon = isDark ? Sun : Moon;

  return (
    <>
      <a
        href="/skill_sheet.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(itemClass, isDesktop && 'overflow-hidden')}
        title={getCollapsedTitle(isDesktop, isDesktopExpanded, '技術経歴書（PDF）')}
      >
        <FileText className="h-4 w-4 flex-shrink-0" />
        <CollapsibleLabel isDesktop={isDesktop} isExpanded={isDesktopExpanded}>
          技術経歴書（PDF）
        </CollapsibleLabel>
      </a>
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(itemClass, 'w-full', isDesktop && 'overflow-hidden')}
        title={getCollapsedTitle(isDesktop, isDesktopExpanded, themeLabel)}
        aria-label={`${themeLabel}に切り替え`}
      >
        <ThemeIcon className="h-4 w-4 flex-shrink-0" />
        <CollapsibleLabel isDesktop={isDesktop} isExpanded={isDesktopExpanded}>
          {themeLabel}
        </CollapsibleLabel>
      </button>
    </>
  );
}
