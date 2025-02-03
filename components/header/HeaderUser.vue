<template>
  <BaseDropdown :hoverDelay="50" :closeDelay="200">
    <template #trigger>
    <div class="user-trigger">
      <div class="avatar">
      <Icon name="carbon:user-avatar" size="1.5em" class="account-icon"/>
      </div>
        </div>
        </template>
        
        <div class="user-menu">
        <div class="user-info">
      <p class="user-label">{{ authStore.user?.email || t('navigation.guest') }}</p>
      <!-- <p class="user-id" v-if="authStore.user">UID {{ authStore.user.id }}</p> -->
        </div>
        
        <div class="coins-info">
      <div class="coin-item">
      <Icon name="carbon:currency" class="coin-icon" />
      <span>{{ userStore.user?.coins || 0 }} {{ t('coins') }}</span>
      </div>
      <div class="coin-item">
      <span>{{ userStore.user?.bonus || 0 }} {{ t('bonus') }}</span>
      </div>
    </div>
    
    <NuxtLink :to="localePath('/shopping')" class="top-up-button">
      {{ t('navigation.topUp') }}
    </NuxtLink>
    
    <div class="menu-items">
      <button class="menu-item"  v-if="!authStore.isAuthenticated" @click="authStore.showLoginModal = true" >
      <Icon name="carbon:login" />
      <span>{{ t('auth.signIn') }}</span>
      </button>
      <button v-else class="menu-item" @click="authStore.signOut()">
      <Icon name="carbon:logout" />
      <span>{{ t('auth.signOut') }}</span>
      </button>
    </div>
    <ModalLogin v-if="authStore.showLoginModal" @close="authStore.showLoginModal = false" />
    <ModalRegister v-if="authStore.showRegisterModal" @close="authStore.showRegisterModal = false" />
    </div>
  </BaseDropdown>
  </template>
  
  <script setup lang="ts">
  const { t } = useI18n();
  const localePath = useLocalePath();
const userStore = useUserStore();
const authStore = useAuthStore();

  </script>
  
  <style scoped>
  .user-trigger {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .avatar {
    background-color: #fff;
    border-radius: 50%;
    padding: 0.25rem;
    display: inline-flex;
  }
  
  .account-icon {
    color: #000;
  }
  
  .user-menu {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .user-info {
    padding: 0.5rem;
  }
  
  .user-label {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .user-id {
    color: var(--text-secondary);
    font-size: 0.875rem;
  }
  
  .coins-info {
    padding: 0.75rem;
    background: var(--dark-surface-soft);
    border-radius: 0.375rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  
  .coin-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
    white-space: nowrap;
  }
  
  .coin-icon {
    color: #FFD700;
  }
  
  .top-up-button {
    display: block;
    text-align: center;
    padding: 0.75rem;
    background: var(--primary-900);
    color: white;
    border-radius: 0.375rem;
    font-weight: 600;
    transition: background 0.2s;
  }
  
  .top-up-button:hover {
    background: var(--primary-800);
  }
  
  .menu-items {
    border-top: 1px solid var(--dark-border);
    padding-top: 0.5rem;
  }
  
  .menu-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem;
    background: none;
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    border-radius: 0.375rem;
    transition: background 0.2s;
  }
  
  .menu-item:hover {
    background: var(--dark-surface-soft);
  }
  
  /* Add smooth transitions for menu items */
  .menu-item {
    transition: all 0.2s ease;
  }
  
  .menu-item:hover {
    background: var(--dark-surface-soft);
    transform: translateX(4px);
  }
  
  /* Enhance hover effects */
  .top-up-button {
    transition: all 0.2s ease;
  }
  
  .top-up-button:hover {
    background: var(--primary-800);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(255, 65, 85, 0.2);
  }
  </style>
