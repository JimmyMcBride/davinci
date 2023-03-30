import { ProjectBoard } from "~/typings"
import { CreateCompletionResponse } from "openai"
import { AxiosResponse } from "axios"

export const getProjectBoardFromRes = async (
  response: AxiosResponse<CreateCompletionResponse, any>,
  itemId: string
) => {
  let data = response.data.choices[0].text
  let tokens = response.data.usage?.total_tokens

  let projectBoardData: ProjectBoard
  if (data != undefined && tokens != undefined) {
    projectBoardData = JSON.parse(data)
    await stripe.subscriptionItems.createUsageRecord(itemId, {
      quantity: tokens,
      timestamp: Math.floor(Date.now() / 1000),
      action: "increment",
    })
    return projectBoardData
  }
  return null
}
