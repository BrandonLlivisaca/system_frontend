import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { FormField } from '@/shared/components/FormField'
import { LoadingSpinner } from '@/shared/components/LoadingSpinner'

const loginSchema = z.object({
  email: z.string().email('Email invalido'),
  password: z.string().min(1, 'La contrasena es requerida'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginPage() {
  const { login, isLoggingIn } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormData) => {
    login(data)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">ERP System</h1>
          <p className="mt-2 text-gray-600">Inicia sesion en tu cuenta</p>
        </div>

        <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormField label="Email" error={errors.email}>
              <input
                type="email"
                {...register('email')}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="tu@email.com"
              />
            </FormField>

            <FormField label="Contraseña" error={errors.password}>
              <input
                type="password"
                {...register('password')}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="********"
              />
            </FormField>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="flex w-full items-center justify-center rounded-md bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50"
            >
              {isLoggingIn ? <LoadingSpinner size="sm" /> : 'Iniciar Sesion'}
            </button>

          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Primera vez?{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
              Registrar administrador
            </Link>
          </p>

          <p className="mt-4 text-center text-sm text-gray-600">
            <Link to="/forgot-password" className="font-medium text-primary-400 hover:text-primary-500">
              Olvide la contraseña
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
