import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import type { PersonaResponse } from '@/domain/models/persona'

interface PersonaTableProps {
  personas: PersonaResponse[]
  onEdit: (persona: PersonaResponse) => void
  onDelete: (persona: PersonaResponse) => void
}

export function PersonaTable({ personas, onEdit, onDelete }: PersonaTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Documento
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Telefono
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Estado
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {personas.map((persona) => (
            <tr key={persona.id} className="hover:bg-gray-50">
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                {persona.nombre} {persona.apellido}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                {persona.tipo_documento}: {persona.numero_documento}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                {persona.email}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                {persona.telefono}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    persona.is_active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {persona.is_active ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(persona)}
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-primary-600"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(persona)}
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-600"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {personas.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500">
                No se encontraron personas
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
