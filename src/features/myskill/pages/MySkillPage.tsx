import { useEffect, useState } from 'react'
import { User as UserIcon, Star, Award, BookOpen, AlertCircle } from 'lucide-react'
import { userRepository, skillAssessmentRepository } from '@/core'
import type { User, LatestSkillAssessment } from '@/core'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/shared/components/ui/alert'

// テスト用社員ID（後で認証コンテキストから取得するように変更）
const TEST_EMPLOYEE_ID = '100001'

/**
 * マイスキルページコンポーネント
 *
 * ユーザーのスキル情報を表示・管理するページです。
 */
export function MySkillPage() {
  const [user, setUser] = useState<User | null>(null)
  const [skills, setSkills] = useState<LatestSkillAssessment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [userData, skillsData] = await Promise.all([
          userRepository.getUser(TEST_EMPLOYEE_ID),
          skillAssessmentRepository.getEmployeeSkills(TEST_EMPLOYEE_ID),
        ])

        if (!userData) {
          throw new Error('ユーザーが見つかりませんでした')
        }

        setUser(userData)
        setSkills(skillsData)
      } catch (err) {
        console.error('Failed to fetch data:', err)

        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(`データの取得に失敗しました。: ${errorMessage}`)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const renderStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < level ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
      />
    ))
  }

  if (loading) {
    return (
      <div className="flex flex-col h-full bg-gray-50 p-6 space-y-6">
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>エラー</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* ヘッダー部分 */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
            <UserIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">マイスキル</h1>
            <p className="text-sm text-gray-500">{user.name} ({user.position}) さんのスキル管理</p>
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
                    {skills.length > 0
                      ? (skills.reduce((acc, s) => acc + s.level, 0) / skills.length).toFixed(1)
                      : '0.0'}
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
                    {new Set(skills.map(s => s.category1)).size}
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
                <div key={`${skill.skill_id}-${skill.updated_at}`} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-gray-800">{skill.skill_name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {skill.category1} {skill.category2 ? `/ ${skill.category2}` : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(skill.level)}
                    </div>
                  </div>
                </div>
              ))}
              {skills.length === 0 && (
                <div className="px-6 py-8 text-center text-gray-500">
                  スキルが登録されていません
                </div>
              )}
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

