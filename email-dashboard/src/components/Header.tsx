import React, { useState, useCallback } from 'react';
import { Search, RefreshCw, Bell, MessageSquare, Settings, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useDebounce } from '../hooks/useDebounce';

interface HeaderProps {
  onSearch: (search: string) => void;
  onRefresh: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  
  const debouncedSearch = useDebounce(searchTerm, 300);

  React.useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-4 pr-12 py-4 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Search
              className="absolute top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
              style={{ right: '8px' }}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={onRefresh}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
            title="Refresh"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
          
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors">
            <Bell className="h-5 w-5" />
          </button>

          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors">
            <MessageSquare className="h-5 w-5" />
          </button>

          <button 
            onClick={logout}
            className="p-2 text-gray-400 hover:text-red-600 rounded-full transition-colors"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>

          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded transition-colors relative"
          >
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name || 'User'} 
                className="h-8 w-8 rounded-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center ${user?.avatar ? 'hidden' : ''}`}>
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">{user?.name || 'User'}</div>
            </div>
            
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <div className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                  <div className="font-semibold text-gray-900">{user?.name || 'User'}</div>
                  <div className="text-gray-500 text-xs mt-1">{user?.email || 'user@example.com'}</div>
                  <div className="text-gray-400 text-xs mt-1">{user?.role || 'Member'}</div>
                </div>
                <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  <User className="h-4 w-4 mr-3" />
                  Profile
                </button>
                <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button 
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                  }}
                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign out
                </button>
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;