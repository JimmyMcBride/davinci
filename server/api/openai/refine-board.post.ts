import { openaiApi } from "~/server/utils/openai"
import { getProjectBoardFromRes } from "~/server/utils/openai/getProjectBoardFromRes"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const oldProjectBoard = JSON.stringify(body.oldProjectBoard)
    const refinementSpec = body.refinementSpec
    if (!oldProjectBoard || !refinementSpec) {
      setResponseStatus(400)
      return { error: "No project description provided." }
    }
    const response = await openaiApi(
      `The following is my project board: ${oldProjectBoard}. I would like to refine it by: ${refinementSpec} Respond in json format with object keys wrapped in double quotes with escape characters. Please generate a new project board according to the new specs.`
    )

    const projectBoardData = getProjectBoardFromRes(response, body.itemId)
    if (!projectBoardData) {
      setResponseStatus(400)
      return { error: "No project board data returned." }
    }
    return projectBoardData
  } catch (e) {
    console.error(e)
  }
})
