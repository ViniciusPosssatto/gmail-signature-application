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

const signature = ref('')

async function applySignature() {
  const user = this.user
  const userId = user.uid

  const signatureHTML = `
      <br>
      <hr>
      <div style="text-align: center;">
        <b>${user.displayName}</b><br>
        <p>${this.signature}</p>
      </div>
    `

  const requestBody = {
    signature: {
      htmlSignature: signatureHTML,
    },
  }

  // Obtenha o token de ID do Firebase
  const token = await user.getIdToken()

  try {
    const response = await axios.put(
      `https://gmail.googleapis.com/gmail/v1/users/${userId}/settings/signature`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
