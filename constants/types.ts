// ============================================================
// types.ts
// ============================================================

// User Types
export interface User {
  name: string;
  role: "admin" | "member" | "guest";
  avatar: string;
}

// Notification Types
export interface NotificationDetail {
  title: string;
  when: string;
  body: string;
  action: string;
}

export interface Notification {
  id: number;
  icon: string;
  color: string;
  unread: boolean;
  time: string;
  text: string;
  detail: NotificationDetail;
}

// Program Types
export interface Program {
  title: string;
  subtitle: string;
  time: string;
  desc: string;
  detail: string;
  img: string;
  tags: string[];
  icon: string;
  sparkle: boolean;
}

// Prayer Types
export interface Prayer {
  id: number;
  name: string;
  avatar: string;
  time: string;
  category: string;
  text: string;
  likes: number;
  color: string;
}

// Blog Types
export interface BlogPost {
  id: number;
  author: string;
  authorRole: string;
  avatar: string;
  avatarColor: string;
  date: string;
  readTime: string;
  category: string;
  title: string;
  excerpt: string;
  img: string;
  tags: string[];
  approved: boolean;
}

// Team Types
export interface TeamMember {
  name: string;
  role: string;
  img: string;
  bio: string;
  verse: string;
  years: string;
}

// Event Types
export interface Event {
  month: string;
  day: string;
  title: string;
  detail: string;
  desc: string;
}

// Schedule Types
export interface ScheduleItem {
  time: string;
  title: string;
  loc: string;
  badge: string;
  badgeColor: string;
}

// Modal Types
export interface ModalData {
  type: "program" | "team";
  data: Program | TeamMember;
}

// Sparkle Types
export interface Sparkle {
  id: number;
  x: number;
  y: number;
  color: string;
}

// Toast Types
export interface Toast {
  msg: string;
  type: "success" | "info" | "error";
}

// Blog Form Types
export interface BlogForm {
  title: string;
  category: string;
  excerpt: string;
  content: string;
}

// Login Form Types
export interface LoginForm {
  email: string;
  password: string;
  error: string;
}

// Navigation Props Types
export interface NavigationProps {
  page: string;
  setPage: (page: string) => void;
  user: User | null;
  setLoginOpen: (open: boolean) => void;
  handleLogout: () => void;
  notifOpen: boolean;
  setNotifOpen: (open: boolean) => void;
  unreadCount: number;
  NotifPanel: React.ReactNode;
}