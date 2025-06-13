"use client";

import { toast as sonnerToast } from "sonner";
import type { ToastProps } from "../components/ui/toast";

interface ToastFunction {
  (message: string, data?: ToastProps): string | number;
  success: (message: string, data?: ToastProps) => string | number;
  error: (message: string, data?: ToastProps) => string | number;
  warning: (message: string, data?: ToastProps) => string | number;
  info: (message: string, data?: ToastProps) => string | number;
  loading: (message: string, data?: ToastProps) => string | number;
  dismiss: (id?: string | number) => void;
  promise: <T>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    },
  ) => string | number;
}

const toast: ToastFunction = (message: string, data?: ToastProps) => {
  const { action, cancel, ...rest } = data || {};

  return sonnerToast(message, {
    description: data?.description,
    duration: data?.duration,
    id: data?.id,
    action: action
      ? {
          label: action.label,
          onClick: action.onClick,
        }
      : undefined,
    cancel: cancel
      ? {
          label: cancel.label,
          onClick: cancel.onClick || (() => {}),
        }
      : undefined,
    ...rest,
  });
};

toast.success = (message: string, data?: ToastProps) => {
  const { action, cancel, ...rest } = data || {};

  return sonnerToast.success(message, {
    description: data?.description,
    duration: data?.duration,
    id: data?.id,
    action: action
      ? {
          label: action.label,
          onClick: action.onClick,
        }
      : undefined,
    cancel: cancel
      ? {
          label: cancel.label,
          onClick: cancel.onClick || (() => {}),
        }
      : undefined,
    ...rest,
  });
};

toast.error = (message: string, data?: ToastProps) => {
  const { action, cancel, ...rest } = data || {};

  return sonnerToast.error(message, {
    description: data?.description,
    duration: data?.duration,
    id: data?.id,
    action: action
      ? {
          label: action.label,
          onClick: action.onClick,
        }
      : undefined,
    cancel: cancel
      ? {
          label: cancel.label,
          onClick: cancel.onClick || (() => {}),
        }
      : undefined,
    ...rest,
  });
};

toast.warning = (message: string, data?: ToastProps) => {
  const { action, cancel, ...rest } = data || {};

  return sonnerToast.warning(message, {
    description: data?.description,
    duration: data?.duration,
    id: data?.id,
    action: action
      ? {
          label: action.label,
          onClick: action.onClick,
        }
      : undefined,
    cancel: cancel
      ? {
          label: cancel.label,
          onClick: cancel.onClick || (() => {}),
        }
      : undefined,
    ...rest,
  });
};

toast.info = (message: string, data?: ToastProps) => {
  const { action, cancel, ...rest } = data || {};

  return sonnerToast.info(message, {
    description: data?.description,
    duration: data?.duration,
    id: data?.id,
    action: action
      ? {
          label: action.label,
          onClick: action.onClick,
        }
      : undefined,
    cancel: cancel
      ? {
          label: cancel.label,
          onClick: cancel.onClick || (() => {}),
        }
      : undefined,
    ...rest,
  });
};

toast.loading = (message: string, data?: ToastProps) => {
  const { action, cancel, ...rest } = data || {};

  return sonnerToast.loading(message, {
    description: data?.description,
    duration: data?.duration,
    id: data?.id,
    action: action
      ? {
          label: action.label,
          onClick: action.onClick,
        }
      : undefined,
    cancel: cancel
      ? {
          label: cancel.label,
          onClick: cancel.onClick || (() => {}),
        }
      : undefined,
    ...rest,
  });
};

toast.dismiss = (id?: string | number) => {
  sonnerToast.dismiss(id);
};

toast.promise = <T>(
  promise: Promise<T>,
  options: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: any) => string);
  },
) => {
  return sonnerToast.promise(promise, options) as string | number;
};

export { toast };
