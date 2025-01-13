<template>
  <BaseDropdown position="left">
    <template #trigger>
      <div class="language-trigger">
        <Icon name="mdi-earth" class="globe-icon" />
        <span>{{ currentLanguage }}</span>
        <Icon name="mdi-chevron-down" class="trigger-icon" />
      </div>
    </template>
    
    <div class="language-menu">
      <button
        v-for="lang in languages"
        :key="lang.code"
        class="language-item"
        :class="{ active: currentLanguage === lang.name }"
        @click="selectLanguage(lang)"
      >
        <span class="language-name">{{ lang.name }}</span>
        <span class="language-native">{{ lang.native }}</span>
      </button>
    </div>
  </BaseDropdown>
</template>

<script setup lang="ts">
interface Language {
  code: string
  name: string
  native: string
}

const languages: Language[] = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'de', name: 'German', native: 'Deutsch' },
]

const currentLanguage = ref('English')

const selectLanguage = (lang: Language) => {
  currentLanguage.value = lang.name
  // Add your language switching logic here
}
</script>

<style scoped>
.language-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: background 0.2s;
}

.language-trigger:hover {
  background: var(--dark-surface-soft);
}

.globe-icon {
  font-size: 1.2rem;
  color: var(--text-secondary);
}

.trigger-icon {
  font-size: 1.2rem;
  color: var(--text-secondary);
}

.language-menu {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.language-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.75rem;
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  border-radius: 0.375rem;
  text-align: left;
  transition: background 0.2s;
}

.language-item:hover {
  background: var(--dark-surface-soft);
}

.language-item.active {
  background: var(--dark-surface-soft);
}

.language-name {
  font-weight: 500;
}

.language-native {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.trigger-icon {
  transition: transform 0.2s ease;
}

.icon-rotate {
  transform: rotate(180deg);
}

/* Enhanced hover effects */
.language-item {
  transition: all 0.2s ease;
}

.language-item:hover {
  background: var(--dark-surface-soft);
  transform: translateX(4px);
}

/* Add a subtle hover indication for the trigger */
.language-trigger {
  transition: all 0.2s ease;
}

.language-trigger:hover {
  background: var(--dark-surface-soft);
}
</style>