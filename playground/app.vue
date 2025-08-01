<template>
  <div>
    <button @click="execute">Test Tauri Invoke</button>
    <div v-if="pending">Loading...</div>
    <div v-if="errorInvoke">Error: {{ errorInvoke.message }}</div>
    <div v-if="dataInvoke">Data: {{ dataInvoke }}</div>
  </div>
  <div>
    <button @click="startListening">Start Listening</button>
    <button @click="stopListening">Stop Listening</button>
    <div v-if="errorEvent">Error: {{ errorEvent.message }}</div>
    <div v-if="dataEvent">Data: {{ dataEvent }}</div>
  </div>
</template>

<script setup>

console.log('useTauriInvoke:', useTauriInvoke)
console.log('useTauriEvent:', useTauriEvent)
const { data: dataInvoke, pending, error: errorInvoke, execute } = useTauriInvoke('test_command', { foo: 'bar' })
const { data: dataEvent, error: errorEvent, startListening, stopListening, emit } = useTauriEvent('test_event')
</script>