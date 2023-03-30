<template>
  <h1>Success! 🚀</h1>
</template>

<script lang="ts" setup>
setTimeout(() => {
  navigateTo("/", { replace: true })
}, 3000)
</script>
