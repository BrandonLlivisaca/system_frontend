import { useAuthStore } from '@/infrastructure/store/authStore'

export function DashboardPage() {
  const user = useAuthStore((s) => s.user)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Bienvenido{user ? `, ${user.full_name}` : ''}. Selecciona una opcion del menu lateral.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Rol</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{user?.role ?? '—'}</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Email</h3>
          <p className="mt-1 text-lg font-semibold text-gray-900">{user?.email ?? '—'}</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Estado</h3>
          <p className="mt-1 text-2xl font-semibold text-green-600">Activo</p>
        </div>
      </div>
    </div>
  )
}
