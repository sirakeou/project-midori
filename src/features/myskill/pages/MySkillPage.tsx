import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User as UserIcon, AlertCircle } from 'lucide-react'
import { userRepository, skillAssessmentRepository, personalProfileRepository } from '@/core'
import type { User, LatestSkillAssessment, PersonalProfile } from '@/core'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/shared/components/ui/alert'
import { ProfileSection } from '../components/ProfileSection'
import { SkillInfoSection } from '../components/SkillInfoSection'

/**
 * マイスキルページコンポーネント
 *
 * ユーザーのスキル情報を表示・管理するページです。
 */
export function MySkillPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [skills, setSkills] = useState<LatestSkillAssessment[]>([])
  const [profile, setProfile] = useState<PersonalProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // localStorageから現在のユーザーIDを取得
        const currentUserId = localStorage.getItem('currentUserId')

        if (!currentUserId) {
          // ユーザーが選択されていない場合は選択画面に戻す
          navigate('/')
          return
        }

        const [userData, skillsData, profileData] = await Promise.all([
          userRepository.getUser(currentUserId),
          skillAssessmentRepository.getEmployeeSkills(currentUserId),
          personalProfileRepository.getLatestPersonalProfile(currentUserId),
        ])

        if (!userData) {
          throw new Error('ユーザーが見つかりませんでした')
        }

        setUser(userData)
        setSkills(skillsData)
        setProfile(profileData)
      } catch (err) {
        console.error('Failed to fetch data:', err)

        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(`データの取得に失敗しました。: ${errorMessage}`)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [navigate])

  if (loading) {
    return (
      <div className="flex flex-col h-full bg-background p-6 space-y-6">
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-[600px] w-full" />
          <Skeleton className="h-[600px] w-full lg:col-span-2" />
        </div>
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
    <div className="flex flex-col h-full bg-background">
      {/* ヘッダー部分 */}
      <div className="bg-card border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
            <UserIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">マイスキル</h1>
            <p className="text-sm text-muted-foreground">{user.name} ({user.position}) さんのスキル管理</p>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
          {/* 左カラム: プロフィール情報 (1/3) */}
          <div className="w-full lg:w-1/3">
            <ProfileSection user={user} profile={profile} />
          </div>

          {/* 右カラム: スキル情報 (2/3) */}
          <div className="w-full lg:w-2/3">
            <SkillInfoSection skills={skills} />
          </div>
        </div>
      </div>
    </div>
  )
}

