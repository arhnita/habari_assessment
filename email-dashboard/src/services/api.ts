import axios from 'axios';
import type { EmailsResponse, Email } from '../types';

const API_BASE_URL = 'https://email-list-api-3.onrender.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

// Mock data for development since API might have issues
const mockEmails: Email[] = [
  {
    id: 'email-1',
    userId: 'user-123',
    from: 'john.doe@company.com',
    to: 'sarah.johnson@techcorp.com',
    subject: 'Quarterly Review Meeting',
    body: 'Hi Sarah, I hope this email finds you well. I wanted to schedule our quarterly review meeting...',
    isRead: false,
    isStarred: true,
    isImportant: false,
    hasAttachments: true,
    attachments: [{
      id: 'att-1',
      emailId: 'email-1',
      filename: 'Q4_Report.pdf',
      size: 2048000,
      type: 'application/pdf',
      url: '/uploads/Q4_Report.pdf'
    }],
    labels: ['work', 'meetings'],
    timestamp: '2024-01-15T09:30:00.000Z',
    createdAt: '2024-01-15T09:30:00.000Z',
    updatedAt: '2024-01-15T09:30:00.000Z'
  },
  {
    id: 'email-2',
    userId: 'user-123',
    from: 'noreply@newsletter.com',
    to: 'sarah.johnson@techcorp.com',
    subject: 'Weekly Tech Newsletter #47',
    body: 'This week in technology: AI breakthroughs, new frameworks, and industry insights...',
    isRead: true,
    isStarred: false,
    isImportant: false,
    hasAttachments: false,
    attachments: [],
    labels: ['newsletters'],
    timestamp: '2024-01-14T08:00:00.000Z',
    createdAt: '2024-01-14T08:00:00.000Z',
    updatedAt: '2024-01-14T08:00:00.000Z'
  },
  {
    id: 'email-3',
    userId: 'user-123',
    from: 'team@design.co',
    to: 'sarah.johnson@techcorp.com',
    subject: 'Design System Updates',
    body: 'We have made several updates to our design system components...',
    isRead: false,
    isStarred: false,
    isImportant: true,
    hasAttachments: false,
    attachments: [],
    labels: ['work', 'design'],
    timestamp: '2024-01-13T15:45:00.000Z',
    createdAt: '2024-01-13T15:45:00.000Z',
    updatedAt: '2024-01-13T15:45:00.000Z'
  },
  {
    id: 'email-4',
    userId: 'user-123',
    from: 'alice@marketing.com',
    to: 'sarah.johnson@techcorp.com',
    subject: 'Campaign Performance Report',
    body: 'Here is the performance report for our latest marketing campaign...',
    isRead: true,
    isStarred: false,
    isImportant: false,
    hasAttachments: true,
    attachments: [{
      id: 'att-2',
      emailId: 'email-4',
      filename: 'Campaign_Report.xlsx',
      size: 1024000,
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      url: '/uploads/Campaign_Report.xlsx'
    }],
    labels: ['marketing'],
    timestamp: '2024-01-12T11:20:00.000Z',
    createdAt: '2024-01-12T11:20:00.000Z',
    updatedAt: '2024-01-12T11:20:00.000Z'
  },
  {
    id: 'email-5',
    userId: 'user-123',
    from: 'support@techtools.com',
    to: 'sarah.johnson@techcorp.com',
    subject: 'Your subscription expires soon',
    body: 'Your TechTools subscription will expire in 7 days. Renew now to continue...',
    isRead: false,
    isStarred: false,
    isImportant: false,
    hasAttachments: false,
    attachments: [],
    labels: ['notifications'],
    timestamp: '2024-01-11T16:30:00.000Z',
    createdAt: '2024-01-11T16:30:00.000Z',
    updatedAt: '2024-01-11T16:30:00.000Z'
  }
];

export interface EmailFilters {
  page?: number;
  limit?: number;
  view?: string;
  labels?: string;
  search?: string;
  isRead?: boolean;
  isStarred?: boolean;
  isImportant?: boolean;
  hasAttachments?: boolean;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const emailsApi = {
  async getEmails(filters: EmailFilters = {}): Promise<EmailsResponse> {
    try {
      // Try real API first, fall back to mock data
      const response = await api.get('/emails', { params: filters });
      return response.data;
    } catch (error) {
      console.warn('API unavailable, using mock data:', error);
      
      // Apply filters to mock data
      let filteredEmails = [...mockEmails];
      
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredEmails = filteredEmails.filter(email => 
          email.subject.toLowerCase().includes(searchTerm) ||
          email.from.toLowerCase().includes(searchTerm) ||
          email.body.toLowerCase().includes(searchTerm)
        );
      }
      
      if (filters.view) {
        switch (filters.view) {
          case 'starred':
            filteredEmails = filteredEmails.filter(email => email.isStarred);
            break;
          case 'important':
            filteredEmails = filteredEmails.filter(email => email.isImportant);
            break;
          case 'unread':
            filteredEmails = filteredEmails.filter(email => !email.isRead);
            break;
          // Add more view filters as needed
        }
      }
      
      if (filters.isRead !== undefined) {
        filteredEmails = filteredEmails.filter(email => email.isRead === filters.isRead);
      }
      
      if (filters.isStarred !== undefined) {
        filteredEmails = filteredEmails.filter(email => email.isStarred === filters.isStarred);
      }
      
      if (filters.isImportant !== undefined) {
        filteredEmails = filteredEmails.filter(email => email.isImportant === filters.isImportant);
      }
      
      if (filters.hasAttachments !== undefined) {
        filteredEmails = filteredEmails.filter(email => email.hasAttachments === filters.hasAttachments);
      }
      
      // Sort emails
      filteredEmails.sort((a, b) => {
        const aDate = new Date(a.timestamp).getTime();
        const bDate = new Date(b.timestamp).getTime();
        return filters.sortOrder === 'asc' ? aDate - bDate : bDate - aDate;
      });
      
      // Apply pagination
      const page = filters.page || 1;
      const limit = filters.limit || 15;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedEmails = filteredEmails.slice(startIndex, endIndex);
      
      return {
        success: true,
        data: paginatedEmails,
        pagination: {
          page,
          limit,
          total: filteredEmails.length,
          totalPages: Math.ceil(filteredEmails.length / limit)
        }
      };
    }
  },
  
  async getEmailById(id: string): Promise<Email> {
    try {
      const response = await api.get(`/emails/${id}`);
      return response.data.data;
    } catch (error) {
      console.warn('API unavailable, using mock data');
      const email = mockEmails.find(e => e.id === id);
      if (!email) throw new Error('Email not found');
      return email;
    }
  },
  
  async markAsRead(id: string): Promise<void> {
    try {
      await api.patch(`/emails/${id}/read`);
    } catch (error) {
      console.warn('API unavailable, simulating action');
      // Simulate the action with mock data
      const email = mockEmails.find(e => e.id === id);
      if (email) email.isRead = true;
    }
  },
  
  async toggleStar(id: string): Promise<void> {
    try {
      await api.patch(`/emails/${id}/star`);
    } catch (error) {
      console.warn('API unavailable, simulating action');
      const email = mockEmails.find(e => e.id === id);
      if (email) email.isStarred = !email.isStarred;
    }
  },
  
  async toggleImportant(id: string): Promise<void> {
    try {
      await api.patch(`/emails/${id}/important`);
    } catch (error) {
      console.warn('API unavailable, simulating action');
      const email = mockEmails.find(e => e.id === id);
      if (email) email.isImportant = !email.isImportant;
    }
  }
};

export default api;