import { stripe } from "~/server/utils/stripe"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (body.customer !== null) {
    const portalSession = await stripe.billingPortal.sessions.create({
      // @ts-ignore
      customer: body.customer,
      return_url: body.baseUrl,
    })
    if (portalSession.url) {
      return {
        redirectUrl: portalSession.url,
      }
    }
  }
})
