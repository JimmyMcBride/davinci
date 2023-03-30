<template>
  <MenuItem v-slot="{ active }">
    <button
      :class="[
        active ? 'bg-violet-500 text-white' : 'text-gray-900',
        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
      ]"
      @click="redirectToConnectTrello"
    >
      Connect Trello
    </button>
  </MenuItem>
</template>
<script lang="ts" setup>
import { redirectToConnectTrello } from "~/helpers/redirectToConnectTrello"
</script>
