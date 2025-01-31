<template>
  <BaseDropdown position="left">
    <template #trigger>
      <div class="language-trigger">
        <Icon name="mdi-earth" class="globe-icon" />
        <span>{{ currentLocaleNative }}</span>
        <Icon name="mdi-chevron-down" class="trigger-icon" />
      </div>
    </template>

    <div class="language-menu">
      <NuxtLink
        v-for="locale in availableLocales"
        :to="switchLocalePath(locale.code)"
        :key="locale.code"
        class="language-item"
        :class="{ active: locale.code === currentLocale }"
      >
      <span class="language-native">{{ locale.native }}</span>
        <span class="language-name">{{ locale.name }}</span>
    </NuxtLink>
    </div>
  </BaseDropdown>
</template>

<script setup lang="ts">
const { locale: currentLocale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== currentLocale.value)
})
// Compute current language name
// Get current language's name
const currentLocaleNative = computed(() => {
  const current = locales.value.find(l => l.code === currentLocale.value)
  return current ? current.native : ''
})
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

.globe-icon, .trigger-icon {
  font-size: 1.2rem;
  color: var(--text-secondary);
}

.language-menu {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.language-item {
  width: 100%;
  padding: 0.75rem;
  display: grid;
  gap: 0.25rem;
  align-items: center;
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  border-radius: 0.375rem;
  text-align: left;
  transition: background 0.2s;
}

.language-name {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.language-native {
  font-size: 1rem;
  color: var(--text-primary);
}

.language-item:hover, .language-item.active {
  background: var(--dark-surface-soft);
}
</style>