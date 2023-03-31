export const redirectToStripePortal = async () => {
  const { currentUser } = useCurrentUser()
  if (!currentUser.value?.customer) return
  try {
    const { data } = await useFetch("/api/stripe/portal-session", {
      method: "POST",
      body: JSON.stringify({
        baseUrl: window.location.origin,
        customer: currentUser.value.customer,
      }),
    })
    navigateTo(data.value?.redirectUrl, {
      external: true,
    })
  } catch (error) {
    console.error(error)
  }
}
