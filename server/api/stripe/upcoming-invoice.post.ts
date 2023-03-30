export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const invoice = await stripe.invoices.retrieveUpcoming({
    customer: body.customer,
  })
  return invoice
})
