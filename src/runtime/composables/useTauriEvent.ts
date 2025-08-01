import { ref, onUnmounted, readonly, type Ref } from "vue";
import { listen, emit } from "@tauri-apps/api/event";

interface TauriEventReturn<T> {
  data: Readonly<Ref<T | null>>;
  error: Readonly<Ref<Error | null>>;
  startListening: () => Promise<void>;
  stopListening: () => void;
  emit: (payload: T) => Promise<void>;
}

export function useTauriEvent<T = any>(eventName: string): TauriEventReturn<T> {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);

  let unlistenFn: (() => void) | null = null;

  const startListening = async () => {
    if (!("__TAURI_INTERNALS__" in window)) {
      error.value = new Error("Tauri API not available");
      return;
    }

    try {
      unlistenFn = await listen<T>(eventName, (event) => {
        data.value = event.payload;
      });
    } catch (err) {
      error.value = err as Error;
    }
  };

  const stopListening = () => {
    if (unlistenFn) {
      unlistenFn();
      unlistenFn = null;
    }
  };

  const emitEvent = async (payload: T) => {
    if (!("__TAURI_INTERNALS__" in window)) return;
    await emit(eventName, payload);
  };

  onUnmounted(stopListening);

  return {
    data: readonly(data) as Readonly<Ref<T | null>>,
    error: readonly(error) as Readonly<Ref<Error | null>>,
    startListening,
    stopListening,
    emit: emitEvent,
  };
}
