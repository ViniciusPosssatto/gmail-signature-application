<template>
  <div>
    <div v-if="!user">
      <h1>Login with Firebase</h1>
      <button @click="signInWithGoogle">Login</button>
    </div>
    <div v-else>
      <h2>Olá, {{ user.displayName }}!</h2>
      <p>E-mail: {{ user.email }}</p>

      <h3>Configuração de Assinatura de E-mail</h3>
      <form @submit.prevent="applySignature">
        <div>
          <label for="signature">Assinatura:</label>
          <textarea id="signature" v-model="signature" required></textarea>
        </div>
        <button type="submit">Aplicar Assinatura</button>
      </form>
    </div>
    <button @click="signOutUser">SignOut</button>
  </div>
</template>

<script>
import axios from 'axios'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { signOutUser, getCurrentUser } from '@/helpers/firebase'

export default {
  name: 'ApplySignature',
  data() {
    return {
      user: null,
      signature: '',
    }
  },
  computed: {},
  methods: {
    signOutUser,
    getCurrentUser,
    async signInWithGoogle() {
      const provider = new GoogleAuthProvider()
      provider.addScope('profile')
      provider.addScope('email')
      const auth = getAuth()

      await signInWithPopup(auth, provider)
      this.user = this.getCurrentUser()
    },
    async applySignature() {
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
      const token = await this.user.getIdToken()
      console.log('Token de ID:', token)

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
    },
  },
  mounted() {
    // Verifique se o usuário já está autenticado
    const auth = getAuth()
    auth.onAuthStateChanged(user => {
      this.user = user
    })
  },
}
</script>
