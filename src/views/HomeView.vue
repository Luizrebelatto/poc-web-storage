<template>
  <div class="home-container">
    <div class="home-content">
      <div class="welcome-section">
        <h1>Welcome, {{ authStore.user?.name || 'User' }}!</h1>
        <p class="subtitle">You are successfully logged in</p>
        <div class="storage-info">
          <p>Current Storage Type: <strong>{{ authStore.storageType }}</strong></p>
        </div>
      </div>
      
      <div class="actions">
        <button @click="handleLogout" class="logout-button">
          Sign Out
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.home-content {
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.welcome-section {
  margin-bottom: 2rem;
}

.welcome-section h1 {
  font-size: 2.5rem;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.storage-info {
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 1rem;
  margin: 1.5rem 0;
}

.storage-info p {
  color: #4a5568;
  font-size: 1rem;
}

.storage-info strong {
  color: #1a1a1a;
}

.actions {
  margin-top: 2rem;
}

.logout-button {
  background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  width: 100%;
}

.logout-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(229, 62, 62, 0.2);
}
</style> 