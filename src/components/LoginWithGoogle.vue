<template>
  <div class="container">
    <h1>Assinaturas de Email para Gmail</h1>
    <p>
      Crie e aplique assinaturas profissionais para seu Gmail em minutos!
      Personalize com logo, informações de contato e links. Login rápido e
      seguro via Google. Experimente grátis!
    </p>
    <div style="margin: 20px">
      <button @click="login" :disabled="autheticating">
        Login with Google
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const autheticating = ref(false)

function login() {
  autheticating.value = true
  const url = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  axios
    .post(`${url}/auth/google`)
    .then(({ data }) => {
      window.open(data.url, '_self')
    })
    .catch(error => {
      console.log(error)
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
  width: 50vw;
  align-items: center;
}
button {
  cursor: pointer;
  padding: 10px 25px;
  border-radius: 20px;
}
</style>
