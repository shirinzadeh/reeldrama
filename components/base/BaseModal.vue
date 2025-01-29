<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div :class="['modal-content', `modal-${size}`]" @click.stop>
      <button class="modal-close" @click="$emit('close')">
        <Icon name="carbon:close" size="24" />
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-content {
  background: #18181b;
  border-radius: 1rem;
  position: relative;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.modal-small {
  max-width: 400px;
}

.modal-medium {
  max-width: 600px;
}

.modal-large {
  max-width: 900px;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #71717a;
  cursor: pointer;
  z-index: 1;
  padding: 0.5rem;
  transition: color 0.2s;
  line-height: 0;
}

.modal-close:hover {
  color: #fff;
}
</style>
