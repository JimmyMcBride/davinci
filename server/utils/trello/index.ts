import { createFetch } from "~/server/utils/createFetch"

export const trelloWithAuth = (apiToken: string) =>
  createFetch("https://api.trello.com/1", {
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `OAuth oauth_consumer_key="${process.env.TRELLO_API_KEY}", oauth_token="${apiToken}"`,
    }),
  })
