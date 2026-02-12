import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormField } from '@/shared/components/FormField'
import { LoadingSpinner } from '@/shared/components/LoadingSpinner'
import { Role } from '@/domain/enums/roles'
import type { UserResponse } from '@/domain/models/user'

const userSchema = z.object({
  full_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email invalido'),
  password: z.string().min(6, 'Minimo 6 caracteres').optional().or(z.literal('')),
  role: z.nativeEnum(Role),
})

type UserFormData = z.infer<typeof userSchema>

interface UserFormProps {
  user?: UserResponse
  onSubmit: (data: UserFormData) => void
  onCancel: () => void
  isLoading: boolean
}

export function UserForm({ user, onSubmit, onCancel, isLoading }: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: user
      ? { full_name: user.full_name, email: user.email, role: user.role, password: '' }
      : { role: Role.SELLER },
  })

  const handleFormSubmit = (data: UserFormData) => {
    const payload = { ...data }
    if (!payload.password) {
      delete payload.password
    }
    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <FormField label="Nombre completo" error={errors.full_name}>
        <input
          type="text"
          {...register('full_name')}
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </FormField>

      <FormField label="Email" error={errors.email}>
        <input
          type="email"
          {...register('email')}
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </FormField>

      <FormField label={user ? 'Nueva contrasena (dejar vacio para no cambiar)' : 'Contrasena'} error={errors.password}>
        <input
          type="password"
          {...register('password')}
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </FormField>

      <FormField label="Rol" error={errors.role}>
        <select
          {...register('role')}
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          {Object.values(Role).map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </FormField>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50"
        >
          {isLoading ? <LoadingSpinner size="sm" /> : user ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  )
}
