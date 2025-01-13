<template>
  <div 
    class="dropdown-container" 
    ref="dropdownRef"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="dropdown-trigger"
      :aria-expanded="isOpen"
      role="button"
      tabindex="0"
    >
      <slot name="trigger" />
    </div>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        class="dropdown-content"
        :class="[position, { 'show-dropdown': isOpen }]"
        role="menu"
        @mouseenter="clearCloseTimeout"
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
  hoverDelay: 100,    // Delay before opening
  closeDelay: 150     // Delay before closing
})

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
let closeTimeout: NodeJS.Timeout | null = null
let openTimeout: NodeJS.Timeout | null = null

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

onUnmounted(() => {
  clearTimeouts()
})
</script>

<style scoped>
.dropdown-container {
  position: relative;
  display: inline-block;
}

.dropdown-trigger {
  cursor: pointer;
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
</style>