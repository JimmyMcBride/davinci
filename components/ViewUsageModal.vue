<template>
  <TransitionRoot :show="isOpen" appear as="template">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all text-center"
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 pb-4">
                Your Current Usage
              </DialogTitle>

              <div class="w-full">
                <div v-if="userInvoiceLoading">
                  <ArrowPathIcon class="animate-spin h-16 w-16 text-violet-500" />
                </div>
                <div v-if="userInvoiceError">
                  <p>Error: {{ userInvoiceError }}</p>
                </div>
                <div v-if="userInvoiceData" class="flex flex-col mb-2 gap-4">
                  <div>Current Total Token Usage: {{ userInvoiceData.lines.data[0].quantity }}</div>
                  <div>Current Accumulated Cost: ${{ userInvoiceData.lines.data[0].amount / 100 }}</div>
                  <div>Billing Cycle Started: {{ unixTimestampToDateString(userInvoiceData.period_start) }}</div>
                  <div>Billing Cycle Ending: {{ unixTimestampToDateString(userInvoiceData.period_end) }}</div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue"
import { useUserInvoice } from "~/composables/useUserInvoice"

const { isOpen, closeModal } = useModal("viewUsageModal")
const { userInvoiceError, userInvoiceLoading, userInvoiceData } = useUserInvoice()

function unixTimestampToDateString(unixTimestamp: number) {
  const date = new Date(unixTimestamp * 1000)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const month = monthNames[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()

  return `${month} ${day}, ${year}`
}
</script>
