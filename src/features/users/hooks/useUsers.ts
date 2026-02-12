import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usersApi } from '@/infrastructure/api/usersApi'
import type { UserCreate, UserUpdate } from '@/domain/models/user'
import toast from 'react-hot-toast'

export function useUsers(skip: number, limit: number) {
  const queryClient = useQueryClient()

  const listQuery = useQuery({
    queryKey: ['users', skip, limit],
    queryFn: () => usersApi.list({ skip, limit }),
  })

  const createMutation = useMutation({
    mutationFn: (data: UserCreate) => usersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('Usuario creado exitosamente')
    },
    onError: () => toast.error('Error al crear usuario'),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UserUpdate }) => usersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('Usuario actualizado exitosamente')
    },
    onError: () => toast.error('Error al actualizar usuario'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => usersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('Usuario eliminado exitosamente')
    },
    onError: () => toast.error('Error al eliminar usuario'),
  })

  return {
    users: listQuery.data ?? [],
    isLoading: listQuery.isLoading,
    error: listQuery.error,
    createUser: createMutation.mutate,
    updateUser: updateMutation.mutate,
    deleteUser: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
