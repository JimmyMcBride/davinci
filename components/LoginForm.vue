<template>
  <section class="container mx-auto text-gray-400">
    <form class="bg-opacity-50 mx-auto flex w-full flex-col rounded-lg p-8" @submit.prevent="submitForm">
      <h2 class="mb-5 text-lg font-medium text-violet-500 text-center">Login</h2>
      <!-- Email input -->
      <div class="relative mb-4">
        <label class="text-sm leading-7 text-gray-800" for="email">Email</label>
        <div class="relative">
          <input id="email" v-model="formData.email" class="input" name="email" placeholder="Email..." type="text" />
        </div>
      </div>
      <!-- Password input -->
      <div class="relative mb-4">
        <label class="text-sm leading-7 text-gray-800" for="password">Password</label>
        <div class="relative">
          <input
            id="password"
            v-model="formData.password"
            class="input"
            name="password"
            placeholder="Password..."
            type="password"
          />
        </div>
      </div>
      <button
        class="rounded border-0 bg-violet-600 py-2 px-8 font-bold text-violet-100 transition-colors duration-500 hover:bg-blue-600 focus:outline-none mb-4"
        type="submit"
      >
        Submit
      </button>
      <button
        class="rounded border-0 bg-blue-600 py-2 px-8 font-bold text-violet-100 transition-colors duration-500 hover:bg-blue-600 focus:outline-none"
        @click="googleRegistration"
      >
        Sign in with Google
      </button>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { useFirebase } from "~/composables/useFirebase"
import { signInWithEmailAndPassword } from "@firebase/auth"

const { auth, googleSignIn } = useFirebase()
const { closeModal } = useModal("authModal")

const emailSignIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    closeModal()
  } catch (error) {
    console.error(error)
  }
}

const googleRegistration = async () => {
  try {
    await googleSignIn()
    closeModal()
    window.location.reload()
  } catch (error) {
    console.error(error)
    window.location.reload()
  }
}

const formData = reactive({
  email: "",
  password: "",
})

const submitForm = async () => {
  await emailSignIn(formData.email, formData.password)
  window.location.reload()
}
</script>

<style scoped></style>
