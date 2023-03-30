import { doc, Firestore, getDoc, setDoc } from "firebase/firestore"
import { User } from "@firebase/auth"
import { CurrentUser } from "~/typings"

export const addUserDataIfNotExists = async (firestore: Firestore, user: User) => {
  const userRef = doc(firestore, "users", user.uid)
  const userDoc = await getDoc(userRef)

  if (!userDoc.exists()) {
    const userData = {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }

    await setDoc(userRef, userData)
  }
}

export const getCurrentUser = async () => {
  const { firestore } = useFirebase()
  const { user } = useAuthState()

  if (!user || !user.value) {
    return null
  }

  try {
    const userRef = doc(firestore, "users", user.value?.uid)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      return {
        uid: user.value?.uid,
        ...userDoc.data(),
      } as CurrentUser
    } else {
      console.error("No such document!")
      return null
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
