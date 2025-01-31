<template>
  <nav aria-label="Breadcrumb" class="breadcrumb-nav">
    <ol class="breadcrumb-list">
      <li class="breadcrumb-item">
        <div class="breadcrumb-item-content">
          <NuxtLink :to="localePath('/')" class="breadcrumb-link">Home</NuxtLink>
          <span class="breadcrumb-separator">/</span>
        </div>
      </li>
      <li v-for="(item, index) in items" :key="index" class="breadcrumb-item">
        <div class="breadcrumb-item-content">
          <span class="breadcrumb-separator" v-if="index > 0">/</span>
          <NuxtLink
            v-if="item.href"
            :to="item.href"
            class="breadcrumb-link"
          >
            <span class="breadcrumb-text-ellipsis">{{ item.name }}</span>
          </NuxtLink>
          <span
            v-else
            class="breadcrumb-text breadcrumb-text-ellipsis"
          >
            {{ item.name }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  name: string;
  href?: string;
}

defineProps<{
  items: BreadcrumbItem[];
}>();

const localePath = useLocalePath()
</script>

<style scoped>
.breadcrumb-nav {
  display: flex;
  align-items: center;
  font-size: 0.875rem; /* text-sm */
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  gap: 0.25rem; /* space-x-1 */
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-item-content {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.breadcrumb-icon {
  width: 1.25rem; /* w-5 */
  height: 1.25rem; /* h-5 */
  color: #9CA3AF; /* text-gray-400 */
}

.breadcrumb-link {
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  color: #6B7280; /* text-gray-500 */
  text-decoration: none;
}

.breadcrumb-link:hover {
  color: #374151; /* hover:text-gray-700 */
}

.breadcrumb {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.875rem;
}

.breadcrumb-link {
  color: #9ca3af;
  text-decoration: none;
}

.breadcrumb-link:hover {
  color: #fff;
}

.breadcrumb-separator {
  color: #9ca3af;
}

.breadcrumb-current {
  color: #fff;
}

.breadcrumb-text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 170px; 
  width: 100%;
  display: inline-block;
}
</style>
