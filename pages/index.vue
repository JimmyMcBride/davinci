<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <div v-if="loading">
      <ArrowPathIcon class="animate-spin h-16 w-16 text-violet-500" />
    </div>
    <div v-else-if="!currentUser">
      <p>Promote the product here!</p>
    </div>
    <div v-else>
      <div v-if="currentUser?.trelloToken && currentUser?.customer" class="flex justify-center">
        <GenerateProjectBoard />
        <ProjectBoardDisplay />
      </div>
      <div v-else class="flex flex-col items-center gap-4">
        <div class="text-2xl font-bold">Almost there!</div>
        <div v-if="currentUser?.trelloToken === undefined">
          <button class="btn" @click="redirectToConnectTrello">Connect your Trello Account!</button>
        </div>
        <div v-if="currentUser?.customer === undefined">
          <button class="btn" @click="redirectToStripeCheckout">Setup your subscription!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentUser } from "~/helpers/firestoreUtils"
import { CurrentUser } from "~/typings"
import { redirectToConnectTrello } from "~/helpers/redirectToConnectTrello"
import { redirectToStripeCheckout } from "~/helpers/redirectToStripeCheckout"
import { ArrowPathIcon } from "@heroicons/vue/24/solid"

const { isUserSignedIn } = useAuthState()
const currentUser = useState<CurrentUser | null>("currentUser", () => null)
const loading = useState("loading", () => true)

watchEffect(async () => {
  if (isUserSignedIn.value) {
    loading.value = true
    currentUser.value = await getCurrentUser()
    loading.value = false
  } else {
    currentUser.value = null
    loading.value = false
  }
})
definePageMeta({
  title: "Home",
})
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
  font-size: 36px;
}

p {
  margin: 20px 0;
}
</style>
