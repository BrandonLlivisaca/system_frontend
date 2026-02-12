import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/infrastructure/store/authStore'
import type { Role } from '@/domain/enums/roles'

interface RoleGuardProps {
  allowedRoles: Role[]
  children: React.ReactNode
}

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const hasRole = useAuthStore((s) => s.hasRole)

  if (!hasRole(allowedRoles)) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
