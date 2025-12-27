
import React, { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import BoardsList from './pages/Boards/BoardsList';
import BoardCreation from './pages/BoardCreation/BoardCreation';
import BoardDetail from './pages/BoardDetail/BoardDetail';
import SettingsPage from './pages/Settings/Settings';
import AnalyticsPage from './pages/Analytics/Analytics';
import Landing from './pages/Landing/Landing';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { BOARDS } from './utils/constants';
import { Board, Task } from './types/board.types';
import { Snack } from './components/Snackbar/Snackbar';

type View = 'landing' | 'login' | 'register' | 'home' | 'boards-list' | 'create-board' | 'board-detail' | 'settings' | 'analytics';

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [boards, setBoards] = useState<Board[]>(BOARDS);
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addSnack = (message: string, type: Snack['type'] = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setSnacks(prev => [...prev, { id, message, type }]);
  };

  const removeSnack = (id: string) => setSnacks(prev => prev.filter(s => s.id !== id));

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setView('home');
    addSnack("Welcome back to your workspace!", "success");
  };

  const handleRegisterSuccess = () => {
    setIsLoggedIn(true);
    setView('home');
    addSnack("Account created successfully! Welcome.", "success");
  };

  const handleCreateNew = () => setView('create-board');
  
  const handleSelectBoard = (board: Board) => {
    setSelectedBoardId(board.id);
    setView('board-detail');
  };

  const handleNavigateHome = () => {
    setView('home');
    setSelectedBoardId(null);
  };

  const handleNavigateBoards = () => {
    setView('boards-list');
    setSelectedBoardId(null);
  };

  const handleNavigateSettings = () => {
    setView('settings');
    setSelectedBoardId(null);
  };

  const handleNavigateAnalytics = () => {
    setView('analytics');
    setSelectedBoardId(null);
  };

  const handleSaveBoard = (boardData: Partial<Board>) => {
    if (view === 'create-board') {
      const newBoard: Board = {
        ...boardData as Board,
        id: (boards.length + 1).toString(),
        avatars: ['https://picsum.photos/seed/p1/32/32'],
      };
      setBoards(prev => [...prev, newBoard]);
      addSnack(`${boardData.title} created successfully!`);
    }
    setView('boards-list');
  };

  const currentBoard = boards.find(b => b.id === selectedBoardId);

  const handleUpdateBoard = (updates: Partial<Board>) => {
    if (!selectedBoardId) return;
    setBoards(prev => prev.map(b => b.id === selectedBoardId ? { ...b, ...updates } : b));
    if (updates.title || updates.icon || updates.gradient) {
      addSnack('Workspace settings updated!');
    }
  };

  const handleUpdateTasksInBoard = (updatedTasks: Task[]) => {
    handleUpdateBoard({ tasks: updatedTasks });
  };

  if (view === 'landing') {
    return <Landing onLogin={() => setView('login')} onRegister={() => setView('register')} />;
  }

  if (view === 'login') {
    return <Login onLogin={handleAuthSuccess} onRegister={() => setView('register')} onBack={() => setView('landing')} />;
  }

  if (view === 'register') {
    return <Register onLogin={() => setView('login')} onRegister={handleRegisterSuccess} onBack={() => setView('landing')} />;
  }

  const breadcrumbs = view === 'board-detail' && currentBoard 
    ? [{ label: 'Boards', onClick: handleNavigateBoards }, { label: currentBoard.title }]
    : view === 'create-board' 
    ? [{ label: 'Boards', onClick: handleNavigateBoards }, { label: 'New Workspace' }]
    : view === 'boards-list'
    ? [{ label: 'Boards' }]
    : view === 'settings'
    ? [{ label: 'Settings' }]
    : view === 'analytics'
    ? [{ label: 'Analytics' }]
    : [{ label: 'Home' }];

  return (
    <MainLayout
      activeItem={view === 'home' ? 'Home' : view === 'boards-list' ? 'Boards' : view === 'settings' ? 'Settings' : view === 'analytics' ? 'Analytics' : undefined}
      breadcrumbs={breadcrumbs}
      showNotifications={showNotifications}
      onToggleNotifications={setShowNotifications}
      onNavigateHome={handleNavigateHome}
      onNavigateBoards={handleNavigateBoards}
      onNavigateSettings={handleNavigateSettings}
      onNavigateAnalytics={handleNavigateAnalytics}
      onCreateNew={handleCreateNew}
      snacks={snacks}
      onRemoveSnack={removeSnack}
    >
      {view === 'home' && (
        <Dashboard />
      )}

      {view === 'boards-list' && (
        <BoardsList 
          boards={boards} 
          onSelectBoard={handleSelectBoard} 
          onCreateNew={handleCreateNew} 
        />
      )}

      {view === 'create-board' && (
        <div className="p-4 md:p-8 flex items-center justify-center min-h-full">
           <BoardCreation onBack={handleNavigateBoards} onContinue={handleSaveBoard} />
        </div>
      )}

      {view === 'board-detail' && currentBoard && (
        <BoardDetail 
          board={currentBoard} 
          onBack={handleNavigateBoards} 
          onUpdateTasks={handleUpdateTasksInBoard} 
          onUpdateBoard={handleUpdateBoard}
          onAddSnack={addSnack}
        />
      )}

      {view === 'settings' && (
        <SettingsPage onSave={() => addSnack("Settings saved successfully!")} />
      )}

      {view === 'analytics' && (
        <AnalyticsPage />
      )}
    </MainLayout>
  );
};

export default App;