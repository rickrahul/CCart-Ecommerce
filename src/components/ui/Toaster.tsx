import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export type Toast = {
  id: string;
  type: ToastType;
  message: string;
};

interface ToasterProps {
  autoClose?: number;
}

// Global toast state and functions
let toasts: Toast[] = [];
let toastListeners: Function[] = [];

export const toast = {
  show: (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { id, type, message };
    toasts = [...toasts, newToast];
    toastListeners.forEach(listener => listener(toasts));
    return id;
  },
  success: (message: string) => toast.show(message, 'success'),
  error: (message: string) => toast.show(message, 'error'),
  info: (message: string) => toast.show(message, 'info'),
  remove: (id: string) => {
    toasts = toasts.filter(t => t.id !== id);
    toastListeners.forEach(listener => listener(toasts));
  },
  clear: () => {
    toasts = [];
    toastListeners.forEach(listener => listener([]));
  }
};

export const Toaster = ({ autoClose = 3000 }: ToasterProps) => {
  const [localToasts, setLocalToasts] = useState<Toast[]>(toasts);

  useEffect(() => {
    const listener = (updatedToasts: Toast[]) => {
      setLocalToasts([...updatedToasts]);
    };
    
    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter(l => l !== listener);
    };
  }, []);

  useEffect(() => {
    if (localToasts.length === 0 || autoClose <= 0) return;
    
    const timer = setTimeout(() => {
      if (localToasts.length > 0) {
        toast.remove(localToasts[0].id);
      }
    }, autoClose);
    
    return () => clearTimeout(timer);
  }, [localToasts, autoClose]);

  if (localToasts.length === 0) return null;

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'error':
        return <AlertCircle className="text-red-500" size={20} />;
      case 'info':
        return <Info className="text-blue-500" size={20} />;
    }
  };

  const getBgColor = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {localToasts.map(t => (
        <div 
          key={t.id}
          className={`flex items-start p-4 rounded-lg shadow-md border ${getBgColor(t.type)} animate-slideIn`}
        >
          <div className="flex-shrink-0 mr-3">
            {getIcon(t.type)}
          </div>
          <div className="flex-1 mr-2">
            <p className="text-gray-800">{t.message}</p>
          </div>
          <button 
            onClick={() => toast.remove(t.id)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};