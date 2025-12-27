
export enum Category {
  Personal = 'Personal',
  Work = 'Work',
  Family = 'Family',
  Project = 'Project',
  Finance = 'Finance'
}

export interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Owner' | 'Editor' | 'Viewer';
  status: 'Online' | 'Offline';
  lastActive: string;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: 'image' | 'file';
  url: string;
}

export interface Reaction {
  emoji: string;
  count: number;
  userReacted: boolean;
}

export interface Comment {
  id: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
  dateLabel?: string;
  reactions?: Reaction[];
  attachment?: Attachment;
  type?: 'comment' | 'activity';
  statusChange?: string;
}

export interface TaskVersion {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  userName: string;
  userAvatar: string;
  changeNote: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: 'Urgent' | 'High' | 'Med' | 'Normal' | 'Low';
  assignees: string[];
  dueDate: string;
  subtasks: Subtask[];
  attachments: Attachment[];
  versions: TaskVersion[];
  progress?: number;
}

export interface Column {
  id: string;
  title: string;
  color: string;
}

export interface Board {
  id: string;
  title: string;
  description?: string;
  category: Category;
  progress: number;
  icon: string;
  gradient: string;
  avatars: string[];
  status: string;
  statusIcon: string;
  statusColor: string;
  taskInfo?: string;
  members: Member[];
  tasks: Task[];
  comments: Comment[];
  columns: Column[];
}

export interface NavItem {
  label: string;
  icon: string;
  active?: boolean;
  colorClass?: string;
}
