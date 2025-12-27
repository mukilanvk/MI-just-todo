
import { Category, Board, NavItem, Member, Task, Comment, Column } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', icon: 'home' },
  { label: 'Boards', icon: 'dashboard', active: true },
  { label: 'Analytics', icon: 'bar_chart', colorClass: 'group-hover:text-teal-500' },
  { label: 'Team', icon: 'group', colorClass: 'group-hover:text-purple-500' },
  { label: 'Settings', icon: 'settings', colorClass: 'group-hover:text-orange-500' },
];

const DEFAULT_COLUMNS: Column[] = [
  { id: 'c1', title: 'To Do', color: 'bg-sky-500' },
  { id: 'c2', title: 'In Progress', color: 'bg-amber-400' },
  { id: 'c3', title: 'Completed', color: 'bg-emerald-400' }
];

const MOCK_MEMBERS: Member[] = [
  { id: 'm1', name: 'Sarah Jenkins', email: 'sarah@example.com', avatar: 'https://picsum.photos/seed/sarah/40/40', role: 'Owner', status: 'Online', lastActive: 'Just now' },
  { id: 'm2', name: 'David Lee', email: 'david@example.com', avatar: 'https://picsum.photos/seed/david/40/40', role: 'Editor', status: 'Online', lastActive: '2h ago' },
  { id: 'm3', name: 'Elena Gilbert', email: 'elena@example.com', avatar: 'https://picsum.photos/seed/elena/40/40', role: 'Viewer', status: 'Offline', lastActive: '1d ago' },
  { id: 'm4', name: 'Emily Chen', email: 'emily@example.com', avatar: 'https://picsum.photos/seed/emily/40/40', role: 'Editor', status: 'Online', lastActive: '10m ago' },
  { id: 'm5', name: 'Alex M.', email: 'alex@example.com', avatar: 'https://picsum.photos/seed/alex/40/40', role: 'Editor', status: 'Online', lastActive: '5m ago' },
];

const BOARD_COMMENTS: Comment[] = [
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
  },
  {
    id: 'c2',
    userName: 'Alex M.',
    userAvatar: 'https://picsum.photos/seed/alex/40/40',
    text: "Looks great! Let's ship it. 🚀",
    timestamp: '11:05 AM',
    type: 'comment'
  }
];

const MOCK_TASKS: Task[] = [
  {
    id: 'TSK-1023',
    title: 'Update Landing Page Hero Section',
    description: 'Refine the 3D assets and ensure the copy matches the new brand voice. We need to focus on the lighting effects in the hero banner to match the new "Cyber-Nature" aesthetic.',
    status: 'In Progress',
    priority: 'High',
    assignees: ['https://picsum.photos/seed/sarah/40/40', 'https://picsum.photos/seed/emily/40/40'],
    dueDate: 'Oct 24, 2023',
    subtasks: [
      { id: 's1', title: 'Export 3D assets from Blender', completed: true },
      { id: 's2', title: 'Update copy for the main headline', completed: false },
      { id: 's3', title: 'QA testing on mobile devices', completed: false },
    ],
    attachments: [
      { id: 'att1', name: 'hero_render_v2.png', size: '2.4 MB', type: 'image', url: '#' },
      { id: 'att2', name: 'main_assets.fig', size: '14 MB', type: 'file', url: '#' }
    ],
    versions: [
      { id: 'v1', title: 'Initial Draft', description: 'Created task', timestamp: 'Oct 20 at 9:00 AM', userName: 'Sarah Jenkins', userAvatar: 'https://picsum.photos/seed/sarah/40/40', changeNote: 'Task Created' }
    ]
  },
  {
    id: 'TSK-1024',
    title: 'Approve Final Budget',
    description: 'Review final spend.',
    status: 'To Do',
    priority: 'High',
    assignees: ['https://picsum.photos/seed/david/40/40', 'https://picsum.photos/seed/emily/40/40'],
    dueDate: 'Oct 28, 2023',
    subtasks: [],
    attachments: [],
    versions: [],
    progress: 60
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
  }
];
