'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Square, Terminal } from 'lucide-react';
import { MiniAppSandbox } from './MiniAppSandbox';

interface WindowModalProps {
  id: string;
  title: string;
  appType: 'synth' | 'geometry' | 'spec';
  data?: any;
  isOpen: boolean;
  isMaximized: boolean;
  onClose: () => void;
  onToggleMaximize: () => void;
}

export const WindowModal: React.FC<WindowModalProps> = ({
  title,
  appType,
  data,
  isOpen,
  isMaximized,
  onClose,
  onToggleMaximize,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`window-title-${title}`}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm pointer-events-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.2 }}
          className={`bg-icee-dark border border-icee-border shadow-2xl rounded-xl overflow-hidden flex flex-col transition-all duration-200 ${
            isMaximized
              ? 'w-full h-full max-w-none max-h-none rounded-none'
              : 'w-full max-w-2xl h-[520px]'
          }`}
        >
          {/* OS Window Header / Title Bar */}
          <div className="bg-icee-surface border-b border-icee-border px-4 py-2.5 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-icee-orange" />
              <span id={`window-title-${title}`} className="text-xs font-mono font-bold tracking-wider text-white">
                IceeOS // {title}
              </span>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleMaximize}
                title={isMaximized ? 'Restore Window' : 'Maximize Window'}
                className="w-5 h-5 rounded flex items-center justify-center bg-icee-card hover:bg-icee-border text-icee-text-muted hover:text-white transition-colors cursor-pointer"
              >
                <Square className="w-3 h-3" />
              </button>
              <button
                onClick={onClose}
                title="Close Window"
                className="w-5 h-5 rounded flex items-center justify-center bg-icee-card hover:bg-red-500/20 text-icee-text-muted hover:text-red-400 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Window Body / Interactive Mini-App */}
          <div className="flex-1 overflow-hidden bg-icee-dark/95">
            <MiniAppSandbox appType={appType} data={data} />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
