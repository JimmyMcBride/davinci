export const redirectToConnectTrello = async () => {
  try {
    const { data } = await useFetch("/api/trello/connect-trello", {
      method: "POST",
      body: JSON.stringify({ baseUrl: window.location.origin }),
    })
    await navigateTo(data.value?.redirectUrl, {
      external: true,
    })
  } catch (error) {
    console.error(error)
  }
}
