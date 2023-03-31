export const redirectToStripeCheckout = async () => {
  const { currentUser } = useCurrentUser()
  try {
    const userId = currentUser.value?.uid
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
