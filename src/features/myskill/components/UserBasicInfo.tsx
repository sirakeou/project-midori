import { User as UserIcon } from 'lucide-react'
import type { User } from '@/core'

interface UserBasicInfoProps {
  user: User
  variant?: 'card' | 'header'
}

/**
 * ユーザー基本情報表示コンポーネント
 *
 * ユーザーの写真、名前、社員番号、役職を表示します。
 * variant で表示スタイルを切り替えることができます。
 */
export function UserBasicInfo({ user, variant = 'card' }: UserBasicInfoProps) {
  if (variant === 'header') {
    // ページヘッダー用のレイアウト（写真なし、横並び）
    return (
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>社員番号：{user.employee_id}</span>
        </div>
        <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
          {user.position}
        </div>
      </div>
    )
  }

  // カード用のレイアウト（デフォルト）
  return (
    <div className="flex items-start gap-4">
      <div className="shrink-0">
        <div className="w-24 h-32 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
          <UserIcon className="w-12 h-12" />
        </div>
      </div>
      <div className="flex-1 pt-2">
        <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
        <p className="text-sm text-muted-foreground mt-1">社員番号：{user.employee_id}</p>
        <div className="mt-3 inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
          {user.position}
        </div>
      </div>
    </div>
  )
}
