<template>
  <div>
    <div v-if="!user">
      <h1>Login with Firebase</h1>
      <button @click="signInWithGoogle">Login</button>
      <button @click="signOutUser">SignOut</button>
    </div>
  </div>
</template>

<script setup>
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { signOutUser, getCurrentUser } from '@/helpers/firebase'
import { ref } from 'vue'

const user = ref({})

async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  provider.addScope('profile')
  provider.addScope('email')
  const auth = getAuth()

  await signInWithPopup(auth, provider)
  user.value = getCurrentUser()
}
</script>
