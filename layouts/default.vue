<template>
  <header class="relative shadow-sm bg-white w-full">
    <nav class="relative container mx-auto p-4 flex justify-between items-center h-16">
      <NuxtLink class="font-bold flex items-center" to="/">DaVinci</NuxtLink>
      <NavAuthenticationComponent :open-modal="openModal" />
    </nav>
  </header>
  <AuthModal :close-modal="closeModal" :is-open="isOpen" />
  <div class="container mx-auto pt-4">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useModal } from "@/composables/useModal"

const { isOpen, closeModal, openModal } = useModal("authModal")
const { getUpcomingInvoice } = useUserInvoice()
const { currentUser, isUserSignedIn } = useCurrentUser()

watchEffect(async () => {
  if (isUserSignedIn.value) {
    if (currentUser.value?.customer) await getUpcomingInvoice(currentUser.value)
  }
})
</script>

<style scoped></style>
