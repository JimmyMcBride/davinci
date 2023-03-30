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
                Refine Project Board
              </DialogTitle>

              <form class="flex flex-col items-center justify-center gap-4 w-full" @submit.prevent="refineBoard">
                <textarea
                  id="project-description"
                  v-model="refinement"
                  class="p-4 resize-none rounded-outline w-full"
                  name="project-description"
                  placeholder="Enter refinement here..."
                  rows="4"
                ></textarea>
                <button class="btn w-full" type="submit">Refine</button>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue"

const refinement = useState<string>("refine-project")

const { refineProjectBoard } = useProjectBoard()
const { isOpen, closeModal } = useModal("refineProjectBoardModal")

function refineBoard() {
  closeModal()
  refineProjectBoard(refinement.value)
}
</script>
