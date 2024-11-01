<template>
  <div class="about">
    <ApplySignature />
  </div>
</template>
<script setup>
import ApplySignature from '@/components/ApplySignature.vue'
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
