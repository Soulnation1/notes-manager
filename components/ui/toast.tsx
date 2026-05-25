"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ToastVariant = "success" | "error";

type Toast = {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
};

type ToastContextValue = {
  showToast: (message: string, variant?: ToastVariant) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);
const TOAST_DURATION = 3500;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "success") => {
      const id = crypto.randomUUID();
      setToasts((prev) => [
        ...prev,
        { id, message, variant, duration: TOAST_DURATION },
      ]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, TOAST_DURATION);
    },
    [],
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed top-4 right-4 z-[60] flex w-[min(22rem,calc(100vw-2rem))] flex-col gap-2"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={[
              "overflow-hidden rounded-lg border text-sm shadow-[var(--shadow-lg)]",
              toast.variant === "success"
                ? "border-accent/30 bg-accent-muted text-accent"
                : "border-red-200 bg-red-50 text-red-700",
            ].join(" ")}
          >
            <div className="px-4 py-3">{toast.message}</div>
            <div className="h-1 bg-black/5">
              <div
                className={[
                  "h-full origin-left animate-[toast-progress_var(--toast-duration)_linear_forwards]",
                  toast.variant === "success" ? "bg-accent" : "bg-red-600",
                ].join(" ")}
                style={
                  {
                    "--toast-duration": `${toast.duration}ms`,
                  } as React.CSSProperties
                }
              />
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
