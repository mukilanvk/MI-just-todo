
import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import NotificationCenter from '../components/NotificationCenter/NotificationCenter';
import Snackbar, { Snack } from '../components/Snackbar/Snackbar';

interface MainLayoutProps {
  children: React.ReactNode;
  showNotifications: boolean;
  onToggleNotifications: (show: boolean) => void;
  onNavigateHome: () => void;
  onNavigateBoards: () => void;
  onNavigateSettings: () => void;
  onNavigateAnalytics?: () => void;
  onCreateNew: () => void;
  snacks: Snack[];
  onRemoveSnack: (id: string) => void;
  activeItem?: string;
  breadcrumbs?: { label: string; onClick?: () => void }[];
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  showNotifications, 
  onToggleNotifications, 
  onNavigateHome,
  onNavigateBoards,
  onNavigateSettings,
  onNavigateAnalytics,
  onCreateNew,
  snacks,
  onRemoveSnack,
  activeItem,
  breadcrumbs
}) => {
  return (
    <div className="flex h-screen w-full relative bg-[#f8fbff] overflow-hidden font-sans">
      <Sidebar 
        onCreateNew={onCreateNew} 
        activeItem={activeItem} 
        onNavigate={(label) => {
          if (label === 'Home') {
            onNavigateHome();
          } else if (label === 'Boards') {
            onNavigateBoards();
          } else if (label === 'Settings') {
            onNavigateSettings();
          } else if (label === 'Analytics') {
            onNavigateAnalytics?.();
          }
        }}
      />

      <main className="flex-1 flex flex-col relative overflow-hidden">
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