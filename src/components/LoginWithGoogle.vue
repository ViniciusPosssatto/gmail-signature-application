<template>
  <div class="container">
    <h1>Assinaturas de Email para Gmail</h1>
    <p>
      Crie e aplique assinaturas profissionais para seu Gmail em minutos!
      Personalize com logo, informações de contato e links. Login rápido e
      seguro via Google. Experimente grátis!
    </p>
    <div class="button-container">
      <button @click="login" :disabled="autheticating" class="google-button">
        <img :src="googleImg" alt="Google logo" class="google-icon" />
        Login with Google
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

import logo from '@/assets/google_icon.png'

const autheticating = ref(false)

const googleImg = logo

function login() {
  autheticating.value = true
  const url = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  axios
    .post(`${url}/auth/google`)
    .then(({ data }) => {
      console.log(data)
      window.open(data.url, '_self')
    })
    .catch(error => {
      console.error('Erro ao autenticar com Google:', error)
    })
    .finally(() => {
      autheticating.value = false
    })
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  text-align: center;
  padding: 40px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 40px auto;
}

h1 {
  color: #343a40;
  margin-bottom: 15px;
}

p {
  color: #6c757d;
  margin-bottom: 30px;
  line-height: 1.6;
}

.button-container {
  margin-top: 20px;
}

.google-button {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: 12px 25px;
  border-radius: 25px;
  border: 1px solid #dadce0;
  background-color: #ffffff;
  color: #3c4043;
  font-size: 16px;
  font-weight: 500;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;
}

.google-button:hover:not(:disabled) {
  background-color: #f8f9fa;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.google-button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.google-icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
</style>
