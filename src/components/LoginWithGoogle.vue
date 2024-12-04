<template>
  <div>
    <h1>Login with Firebase</h1>
    <button @click="login">Login with Google</button>
  </div>
</template>

<script setup>
import axios from 'axios'

function login() {
  const url = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  axios.post(`${url}/auth/google`).then(({ data }) => {
    window.open(data.url, '_self').catch(error => {
      console.log(error)
    })
  })
}
</script>
