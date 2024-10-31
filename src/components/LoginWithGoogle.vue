<template>
  <div>
    <div v-if="!token">
      <h1>Login with Google</h1>
      <button @click="loginWithGoogle">Login</button>
    </div>
    <div v-else>
      <h2>Olá, {{ user.name }}!</h2>
      <p>E-mail: {{ user.email }}</p>
      <p>Telefone: {{ user.phone }}</p>

      <h3>Configuração de Assinatura de E-mail</h3>
      <form @submit.prevent="applySignature">
        <div>
          <label for="signature">Assinatura:</label>
          <textarea id="signature" v-model="signature" required></textarea>
        </div>
        <button type="submit">Aplicar Assinatura</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginWithGoogle',
  data() {
    return {
      token: null,
      user: {},
      signature: '',
    }
  },
  methods: {
    loginWithGoogle() {
      const clientId = 'YOUR_CLIENT_ID'
      const redirectUri = 'YOUR_REDIRECT_URI'
      const scopes =
        'https://www.googleapis.com/auth/gmail.modify profile email phone'

      const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scopes}&access_type=offline&prompt=consent`
      window.location.href = authUrl
    },
    async getUserInfo(accessToken) {
      try {
        const response = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        return response.data
      } catch (error) {
        console.error('Erro ao obter informações do usuário:', error)
        return null
      }
    },
    async applySignature() {
      const accessToken = this.token

      const userId = 'me'
      const signatureHTML = `
        <br>
        <hr>
        <div style="text-align: center;">
          <b>${this.user.name}</b><br>
          <p>${this.signature}</p>
        </div>
      `

      const requestBody = {
        signature: {
          htmlSignature: signatureHTML,
        },
      }

      try {
        const response = await axios.put(
          `https://gmail.googleapis.com/gmail/v1/users/${userId}/settings/signature`,
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
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
    // Obter o token de acesso e informações do usuário do URL após a autenticação
    const token = window.location.hash.match(/access_token=([^&]*)/)[1]
    if (token) {
      this.token = token
      this.getUserInfo(token)
        .then(user => {
          this.user = user
        })
        .catch(error => {
          console.error('Erro ao obter informações do usuário:', error)
        })
    }
  },
}
</script>
