<template>
  <h1>Congrats! You're Trello account has been linked! 🚀</h1>
</template>

<script lang="ts" setup>
const { currentUser } = useCurrentUser()

if (process.client) {
  const hash = window.location.hash
  const tokenMatch = hash.match(/#token=(.*)/)
  watchEffect(async () => {
    const userId = currentUser.value?.uid
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
