# Nuxt Tauri

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Vue composables for Tauri API in Nuxt applications.

-   [✨ &nbsp;Release Notes](/CHANGELOG.md)
-   [📖 &nbsp;Documentation](https://nuxt-tauri.onivoid.fr)
-   [🇫🇷 &nbsp;Documentation Française](https://nuxt-tauri.onivoid.fr/fr/)
    <!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-tauri?file=playground%2Fapp.vue) -->

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

## 📖 Full Documentation

For complete guides, API reference, and advanced examples, visit our documentation:

**🌐 [English Documentation](https://nuxt-tauri.onivoid.fr)**  
**🇫🇷 [Documentation Française](https://nuxt-tauri.onivoid.fr/fr/)**

The documentation includes:

-   📚 Complete API reference
-   🎯 Step-by-step guides
-   💡 Advanced usage patterns
-   🔧 Configuration options
-   ⚠️ Error handling examples

## Quick Usage

### useTauriInvoke

Execute Tauri commands with reactive state management:

```vue
<script setup>
// Basic usage
const { data, pending, error, execute } = useTauriInvoke("get_user", {
    id: 123,
});

// With TypeScript
const { data, pending, error, execute } =
    useTauriInvoke < User > ("get_user", { id: 123 });

// Immediate execution
const { data, pending, error } = useTauriInvoke(
    "get_config",
    {},
    { immediate: true }
);
</script>
```

### useTauriEvent

Listen to and emit Tauri events:

```vue
<script setup>
// Basic usage
const { data, error, startListening, stopListening, emit } =
    useTauriEvent("my-event");

// With TypeScript
const { data, error, startListening, stopListening, emit } =
    useTauriEvent < EventPayload > "my-event";
</script>
```

📖 **[See complete examples and API reference →](https://nuxt-tauri.onivoid.fr)**

## API Reference

### useTauriInvoke(command, args?, options?)

Execute a Tauri command with reactive state.

**Returns:** `{ data, pending, error, execute, refresh }`

### useTauriEvent(eventName)

Listen to and emit Tauri events.

**Returns:** `{ data, error, startListening, stopListening, emit }`

📖 **[Complete API documentation with examples →](https://nuxt-tauri.onivoid.fr/api/)**

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
