"use client";

import { useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  confirmVariant?: "primary" | "secondary" | "ghost";
  destructive?: boolean;
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  destructive = false,
}: ModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/20 backdrop-blur-[2px]"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-md rounded-2xl border border-border bg-paper-elevated p-6 shadow-[var(--shadow-lg)]"
        style={{ boxShadow: "var(--shadow-lg)" }}
      >
        <h2 id="modal-title" className="text-lg font-semibold text-ink">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm text-ink-muted">{description}</p>
        )}
        {children && <div className="mt-4">{children}</div>}
        <div className="mt-6 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            {cancelLabel}
          </Button>
          {onConfirm && (
            <Button
              type="button"
              variant={destructive ? "primary" : "primary"}
              className={destructive ? "bg-red-600 hover:bg-red-700 text-white" : ""}
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirmLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
