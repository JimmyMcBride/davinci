export const redirectToStripeCheckout = async () => {
  const { user } = useAuthState()
  try {
    const userId = user.value?.uid
    const { data } = await useFetch("/api/stripe/checkout", {
      method: "POST",
      body: JSON.stringify({
        baseUrl: window.location.origin,
        userId: userId,
      }),
    })
    await navigateTo(data.value?.redirectUrl, {
      external: true,
    })
  } catch (error) {
    console.error(error)
  }
}
