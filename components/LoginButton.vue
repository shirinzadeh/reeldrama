<!-- <template>
  <div>
    <button
      v-if="!status.loggedIn"
      @click="openAuthModal"
      class="px-4 py-2 rounded-lg bg-primary text-white"
    >
      Login
    </button>
    <button
      v-else
      @click="handleSignOut"
      class="px-4 py-2 rounded-lg bg-red-500 text-white"
    >
      Logout
    </button>
    <AuthModal ref="authModal" />
  </div>
</template>

<script setup lang="ts">
const { status, signOut } = useAuth()
const authModal = ref()

const openAuthModal = () => {
  authModal.value.open()
}

const handleSignOut = async () => {
  await signOut({ callbackUrl: '/' })
}
</script> -->
