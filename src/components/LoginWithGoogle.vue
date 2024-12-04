<template>
  <div>
    <h1>Login with Firebase</h1>
    <button @click="login">Login with Google</button>
  </div>
</template>

<script setup>
import axios from 'axios'

function login() {
  const localUrl = 'http://localhost:5000'
  const gcpUrl = 'https://gmail-signature-903229522808.us-central1.run.app'
  axios.post(`${gcpUrl}/auth/google`).then(({ data }) => {
    window.open(data.url, '_self')
  })
}
</script>
