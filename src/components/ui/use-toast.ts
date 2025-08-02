import React from 'react';

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: string;
  duration?: number;
}

export function useToast() {
  function toast(options: ToastOptions) {
    // You can integrate a real toast library here. For now, we log to console.
    console.log(options.title, options.description ?? '');
  }

  return { toast };
}
