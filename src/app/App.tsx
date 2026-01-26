/**
 * アプリケーションのルートコンポーネント
 * ユーザー選択画面を表示し、選択後にメイン画面へ遷移する。
 */

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from 'src/shared/components/ui/button'
import { userRepository } from '@/core'
import type { User } from '@/core'

/**
 * Appコンポーネント
 *
 * @returns {JSX.Element} ユーザー選択画面のJSX要素
 *
 * @description
 * アプリケーションのランディングページ。
 * ユーザー一覧を表示し、選択したユーザーでログインする。
 */
function App() {
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>([])
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await userRepository.getUsers()
        setUsers(userList)
        if (userList.length > 0) {
          setSelectedUserId(userList[0].employee_id)
        }
      } catch (error) {
        console.error('Failed to fetch users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleLogin = () => {
    if (selectedUserId) {
      localStorage.setItem('currentUserId', selectedUserId)
      navigate('/main/my-skills')
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-green-50 to-blue-50">
        <p className="text-gray-600">読み込み中...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-green-50 to-blue-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        project-midori
      </h1>

      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">ユーザーを選択</h2>

        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {users.map((user) => (
            <option key={user.employee_id} value={user.employee_id}>
              {user.name} ({user.position})
            </option>
          ))}
        </select>

        <Button
          onClick={handleLogin}
          size="lg"
          className="w-full shadow-lg"
          disabled={!selectedUserId}
        >
          ログイン
        </Button>
      </div>
    </div>
  )
}

export default App
