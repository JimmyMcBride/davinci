import { ProjectBoard } from "~/typings"
import { getCurrentUser } from "~/helpers/firestoreUtils"

export const useProjectBoard = () => {
  const projectBoard = useState<ProjectBoard | null>("projectBoard", () => null)
  const projectBoardLoading = useState<boolean>("projectBoardLoading", () => false)
  const projectBoardError = useState<Error | null>("projectBoardError", () => null)

  async function generateProjectBoard(projectDescription: string) {
    const currentUser = await getCurrentUser()
    projectBoardLoading.value = true
    try {
      const { data } = await useFetch("/api/openai/generate-board", {
        method: "POST",
        body: JSON.stringify({
          projectDescription: projectDescription,
          itemId: currentUser?.itemId,
        }),
      })
      projectBoardLoading.value = false
      projectBoard.value = data.value
    } catch (error) {
      projectBoardLoading.value = false
      projectBoardError.value = error as Error
      console.error(error)
    }
  }

  async function refineProjectBoard(refinement: string) {
    const currentUser = await getCurrentUser()
    projectBoardLoading.value = true
    const oldProjectBoard = projectBoard.value
    projectBoard.value = null
    try {
      const { data } = await useFetch("/api/openai/refine-board", {
        method: "POST",
        body: JSON.stringify({
          oldProjectBoard,
          refinementSpec: refinement,
          itemId: currentUser?.itemId,
        }),
      })
      projectBoardLoading.value = false
      projectBoard.value = data.value
    } catch (error) {
      projectBoardLoading.value = false
      projectBoardError.value = error as Error
      console.error(error)
    }
  }

  return {
    projectBoard: computed(() => projectBoard.value),
    projectBoardLoading: computed(() => projectBoardLoading.value),
    projectBoardError: computed(() => projectBoardError.value),
    generateProjectBoard,
    refineProjectBoard,
  }
}