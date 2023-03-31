<template>
  <div class="absolute top-3 right-0">
    <Menu>
      <MenuButton class="px-4">
        <img :src="userImage" alt="User Image" class="h-10 w-10 rounded-full bg-violet-200 hover:bg-violet-400" />
      </MenuButton>
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 flex flex-col mt-2 p-2 w-56 origin-top-right divide-y divide-gray-200 rounded-outline"
        >
          <!--          <ConnectTrelloButton v-if="!currentUser?.trelloToken" />-->
          <!--          <SetupSubscriptionButton v-if="currentUser?.customer === undefined" />-->
          <ViewUsageButton v-if="currentUser?.customer !== undefined" />
          <ManageSubscriptionButton v-if="currentUser?.customer !== undefined" />
          <SignOutButton />
        </MenuItems>
      </transition>
    </Menu>
    <ViewUsageModal />
  </div>
</template>

<script lang="ts" setup>
import { Menu, MenuButton, MenuItems } from "@headlessui/vue"

const { currentUser } = useCurrentUser()

const userImage = useState("userImage", () => photoUrl(currentUser.value))

watchEffect(() => {
  userImage.value = photoUrl(currentUser.value)
})

function photoUrl(currentUser: CurrentUser | null) {
  if (!currentUser?.photoURL) {
    return `https://robohash.org/${currentUser?.uid}?set=set3`
  }
  return currentUser.photoURL
}
</script>
