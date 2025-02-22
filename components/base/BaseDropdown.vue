<template>
  <div 
    class="dropdown-container" 
    ref="dropdownRef"
    @mouseenter="!isMobile && handleMouseEnter()"
    @mouseleave="!isMobile && handleMouseLeave()"
  >
    <div
      class="dropdown-trigger"
      :aria-expanded="isOpen"
      role="button"
      tabindex="0"
      @click="handleClick"
    >
      <slot name="trigger" />
    </div>
    <transition
      :enter-active-class="isMobile ? 'mobile-enter-active' : 'transition duration-100 ease-out'"
      :enter-from-class="isMobile ? 'mobile-enter-from' : 'transform scale-95 opacity-0'"
      :enter-to-class="isMobile ? 'mobile-enter-to' : 'transform scale-100 opacity-100'"
      :leave-active-class="isMobile ? 'mobile-leave-active' : 'transition duration-75 ease-in'"
      :leave-from-class="isMobile ? 'mobile-leave-from' : 'transform scale-100 opacity-100'"
      :leave-to-class="isMobile ? 'mobile-leave-to' : 'transform scale-95 opacity-0'"
    >
      <div
        v-if="isOpen"
        class="dropdown-content"
        :class="[
          position,
          { 'show-dropdown': isOpen },
          { 'mobile-dropdown': isMobile }
        ]"
        role="menu"
        @mouseenter="!isMobile && clearCloseTimeout()"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
interface Props {
  position?: 'left' | 'right';
  hoverDelay?: number;
  closeDelay?: number;
}

const props = withDefaults(defineProps<Props>(), {
  position: 'right',
  hoverDelay: 100,
  closeDelay: 150
})

const isOpen = ref(false)
const isMobile = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
let closeTimeout: NodeJS.Timeout | null = null
let openTimeout: NodeJS.Timeout | null = null

// Check if device is mobile
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

// Handle click events (mainly for mobile)
const handleClick = (event: Event) => {
  if (isMobile.value) {
    event.stopPropagation()
    isOpen.value = !isOpen.value
  }
}

// Close dropdown when clicking outside
const handleOutsideClick = (event: Event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

const clearTimeouts = () => {
  if (closeTimeout) {
    clearTimeout(closeTimeout)
    closeTimeout = null
  }
  if (openTimeout) {
    clearTimeout(openTimeout)
    openTimeout = null
  }
}

const handleMouseEnter = () => {
  clearTimeouts()
  openTimeout = setTimeout(() => {
    isOpen.value = true
  }, props.hoverDelay)
}

const handleMouseLeave = () => {
  clearTimeouts()
  closeTimeout = setTimeout(() => {
    isOpen.value = false
  }, props.closeDelay)
}

const clearCloseTimeout = () => {
  if (closeTimeout) {
    clearTimeout(closeTimeout)
    closeTimeout = null
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  clearTimeouts()
  window.removeEventListener('resize', checkMobile)
  document.removeEventListener('click', handleOutsideClick)
})

// Prevent body scroll when dropdown is open on mobile
watch(isOpen, (newValue) => {
  if (isMobile.value) {
    if (newValue) {
      document.body.classList.add('dropdown-open');
    } else {
      document.body.classList.remove('dropdown-open');
    }
  }
});

// Clean up body class on component unmount
onUnmounted(() => {
  document.body.classList.remove('dropdown-open');
});
</script>

<style scoped>
.dropdown-container {
  position: relative;
  display: inline-block;
}

.dropdown-trigger {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: background 0.2s;
}

.dropdown-trigger:hover {
  background: var(--dark-surface-soft);
}

.dropdown-content {
  position: absolute;
  top: calc(100% + 0.5rem);
  min-width: 200px;
  background: var(--dark-surface);
  border: 1px solid var(--dark-border);
  border-radius: 0.5rem;
  padding: 0.5rem;
  z-index: 1000;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.dropdown-content.right {
  right: 0;
}

.dropdown-content.left {
  left: 0;
}

/* Add a small gap between trigger and dropdown to prevent unintended closing */
.dropdown-content::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 0;
  right: 0;
  height: 10px;
  background: transparent;
}

/* Optional: Add hover styles for dropdown items */
:deep(.dropdown-item) {
  transition: background-color 0.2s ease;
}

:deep(.dropdown-item:hover) {
  background-color: var(--dark-surface-soft);
}

/* Mobile specific styles */
@media (max-width: 768px) {
  .mobile-dropdown {
    position: fixed;
    top: auto !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0;
    width: 100%;
    min-width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.2);
  }

  .mobile-enter-active,
  .mobile-leave-active {
    transition: transform 0.3s ease-in-out;
  }

  .mobile-enter-from,
  .mobile-leave-to {
    transform: translateY(100%);
  }

  .mobile-enter-to,
  .mobile-leave-from {
    transform: translateY(0);
  }

  /* Prevent body scroll when dropdown is open */
  :global(body.dropdown-open) {
    overflow: hidden;
  }
}

/* Override position styles for mobile */
@media (max-width: 768px) {
  .dropdown-content::before {
    display: none;
  }

  .dropdown-content.right,
  .dropdown-content.left {
    right: 0;
    left: 0;
  }
}
</style>