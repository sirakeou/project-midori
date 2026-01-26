import { AlertCircle } from 'lucide-react'

/**
 * メンバー検索ページコンポーネント
 *
 * 組織内のメンバーを検索・表示するページです。
 */
export function SearchMemberPage() {
  return (
    <div className="flex items-center justify-center h-full bg-gray-50">
      <div className="text-center">
        <div className="mb-6">
          <AlertCircle className="h-24 w-24 text-gray-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-600 mb-2">開発中</h1>
          <p className="text-lg text-gray-600">
            この機能は現在開発中です
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6 max-w-md mx-auto">
          <p className="text-sm text-gray-600">
            メンバー検索機能は準備中です。<br />
            しばらくお待ちください。
          </p>
        </div>
      </div>
    </div>
  )
}
