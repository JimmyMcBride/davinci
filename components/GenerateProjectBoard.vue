<template>
  <form class="flex flex-col items-center justify-center gap-4 w-full" @submit.prevent="generateBoard">
    <button class="btn" type="submit">
      <div v-if="!projectBoard">Generate Project Board</div>
      <div v-else>Regenerate Project Board</div>
    </button>
    <textarea
      id="project-description"
      v-model="description"
      class="p-4 resize-none rounded-outline"
      cols="50"
      name="project-description"
      placeholder="Project description..."
      rows="4"
    ></textarea>
  </form>
</template>

<script lang="ts" setup>
import { useProjectBoard } from "~/composables/useProjectBoard"

const { generateProjectBoard, projectBoard } = useProjectBoard()
const description = useState<string>("project-description")

async function generateBoard() {
  await generateProjectBoard(description.value)
}
</script>
