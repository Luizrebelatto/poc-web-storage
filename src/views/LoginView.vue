<template>
  <div class="page">
    <div class="card">
      <div class="login-form">
        <h1>Login</h1>
        <div class="input-group">
          <input 
            type="email" 
            v-model="email" 
            placeholder="Email"
            required
          />
        </div>
        <div class="input-group">
          <input 
            type="password" 
            v-model="password" 
            placeholder="Password"
            required
          />
        </div>
        <div v-if="error" class="error">
          {{ error }}
        </div>
        <button 
          class="login-btn" 
          @click="handleLogin"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

const storageTypes = [
  { label: 'LocalStorage', value: 'localStorage' },
  { label: 'SessionStorage', value: 'sessionStorage' },
  { label: 'IndexedDB', value: 'indexedDB' }
]

function changeStorage(type) {
  authStore.setStorageType(type)
}

function getStorageDescription() {
  switch (authStore.storageType) {
    case 'localStorage':
      return 'Data persists even after browser is closed'
    case 'sessionStorage':
      return 'Data is cleared when browser tab is closed'
    case 'indexedDB':
      return 'Large structured data storage'
    default:
      return ''
  }
}

async function handleLogin() {
  try {
    error.value = ''
    isLoading.value = true
    await authStore.login(email.value, password.value)
    router.push('/')
  } catch (err) {
    error.value = err.message || 'Failed to login'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
  padding: 20px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  overflow: hidden;
  margin: auto;
}

.storage-demo {
  background: #f8f9fa;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.storage-demo h2 {
  margin: 0 0 16px;
  font-size: 1.2rem;
  color: #1a1a1a;
}

.storage-types {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.storage-btn {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.storage-btn.active {
  background: #4a90e2;
  color: white;
  border-color: #4a90e2;
}

.storage-info {
  font-size: 0.9rem;
  color: #666;
  padding: 8px;
  background: white;
  border-radius: 6px;
}

.login-form {
  padding: 24px;
}

.login-form h1 {
  margin: 0 0 24px;
  font-size: 1.5rem;
  color: #1a1a1a;
}

.input-group {
  margin-bottom: 16px;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #4a90e2;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-btn:hover {
  background: #357abd;
}

.login-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.error {
  color: #dc3545;
  font-size: 0.9rem;
  margin: 8px 0 16px;
  padding: 8px;
  background: #fff5f5;
  border-radius: 4px;
}

.demo-credentials {
  margin-top: 24px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #666;
}

.demo-credentials p {
  margin: 4px 0;
}

.demo-credentials p:first-child {
  color: #1a1a1a;
  font-weight: 500;
  margin-bottom: 8px;
}
</style> 