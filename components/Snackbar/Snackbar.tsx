
import React, { useEffect } from 'react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export interface Snack {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface SnackbarProps {
  snacks: Snack[];
  onRemove: (id: string) => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ snacks, onRemove }) => {
  return (
    <div className="fixed top-6 right-6 z-[300] flex flex-col gap-3 pointer-events-none">
      {snacks.map((snack) => (
        <SnackItem key={snack.id} snack={snack} onRemove={onRemove} />
      ))}
    </div>
  );
};

const SnackItem: React.FC<{ snack: Snack; onRemove: (id: string) => void }> = ({ snack, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(snack.id), 3500);
    return () => clearTimeout(timer);
  }, [snack.id, onRemove]);

  const getIcon = () => {
    switch (snack.type) {
      case 'success': return <CheckCircle2 size={20} />;
      case 'info': return <Info size={20} />;
      case 'error': return <AlertCircle size={20} />;
    }
  };

  const colors = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    info: 'bg-sky-50 border-sky-200 text-sky-800',
    error: 'bg-rose-50 border-rose-200 text-rose-800',
  };

  return (
    <div className={`pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-2xl border shadow-xl animate-slide-in min-w-[280px] glass-panel ${colors[snack.type]}`}>
      {getIcon()}
      <p className="text-sm font-bold flex-1">{snack.message}</p>
      <button onClick={() => onRemove(snack.id)} className="opacity-50 hover:opacity-100 transition-opacity">
        <X size={18} />
      </button>
    </div>
  );
};

export default Snackbar;
