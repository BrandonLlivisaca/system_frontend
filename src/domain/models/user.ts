import type { Role } from '@/domain/enums/roles'

export interface UserResponse {
  id: number
  email: string
  full_name: string
  role: Role
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface UserCreate {
  email: string
  password: string
  full_name: string
  role: Role
}

export interface UserUpdate {
  email?: string
  password?: string
  full_name?: string
  role?: Role
  is_active?: boolean
}
