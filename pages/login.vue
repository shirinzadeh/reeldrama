<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
      <h1 class="text-2xl font-bold">Login Page</h1>
      <button @click="signInWithCredentials" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Sign In
      </button>
    </div>
  </template>
  
  <script setup>
 const {signIn} = useAuth()
  
  const signInWithCredentials = async () => {
    await signIn('credentials', { callbackUrl: '/' })
  }
  </script>
  