import type { Role } from '@/domain/enums/roles'

export interface LoginRequest {
  email: string
  password: string
}

export interface PasswordRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  full_name: string
  role?: Role
}

export interface AuthResponse {
  access_token: string
  token_type: string
}

export interface AuthUser {
  id: number
  email: string
  full_name: string
  role: Role
  is_active: boolean
}

