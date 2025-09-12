export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  unreadMessages?: number;
  unreadNotifications?: number;
}

export interface Email {
  id: string;
  userId: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  isRead: boolean;
  isStarred: boolean;
  isImportant: boolean;
  hasAttachments: boolean;
  attachments?: Attachment[];
  labels: string[];
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}

export interface Attachment {
  id: string;
  emailId: string;
  filename: string;
  size: number;
  type: string;
  url: string;
}

export interface EmailsResponse {
  success: boolean;
  data: Email[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
  message: string;
}

export interface Label {
  id: string;
  userId: string;
  name: string;
  color: string;
}