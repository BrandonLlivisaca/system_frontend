import { useState } from 'react'
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { usePersona } from '../hooks/usePersona'
import { PersonaTable } from '../components/PersonaTable'
import { PersonaForm } from '../components/PersonaForm'
import { Modal } from '@/shared/components/Modal'
import { ConfirmDialog } from '@/shared/components/ConfirmDialog'
import { Pagination } from '@/shared/components/Pagination'
import { LoadingSpinner } from '@/shared/components/LoadingSpinner'
import { ErrorMessage } from '@/shared/components/ErrorMessage'
import { usePagination } from '@/shared/hooks/usePagination'
import type { PersonaResponse, PersonaCreate, PersonaUpdate } from '@/domain/models/persona'

export function PersonaPage() {
  const { currentPage, pageSize, goToPage, reset } = usePagination()
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const {
    personas,
    total,
    isLoading,
    error,
    createPersona,
    updatePersona,
    deletePersona,
    isCreating,
    isUpdating,
    isDeleting,
  } = usePersona(currentPage, pageSize, search || undefined)

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingPersona, setEditingPersona] = useState<PersonaResponse | undefined>()
  const [deletingPersona, setDeletingPersona] = useState<PersonaResponse | undefined>()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchInput)
    reset()
  }

  const handleCreate = () => {
    setEditingPersona(undefined)
    setIsFormOpen(true)
  }

  const handleEdit = (persona: PersonaResponse) => {
    setEditingPersona(persona)
    setIsFormOpen(true)
  }

  const handleFormSubmit = (data: PersonaCreate | PersonaUpdate) => {
    if (editingPersona) {
      updatePersona(
        { id: editingPersona.id, data: data as PersonaUpdate },
        { onSuccess: () => setIsFormOpen(false) },
      )
    } else {
      createPersona(data as PersonaCreate, {
        onSuccess: () => setIsFormOpen(false),
      })
    }
  }

  const handleDelete = () => {
    if (deletingPersona) {
      deletePersona(deletingPersona.id, {
        onSuccess: () => setDeletingPersona(undefined),
      })
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Personas</h1>
          <p className="mt-1 text-sm text-gray-600">Gestion de personas del sistema</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
        >
          <PlusIcon className="h-4 w-4" />
          Nueva Persona
        </button>
      </div>

      <form onSubmit={handleSearch} className="mb-4">
        <div className="relative max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Buscar por nombre, documento..."
            className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
      </form>

      {isLoading ? (
        <LoadingSpinner className="py-12" />
      ) : error ? (
        <ErrorMessage message="Error al cargar personas" />
      ) : (
        <>
          <PersonaTable personas={personas} onEdit={handleEdit} onDelete={setDeletingPersona} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
        </>
      )}

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingPersona ? 'Editar Persona' : 'Nueva Persona'}
      >
        <PersonaForm
          persona={editingPersona}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
          isLoading={isCreating || isUpdating}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingPersona}
        onClose={() => setDeletingPersona(undefined)}
        onConfirm={handleDelete}
        title="Eliminar Persona"
        message={`Estas seguro que deseas eliminar a ${deletingPersona?.razon_social}? Esta accion no se puede deshacer.`}
        isLoading={isDeleting}
      />
    </div>
  )
}
