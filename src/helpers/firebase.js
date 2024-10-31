import { initializeApp } from 'firebase/app'
import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth'
const VITE_AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN
const VITE_FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
}

export function initialApp() {
  initializeApp(firebaseConfig)
}

export async function getRedirectResults() {
  const auth = getAuth()
  const result = await getRedirectResult(auth)
  if (!result) return {}
  return {
    ...result,
    credentialsGoogle: GoogleAuthProvider.credentialFromResult(result),
  }
}

export async function getCurrentUser() {
  const auth = getAuth()
  if (!auth.currentUser) await getRedirectResult(auth)
  return auth.currentUser
}
export async function signOutUser() {
  const auth = getAuth()
  return await signOut(auth)
}
