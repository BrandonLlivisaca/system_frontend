import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/infrastructure/store/authStore'

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
