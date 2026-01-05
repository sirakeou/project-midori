/**
 * アプリケーションのエントリーポイント
 * Reactアプリケーションを初期化し、DOMにマウントする。
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { createAppRouter } from './routes'

/** アプリケーションのルーター設定 */
const router = createAppRouter()

/**
 * Reactアプリケーションのレンダリング
 * - StrictModeで開発時の問題を検出する
 * - RouterProviderでルーティング機能を提供する
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
