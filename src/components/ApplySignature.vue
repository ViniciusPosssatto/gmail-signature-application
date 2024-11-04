<template>
  <div>
    <!-- <h2>Olá, {{ user.displayName }}!</h2>
    <p>E-mail: {{ user.email }}</p> -->

    <h3>Configuração de Assinatura de E-mail</h3>
    <form @submit.prevent="applySignature">
      <div>
        <label for="signature">Assinatura:</label>
        <textarea id="signature" v-model="signature" required></textarea>
      </div>
      <button type="submit">Aplicar Assinatura</button>
    </form>
    <button @click="signOutUser">Logout</button>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { signOutUser } from '@/helpers/firebase'
import { useGoogle } from '@/stores/google'

const googleStore = useGoogle()
const signature = ref('')

async function applySignature() {
  const { email, accessToken, displayName, phoneNumber, photoURL, uid } =
    googleStore.googleUser

  const signatureHTML = `
      <br>
      <hr>
      <div style="text-align: center;">
        <img src="${photoURL}"></img><br>
        <b>${displayName}</b><br>
        <b>${email}</b><br>
        <b>${phoneNumber}</b><br>
        <p>${signature.value}</p>
      </div>
    `

  const requestBody = {
    signature: signatureHTML,
    user_id: uid,
    access_token: accessToken,
  }

  try {
    const response = await axios.post(
      `http://localhost:5000/apply_signature`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.status === 200) {
      alert('Assinatura aplicada com sucesso!')
    } else {
      alert('Erro ao aplicar assinatura:', response.status)
    }
  } catch (error) {
    console.error('Erro:', error)
    alert('Erro:', error.message)
  }
}
</script>
