import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 md:left-auto md:right-12 md:translate-x-0 z-[200] animate-in slide-in-from-bottom-10 duration-500">
      <div className="bg-[#FF9F1C] text-black px-8 py-5 rounded-[2rem] flex items-center gap-4 shadow-2xl shadow-orange-500/20">
        <CheckCircle2 size={24} className="fill-black/10" />
        <span className="text-xs font-black uppercase tracking-[0.3em]">{message}</span>
      </div>
    </div>
  );
};

export default Toast;