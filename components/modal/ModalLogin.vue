<template>
  <BaseModal size="small" @close="$emit('close')">
    <div class="login-container">
      <h2 class="login-title">{{ $t('auth.welcomeBack') }}</h2>
      <p class="login-subtitle">{{ $t('auth.enterCredentials') }}</p>

      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="form-group">
          <label class="form-label">{{ $t('auth.emailAddress') }}</label>
          <input v-model="email" type="email" required class="form-input" />
        </div>

        <div class="form-group">
          <label class="form-label">{{ $t('auth.password') }}</label>
          <input v-model="password" type="password" required class="form-input" />
        </div>

        <button type="submit" class="submit-button" :class="{ 'button-loading': loading }" :disabled="loading">
          <span v-if="!loading">{{ $t('auth.signIn') }}</span>
          <Icon v-else name="eos-icons:loading" />
        </button>
      </form>

      <div class="divider">
        <span>{{ $t('auth.noAccount') }}</span>
      </div>

      <button type="button" class="signup-button" @click="switchToRegister">
        {{ $t('auth.createAccount') }}
      </button>
    </div>
  </BaseModal>
</template>

<script setup>
import { isValidEmail } from '~/utils/validation'

const emit = defineEmits(['close'])
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)

async function handleSubmit() {
  const { $toast } = useNuxtApp()

  if (!email.value || !password.value) {
    $toast.error('Please fill in all fields')
    return
  }

  if (!isValidEmail(email.value)) {
    $toast.error('Please enter a valid email address')
    return
  }

  loading.value = true
  const result = await authStore.handleLogin(email.value, password.value)
  if (result.success) {
    $toast.success(result.message)
    emit('close')
    authStore.closeAllModals()
  } else {
    $toast.error(result.error || 'Login failed')
  }
}

function switchToRegister() {
  authStore.showLoginModal = false
  authStore.showRegisterModal = true
}
</script>

<style scoped>
.login-container {
  padding: 2rem;
}

.login-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.login-subtitle {
  color: #71717a;
  font-size: 0.875rem;
  margin-bottom: 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  width: 100%;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: #d4d4d8;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background-color: #27272a;
  border: 1px solid #3f3f46;
  color: white;
  font-size: 0.875rem;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
}

.submit-button {
  width: 100%;
  background-color: #3b82f6;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-button:hover {
  background-color: #2563eb;
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.divider {
  margin: 1.5rem 0;
  text-align: center;
  position: relative;
}

.divider::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 1px;
  background: #3f3f46;
  z-index: 0;
}

.divider span {
  background: #18181b;
  padding: 0 1rem;
  color: #71717a;
  font-size: 0.875rem;
  position: relative;
  z-index: 1;
}

.signup-button {
  width: 100%;
  background-color: #27272a;
  border: 1px solid #3f3f46;
  padding: 0.75rem;
  border-radius: 0.5rem;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.signup-button:hover {
  background-color: #3f3f46;
}
</style>
