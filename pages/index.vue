<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <div v-if="isAuthLoading">
      <ArrowPathIcon class="animate-spin h-16 w-16 text-violet-500" />
    </div>
    <div v-else-if="!currentUser">
      <p>Promote the product here!</p>
    </div>
    <div v-else>
      <div
        v-if="
          currentUser?.trelloToken &&
          currentUser?.customer &&
          currentUser?.status !== 'delinquent' &&
          currentUser?.status !== 'cancelled'
        "
        class="flex flex-col items-center"
      >
        <GenerateProjectBoard />
        <ProjectBoardDisplay />
      </div>
      <div v-else-if="currentUser?.status === 'delinquent'" class="flex flex-col items-center">
        <div class="text-2xl font-bold">Oh, no! Your payment failed!</div>
        <button class="btn" @click="redirectToStripeCheckout">Setup your subscription!</button>
      </div>
      <div v-else-if="currentUser?.status === 'canceled'" class="flex flex-col items-center">
        <div class="text-2xl font-bold">Your subscription has been cancelled!</div>
        <button class="btn" @click="redirectToStripeCheckout">Get your subscription going again!</button>
      </div>
      <div v-else class="flex flex-col items-center gap-4">
        <div class="text-2xl font-bold">Almost there!</div>
        <div v-if="currentUser?.customer === undefined">
          <button class="btn" @click="redirectToStripeCheckout">Setup your subscription!</button>
        </div>
        <div v-if="currentUser?.trelloToken === undefined">
          <button class="btn" @click="redirectToConnectTrello">Connect your Trello Account!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { redirectToConnectTrello } from "~/helpers/redirectToConnectTrello"
import { redirectToStripeCheckout } from "~/helpers/redirectToStripeCheckout"
import { ArrowPathIcon } from "@heroicons/vue/24/solid"

const { isUserSignedIn, currentUser, isAuthLoading } = useCurrentUser()

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
