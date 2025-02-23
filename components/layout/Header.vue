<script setup>
const { t } = useI18n()
const localePath = useLocalePath()
const isScrolled = ref(false)
const isMobile = useState('isMobile', () => true) // Default to true for mobile-first

onMounted(() => {
  // Initial check
  checkViewport()

  // Handle scroll events
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 0
  }

  // Handle resize events
  const handleResize = () => {
    checkViewport()
  }

  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)

  // Cleanup
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
  })
})

function checkViewport() {
  if (import.meta.client) {
    isMobile.value = window.innerWidth <= 768
  }
}
</script>

<template>
  <ClientOnly>
    <header class="header" :class="{ 'header-scrolled': isScrolled }">
      <div v-if="isMobile" class="mobile-layout">
        <div class="mobile-left">
          <HeaderLanguage />
        </div>

        <div class="mobile-right">
          <HeaderHistory />
          <HeaderUser />
        </div>
      </div>

      <div v-else class="desktop-layout">
        <div class="header-left">
          <NuxtLink :to="localePath('/')" class="logo">
            <span class="logo-text">ReelShort</span>
          </NuxtLink>
          <nav class="nav-menu">
            <NuxtLink :to="localePath('/')" class="nav-link" aria-label="Navigate to Home">
              {{ t('home') }}
            </NuxtLink>
          </nav>
        </div>

        <div class="header-right">
          <div class="header-controls">
            <HeaderHistory />
            <HeaderLanguage />
            <HeaderUser />
          </div>
        </div>
      </div>
    </header>
  </ClientOnly>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: transparent;
  color: #fff;
  transition: all 0.3s ease;
}

.header-scrolled {
  background-color: rgba(0, 0, 0, 0.9);
}

.header:hover {
  background-color: rgba(0, 0, 0, 0.9);
}

/* Mobile Layout - Should come first for mobile-first approach */
.mobile-layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1rem;
  width: 100%;
}

.mobile-left,
.mobile-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 1;
}

.mobile-layout .logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

/* Common Styles */
.logo {
  text-decoration: none;
}

.logo-text {
  color: #e50914;
  font-weight: bold;
}

.desktop-layout .logo-text {
  font-size: 1.8rem;
}

.mobile-layout .logo-text {
  font-size: 1.5rem;
}

.nav-menu {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  opacity: 1;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* Component Styles */
.icon-button {
  background: none;
  border: none;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.icon-button:hover {
  opacity: 1;
}

.language-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.language-selector:hover {
  opacity: 1;
}

.user-profile {
  cursor: pointer;
}

.avatar {
  width: 32px;
  height: 32px;
  background-color: #555;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

/* Desktop Layout */
@media (min-width: 769px) {
  .desktop-layout {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    width: 100%;
  }

  .header-left,
  .header-right {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
}
</style>