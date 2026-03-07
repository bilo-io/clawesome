'use client';

import React from 'react';
import { cn } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, XCircle, X } from 'lucide-react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const variantMap: Record<AlertVariant, { icon: React.ReactNode; classes: string }> = {
  info:    { icon: <Info size={16} />,          classes: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300' },
  success: { icon: <CheckCircle size={16} />,   classes: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' },
  warning: { icon: <AlertTriangle size={16} />, classes: 'bg-amber-500/10 border-amber-500/30 text-amber-300' },
  error:   { icon: <XCircle size={16} />,       classes: 'bg-rose-500/10 border-rose-500/30 text-rose-300' },
};

export const Alert = ({ variant = 'info', title, children, onClose, className }: AlertProps) => {
  const { icon, classes } = variantMap[variant];
  return (
    <div className={cn('flex gap-3 p-4 rounded-2xl border', classes, className)}>
      <span className="shrink-0 mt-0.5">{icon}</span>
      <div className="flex-1 min-w-0">
        {title && <p className="text-sm font-black mb-1">{title}</p>}
        <p className="text-xs opacity-80">{children}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="shrink-0 opacity-60 hover:opacity-100 transition-opacity">
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export interface ToastProps {
  id: string;
  variant?: AlertVariant;
  title?: string;
  message: string;
}

export interface ToastContainerProps {
  toasts: ToastProps[];
  onDismiss: (id: string) => void;
}

export const ToastContainer = ({ toasts, onDismiss }: ToastContainerProps) => (
  <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
    <AnimatePresence>
      {toasts.map(toast => {
        const { icon, classes } = variantMap[toast.variant ?? 'info'];
        return (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            className={cn('flex gap-3 p-4 rounded-2xl border shadow-2xl pointer-events-auto', classes)}
          >
            <span className="shrink-0 mt-0.5">{icon}</span>
            <div className="flex-1 min-w-0">
              {toast.title && <p className="text-sm font-black mb-0.5">{toast.title}</p>}
              <p className="text-xs opacity-80">{toast.message}</p>
            </div>
            <button onClick={() => onDismiss(toast.id)} className="shrink-0 opacity-60 hover:opacity-100">
              <X size={14} />
            </button>
          </motion.div>
        );
      })}
    </AnimatePresence>
  </div>
);
