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
})
