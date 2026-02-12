export interface PersonaResponse {
  id: number
  razon_social: string
  nombre_comercial: string
  email: string
  telefono: string | null
  direccion: string | null
  tipo_identificacion: string
  numero_identificacion: string
  limite_credito: number
  dias_credito: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface PersonaCreate {
  razon_social: string
  //apellido: string
  email: string
  telefono: string | null
  direccion: string | null
  tipo_identificacion: string
  numero_identificacion: string
}

export interface PersonaUpdate {
  razon_social?: string
  //apellido?: string
  email?: string
  telefono: string | null
  direccion: string | null
  tipo_identificacion?: string
  numero_identificacion?: string
  is_active?: boolean
}


export interface PersonaListResponse {
  personas:  PersonaResponse[],
  total: number,
  page: number,
  per_page: number,
}