
import { Category, Board, NavItem, Member, Task, Comment, Column } from '../types/board.types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', icon: 'home' },
  { label: 'Boards', icon: 'dashboard', active: true },
  { label: 'Analytics', icon: 'bar_chart', colorClass: 'group-hover:text-teal-500' },
  { label: 'Team', icon: 'group', colorClass: 'group-hover:text-purple-500' },
  { label: 'Settings', icon: 'settings', colorClass: 'group-hover:text-orange-500' },
];

export const DEFAULT_COLUMNS: Column[] = [
  { id: 'c1', title: 'To Do', color: 'bg-sky-500' },
  { id: 'c2', title: 'In Progress', color: 'bg-amber-400' },
  { id: 'c3', title: 'Completed', color: 'bg-emerald-400' }
];

export const MOCK_MEMBERS: Member[] = [
  { id: 'm1', name: 'Sarah Jenkins', email: 'sarah@example.com', avatar: 'https://picsum.photos/seed/sarah/40/40', role: 'Owner', status: 'Online', lastActive: 'Just now' },
  { id: 'm2', name: 'David Lee', email: 'david@example.com', avatar: 'https://picsum.photos/seed/david/40/40', role: 'Editor', status: 'Online', lastActive: '2h ago' },
  { id: 'm3', name: 'Elena Gilbert', email: 'elena@example.com', avatar: 'https://picsum.photos/seed/elena/40/40', role: 'Viewer', status: 'Offline', lastActive: '1d ago' },
  { id: 'm4', name: 'Emily Chen', email: 'emily@example.com', avatar: 'https://picsum.photos/seed/emily/40/40', role: 'Editor', status: 'Online', lastActive: '10m ago' },
  { id: 'm5', name: 'Alex M.', email: 'alex@example.com', avatar: 'https://picsum.photos/seed/alex/40/40', role: 'Editor', status: 'Online', lastActive: '5m ago' },
];

export const BOARD_COMMENTS: Comment[] = [
  { 
    id: 'act1', 
    userName: 'Sarah Jenkins', 
    userAvatar: 'https://picsum.photos/seed/sarah/40/40', 
    text: "changed the status to", 
    statusChange: 'Done',
    timestamp: '4:30 PM', 
    dateLabel: 'YESTERDAY',
    type: 'activity'
  },
  { 
    id: 'c1', 
    userName: 'Emily Chen', 
    userAvatar: 'https://picsum.photos/seed/emily/40/40', 
    text: "I've updated the homepage hero section based on the feedback. Please check the new gradients!", 
    timestamp: '10:42 AM',
    dateLabel: 'TODAY',
    type: 'comment',
    reactions: [
      { emoji: '🔥', count: 2, userReacted: false },
      { emoji: '👍', count: 1, userReacted: true }
    ],
    attachment: {
      id: 'att1',
      name: 'Hero_v3_Gradient.png',
      size: '2.4 MB',
      type: 'image',
      url: '#'
    }
  }
];

export const MOCK_TASKS: Task[] = [
  {
    id: 'TSK-1023',
    title: 'Update Landing Page Hero Section',
    description: 'Refine the 3D assets and ensure the copy matches the new brand voice.',
    status: 'In Progress',
    priority: 'High',
    assignees: ['https://picsum.photos/seed/sarah/40/40', 'https://picsum.photos/seed/emily/40/40'],
    dueDate: 'Oct 24, 2023',
    subtasks: [],
    attachments: [],
    versions: []
  }
];

export const BOARDS: Board[] = [
  {
    id: '1',
    title: 'Marketing Campaign Q3',
    category: Category.Work,
    progress: 85,
    icon: 'rocket_launch',
    gradient: 'from-sky-400 to-indigo-500',
    avatars: ['https://picsum.photos/seed/sarah/32/32', 'https://picsum.photos/seed/david/32/32', 'https://picsum.photos/seed/elena/32/32'],
    status: '85% done',
    statusIcon: 'check_circle',
    statusColor: 'text-emerald-500',
    members: MOCK_MEMBERS,
    tasks: MOCK_TASKS,
    comments: BOARD_COMMENTS,
    columns: DEFAULT_COLUMNS
  },
  {
    id: '2',
    title: 'Home Renovation',
    category: Category.Personal,
    progress: 45,
    icon: 'home_work',
    gradient: 'from-orange-400 to-rose-500',
    avatars: ['https://picsum.photos/seed/p1/32/32', 'https://picsum.photos/seed/p2/32/32'],
    status: 'In Progress',
    statusIcon: 'bolt',
    statusColor: 'text-amber-500',
    members: MOCK_MEMBERS,
    tasks: MOCK_TASKS,
    comments: BOARD_COMMENTS,
    columns: DEFAULT_COLUMNS
  },
  {
    id: '3',
    title: 'Financial Q4 Roadmap',
    category: Category.Finance,
    progress: 20,
    icon: 'attach_money',
    gradient: 'from-emerald-400 to-teal-600',
    avatars: ['https://picsum.photos/seed/f1/32/32'],
    status: 'Planning',
    statusIcon: 'calendar_month',
    statusColor: 'text-sky-500',
    members: MOCK_MEMBERS,
    tasks: MOCK_TASKS,
    comments: BOARD_COMMENTS,
    columns: DEFAULT_COLUMNS
  },
  {
    id: '4',
    title: 'Summer Family Trip',
    category: Category.Family,
    progress: 100,
    icon: 'flight_takeoff',
    gradient: 'from-purple-400 to-fuchsia-600',
    avatars: ['https://picsum.photos/seed/t1/32/32', 'https://picsum.photos/seed/t2/32/32', 'https://picsum.photos/seed/t3/32/32'],
    status: 'Completed',
    statusIcon: 'check_circle',
    statusColor: 'text-emerald-500',
    members: MOCK_MEMBERS,
    tasks: MOCK_TASKS,
    comments: BOARD_COMMENTS,
    columns: DEFAULT_COLUMNS
  }
];
