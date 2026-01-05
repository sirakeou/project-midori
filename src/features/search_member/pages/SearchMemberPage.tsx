import { Search, Users, MapPin, Briefcase, Mail, Phone } from 'lucide-react'
import { useState } from 'react'

/**
 * メンバー検索ページコンポーネント
 *
 * 組織内のメンバーを検索・表示するページです。
 */
export function SearchMemberPage() {
  const [searchQuery, setSearchQuery] = useState('')

  // 仮のメンバーデータ
  const members = [
    {
      id: 1,
      name: '山田 太郎',
      department: '開発部',
      position: 'シニアエンジニア',
      location: '東京オフィス',
      email: 'yamada@example.com',
      phone: '03-1234-5678',
      skills: ['React', 'TypeScript', 'Node.js'],
      avatar: '🧑‍💻',
    },
    {
      id: 2,
      name: '佐藤 花子',
      department: 'デザイン部',
      position: 'UIデザイナー',
      location: '大阪オフィス',
      email: 'sato@example.com',
      phone: '06-1234-5678',
      skills: ['Figma', 'Photoshop', 'Illustrator'],
      avatar: '👩‍🎨',
    },
    {
      id: 3,
      name: '鈴木 次郎',
      department: '開発部',
      position: 'フロントエンドエンジニア',
      location: '東京オフィス',
      email: 'suzuki@example.com',
      phone: '03-2345-6789',
      skills: ['Vue.js', 'JavaScript', 'CSS'],
      avatar: '👨‍💻',
    },
    {
      id: 4,
      name: '田中 美咲',
      department: 'マーケティング部',
      position: 'マーケティングマネージャー',
      location: '東京オフィス',
      email: 'tanaka@example.com',
      phone: '03-3456-7890',
      skills: ['SEO', 'Google Analytics', 'コンテンツ戦略'],
      avatar: '👩‍💼',
    },
    {
      id: 5,
      name: '高橋 健太',
      department: '開発部',
      position: 'バックエンドエンジニア',
      location: '福岡オフィス',
      email: 'takahashi@example.com',
      phone: '092-1234-5678',
      skills: ['Python', 'Django', 'PostgreSQL'],
      avatar: '🧑‍💻',
    },
  ]

  // 検索フィルタリング
  const filteredMembers = members.filter((member) => {
    const query = searchQuery.toLowerCase()
    return (
      member.name.toLowerCase().includes(query) ||
      member.department.toLowerCase().includes(query) ||
      member.position.toLowerCase().includes(query) ||
      member.skills.some((skill) => skill.toLowerCase().includes(query))
    )
  })

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* ヘッダー部分 */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">メンバー検索</h1>
            <p className="text-sm text-gray-500">組織内のメンバーを検索できます</p>
          </div>
        </div>

        {/* 検索バー */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="名前、部署、役職、スキルで検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto">
          {/* 検索結果カウント */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              {filteredMembers.length}件のメンバーが見つかりました
            </p>
          </div>

          {/* メンバーグリッド */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6"
              >
                {/* メンバー基本情報 */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{member.avatar}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-600">{member.position}</p>
                  </div>
                </div>

                {/* 部署と所在地 */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    <span>{member.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{member.location}</span>
                  </div>
                </div>

                {/* スキルタグ */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">スキル</p>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 連絡先 */}
                <div className="space-y-1 pt-4 border-t">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Phone className="h-3 w-3" />
                    <span>{member.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 検索結果なし */}
          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">検索条件に一致するメンバーが見つかりませんでした</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
