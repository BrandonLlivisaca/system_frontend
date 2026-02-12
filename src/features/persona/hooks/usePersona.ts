import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { personaApi } from '@/infrastructure/api/personaApi'
import type { PersonaCreate, PersonaUpdate } from '@/domain/models/persona'
import toast from 'react-hot-toast'

export function usePersona(skip: number, limit: number, search?: string) {
  const queryClient = useQueryClient()

  const listQuery = useQuery({
    queryKey: ['persona', skip, limit, search],
    queryFn: () => personaApi.list({ skip, limit, search }),
  })

  const createMutation = useMutation({
    mutationFn: (data: PersonaCreate) => personaApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['persona'] })
      toast.success('Persona creada exitosamente')
    },
    onError: () => toast.error('Error al crear persona'),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: PersonaUpdate }) => personaApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['persona'] })
      toast.success('Persona actualizada exitosamente')
    },
    onError: () => toast.error('Error al actualizar persona'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => personaApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['persona'] })
      toast.success('Persona eliminada exitosamente')
    },
    onError: () => toast.error('Error al eliminar persona'),
  })

  return {
    personas: listQuery.data ?? [],
    isLoading: listQuery.isLoading,
    error: listQuery.error,
    createPersona: createMutation.mutate,
    updatePersona: updateMutation.mutate,
    deletePersona: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
