<template>
  <div v-if="projectBoardLoading">
    <ArrowPathIcon class="animate-spin h-16 w-16 text-violet-500" />
  </div>
  <div v-if="projectBoardError">
    <p class="text-red-500">Error: {{ projectBoardError.message }}</p>
  </div>

  <div v-if="projectBoard" class="gap-4 flex flex-col items-center mb-20 max-w-2xl">
    <div class="flex justify-evenly w-full mt-4">
      <button v-if="projectBoard" class="blue-btn" @click="openModal">Refine Project Board</button>
      <button v-if="projectBoard" class="green-btn" @click="uploadBoardToTrello">
        <div v-if="trelloLoading">
          <ArrowPathIcon class="animate-spin h-4 w-4 text-violet-500" />
        </div>
        <div v-else-if="trelloSuccess === null">Upload To Trello</div>
        <div v-else-if="trelloSuccess === true">
          <CheckCircleIcon class="h-4 w-4 text-green-100" />
        </div>
        <div v-else-if="trelloSuccess === false">
          <XCircleIcon class="h-4 w-4 text-red-500" />
        </div>
      </button>
    </div>
    <h3 class="text-2xl">{{ projectBoard.projectName }}</h3>
    <div v-for="ticket in projectBoard.ticketList" class="card text-center w-full">
      <h5 class="text-xl">Title: {{ ticket.title }}</h5>
      <p>Scope: {{ ticket.scope }}</p>
      <strong class="font-bold">Acceptance Criteria:</strong>
      <ul v-for="ac in ticket.acceptanceCriteria" class="list-disc list-inside">
        <li>
          {{ ac }}
        </li>
      </ul>
      <strong class="font-bold">Helpful Resources:</strong>
      <ul v-for="resource in ticket.helpfulResources">
        <li>
          {{ resource }}
        </li>
      </ul>
    </div>
  </div>
  <RefineProjectBoardModal />
</template>
<script lang="ts" setup>
import { useProjectBoard } from "~/composables/useProjectBoard"
import { ArrowPathIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/vue/24/solid"
import { getCurrentUser } from "~/helpers/firestoreUtils"

const { projectBoard, projectBoardLoading, projectBoardError } = useProjectBoard()
const { openModal } = useModal("refineProjectBoardModal")

const trelloLoading = useState("trelloLoading", () => false)
const trelloSuccess = useState<boolean | null>("trelloSuccess", () => null)

async function uploadBoardToTrello() {
  trelloLoading.value = true
  try {
    const currentUser = await getCurrentUser()
    await useFetch("/api/trello/create-board", {
      method: "POST",
      body: JSON.stringify({
        boardData: projectBoard?.value,
        trelloToken: currentUser?.trelloToken,
      }),
    })
    trelloSuccess.value = true
    trelloLoading.value = false
    setTimeout(() => {
      trelloSuccess.value = null
    }, 3000)
  } catch (e) {
    trelloSuccess.value = false
    trelloLoading.value = false
    console.error(e)
    setTimeout(() => {
      trelloSuccess.value = null
    }, 3000)
  }
}
</script>
