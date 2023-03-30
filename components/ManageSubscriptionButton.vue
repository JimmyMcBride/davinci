<template>
  <MenuItem v-slot="{ active }">
    <button
      :class="[
        active ? 'bg-violet-500 text-white' : 'text-gray-900',
        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
      ]"
      @click="redirectToStripePortal"
    >
      Manage Subscription
    </button>
  </MenuItem>
</template>

<script lang="ts" setup>
import { MenuItem } from "@headlessui/vue"
import { getCurrentUser } from "~/helpers/firestoreUtils"

const redirectToStripePortal = async () => {
  try {
    const currentUser = await getCurrentUser()
    const { data } = await useFetch("/api/stripe/portal-session", {
      method: "POST",
      body: JSON.stringify({
        baseUrl: window.location.origin,
        customer: currentUser?.customer,
      }),
    })
    navigateTo(data.value?.redirectUrl, {
      external: true,
    })
  } catch (error) {
    console.error(error)
  }
}
</script>
