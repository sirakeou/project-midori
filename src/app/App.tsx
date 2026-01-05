/**
 * アプリケーションのルートコンポーネント
 * ウェルカム画面を表示し、メイン画面への遷移を提供する。
 */

import { useNavigate } from 'react-router-dom'
import { Button } from 'src/shared/components/ui/button'

/**
 * Appコンポーネント
 *
 * @returns {JSX.Element} ウェルカム画面のJSX要素
 *
 * @description
 * アプリケーションのランディングページを表示する。
 * メイン画面へのナビゲーションボタンを含む。
 */
function App() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        project-midori
      </h1>
      <Button
        onClick={() => navigate('/main/my-skills')}
        size="lg"
        className="shadow-lg"
      >
        メイン画面へGo
      </Button>
    </div>
  )
}

export default App
