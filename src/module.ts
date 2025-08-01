import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addImports,
} from "@nuxt/kit";

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-tauri",
    configKey: "nuxtTauri",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url);

    addPlugin(resolver.resolve("./runtime/plugin"));

    // Auto-import du composable
    addImports([
      {
        name: "useTauriInvoke",
        from: resolver.resolve("./runtime/composables/useTauriInvoke"),
      },
      {
        name: "useTauriEvent",
        from: resolver.resolve("./runtime/composables/useTauriEvent"),
      },
    ]);
  },
});
