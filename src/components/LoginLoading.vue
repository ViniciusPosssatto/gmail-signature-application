<template>
  <div class="loading-container">
    <div class="spinner"></div>
    <p>Autenticando com Google...</p>
    <p>Redirecionando para a aplicação em {{ countdown }} segundos...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const countdown = ref(5)
let timer = null
let redirectTimer = null

onMounted(() => {
  // Capture token from URL
  const token = route.query.token
  if (token) {
    localStorage.setItem('authToken', token)
    // Optional: Remove token from URL without reloading page
    window.history.replaceState({}, document.title, route.path)
  } else {
    console.error('Token não encontrado na URL.')
    // If no token, redirect to login
    router.push({ name: 'Login' })
    return
  }

  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    }
  }, 1000)

  redirectTimer = setTimeout(() => {
    router.push({ name: 'ApplicationPage' })
  }, 5000)
})

onUnmounted(() => {
  // Clear timers when component is destroyed
  // (e.g., if user navigates away manually before 5s)
  clearInterval(timer)
  clearTimeout(redirectTimer)
})
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  padding: 20px;
  color: #6c757d;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #09f;
  margin-bottom: 20px;
  animation: spin 1s ease infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

p {
  margin: 5px 0;
}
</style>
