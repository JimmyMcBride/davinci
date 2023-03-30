export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const redirectUrl = `https://trello.com/1/authorize?expiration=never&name=Project%20Board%20Generator&scope=read,write&response_type=token&key=${process.env.TRELLO_API_KEY}&callback_method=fragment&return_url=${body.baseUrl}/trello`
  return { redirectUrl }
})
