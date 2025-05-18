import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Helper functions for different storage types
const storageHelpers = {
  // LocalStorage - persists even after browser is closed
  localStorage: {
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    get: (key) => {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : null
    },
    remove: (key) => localStorage.removeItem(key)
  },
  
  // SessionStorage - persists only for the current session
  sessionStorage: {
    set: (key, value) => sessionStorage.setItem(key, JSON.stringify(value)),
    get: (key) => {
      const value = sessionStorage.getItem(key)
      return value ? JSON.parse(value) : null
    },
    remove: (key) => sessionStorage.removeItem(key)
  },
  
  // IndexedDB - for larger amounts of structured data
  indexedDB: {
    dbName: 'AuthDB',
    storeName: 'auth',
    async init() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, 1)
        
        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve(request.result)
        
        request.onupgradeneeded = (event) => {
          const db = event.target.result
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName)
          }
        }
      })
    },
    
    async set(key, value) {
      const db = await this.init()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(this.storeName, 'readwrite')
        const store = transaction.objectStore(this.storeName)
        const request = store.put(value, key)
        
        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)
      })
    },
    
    async get(key) {
      const db = await this.init()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(this.storeName, 'readonly')
        const store = transaction.objectStore(this.storeName)
        const request = store.get(key)
        
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
      })
    },
    
    async remove(key) {
      const db = await this.init()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(this.storeName, 'readwrite')
        const store = transaction.objectStore(this.storeName)
        const request = store.delete(key)
        
        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)
      })
    }
  }
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const storageType = ref('localStorage') // Can be 'localStorage', 'sessionStorage', or 'indexedDB'

  const isAuthenticated = computed(() => !!token.value)

  async function setToken(newToken) {
    token.value = newToken
    if (newToken) {
      switch (storageType.value) {
        case 'localStorage':
          storageHelpers.localStorage.set('token', newToken)
          break
        case 'sessionStorage':
          storageHelpers.sessionStorage.set('token', newToken)
          break
        case 'indexedDB':
          await storageHelpers.indexedDB.set('token', newToken)
          break
      }
    } else {
      switch (storageType.value) {
        case 'localStorage':
          storageHelpers.localStorage.remove('token')
          break
        case 'sessionStorage':
          storageHelpers.sessionStorage.remove('token')
          break
        case 'indexedDB':
          await storageHelpers.indexedDB.remove('token')
          break
      }
    }
  }

  async function initializeAuth() {
    let storedToken = null
    switch (storageType.value) {
      case 'localStorage':
        storedToken = storageHelpers.localStorage.get('token')
        break
      case 'sessionStorage':
        storedToken = storageHelpers.sessionStorage.get('token')
        break
      case 'indexedDB':
        storedToken = await storageHelpers.indexedDB.get('token')
        break
    }
    
    if (storedToken) {
      token.value = storedToken
      user.value = { email: 'test@test.com', name: 'Test User' }
    }
  }

  async function login(email, password) {
    try {
      if (email === 'test@test.com' && password === '123456') {
        const mockToken = 'mock-jwt-token'
        await setToken(mockToken)
        user.value = { email, name: 'Test User' }
        return true
      }
      throw new Error('Invalid credentials')
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  async function logout() {
    user.value = null
    await setToken(null)
  }

  function setStorageType(type) {
    storageType.value = type
    // Re-initialize auth with new storage type
    initializeAuth()
  }

  // Initialize auth state when store is created
  initializeAuth()

  return {
    user,
    token,
    isAuthenticated,
    storageType,
    login,
    logout,
    setStorageType
  }
}) 