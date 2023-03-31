<template>
  <div v-if="isAuthLoading">
    <ArrowPathIcon class="animate-spin h-6 w-6 text-violet-500" />
  </div>
  <button v-else-if="!isUserSignedIn" class="btn" @click="openModal">Login/Sign Up</button>
  <UserOptions v-else />
</template>

<script lang="ts" setup>
import { ArrowPathIcon } from "@heroicons/vue/24/solid"

const { openModal } = defineProps({
  openModal: {
    type: Function,
    required: true,
  },
})

const { isUserSignedIn, isAuthLoading } = useCurrentUser()
</script>
