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
import { useUserInvoice } from "~/composables/useUserInvoice"
import { getCurrentUser } from "~/helpers/firestoreUtils"

const { isOpen, closeModal, openModal } = useModal("authModal")
const { getUpcomingInvoice } = useUserInvoice()
const { isUserSignedIn } = useAuthState()

watchEffect(async () => {
  if (isUserSignedIn.value) {
    const currentUser = await getCurrentUser()
    if (currentUser?.customer) await getUpcomingInvoice(currentUser)
  }
})
</script>

<style scoped></style>
