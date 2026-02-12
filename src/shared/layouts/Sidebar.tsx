import { NavLink } from 'react-router-dom'
import {
  HomeIcon,
  UsersIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline'
import { useAuthStore } from '@/infrastructure/store/authStore'
import { Role } from '@/domain/enums/roles'
import { cn } from '@/shared/utils/cn'

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  roles?: Role[]
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Usuarios', href: '/users', icon: UsersIcon, roles: [Role.ADMIN] },
  { name: 'Personas', href: '/persona', icon: IdentificationIcon },
]

export function Sidebar() {
  const user = useAuthStore((s) => s.user)
  const hasRole = useAuthStore((s) => s.hasRole)

  const visibleNav = navigation.filter(
    (item) => !item.roles || hasRole(item.roles),
  )

  return (
    <aside className="flex h-full w-64 flex-col bg-gray-900">
      <div className="flex h-16 items-center justify-center border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">ERP System</h1>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {visibleNav.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white',
              )
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {user && (
        <div className="border-t border-gray-800 p-4">
          <p className="text-sm font-medium text-white truncate">{user.full_name}</p>
          <p className="text-xs text-gray-400">{user.role}</p>
        </div>
      )}
    </aside>
  )
}
