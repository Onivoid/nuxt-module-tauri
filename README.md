# Nuxt Tauri

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Vue composables for Tauri API in Nuxt applications.

-   [✨ &nbsp;Release Notes](/CHANGELOG.md)
    <!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-tauri?file=playground%2Fapp.vue) -->
    <!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

-   🚀 Auto-imported composables for Tauri API
-   💪 Full TypeScript support with generic typing
-   ⚡ Reactive state management with Vue refs
-   🔄 Built-in error handling and loading states
-   🎯 Zero configuration setup

## Quick Setup

Install the module to your Nuxt application:

```bash
npx nuxi module add nuxt-module-tauri
```

Add the peer dependency:

```bash
pnpm add @tauri-apps/api
```

That's it! You can now use Tauri composables in your Nuxt app ✨

## Usage

### useTauriInvoke

Execute Tauri commands with reactive state management:

```vue
<template>
    <div>
        <button @click="execute" :disabled="pending">
            {{ pending ? "Loading..." : "Get User" }}
        </button>

        <div v-if="error" class="error">Error: {{ error.message }}</div>

        <div v-if="data">
            <h3>User: {{ data.name }}</h3>
            <p>Email: {{ data.email }}</p>
        </div>
    </div>
</template>

<script setup>
// Basic usage
const { data, pending, error, execute } = useTauriInvoke('get_user', { id: 123 })

// With TypeScript
interface User {
  name: string
  email: string
}

const { data, pending, error, execute } = useTauriInvoke<User>('get_user', { id: 123 })

// Immediate execution
const { data, pending, error } = useTauriInvoke('get_config', {}, { immediate: true })
</script>
```

### useTauriEvent

Listen to and emit Tauri events:

```vue
<template>
    <div>
        <button @click="startListening">Start Listening</button>
        <button @click="stopListening">Stop Listening</button>
        <button @click="emit({ message: 'Hello from frontend!' })">
            Send Event
        </button>

        <div v-if="error" class="error">Error: {{ error.message }}</div>

        <div v-if="data">Last event: {{ data }}</div>
    </div>
</template>

<script setup>
// Basic usage
const { data, error, startListening, stopListening, emit } = useTauriEvent('my-event')

// With TypeScript
interface EventPayload {
  message: string
  timestamp: number
}

const { data, error, startListening, stopListening, emit } = useTauriEvent<EventPayload>('my-event')
</script>
```

## API Reference

### useTauriInvoke(command, args?, options?)

Execute a Tauri command with reactive state.

**Parameters:**

-   `command` (string): The Tauri command name
-   `args` (object, optional): Arguments to pass to the command
-   `options` (object, optional): Execution options
    -   `immediate` (boolean): Execute immediately on composable creation

**Returns:**

-   `data`: Reactive ref containing the command result
-   `pending`: Reactive ref indicating loading state
-   `error`: Reactive ref containing any error
-   `execute()`: Function to execute the command
-   `refresh()`: Alias for execute

### useTauriEvent(eventName)

Listen to and emit Tauri events.

**Parameters:**

-   `eventName` (string): The event name to listen for

**Returns:**

-   `data`: Reactive ref containing the last received event payload
-   `error`: Reactive ref containing any error
-   `startListening()`: Start listening for events
-   `stopListening()`: Stop listening for events
-   `emit(payload)`: Emit an event with the given payload

## Requirements

-   Nuxt 3.x
-   @tauri-apps/api ^2.7.0
-   Tauri application context (composables will show errors in browser)

## Development

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm run dev:prepare

# Develop with the playground
pnpm run dev

# Build the playground
pnpm run dev:build

# Run ESLint
pnpm run lint

# Run Vitest
pnpm run test
pnpm run test:watch

# Release new version
pnpm run release
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-module-tauri/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-module-tauri
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-module-tauri.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/nuxt-module-tauri
[license-src]: https://img.shields.io/npm/l/nuxt-module-tauri.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-module-tauri
[nuxt-src]: https://img.shields.io/badge/Nuxt.js-00DC82?logo=nuxtdotjs&logoColor=fff
[nuxt-href]: https://nuxt.com
