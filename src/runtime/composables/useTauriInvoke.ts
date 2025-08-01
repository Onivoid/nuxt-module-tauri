import { ref, readonly, type Ref } from "vue";
import { invoke } from "@tauri-apps/api/core";

interface TauriInvokeReturn<T> {
  data: Readonly<Ref<T | null>>;
  pending: Readonly<Ref<boolean>>;
  error: Readonly<Ref<Error | null>>;
  execute: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useTauriInvoke<T = any>(
  command: string,
  args?: Record<string, any>,
  options: { immediate?: boolean } = { immediate: false }
): TauriInvokeReturn<T> {
  const data = ref<T | null>(null);
  const pending = ref(false);
  const error = ref<Error | null>(null);

  const execute = async () => {
    if (!("__TAURI_INTERNALS__" in window)) {
      error.value = new Error("Tauri API not available");
      return;
    }

    try {
      pending.value = true;
      error.value = null;
      data.value = await invoke<T>(command, args);
    } catch (err) {
      error.value = err as Error;
    } finally {
      pending.value = false;
    }
  };

  if (options.immediate) {
    execute();
  }

  return {
    data: readonly(data) as Readonly<Ref<T | null>>,
    pending: readonly(pending) as Readonly<Ref<boolean>>,
    error: readonly(error) as Readonly<Ref<Error | null>>,
    execute,
    refresh: execute,
  };
}
