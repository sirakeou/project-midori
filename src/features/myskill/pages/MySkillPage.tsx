import { User, Star, Award, BookOpen } from 'lucide-react'

/**
 * マイスキルページコンポーネント
 *
 * ユーザーのスキル情報を表示・管理するページです。
 */
export function MySkillPage() {
  // 仮のスキルデータ
  const skills = [
    { id: 1, name: 'React', level: 4, category: 'フロントエンド' },
    { id: 2, name: 'TypeScript', level: 4, category: 'プログラミング言語' },
    { id: 3, name: 'Node.js', level: 3, category: 'バックエンド' },
    { id: 4, name: 'Python', level: 3, category: 'プログラミング言語' },
    { id: 5, name: 'AWS', level: 2, category: 'インフラ' },
  ]

  const renderStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < level ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* ヘッダー部分 */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">マイスキル</h1>
            <p className="text-sm text-gray-500">あなたのスキル情報を管理します</p>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          {/* サマリーカード */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-4 border">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">登録スキル数</p>
                  <p className="text-2xl font-bold text-gray-800">{skills.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 border">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
                  <Star className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">平均レベル</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {(skills.reduce((acc, s) => acc + s.level, 0) / skills.length).toFixed(1)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 border">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">カテゴリ数</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {new Set(skills.map(s => s.category)).size}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* スキルリスト */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">スキル一覧</h2>
            </div>
            <div className="divide-y">
              {skills.map((skill) => (
                <div key={skill.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-gray-800">{skill.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{skill.category}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(skill.level)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 追加ボタン */}
          <div className="mt-6 flex justify-center">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              スキルを追加
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
