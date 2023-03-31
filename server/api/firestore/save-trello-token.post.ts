import { firestore } from "~/server/utils/firebase"
import { encodeString } from "~/server/utils/encryption"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const token = body.token
  const userId = body.userId
  const userRef = firestore.doc(`users/${userId}`)
  const encodedToken = encodeString(token)
  try {
    await userRef.set({ trelloToken: encodedToken }, { merge: true })
    return { success: true }
  } catch (error) {
    console.error(error)
    event.node.res.statusCode = 400
    return { success: false }
  }
})
