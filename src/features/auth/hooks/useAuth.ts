import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authApi } from '@/infrastructure/api/authApi'
import { useAuthStore } from '@/infrastructure/store/authStore'
import type { LoginRequest, RegisterRequest, PasswordRequest } from '@/domain/models/auth'
import toast from 'react-hot-toast'

export function useAuth() {
  const navigate = useNavigate()
  const { setAuth, setUser, logout, isAuthenticated, token } = useAuthStore()

  const meQuery = useQuery({
    queryKey: ['auth', 'me', 'password'],
    queryFn: authApi.getMe,
    enabled: isAuthenticated && !!token,
    retry: false,
    staleTime: 5 * 60 * 1000,
  })

  if (meQuery.data && !useAuthStore.getState().user) {
    setUser(meQuery.data)
  }

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: async (response) => {
      localStorage.setItem('access_token', response.access_token)
      const user = await authApi.getMe()
      setAuth(response.access_token, user)
      toast.success(`Bienvenido, ${user.full_name}`)
      navigate('/dashboard')
    },
    onError: () => {
      toast.error('Credenciales invalidas')
    },
  })

  const passwordMutation = useMutation({
    mutationFn: (data: PasswordRequest) => authApi.password(data),
    onSuccess: () => {
      toast.success('Contraseña actualizada exitosamente')
      navigate('/login')
    },
    onError: () => {
      toast.error('Error al actualizar contraseña')
    }
  })

  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: () => {
      toast.success('Usuario registrado exitosamente')
      navigate('/login')
    },
    onError: () => {
      toast.error('Error al registrar usuario')
    },
  })

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    password: passwordMutation.mutate,
    logout,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoadingUser: meQuery.isLoading,
    user: meQuery.data,
    isPasswording: passwordMutation.isPending
  }
}
