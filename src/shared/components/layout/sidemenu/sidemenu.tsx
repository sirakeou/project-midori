/**
 * サイドメニュー
 */


import { Link, useLocation } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';
import { cn } from '@/shared/utils';

/**
 * メニューアイテムの定義
 */
export interface SideMenuItem {
    /** 一意なID */
    id: string;
    /** アイコンコンポーネント */
    icon: LucideIcon;
    /** 表示ラベル */
    label: string;
    /** 遷移先パス */
    path: string;
}

/**
 * サイドメニューのプロパティ
 */
export interface SideMenuProps {
    /** メニュー項目のリスト */
    items: SideMenuItem[];
}

/**
 * サイドメニューコンポーネント
 */
export function SideMenu({ items }: SideMenuProps) {
    const location = useLocation();

    const isActive = (itemPath: string): boolean => {
        if (itemPath === '/workspace') {
            return location.pathname.startsWith('/workspace');
        }
        return location.pathname === itemPath;
    };

    return (
        <nav className="flex flex-col h-full w-11 border-r bg-background py-2 justify-between">
            <div className="flex flex-col">
                {items.map((item) => {
                    const active = isActive(item.path);
                    return (
                        <TooltipProvider key={item.id} delayDuration={0}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        to={item.path}
                                        className={cn(
                                            "relative flex h-11 w-full items-center justify-center transition-colors hover:bg-accent hover:text-accent-foreground",
                                            active && "bg-accent/50 text-foreground before:absolute before:left-0 before:top-0 before:h-11 before:w-[2px] before:bg-primary"
                                        )}
                                        aria-label={item.label}
                                        aria-current={active ? 'page' : undefined}
                                    >
                                        <item.icon
                                            className={cn("h-6 w-6 text-muted-foreground", active && "text-foreground")}
                                        />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    {item.label}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    );
                })}
            </div>
            <div className="flex flex-col items-center gap-2">
                {/* Settings moved to Header */}
            </div>
        </nav>
    );
}
