import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useUsers } from '../hooks/useUsers'
import { UsersTable } from '../components/UsersTable'
import { UserForm } from '../components/UserForm'
import { Modal } from '@/shared/components/Modal'
import { ConfirmDialog } from '@/shared/components/ConfirmDialog'
import { Pagination } from '@/shared/components/Pagination'
import { LoadingSpinner } from '@/shared/components/LoadingSpinner'
import { ErrorMessage } from '@/shared/components/ErrorMessage'
import { usePagination } from '@/shared/hooks/usePagination'
import type { UserResponse, UserCreate, UserUpdate } from '@/domain/models/user'

export function UsersPage() {
  const { currentPage, skip, limit, pageSize, goToPage } = usePagination()
  const {
    users,
    isLoading,
    error,
    createUser,
    updateUser,
    deleteUser,
    isCreating,
    isUpdating,
    isDeleting,
  } = useUsers(skip, limit)

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserResponse | undefined>()
  const [deletingUser, setDeletingUser] = useState<UserResponse | undefined>()

  const handleCreate = () => {
    setEditingUser(undefined)
    setIsFormOpen(true)
  }

  const handleEdit = (user: UserResponse) => {
    setEditingUser(user)
    setIsFormOpen(true)
  }

  const handleFormSubmit = (data: UserCreate | UserUpdate) => {
    if (editingUser) {
      updateUser(
        { id: editingUser.id, data: data as UserUpdate },
        { onSuccess: () => setIsFormOpen(false) },
      )
    } else {
      createUser(data as UserCreate, {
        onSuccess: () => setIsFormOpen(false),
      })
    }
  }

  const handleDelete = () => {
    if (deletingUser) {
      deleteUser(deletingUser.id, {
        onSuccess: () => setDeletingUser(undefined),
      })
    }
  }

  const totalPages = Math.max(1, Math.ceil(users.length < pageSize ? currentPage : currentPage + 1))

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Usuarios</h1>
          <p className="mt-1 text-sm text-gray-600">Gestion de usuarios del sistema</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
        >
          <PlusIcon className="h-4 w-4" />
          Nuevo Usuario
        </button>
      </div>

      {isLoading ? (
        <LoadingSpinner className="py-12" />
      ) : error ? (
        <ErrorMessage message="Error al cargar usuarios" />
      ) : (
        <>
          <UsersTable users={users} onEdit={handleEdit} onDelete={setDeletingUser} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
        </>
      )}

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
      >
        <UserForm
          user={editingUser}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
          isLoading={isCreating || isUpdating}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingUser}
        onClose={() => setDeletingUser(undefined)}
        onConfirm={handleDelete}
        title="Eliminar Usuario"
        message={`Estas seguro que deseas eliminar a ${deletingUser?.full_name}? Esta accion no se puede deshacer.`}
        isLoading={isDeleting}
      />
    </div>
  )
}
