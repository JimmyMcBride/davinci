import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

export const openai = new OpenAIApi(configuration)

export const openaiApi = async (prompt: string) => {
  return await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.7,
    max_tokens: 3000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })
}

function tokenize(text: string): string[] {
  const tokens: string[] = []
  let currentToken = ""

  for (const char of text) {
    if (/\s/.test(char)) {
      if (currentToken) {
        tokens.push(currentToken)
        currentToken = ""
      }
      continue
    }

    if (/[.,:;!?"“”‘’<>(){}\[\]\\/|@#\$%^&\*]/.test(char)) {
      if (currentToken) {
        tokens.push(currentToken)
        currentToken = ""
      }
      tokens.push(char)
      continue
    }

    currentToken += char
  }

  if (currentToken) {
    tokens.push(currentToken)
  }

  return tokens
}

function countTokens(text: string): number {
  const tokens = tokenize(text)
  return tokens.length
}
