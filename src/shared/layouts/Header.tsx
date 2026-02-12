import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { useAuthStore } from '@/infrastructure/store/authStore'
import { useNavigate } from 'react-router-dom'

export function Header() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div />
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm text-gray-600">
            {user.full_name} — <span className="font-medium text-primary-600">{user.role}</span>
          </span>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          Salir
        </button>
      </div>
    </header>
  )
}
