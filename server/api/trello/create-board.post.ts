import populateProjectBoard from "~/server/utils/trello/populateProjectBoard"
import { decodeString } from "~/server/utils/encryption"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const projectBoard: ProjectBoard = body.boardData
  const token = decodeString(body.trelloToken).toString()
  console.log("decoded token: ", token)
  try {
    await populateProjectBoard(projectBoard, token)
    event.node.res.statusCode = 200
    return event.node.res.end()
  } catch (error) {
    console.error(error)
    event.node.res.statusCode = 500
    return event.node.res.end()
  }
})
