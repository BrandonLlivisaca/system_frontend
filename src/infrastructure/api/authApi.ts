import axiosClient from './axiosClient'
import type { LoginRequest, RegisterRequest, AuthResponse, AuthUser, PasswordRequest } from '@/domain/models/auth'

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const formData = new URLSearchParams()
    formData.append('email', data.email)
    formData.append('password', data.password)

    const response = await axiosClient.post<AuthResponse>(
      '/auth/login',
      data
    )
    return response.data
  },  

  register: async (data: RegisterRequest): Promise<AuthUser> => {
    const response = await axiosClient.post<AuthUser>('/auth/register', data)
    return response.data
  },

  password: async (data: PasswordRequest): Promise<AuthUser> => {
    const response = await axiosClient.put<AuthUser>('/auth/password', data)
    return response.data
  },

  getMe: async (): Promise<AuthUser> => {
    const response = await axiosClient.get<AuthUser>('/auth/me')
    return response.data
  },
}
