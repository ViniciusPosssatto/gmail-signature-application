<template>
  <div class="loading-container">
    <div class="spinner"></div>
    <p>Acesso não autorizado ou página não encontrada.</p>
    <p>Redirecionando para o login em {{ countdown }} segundos...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const countdown = ref(5)
let timer = null
let redirectTimer = null

onMounted(() => {
  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    }
  }, 1000)

  redirectTimer = setTimeout(() => {
    router.push({ name: 'Login' })
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
