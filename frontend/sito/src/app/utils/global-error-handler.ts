/**
 * Registers global handlers for uncaught errors and unhandled promise rejections.
 * It filters out errors originating from browser extensions (e.g., chrome-extension://)
 * to avoid noisy traces caused by third-party extensions.
 * Returns an unregister function to remove the listeners.
 */
export function registerGlobalErrorHandlers(): () => void {
  function isExtensionErrorSource(s?: string | null): boolean {
    return !!s && s.includes('chrome-extension://');
  }

  function onError(event: ErrorEvent) {
    try {
      const fromExt = isExtensionErrorSource(event.filename) || isExtensionErrorSource(event.message);
      if (fromExt) {
        // Ignore extension errors but log a short warning for diagnostics
        console.warn('Ignored extension error:', event.message, event.filename);
        // prevent default browser logging
        if (typeof event.preventDefault === 'function') event.preventDefault();
        return;
      }
      console.error('Uncaught error:', event.message, event.error ?? event);
    } catch (e) {
      // Never throw from an error handler
      console.error('Error in onError handler', e);
    }
  }

  function onRejection(event: PromiseRejectionEvent) {
    try {
      const reasonStr = typeof event.reason === 'string' ? event.reason : String(event.reason ?? '');
      const fromExt = isExtensionErrorSource(reasonStr) || (event.reason && typeof event.reason === 'object' && isExtensionErrorSource((event.reason as any).stack));
      if (fromExt) {
        console.warn('Ignored extension unhandledrejection:', event.reason);
        if (typeof event.preventDefault === 'function') event.preventDefault();
        return;
      }
      console.error('Unhandled rejection:', event.reason);
    } catch (e) {
      console.error('Error in onRejection handler', e);
    }
  }

  window.addEventListener('error', onError);
  window.addEventListener('unhandledrejection', onRejection);

  return () => {
    window.removeEventListener('error', onError);
    window.removeEventListener('unhandledrejection', onRejection);
  };
}
