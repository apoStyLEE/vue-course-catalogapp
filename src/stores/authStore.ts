import authService from '@/services/authService'
import { defineStore } from 'pinia'

const user = await authService.getUser()
const isAuth = await authService.isAuth()

export const useAuthStore = defineStore('authStore', () => {
  const userId = user?.id
  const login = async (userName: string, password: string) => {
    return await authService.login(userName, password)
  }

  const logout = async () => {
    await authService.logout()
  }

  return {
    user,
    userId,
    isAuth,
    login,
    logout
  }
})
