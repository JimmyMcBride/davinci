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
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <TabGroup>
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  <TabList class="flex space-x-1 rounded-xl bg-violet-200/20 p-1">
                    <Tab key="login" v-slot="{ selected }" as="template">
                      <p
                        :class="[
                          'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-violet-500 text-center',
                          'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                          selected ? 'bg-white shadow' : 'text-gray-400 hover:bg-white/80 hover:text-violet-400',
                        ]"
                      >
                        Login
                      </p>
                    </Tab>
                    <Tab key="signup" v-slot="{ selected }" as="template">
                      <p
                        :class="[
                          'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-violet-500 text-center',
                          'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                          selected ? 'bg-white shadow' : 'text-gray-400 hover:bg-white/80 hover:text-violet-400',
                        ]"
                      >
                        Sign Up
                      </p>
                    </Tab>
                  </TabList>
                </DialogTitle>
                <TabPanels class="mt-2">
                  <TabPanel>
                    <LoginForm />
                  </TabPanel>
                  <TabPanel>
                    <RegisterForm />
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue"

const { isOpen, closeModal } = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  closeModal: {
    type: Function,
    required: true,
  },
})
</script>
