import { Outlet } from 'react-router-dom'
import { Header } from '../shared/components/layout/header/header'
import { SideMenu } from '../shared/components/layout/sidemenu/sidemenu'
import type { SideMenuItem } from '../shared/components/layout/sidemenu/sidemenu'
import { User, SearchCheck } from 'lucide-react'

const menuItems: SideMenuItem[] = [
  {
    id: 'my-skills',
    icon: User,
    label: 'マイスキル',
    path: '/main/my-skills',
  },
  {
    id: 'member-search',
    icon: SearchCheck,
    label: 'メンバー検索',
    path: '/main/member-search',
  },
]

function AppShell() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SideMenu items={menuItems} />
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppShell
