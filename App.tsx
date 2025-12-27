
import React, { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import BoardCreation from './pages/BoardCreation/BoardCreation';
import BoardDetail from './pages/BoardDetail/BoardDetail';
import { BOARDS } from './utils/constants';
import { Board, Task } from './types/board.types';
import { Snack } from './components/Snackbar/Snackbar';

type View = 'dashboard' | 'create-board' | 'board-detail';

const App: React.FC = () => {
  const [view, setView] = useState<View>('dashboard');
  const [boards, setBoards] = useState<Board[]>(BOARDS);
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [snacks, setSnacks] = useState<Snack[]>([]);

  const addSnack = (message: string, type: Snack['type'] = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setSnacks(prev => [...prev, { id, message, type }]);
  };

  const removeSnack = (id: string) => setSnacks(prev => prev.filter(s => s.id !== id));

  const handleCreateNew = () => setView('create-board');
  
  const handleSelectBoard = (board: Board) => {
    setSelectedBoardId(board.id);
    setView('board-detail');
  };

  const handleHome = () => {
    setView('dashboard');
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
    setView('dashboard');
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

  const breadcrumbs = view === 'board-detail' && currentBoard 
    ? [{ label: 'Workspaces', onClick: handleHome }, { label: currentBoard.title }]
    : view === 'create-board' 
    ? [{ label: 'Boards', onClick: handleHome }, { label: 'New Workspace' }]
    : undefined;

  return (
    <MainLayout
      activeItem={view === 'dashboard' ? 'Boards' : undefined}
      breadcrumbs={breadcrumbs}
      showNotifications={showNotifications}
      onToggleNotifications={setShowNotifications}
      onNavigateHome={handleHome}
      onCreateNew={handleCreateNew}
      snacks={snacks}
      onRemoveSnack={removeSnack}
    >
      {view === 'dashboard' && (
        <Dashboard 
          boards={boards} 
          onSelectBoard={handleSelectBoard} 
          onCreateNew={handleCreateNew} 
        />
      )}

      {view === 'create-board' && (
        <div className="p-4 md:p-8 flex items-center justify-center min-h-full">
           <BoardCreation onBack={handleHome} onContinue={handleSaveBoard} />
        </div>
      )}

      {view === 'board-detail' && currentBoard && (
        <BoardDetail 
          board={currentBoard} 
          onBack={handleHome} 
          onUpdateTasks={handleUpdateTasksInBoard} 
          onUpdateBoard={handleUpdateBoard}
          onAddSnack={addSnack}
        />
      )}
    </MainLayout>
  );
};

export default App;
