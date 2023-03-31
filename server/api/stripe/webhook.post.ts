export default defineEventHandler(async (event) => {
  console.log("Webhook received!")
  const body = await readBody(event)
  // console.dir(body)
  const webhookSecret = process.env.STIPE_WEBHOOK_SECRET
  let data: any
  let eventType
  const rawBody = await readRawBody(event)
  if (!rawBody) {
    console.log(`⚠️  Webhook body missing.`)
    return (event.node.res.statusCode = 400)
  }
  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let stripeEvent
    let signature = event.node.req.headers["stripe-signature"]
    if (!signature) {
      console.log(`⚠️  Webhook signature missing.`)
      return (event.node.res.statusCode = 400)
    }

    try {
      stripeEvent = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`)
      return (event.node.res.statusCode = 400)
    }
    // Extract the object from the event.
    data = stripeEvent.data
    eventType = stripeEvent.type
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = body.data
    eventType = body.type
  }
  console.log(`🔔 Event type: ${eventType}`)
  let customerEmail: any
  let userSnapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
  let userDoc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
  let userId: any
  async function setDetails() {
    // @ts-ignore
    customerEmail = data.object.customer_details.email
    // @ts-ignore
    console.log(`🔔 Customer details: ${JSON.stringify(data.object.customer_details)}`)
    userSnapshot = await firestore.collection("users").where("email", "==", customerEmail.toLowerCase()).get()
    userDoc = userSnapshot.docs[0]
    userId = userDoc.id
  }
  switch (eventType) {
    case "checkout.session.completed":
      const customerId = data.object.customer
      const subscriptionId = data.object.subscription

      console.log(data)
      console.log(`💰 Customer ${customerId} subscribed to plan ${subscriptionId}`)

      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      const itemId = subscription.items.data[0].id

      await setDetails()

      await firestore.collection("users").doc(userId).set(
        {
          itemId,
          customer: customerId,
          subscriptionId,
          status: "active",
        },
        { merge: true }
      )

      break
    case "invoice.paid":
      break
    case "invoice.payment_failed":
      userSnapshot = await firestore.collection("users").where("email", "==", data.object.customer).get()
      userDoc = userSnapshot.docs[0]
      userId = userDoc.id
      await firestore.collection("users").doc(userId).set(
        {
          status: "delinquent",
        },
        { merge: true }
      )
      break
    case "customer.subscription.updated":
      console.log(data.object)
      userSnapshot = await firestore.collection("users").where("customer", "==", data.object.customer).get()
      userDoc = userSnapshot.docs[0]
      userId = userDoc.id

      if (data.object.cancel_at !== null) {
        await firestore.collection("users").doc(userId).set(
          {
            status: "canceled",
          },
          { merge: true }
        )
      } else {
        await firestore.collection("users").doc(userId).set(
          {
            status: "active",
          },
          { merge: true }
        )
      }
      break
    default:
    // Unhandled event type
  }

  return (event.node.res.statusCode = 200)
})
