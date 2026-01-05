
import { Sparkles } from 'lucide-react';

/**
 * アプリケーション全体のヘッダーコンポーネント
 *
 * アプリケーションの最上部に配置され、以下の機能を提供します：
 * - アプリケーション名の表示
 *
 * ヘッダー領域全体がTauriのドラッグ可能領域として設定されており、
 * ウィンドウの移動が可能です。
 *
 * @returns {JSX.Element} ヘッダーコンポーネント
 */
export function Header() {
    return (
        <header className="flex h-9 w-full items-center border-b bg-background px-2 select-none" data-tauri-drag-region>
            <div className="flex items-center gap-2">
                <span className="flex items-center text-primary">
                    <Sparkles className="h-6 w-6" />
                </span>
                <span className="text-sm font-medium text-foreground/90">Project-Midori</span>
            </div>
        </header>
    );
}
