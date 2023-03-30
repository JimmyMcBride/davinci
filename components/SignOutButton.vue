<template>
  <MenuItem v-slot="{ active }">
    <button
      :class="[
        active ? 'bg-red-500 text-white' : 'text-red-700',
        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
      ]"
      @click="signOut"
    >
      Sign Out
    </button>
  </MenuItem>
</template>

<script lang="ts" setup>
import { MenuItem } from "@headlessui/vue"

async function signOut() {
  const { signOut } = useFirebase()
  await signOut()
}
</script>
