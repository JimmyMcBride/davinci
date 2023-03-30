// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "nuxt-headlessui"],
  headlessui: {
    prefix: "Headless",
  },
  app: {
    head: {
      title: "DaVinci",
      meta: [
        {
          name: "description",
          content: "OpenAI's GPT-4 powered project management tool",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
      ],
    },
  },
  runtimeConfig: {
    FIREBASE_SERVICE_ACCOUNT: process.env.FIREBASE_SERVICE_ACCOUNT,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    TRELLO_API_KEY: process.env.TRELLO_API_KEY,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    PROJECT_TOKEN_SUB_ID: process.env.PROJECT_TOKEN_SUB_ID,
    PROJECT_PRICE_ID: process.env.PROJECT_PRICE_ID,
    SUPER_SECRET: process.env.SUPER_SECRET,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  },
})
