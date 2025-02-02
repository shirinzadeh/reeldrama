<template>
    <div>
        <!-- New User Special Offer -->
        <div v-if="newUserPackage" class="new-user-offer" :class="{ 'selected': selectedPackage?._id === newUserPackage._id }" @click="handlePackageSelection(newUserPackage)">
            <div class="offer-content" @click="handlePackageSelection(newUserPackage)">
                <div class="offer-left">
                    <Icon name="ph:coins-duotone" class="coin-icon" />
                    <div>
                        <div class="new-user-label">{{ $t('package.newUserOnly') }}</div>
                        <div class="coins-amount">
                            <span class="amount">{{ newUserPackage.coins }}</span>
                            <span class="coins-text">{{ $t('coins') }}</span>
                            <span class="bonus">+{{ newUserPackage.bonus }} {{ $t('bonus') }}</span>
                        </div>
                    </div>
                </div>
                <div class="offer-right">
                    <div class="bonus-percent">+{{ newUserPackage.bonusPercentage }}%</div>
                    <div class="price">${{ newUserPackage.price }}</div>
                </div>
            </div>
        </div>

        <!-- Regular Packages Grid -->
        <div class="packages-grid">
            <div v-for="pkg in regularPackages" :key="pkg._id" class="package-card" :class="{ 'selected': selectedPackage?._id === pkg._id }" @click="handlePackageSelection(pkg)">
                <!-- Badge for bonuses -->
                <div v-if="pkg.bonusPercentage > 0" class="bonus-badge">
                    +{{ pkg.bonusPercentage }}%
                </div>

                <!-- New User Label -->
                <div v-if="pkg.isNewUserOnly" class="new-user-label">
                    {{ $t('package.newUserOnly') }}
                </div>

                <div class="offer-content">
                    <div class="coin-amount">
                        <span class="amount">{{ pkg.coins }} </span>
                        <span class="coins-text">{{ $t('coins') }}</span>
                    </div>

                    <div v-if="pkg.bonus > 0" class="bonus-text">
                        +{{ pkg.bonus }} {{ $t('bonus') }}
                    </div>
                </div>

                <div class="price-container">
                    <div class="price">${{ pkg.price }}</div>
                </div>
            </div>
        </div>

        <!-- Payment Method Section -->
        <div class="payment-section">
            <h2 class="section-title">{{ $t('package.paymentMethod') }}</h2>
            <div class="payment-methods">
                <button 
                    v-for="method in paymentMethods" 
                    :key="method.id" 
                    class="payment-method-btn" 
                    :class="{ 'selected': selectedPaymentMethod === method.id }" 
                    @click="selectPaymentMethod(method.id)"
                >
                    {{ $t(method.name) }}
                </button>
            </div>

            <button class="pay-now-btn" @click="handlePayment">
            {{ $t('payNow') }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const packageStore = usePackageStore()
const { packages, selectedPackage, loading, error } = storeToRefs(packageStore)
const { newUserPackage, regularPackages } = storeToRefs(packageStore)

// Fetch packages on page load
await packageStore.fetchPackages()

interface PaymentMethod {
    id: string
    name: string
    icon: string
}

interface Package {
    _id: string;
    coins: number;
    bonus: number;
    price: number;
    bonusPercentage: number;
    isNewUserOnly?: boolean;
}

const paymentMethods = ref<PaymentMethod[]>([
    { id: 'paypal', name: 'package.paypal', icon: '/images/paypal.png' },
    { id: 'credit-card', name: 'package.creditCard', icon: '/images/credit-card.png' },
])

const selectedPaymentMethod = ref('credit-card') // Select Credit Card by default

const selectPaymentMethod = (methodId: string) => {
    selectedPaymentMethod.value = methodId
}

const handlePackageSelection = (pkg: Package) => {
    packageStore.setSelectedPackage(pkg._id)
}

const emit = defineEmits(['package-selected'])

const api = useApi()
const handlePayment = async () => {
    if (!selectedPackage.value || !selectedPaymentMethod.value) return

    try {
        const response = await api.post('/payments/create', {
            packageId: selectedPackage.value._id,
            paymentMethod: selectedPaymentMethod.value
        }) as { success: boolean, paymentId: string }

        if (response.success) {
            emit('package-selected', response.paymentId)
        }
    } catch (error) {
        console.error('Payment failed:', error)
    }
}

// Initialize with new user package by default
watchEffect(() => {
    if (newUserPackage.value && !selectedPackage.value) {
        handlePackageSelection(newUserPackage.value)
    }
})
</script>

<style scoped>
.top-up-container {
    padding: 2rem;
    background: var(--dark-bg);
    min-height: 100vh;
}

.title {
    color: #fff;
    font-size: 2rem;
    margin-bottom: 1.5rem;
}

.new-user-offer {
    background: linear-gradient(145deg, rgba(24, 12, 12, 0.9), rgba(229, 9, 20, 0.1));
    border: 1px solid rgba(229, 9, 20, 0.3);
    border-radius: 1rem;
    margin-bottom: 2rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.new-user-offer:hover {
    transform: scale(1.02);
}

.new-user-offer.selected {
    border-color: var(--primary-900);
    background: linear-gradient(145deg, rgba(24, 12, 12, 0.95), rgba(229, 9, 20, 0.2));
    box-shadow: 0 0 15px rgba(229, 9, 20, 0.2);
}

.offer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    position: relative;
}

.offer-left {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.coin-icon {
    font-size: 3rem;
    color: #FFD700;
}

.new-user-label {
    position: absolute;
    top: 1rem;
    left: 1rem;
    color: var(--primary-900);
    font-size: 0.75rem;
    font-weight: 600;
}

.coins-display {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.amount {
    font-size: 1.5rem;
    font-weight: 600;
    color: #fff;
}

.bonus {
    color: var(--primary-900);
    font-size: 1.25rem;
}

.bonus-percent {
    background: var(--primary-900);
    color: #fff;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
}

.offer-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 20px;
}

.packages-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
    margin-bottom: 2rem;
}

.package-card {
    position: relative;
    background: rgba(24, 24, 27, 0.9);
    border: 1px solid rgba(39, 39, 42, 0.5);
    border-radius: 0.75rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    flex: 1;
}

.package-card.selected {
    border-color: var(--primary-900);
    background: rgba(24, 12, 12, 0.9);
}

.package-card:hover {
    transform: scale(1.02);
}

.bonus-badge {
    position: absolute;
    top: -10px;
    right: 0;
    background: var(--primary-900);
    color: white;
    padding: 0.5rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    font-weight: 600;
}

.bonus-tag {
    display: inline-block;
    background: var(--primary-900);
    color: #fff;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    margin: 0.5rem 0;
}

.bonus-text {
    color: var(--primary-900);
    text-align: center;
    margin-top: 0.5rem;
    font-size: 1rem;
}

.price-container {
    margin-top: auto;
    background: rgba(39, 39, 42, 0.5);
    padding: 0.25rem;
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
}

.price {
    color: #71717A;
    text-align: center;
    font-weight: 600;
}

.payment-section {
    margin-top: 2rem;
}

.section-title {
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.payment-methods {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.payment-method-btn {
    background: rgba(24, 24, 27, 0.9);
    border: 1px solid rgba(39, 39, 42, 0.5);
    color: #fff;
    border-radius: 0.5rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: border-color 0.2s ease;
}

.payment-method-btn:hover,
.payment-method-btn.selected {
    border-color: var(--primary-900);
}

.payment-icon {
    max-width: 80%;
    height: auto;
}

.pay-now-btn {
    background: #E11D48;
    color: white;
    width: 100%;
    max-width: 400px;
    padding: 1rem;
    border-radius: 0.5rem;
    border: none;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
    margin: 0 auto;
    display: block;
}

.pay-now-btn:hover {
    background: #BE123C;
}

@media (max-width: 768px) {
    .top-up-container {
        padding: 1rem;
    }

    .payment-methods {
        flex-wrap: wrap;
    }

    .payment-method-btn {
        width: calc(50% - 0.5rem);
    }
}
</style>