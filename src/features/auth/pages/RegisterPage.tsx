import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { FormField } from '@/shared/components/FormField'
import { LoadingSpinner } from '@/shared/components/LoadingSpinner'
import { Role } from '@/domain/enums/roles'

const registerSchema = z.object({
  full_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email invalido'),
  password: z.string().min(6, 'La contrasena debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contrasenas no coinciden',
  path: ['confirmPassword'],
})

type RegisterFormData = z.infer<typeof registerSchema>

export function RegisterPage() {
  const { register: registerUser, isRegistering } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = (data: RegisterFormData) => {
    registerUser({
      full_name: data.full_name,
      email: data.email,
      password: data.password,
      role: Role.ADMIN,
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">ERP System</h1>
          <p className="mt-2 text-gray-600">Registrar primer administrador</p>
        </div>

        <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormField label="Nombre completo" error={errors.full_name}>
              <input
                type="text"
                {...register('full_name')}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="Juan Perez"
              />
            </FormField>

            <FormField label="Email" error={errors.email}>
              <input
                type="email"
                {...register('email')}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="admin@empresa.com"
              />
            </FormField>

            <FormField label="Contrasena" error={errors.password}>
              <input
                type="password"
                {...register('password')}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="********"
              />
            </FormField>

            <FormField label="Confirmar contrasena" error={errors.confirmPassword}>
              <input
                type="password"
                {...register('confirmPassword')}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="********"
              />
            </FormField>

            <button
              type="submit"
              disabled={isRegistering}
              className="flex w-full items-center justify-center rounded-md bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50"
            >
              {isRegistering ? <LoadingSpinner size="sm" /> : 'Registrar'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Ya tienes cuenta?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Iniciar sesion
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
