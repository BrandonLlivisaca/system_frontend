export interface PersonaResponse {
  id: number
  nombre: string
  apellido: string
  email: string
  telefono: string
  direccion: string
  tipo_documento: string
  numero_documento: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface PersonaCreate {
  nombre: string
  apellido: string
  email: string
  telefono: string
  direccion: string
  tipo_documento: string
  numero_documento: string
}

export interface PersonaUpdate {
  nombre?: string
  apellido?: string
  email?: string
  telefono?: string
  direccion?: string
  tipo_documento?: string
  numero_documento?: string
  is_active?: boolean
}
