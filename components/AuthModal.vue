<!-- <template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="fixed inset-0 bg-black opacity-50" @click="close"></div>
    <div class="relative bg-white p-8 rounded-lg shadow-xl w-96">
      <h2 class="text-2xl font-bold mb-6">Sign In</h2>
      <button
        @click="signIn"
        class="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
      >
        <img src="/google-icon.svg" alt="Google" class="w-5 h-5" />
        Continue with Google
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { signIn } = useAuth()
const show = ref(false)

const open = () => {
  show.value = true
}

const close = () => {
  show.value = false
}

defineExpose({ open, close })

const handleSignIn = async () => {
  await signIn('google', { callbackUrl: '/' })
  close()
}
</script> -->
