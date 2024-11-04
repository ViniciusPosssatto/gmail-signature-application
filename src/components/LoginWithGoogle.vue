<template>
  <div>
    <h1>Login with Firebase</h1>
    <button @click="signInWithGoogle">Login</button>
  </div>
</template>

<script setup>
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useGoogle } from '@/stores/google'

const googleStore = useGoogle()

async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  provider.addScope('profile')
  provider.addScope('email')
  const auth = getAuth()

  const { user } = await signInWithPopup(auth, provider)
  googleStore.googleUser = user
}
</script>
