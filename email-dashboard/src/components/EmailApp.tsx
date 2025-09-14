import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Inbox, 
  Star, 
  Send, 
  AlertCircle, 
  FileText, 
  Trash2,
  Tag,
  Users,
  Home,
  Building,
  Plus,
  RefreshCw,
  MoreHorizontal,
  Archive,
  Trash
} from 'lucide-react';
import { emailsApi, type EmailCounts } from '../services/api';

interface EmailAppProps {}

const EmailApp: React.FC<EmailAppProps> = () => {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  // Fetch email counts
  const { data: emailCounts } = useQuery({
    queryKey: ['email-counts'],
    queryFn: () => emailsApi.getEmailCounts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Fetch emails from API with caching
  const { data: emailsData, isLoading, error, refetch } = useQuery({
    queryKey: ['emails', selectedFolder],
    queryFn: () => emailsApi.getEmails({ 
      page: 1, 
      limit: 15, 
      sortBy: 'timestamp', 
      sortOrder: 'desc',
      view: selectedFolder === 'inbox' ? 'inbox' : selectedFolder 
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  const emails = emailsData?.data || [];
  const totalCount = emailsData?.pagination?.total || 0;

  const folders = [
    { id: 'inbox', label: 'Inbox', icon: Inbox, count: emailCounts?.inbox || totalCount },
    { id: 'starred', label: 'Starred', icon: Star, count: emailCounts?.starred || 0 },
    { id: 'sent', label: 'Sent', icon: Send, count: emailCounts?.sent || 0 },
    { id: 'important', label: 'Important', icon: AlertCircle, count: emailCounts?.important || 0 },
    { id: 'drafts', label: 'Drafts', icon: FileText, count: emailCounts?.drafts || 0 },
    { id: 'trash', label: 'Trash', icon: Trash2, count: emailCounts?.trash || 0 }
  ];

  // Handler functions
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedEmails(new Set());
      setSelectAll(false);
    } else {
      setSelectedEmails(new Set(emails.map(email => email.id)));
      setSelectAll(true);
    }
  };

  const handleEmailSelect = (emailId: string) => {
    setSelectedEmails(prev => {
      const newSet = new Set(prev);
      if (newSet.has(emailId)) {
        newSet.delete(emailId);
      } else {
        newSet.add(emailId);
      }
      setSelectAll(newSet.size === emails.length && emails.length > 0);
      return newSet;
    });
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleFolderChange = (folderId: string) => {
    setSelectedFolder(folderId);
    setSelectedEmails(new Set());
    setSelectAll(false);
  };

  const labels = [
    { id: 'work', label: 'Work', icon: Building },
    { id: 'family', label: 'Family', icon: Users },
    { id: 'friends', label: 'Friends', icon: Users },
    { id: 'office', label: 'Office', icon: Home }
  ];

  return (
    <div className="flex h-full bg-gray-50">
      {/* Email Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* User Profile Section */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
                alt="Ari budin" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-medium text-gray-900">Ari budin</div>
              <div className="text-sm text-gray-500">Web developer</div>
            </div>
          </div>
          
          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Compose</span>
          </button>
        </div>

        {/* Email Navigation */}
        <div className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1 mb-6">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => handleFolderChange(folder.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded transition-colors ${
                  selectedFolder === folder.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <folder.icon className="h-4 w-4" />
                  <span>{folder.label}</span>
                </div>
                {folder.count > 0 && (
                  <span className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-full">
                    {folder.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Labels Section */}
          <div>
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Labels
            </div>
            <div className="space-y-1">
              {labels.map((label) => (
                <button
                  key={label.id}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
                >
                  <Tag className="h-4 w-4" />
                  <span>{label.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Email Content */}
      <div className="flex-1 flex flex-col">
        {/* Email Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <input 
                type="checkbox" 
                className="rounded" 
                checked={selectAll}
                onChange={handleSelectAll}
              />
              <button 
                onClick={handleRefresh}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 text-gray-500 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                <MoreHorizontal className="h-4 w-4 text-gray-500" />
              </button>
              {selectedEmails.size > 0 && (
                <>
                  <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                    <Archive className="h-4 w-4 text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                    <Trash className="h-4 w-4 text-gray-500" />
                  </button>
                </>
              )}
              <span className="text-sm text-gray-600">
                1-{Math.min(15, emails.length)} of {totalCount}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                <span className="text-sm text-gray-500">←</span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                <span className="text-sm text-gray-500">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Email List */}
        <div className="flex-1 overflow-y-auto bg-white">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
              <span className="ml-2 text-gray-500">Loading emails...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="text-red-500 mb-2">Failed to load emails</div>
                <button 
                  onClick={handleRefresh}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Try again
                </button>
              </div>
            </div>
          ) : emails.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-gray-500">No emails found</div>
            </div>
          ) : (
            emails.map((email) => (
              <div
                key={email.id}
                className={`flex items-center px-6 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                  !email.isRead ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center space-x-4 flex-shrink-0">
                  <input 
                    type="checkbox" 
                    className="rounded" 
                    checked={selectedEmails.has(email.id)}
                    onChange={() => handleEmailSelect(email.id)}
                  />
                  <button className={`p-1 ${email.isStarred ? 'text-yellow-500' : 'text-gray-300'}`}>
                    <Star className={`h-4 w-4 ${email.isStarred ? 'fill-current' : ''}`} />
                  </button>
                </div>
                
                <div className="flex-1 min-w-0 ml-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <span className={`text-sm truncate ${
                        !email.isRead ? 'font-semibold text-gray-900' : 'text-gray-700'
                      }`}>
                        {email.from}
                      </span>
                      <span className={`text-sm truncate ${
                        !email.isRead ? 'font-semibold text-gray-900' : 'text-gray-700'
                      }`}>
                        {email.subject}
                      </span>
                      {email.hasAttachments && (
                        <div className="flex-shrink-0">
                          📎
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 flex-shrink-0">
                      {new Date(email.timestamp).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailApp;