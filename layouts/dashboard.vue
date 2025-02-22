<template>
    <Header />
    <div class="dashboard-layout">
        <aside class="sidebar">
            <div class="user-section">
                <div class="user-info">
                    <div class="avatar">
                        <Icon name="carbon:user-avatar" size="2em" class="account-icon" />
                    </div>
                    <p class="user-label">{{ authStore.user?.email || t('navigation.guest') }}</p>
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
            </div>

            <nav class="sidebar-nav">
                <NuxtLink :to="localePath('/dashboard/mylist')" class="nav-item" active-class="active">
                    <Icon name="mdi-playlist-play" />
                    <span>{{ t('my_list') }}</span>
                </NuxtLink>
                <NuxtLink :to="localePath('/dashboard/history')" class="nav-item" active-class="active">
                    <Icon name="mdi-history" />
                    <span>{{ t('history') }}</span>
                </NuxtLink>
            </nav>
        </aside>

        <main class="content">
            <slot />
        </main>
    </div>
    <Footer />
</template>

<script setup lang="ts">
import Footer from '~/components/layout/Footer.vue';
import Header from '~/components/layout/Header.vue';

const { t } = useI18n();
const localePath = useLocalePath();
const userStore = useUserStore();
const authStore = useAuthStore();
</script>

<style scoped>
.header {
    position: static;
}

.dashboard-layout {
    display: flex;
    min-height: 100vh;
    background-color: var(--dark-surface);

}

.sidebar {
    width: 280px;
    background: var(--dark-surface);
    padding: 1.5rem;
    border-right: 1px solid var(--dark-border);
}

.content {
    flex: 1;
    padding: 2rem;
}

.user-section {
    margin-bottom: 2rem;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.avatar {
    background-color: #fff;
    border-radius: 50%;
    display: inline-flex;
}

.account-icon {
    color: #000;
}

.user-label {
    font-weight: 600;
}

.coins-info {
    padding: 0.75rem;
    background: var(--dark-surface-soft);
    border-radius: 0.375rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.coin-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
}

.coin-icon {
    color: #FFD700;
}

.sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    border-radius: 0.375rem;
    color: var(--text-primary);
    transition: all 0.2s ease;
}

.nav-item:hover {
    background: var(--dark-surface-soft);
    transform: translateX(4px);
}

.nav-item.active {
    background: var(--primary-900);
    color: white;
}
</style>
