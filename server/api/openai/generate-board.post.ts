import { openaiApi } from "~/server/utils/openai"
import { getProjectBoardFromRes } from "~/server/utils/openai/getProjectBoardFromRes"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const projectDescription = body.projectDescription
    if (!projectDescription) {
      setResponseStatus(400)
      return { error: "No project description provided." }
    }
    const itemId = body.itemId
    if (!itemId) {
      setResponseStatus(400)
      return { error: "No item id provided." }
    }
    const response = await openaiApi(
      `I want to start a new project. I'm going to make a new Trello board with tasks to complete my project. Generate a name for my project. Take in the description of my project and generate a JSON that matches the following format:\n\ntype Project {\n  projectName: string,\n  ticketList: List of Ticket,\n}\ntype Ticket {\n  title: string,\n  scope: string,\n  acceptance criteria: List of string // one string per criteria\n  helpfulResources: List of string\n}\n\nRespond in json format (with properties wrapped in double quotes.\n\nPlease help me see my project to the finish line! Here's a description of my project:\n\n ${projectDescription}.`
    )
    const projectBoardData = getProjectBoardFromRes(response, body.itemId)
    if (!projectBoardData) {
      setResponseStatus(400)
    }
    return projectBoardData
  } catch (e) {
    console.error(e)
  }
})
