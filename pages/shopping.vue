<template>
    <div class="container">
        <h1 class="title">{{ $t('navigation.topUp') }}</h1>
        <ShoppingPackages @package-selected="onPackageSelected" />
    </div>
</template>

<script setup lang="ts">
const onPackageSelected = (paymentId: string) => {
    // Handle payment success
    console.log('Payment initiated:', paymentId)
}
</script>

<style scoped>
.container {
    padding: 2rem;
    background: var(--dark-bg);
    min-height: 100vh;
}

.title {
    color: #fff;
    font-size: 2rem;
    margin-bottom: 1.5rem;
}

.loading, .error {
    color: #fff;
    text-align: center;
    padding: 2rem;
}

@media (max-width: 768px) {
    .container {
        padding: 1rem;
    }
}
</style>