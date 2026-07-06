/// <reference types="vite/client" />

interface Window {
  // no-op for runtime compatibility
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
      "lord-icon": any;
    }
  }
}

export {};
