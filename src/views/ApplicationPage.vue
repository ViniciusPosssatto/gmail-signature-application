<template>
  <main class="about">
    <ApplySignature />
  </main>
</template>
<script setup>
import ApplySignature from '@/components/ApplySignature.vue'
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 90vh;
    display: flex;
  }
}
</style>
