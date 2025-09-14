import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Briefcase, 
  FolderKanban, 
  Users, 
  Smartphone, 
  Rocket, 
  Component, 
  FileText, 
  Settings,
  User,
  Book,
  ChevronDown,
  ChevronRight,
  Calendar,
  Mail,
  Receipt,
  PieChart,
  Layout
} from 'lucide-react';

interface SidebarProps {
  onSectionChange: (section: string) => void;
  currentSection: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onSectionChange, currentSection }) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const mainNavItems = [
    { id: 'marketing', label: 'Marketing', icon: BarChart3, section: 'marketing' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, section: 'analytics' },
    { id: 'business', label: 'Business', icon: Briefcase, section: 'business' },
    { id: 'project', label: 'Project', icon: FolderKanban, section: 'project' },
    { id: 'hrm', label: 'HRM', icon: Users, section: 'hrm' },
    { id: 'mobile-app', label: 'Mobile App', icon: Smartphone, section: 'mobile-app' },
    { id: 'landingpage', label: 'Landingpage', icon: Rocket, section: 'landingpage' },
  ];

  const expandableItems = [
    { id: 'components', label: 'Components', icon: Component, section: 'components', hasDropdown: true },
    { id: 'pages', label: 'Pages', icon: FileText, section: 'pages', hasDropdown: true },
    { 
      id: 'apps', 
      label: 'Apps', 
      icon: Settings, 
      section: 'apps', 
      hasDropdown: true,
      subItems: [
        { id: 'calendar', label: 'Calendar', icon: Calendar, section: 'apps-calendar' },
        { id: 'email', label: 'Email', icon: Mail, section: 'apps-email' },
        { id: 'invoice', label: 'Invoice', icon: Receipt, section: 'apps-invoice' },
        { id: 'charts', label: 'Charts', icon: PieChart, section: 'apps-charts' },
        { id: 'widgets', label: 'Widgets', icon: Layout, section: 'apps-widgets' },
      ]
    },
    { id: 'content', label: 'Content', icon: FileText, section: 'content', hasDropdown: true },
    { id: 'users', label: 'Users', icon: User, section: 'users', hasDropdown: true },
    { id: 'documentation', label: 'Documentation', icon: Book, section: 'documentation', hasDropdown: true },
  ];

  const handleNavClick = (section: string) => {
    onSectionChange(section);
  };

  const toggleExpanded = (itemId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  return (
    <aside className="w-64 bg-white border-r border-black flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">B</span>
          </div>
          <span className="text-gray-900 font-medium">rutalism</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.section)}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded transition-colors ${
                currentSection === item.section
                  ? 'bg-gray-100 border border-gray-300'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </div>
            </button>
          ))}
          
          {expandableItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.hasDropdown) {
                    toggleExpanded(item.id);
                  } else {
                    handleNavClick(item.section);
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded transition-colors ${
                  currentSection === item.section
                    ? 'bg-gray-100 border border-gray-300'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
                {item.hasDropdown && (
                  expandedSections.has(item.id) ? (
                    <ChevronDown className="h-3 w-3 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-3 w-3 text-gray-400" />
                  )
                )}
              </button>
              
              {/* Sub-items */}
              {item.hasDropdown && expandedSections.has(item.id) && item.subItems && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => handleNavClick(subItem.section)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded transition-colors ${
                        currentSection === subItem.section
                          ? 'bg-gray-100 border border-gray-300'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <subItem.icon className="h-4 w-4" />
                      <span>{subItem.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Upgrade Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-4 border border-black">
          <h3 className="font-medium text-gray-900 mb-2">Upgrade to Pro</h3>
          <p className="text-xs text-gray-600 mb-3">
            Are you looking for more features? Check out our Pro version.
          </p>
          <button className="w-full bg-green-500 text-white py-2 px-3 rounded text-sm font-medium hover:bg-green-600 transition-colors">
            → Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;