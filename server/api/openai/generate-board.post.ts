import { openaiApi } from "~/server/utils/openai"
import { getProjectBoardFromRes } from "~/server/utils/openai/getProjectBoardFromRes"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const projectDescription = body.projectDescription
    const itemId = body.itemId
    console.log("projectDescription", projectDescription)
    console.log("itemId", itemId)
    const response = await openaiApi(
      `I want to start a new project. I'm going to make a new Trello board with tasks to complete my project. Generate a name for my project. Take in the description of my project and generate a JSON that matches the following format:\n\ntype Project {\n  projectName: string,\n  ticketList: List of Ticket,\n}\ntype Ticket {\n  title: string,\n  scope: string,\n  acceptanceCriteria: List of string // one string per criteria\n  helpfulResources: List of string\n}\n\nRespond in json format (with properties wrapped in double quotes.\n\nPlease help me see my project to the finish line! Here's a description of my project:\n\n ${projectDescription}.`
    )
    console.log("response status: ", response.status)
    const projectBoardData = await getProjectBoardFromRes(response, itemId)
    console.log("projectBoardData", projectBoardData)
    if (!projectBoardData) {
      event.node.res.statusCode = 400
      return null
    }
    console.log("****projectBoardData****")
    console.dir(projectBoardData)
    return projectBoardData as ProjectBoard
  } catch (e) {
    console.error(e)
    event.node.res.statusCode = 500
    return null
  }
})
