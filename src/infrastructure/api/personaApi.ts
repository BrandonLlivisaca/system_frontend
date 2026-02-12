import axiosClient from './axiosClient'
import type { PersonaResponse, PersonaCreate, PersonaUpdate, PersonaListResponse } from '@/domain/models/persona'


export const personaApi = {
  getAll: async (page = 1, perPage = 10): Promise<PersonaListResponse> => {
    const skip = (page - 1) * perPage

    const response = await axiosClient.get<PersonaListResponse>(
      `/persona?skip=${skip}&limit=${perPage}`
    )

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
