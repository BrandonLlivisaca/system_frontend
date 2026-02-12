import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormField } from '@/shared/components/FormField'
import { LoadingSpinner } from '@/shared/components/LoadingSpinner'
import type { PersonaResponse } from '@/domain/models/persona'

const personaSchema = z.object({
  razon_social: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  //apellido: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z.string().email('Email invalido'),
  telefono: z.string().min(1, 'El telefono es requerido'),
  direccion: z.string().min(1, 'La direccion es requerida'),
  tipo_identificacion: z.string().min(1, 'El tipo de identificacion es requerido'),
  numero_identificacion: z.string().min(1, 'El numero de identificacion es requerido'),
})

type PersonaFormData = z.infer<typeof personaSchema>

interface PersonaFormProps {
  persona?: PersonaResponse
  onSubmit: (data: PersonaFormData) => void
  onCancel: () => void
  isLoading: boolean
}

export function PersonaForm({ persona, onSubmit, onCancel, isLoading }: PersonaFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonaFormData>({
    resolver: zodResolver(personaSchema),
    defaultValues: persona
      ? {
          razon_social: persona.razon_social,
          //apellido: persona.apellido,
          email: persona.email,
          telefono: persona.telefono,
          direccion: persona.direccion,
          tipo_identificacion: persona.tipo_identificacion,
          numero_identificacion: persona.numero_identificacion,
        }
      : {},
  })

  const inputClasses =
    'block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Nombre" error={errors.razon_social}>
          <input type="text" {...register('razon_social')} className={inputClasses} />
        </FormField>
        
      </div>

      <FormField label="Email" error={errors.email}>
        <input type="email" {...register('email')} className={inputClasses} />
      </FormField>

      <FormField label="Telefono" error={errors.telefono}>
        <input type="text" {...register('telefono')} className={inputClasses} />
      </FormField>

      <FormField label="Direccion" error={errors.direccion}>
        <input type="text" {...register('direccion')} className={inputClasses} />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Tipo de identificacion" error={errors.tipo_identificacion}>
          <select {...register('tipo_identificacion')} className={inputClasses}>
            <option value="">Seleccionar...</option>
            <option value="DNI">DNI</option>
            <option value="RUC">RUC</option>
            <option value="CE">CE</option>
            <option value="PASAPORTE">Pasaporte</option>
          </select>
        </FormField>
        <FormField label="Numero de identificacion" error={errors.numero_identificacion}>
          <input type="text" {...register('numero_identificacion')} className={inputClasses} />
        </FormField>
      </div>

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
          {isLoading ? <LoadingSpinner size="sm" /> : persona ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  )
}
