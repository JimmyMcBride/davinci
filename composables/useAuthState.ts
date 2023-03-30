import { onAuthStateChanged } from "@firebase/auth"
import { AuthState } from "~/typings"
import { useFirebase } from "~/composables/useFirebase"

export const useAuthState = () => {
  const authState = useState<AuthState>("authState", () => {
    return {
      user: null,
      loading: true,
      isUserSignedIn: false,
    }
  })

  onMounted(() => {
    const { auth } = useFirebase()

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      authState.value = {
        user,
        loading: false,
        isUserSignedIn: !!user,
      }
    })

    onUnmounted(unsubscribe)
  })

  return {
    user: computed(() => authState.value.user),
    loading: computed(() => authState.value.loading),
    isUserSignedIn: computed(() => authState.value.isUserSignedIn),
  }
}
