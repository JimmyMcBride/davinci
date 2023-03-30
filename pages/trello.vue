<template>
  <h1>Congrats! You're Trello account has been linked! 🚀</h1>
</template>

<script lang="ts" setup>
if (process.client) {
  const { user } = useAuthState()

  const hash = window.location.hash
  const tokenMatch = hash.match(/#token=(.*)/)
  watchEffect(async () => {
    const userId = user.value?.uid
    const token = tokenMatch && tokenMatch[1]
    if (userId !== undefined && token) {
      try {
        await useFetch("/api/firestore/save-trello-token", {
          method: "POST",
          body: JSON.stringify({ userId, token }),
        })
        setTimeout(() => {
          navigateTo("/", { replace: true })
        }, 3000)
      } catch (error) {
        console.error(error)
      }
    }
  })
}
</script>
