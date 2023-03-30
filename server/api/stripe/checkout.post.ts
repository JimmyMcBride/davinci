import { stripe } from "~/server/utils/stripe"
import { firestore } from "~/server/utils/firebase"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.PROJECT_PRICE_ID ?? "",
      },
    ],
    mode: "subscription",
    success_url: `${body.baseUrl}/success`,
    cancel_url: `${body.baseUrl}/cancel`,
  })
  const checkoutSession = await stripe.checkout.sessions.retrieve(session.id)
  if (session.url) {
    await firestore.collection("users").doc(body.userId).set(
      {
        sessionId: session.id,
      },
      { merge: true }
    )
    return {
      redirectUrl: session.url,
      sessionId: session.id,
      customer: checkoutSession.customer,
    }
  }
})
