<template>
  <section class="container mx-auto text-gray-400">
    <form class="bg-opacity-50 mx-auto flex w-full flex-col rounded-lg p-8" @submit.prevent="submitForm">
      <h2 class="mb-5 text-lg font-medium text-violet-500 text-center">Register</h2>
      <!-- Email input -->
      <div class="relative mb-4">
        <label class="text-sm leading-7 text-gray-800" for="email">Email</label>
        <div class="relative">
          <input
            id="email"
            v-model="formData.email"
            :class="{
              'border-red-500 focus:border-red-500': v$.email.$error,
              'border-[#42d392] ': !v$.email.$invalid,
            }"
            class="input"
            name="email"
            placeholder="e.g. example@email.com"
            type="text"
            @change="v$.email.$touch"
          />
          <ExclamationTriangleIcon v-if="v$.email.$error" class="h-5 w-5 text-amber-500 absolute right-2 top-2.5" />
          <CheckCircleIcon v-if="!v$.email.$invalid" class="h-5 w-5 text-violet-500 absolute right-2 top-2.5" />
        </div>
        <div v-if="v$.email.$error">
          <p v-if="v$.email.required.$invalid">{{ v$.email.required.$message }}</p>
          <p v-else-if="v$.email.email.$invalid">{{ v$.email.email.$message }}</p>
        </div>
      </div>
      <!-- Password input -->
      <div class="relative mb-4">
        <label class="text-sm leading-7 text-gray-800" for="password">Password</label>
        <div class="relative">
          <input
            id="password"
            v-model="formData.password"
            :class="{
              'border-red-500 focus:border-red-500': v$.password.$error,
              'border-[#42d392] ': !v$.password.$invalid,
            }"
            class="input"
            name="password"
            type="password"
            @change="v$.password.$touch"
          />
          <ExclamationTriangleIcon v-if="v$.password.$error" class="h-5 w-5 text-amber-500 absolute right-2 top-2.5" />
          <CheckCircleIcon v-if="!v$.password.$invalid" class="h-5 w-5 text-violet-500 absolute right-2 top-2.5" />
        </div>
        <div v-if="v$.password.$error">
          <p v-if="v$.password.required.$invalid">{{ v$.password.required.$message }}</p>
          <p v-else-if="v$.password.minLength.$invalid">{{ v$.password.minLength.$message }}</p>
        </div>
      </div>
      <!-- Confirm Password input -->
      <div class="relative mb-4">
        <label class="text-sm leading-7 text-gray-800" for="confirmPassword">Confirm password</label>
        <div class="relative">
          <input
            id="confirmPassword"
            v-model="formData.confirmPassword"
            :class="{
              'border-red-500 focus:border-red-500': v$.confirmPassword.$error,
              'border-[#42d392] ': !v$.confirmPassword.$invalid,
            }"
            class="input"
            name="confirmPassword"
            type="password"
            @change="v$.confirmPassword.$touch"
          />
          <ExclamationTriangleIcon
            v-if="v$.confirmPassword.$error"
            class="h-5 w-5 text-amber-500 absolute right-2 top-2.5"
          />
          <CheckCircleIcon
            v-if="!v$.confirmPassword.$invalid"
            class="h-5 w-5 text-violet-500 absolute right-2 top-2.5"
          />
        </div>
        <div v-if="v$.confirmPassword.$error">
          <p v-if="v$.confirmPassword.required.$invalid">{{ v$.confirmPassword.required.$message }}</p>
          <p v-else-if="v$.confirmPassword.sameAs.$invalid">{{ v$.confirmPassword.sameAs.$message }}</p>
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
        Sign up with Google
      </button>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { email, helpers, minLength, required, sameAs } from "@vuelidate/validators"
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/vue/24/solid"
import useVuelidate from "@vuelidate/core"
import { useFirebase } from "~/composables/useFirebase"
import { createUserWithEmailAndPassword } from "@firebase/auth"
import { addUserDataIfNotExists } from "~/helpers/firestoreUtils"

const { auth, firestore, googleSignIn } = useFirebase()
const { closeModal } = useModal("authModal")

const emailRegistration = async (email: string, password: string) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    await addUserDataIfNotExists(firestore, user)
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
  confirmPassword: null,
})

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("The email field is required", required),
      email: helpers.withMessage("Invalid email format", email),
    },
    password: {
      required: helpers.withMessage("The password field is required", required),
      minLength: minLength(6),
    },
    confirmPassword: {
      required: helpers.withMessage("The password confirmation field is required", required),
      sameAs: helpers.withMessage("Passwords don't match", sameAs(formData.password)),
    },
  }
})

const v$ = useVuelidate(rules, formData)

const submitForm = async () => {
  await v$.value.$validate()
  if (!v$.value.$error) {
    await emailRegistration(formData.email, formData.password)
    window.location.reload()
  }
}
</script>

<style scoped></style>
