<template>
  <div>
    <h1>Login with Firebase</h1>
    <button @click="login">Login with Google</button>
  </div>
</template>

<script setup>
import axios from 'axios'

function login() {
  axios.post('http://localhost:5000/auth/google').then(({ data }) => {
    window.open(data.url, '_self')
  })
}
</script>
