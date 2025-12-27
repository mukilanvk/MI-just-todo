
import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import NotificationCenter from '../components/NotificationCenter/NotificationCenter';
import Snackbar, { Snack } from '../components/Snackbar/Snackbar';

interface MainLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: { label: string; onClick?: () => void }[];
  showNotifications: boolean;
  onToggleNotifications: (show: boolean) => void;
  onNavigateHome: () => void;
  onCreateNew: () => void;
  snacks: Snack[];
  onRemoveSnack: (id: string) => void;
  activeItem?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  breadcrumbs, 
  showNotifications, 
  onToggleNotifications, 
  onNavigateHome,
  onCreateNew,
  snacks,
  onRemoveSnack,
  activeItem
}) => {
  return (
    <div className="flex h-screen w-full relative bg-slate-50 overflow-hidden font-sans">
      <div className="fixed inset-0 z-0 bg-gradient-mesh pointer-events-none opacity-50" />
      
      <Sidebar 
        onCreateNew={onCreateNew} 
        activeItem={activeItem} 
        onNavigate={(label) => label === 'Home' || label === 'Boards' ? onNavigateHome() : null}
      />

      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <Header 
          onToggleNotifications={() => onToggleNotifications(true)} 
          breadcrumbs={breadcrumbs}
        />

        <div className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide">
          {children}
        </div>
      </main>

      {showNotifications && <NotificationCenter onClose={() => onToggleNotifications(false)} />}
      <Snackbar snacks={snacks} onRemove={onRemoveSnack} />
    </div>
  );
};

export default MainLayout;
