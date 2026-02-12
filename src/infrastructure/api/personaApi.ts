import axiosClient from './axiosClient'
import type { PersonaResponse, PersonaCreate, PersonaUpdate } from '@/domain/models/persona'
import type { PaginationParams } from '@/domain/models/pagination'

export const personaApi = {
  list: async (params: PaginationParams & { search?: string }): Promise<PersonaResponse[]> => {
    const response = await axiosClient.get<PersonaResponse[]>('/persona', {
      params: { skip: params.skip, limit: params.limit, search: params.search },
    })
    return response.data
  },

  getById: async (id: number): Promise<PersonaResponse> => {
    const response = await axiosClient.get<PersonaResponse>(`/persona/${id}`)
    return response.data
  },

  create: async (data: PersonaCreate): Promise<PersonaResponse> => {
    const response = await axiosClient.post<PersonaResponse>('/persona', data)
    return response.data
  },

  update: async (id: number, data: PersonaUpdate): Promise<PersonaResponse> => {
    const response = await axiosClient.put<PersonaResponse>(`/persona/${id}`, data)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/persona/${id}`)
  },
}
