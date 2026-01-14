import { registerGlobalErrorHandlers } from './global-error-handler';
import { vi } from 'vitest';

describe('registerGlobalErrorHandlers', () => {
  let unregister: () => void;

  beforeEach(() => {
    unregister = registerGlobalErrorHandlers();
  });

  afterEach(() => {
    unregister();
  });

  it('ignores extension ErrorEvent (chrome-extension)', () => {
    vi.spyOn(console, 'warn');
    const ev = new ErrorEvent('error', { filename: 'chrome-extension://kpmb/whatever', message: 'some ext error' });
    window.dispatchEvent(ev);
    expect(console.warn).toHaveBeenCalled();
  });

  it('logs non-extension errors', () => {
    vi.spyOn(console, 'error');
    const ev = new ErrorEvent('error', { filename: '/app/main.js', message: 'app error' });
    window.dispatchEvent(ev);
    expect(console.error).toHaveBeenCalledWith('Uncaught error:', 'app error', undefined);
  });

  it('ignores extension unhandledrejection', () => {
    vi.spyOn(console, 'warn');
    const p = Promise.resolve();
    const ev = new PromiseRejectionEvent('unhandledrejection', { promise: p, reason: 'Error from chrome-extension://something' });
    window.dispatchEvent(ev as unknown as Event);
    expect(console.warn).toHaveBeenCalled();
  });

  it('logs non-extension rejections', () => {
    vi.spyOn(console, 'error');
    const p = Promise.resolve();
    const ev = new PromiseRejectionEvent('unhandledrejection', { promise: p, reason: 'some rejection' });
    window.dispatchEvent(ev as unknown as Event);
    expect(console.error).toHaveBeenCalledWith('Unhandled rejection:', 'some rejection');
  });
});