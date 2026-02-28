import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import { userRepository, skillAssessmentRepository, personalProfileRepository } from '@/core'
import type { User, LatestSkillAssessment, PersonalProfile } from '@/core'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/shared/components/ui/alert'
import { UserBasicInfo } from '../components/UserBasicInfo'
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
        <UserBasicInfo user={user} variant="header" />
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

