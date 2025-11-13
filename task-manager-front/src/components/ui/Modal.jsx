import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg transform transition-all">
        
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden text-white">

          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h3 className="text-xl font-bold text-white tracking-wide">
              {title}
            </h3>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6 text-galaxy-100" />
            </button>
          </div>

          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;