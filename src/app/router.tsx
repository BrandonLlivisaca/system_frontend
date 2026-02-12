import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '@/shared/components/ProtectedRoute'
import { RoleGuard } from '@/shared/components/RoleGuard'
import { MainLayout } from '@/shared/layouts/MainLayout'
import { LoadingSpinner } from '@/shared/components/LoadingSpinner'
import { Role } from '@/domain/enums/roles'

const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage').then(m => ({ default: m.LoginPage })))
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage').then(m => ({ default: m.RegisterPage })))
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage').then(m => ({ default: m.DashboardPage })))
const UsersPage = lazy(() => import('@/features/users/pages/UsersPage').then(m => ({ default: m.UsersPage })))
const PersonaPage = lazy(() => import('@/features/persona/pages/PersonaPage').then(m => ({ default: m.PersonaPage })))
const PasswordPage = lazy(() => import('@/features/auth/pages/PasswordPage').then(m => ({ default: m.PasswordPage })))


function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingSpinner className="py-20" size="lg" />}>{children}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <SuspenseWrapper><LoginPage /></SuspenseWrapper>,
  },
  {
    path: '/register',
    element: <SuspenseWrapper><RegisterPage /></SuspenseWrapper>,
  },
  {
    path: '/forgot-password',
    element: <SuspenseWrapper><PasswordPage /></SuspenseWrapper>,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/dashboard',
            element: <SuspenseWrapper><DashboardPage /></SuspenseWrapper>,
          },
          {
            path: '/users',
            element: (
              <RoleGuard allowedRoles={[Role.ADMIN]}>
                <SuspenseWrapper><UsersPage /></SuspenseWrapper>
              </RoleGuard>
            ),
          },
          {
            path: '/persona',
            element: <SuspenseWrapper><PersonaPage /></SuspenseWrapper>,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
])
