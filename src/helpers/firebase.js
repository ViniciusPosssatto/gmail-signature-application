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
  projectId: 'signature-aplication',
  storageBucket: 'signature-aplication.firebasestorage.app',
  messagingSenderId: '903229522808',
  appId: '1:903229522808:web:1cbf3d7321ed6703ff3e8d',
  measurementId: 'G-7J94G8Y4C6',
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

// import { getAnalytics } from 'firebase/analytics'
// const analytics = getAnalytics(app)
