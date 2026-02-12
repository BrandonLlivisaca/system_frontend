import axiosClient from './axiosClient'
import type { UserResponse, UserCreate, UserUpdate } from '@/domain/models/user'
import type { PaginationParams } from '@/domain/models/pagination'

export const usersApi = {
  list: async (params: PaginationParams): Promise<UserResponse[]> => {
    const response = await axiosClient.get<UserResponse[]>('/users', {
      params: { skip: params.skip, limit: params.limit },
    })
    return response.data
  },

  getById: async (id: number): Promise<UserResponse> => {
    const response = await axiosClient.get<UserResponse>(`/users/${id}`)
    return response.data
  },

  create: async (data: UserCreate): Promise<UserResponse> => {
    const response = await axiosClient.post<UserResponse>('/users', data)
    return response.data
  },

  update: async (id: number, data: UserUpdate): Promise<UserResponse> => {
    const response = await axiosClient.put<UserResponse>(`/users/${id}`, data)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/users/${id}`)
  },
}
