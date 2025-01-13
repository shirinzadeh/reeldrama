<template>
  <header class="header" :class="{ 'header-scrolled': isScrolled }">
    <div class="header-left">
      <NuxtLink to="/" class="logo">
        <span class="logo-text">ReelShort</span>
      </NuxtLink>
      <nav class="nav-menu">
        <NuxtLink to="/" class="nav-link" aria-label="Navigate to Home">Home</NuxtLink>
        <NuxtLink to="/" class="nav-link" aria-label="Navigate to Genre">Genre</NuxtLink>
        <NuxtLink to="/" class="nav-link" aria-label="Navigate to Fandom">Fandom</NuxtLink>
      </nav>
    </div>
    
    <div class="header-right">
      <div class="header-controls">
        <!-- <button class="icon-button" aria-label="Search">
          <Icon name="mdi-magnify" class="icon" />
          <span class="icon-label">Search</span>
        </button>
        <button class="icon-button" aria-label="History">
          <Icon name="mdi-history" class="icon" />
          <span class="icon-label">History</span>
        </button> -->
        <HeaderLanguage />
        <HeaderUser/>
      </div>
    </div>
  </header>
</template>

<script setup>
const isScrolled = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 0
  })
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: transparent;
  color: #fff;
  transition: all 0.3s ease;
}

.header-scrolled {
  background-color: rgba(0, 0, 0, 0.9);
}

.header:hover {
  background-color: rgba(0,0,0,0.9);
}

.header-left, .header-right {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.logo {
  text-decoration: none;
}

.logo-text {
  color: #e50914;
  font-size: 1.8rem;
  font-weight: bold;
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

.nav-link:hover, .nav-link.router-link-active {
  opacity: 1;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

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

.icon {
  font-size: 1.2rem;
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

.globe-icon {
  font-size: 1.2rem;
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

@media (max-width: 768px) {
  .header {
    padding: 0.8rem 1rem;
  }

  .nav-menu {
    display: none;
  }

  .icon-label, .language-selector {
    display: none;
  }

  .header-controls {
    gap: 1rem;
  }
}
</style>
