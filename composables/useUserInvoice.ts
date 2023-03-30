import { Stripe } from "stripe"
import { CurrentUser } from "~/typings"

export const useUserInvoice = () => {
  const userInvoiceData = useState<Stripe.Response<Stripe.UpcomingInvoice> | null>("userInvoiceData", () => null)
  const userInvoiceLoading = useState("userInvoiceLoading", () => true)
  const userInvoiceError = useState<string | null>("userInvoiceError", () => null)

  async function getUpcomingInvoice(currentUser: CurrentUser) {
    try {
      const { data } = await useFetch("/api/stripe/upcoming-invoice", {
        method: "POST",
        body: JSON.stringify({
          customer: currentUser?.customer,
        }),
      })
      userInvoiceLoading.value = false
      userInvoiceData.value = data.value
    } catch (e) {
      userInvoiceLoading.value = false
      if (e instanceof Error) {
        userInvoiceError.value = e.message
      }
    }
  }

  return {
    userInvoiceData: computed(() => userInvoiceData.value),
    userInvoiceLoading: computed(() => userInvoiceLoading.value),
    userInvoiceError: computed(() => userInvoiceError.value),
    getUpcomingInvoice,
  }
}
