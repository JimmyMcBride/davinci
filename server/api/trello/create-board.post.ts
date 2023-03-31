import populateProjectBoard from "~/server/utils/trello/populateProjectBoard"
import { decodeString } from "~/server/utils/encryption"
import { ProjectBoard } from "~/typings"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const projectBoard: ProjectBoard = body.boardData
  const token = decodeString(body.trelloToken).token
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
