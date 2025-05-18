import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))

  const isAuthenticated = computed(() => !!token.value)

  function setToken(newToken) {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
  }

  async function login(email, password) {
    try {
      // In a real application, this would be an API call
      if (email === 'demo@example.com' && password === 'password') {
        const mockToken = 'mock-jwt-token'
        setToken(mockToken)
        user.value = { email, name: 'Demo User' }
        return true
      }
      throw new Error('Invalid credentials')
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  function logout() {
    user.value = null
    setToken(null)
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout
  }
}) 