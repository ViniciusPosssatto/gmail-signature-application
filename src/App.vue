<template>
  <div id="app" style="display: flex; flex-direction: column">
    <RouterView />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  const gtoken = localStorage.getItem('gtoken')
  if (gtoken) router.push('/application')
})
</script>

<style>
button {
  cursor: pointer;
  padding: 10px 25px;
  border-radius: 20px;
}
</style>
