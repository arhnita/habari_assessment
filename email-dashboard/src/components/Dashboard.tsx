import React, { useState, useCallback } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import EmailApp from './EmailApp';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('marketing');

  const handleSectionChange = useCallback((section: string) => {
    setCurrentSection(section);
  }, []);

  const handleSearch = useCallback((search: string) => {
    console.log('Searching for:', search);
  }, []);

  const handleRefresh = useCallback(() => {
    // Implement refresh logic for dashboard
    console.log('Refreshing dashboard...');
  }, []);

  // Chart data
  const acquisitionData = [
    { name: 'March 1', acquisition: 200, cost: 1500 },
    { name: 'March 2', acquisition: 150, cost: 2000 },
    { name: 'March 3', acquisition: 300, cost: 2500 },
    { name: 'March 4', acquisition: 500, cost: 3500 },
    { name: 'March 5', acquisition: 250, cost: 3000 },
    { name: 'March 6', acquisition: 550, cost: 4000 },
    { name: 'March 7', acquisition: 300, cost: 2500 },
  ];

  const trafficData = [
    { name: 'March 1', direct: 120, organic: 40 },
    { name: 'March 2', direct: 100, organic: 60 },
    { name: 'March 3', direct: 80, organic: 80 },
    { name: 'March 4', direct: 140, organic: 40 },
    { name: 'March 5', direct: 120, organic: 60 },
    { name: 'March 6', direct: 100, organic: 80 },
    { name: 'March 7', direct: 110, organic: 50 },
  ];

  const renderMainContent = () => {
    switch (currentSection) {
      case 'marketing':
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Marketing</h1>
              <div className="flex space-x-2">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-black rounded hover:bg-gray-50">
                  7 Days
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-black rounded hover:bg-gray-50">
                  14 Days
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-green-600 rounded hover:bg-green-700">
                  1 Month
                </button>
              </div>
            </div>
            
            {/* Single Grid Layout: 3 columns, 3 rows */}
            <div className="grid grid-cols-3 gap-6">
              {/* Row 1, Col 1: Total Spend */}
              <div className="bg-white rounded-lg border border-black p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Total Spend</h3>
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">💵</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">$8,765</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Previous</span>
                  <span className="text-gray-500">Progress</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-700">$10,234</span>
                  <span className="text-red-600">-14.32%</span>
                </div>
              </div>

              {/* Row 1, Col 2: Visitor */}
              <div className="bg-white rounded-lg border border-black p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Visitor</h3>
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">👥</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">14,321</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Previous</span>
                  <span className="text-gray-500">Progress</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-700">12,543</span>
                  <span className="text-green-600">+14.23%</span>
                </div>
              </div>

              {/* Row 1-2, Col 3: Large Acquisition vs Cost Chart (spans 2 rows) */}
              <div className="row-span-2 bg-white rounded-lg border border-black p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Acquisition vs Cost</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={acquisitionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="acquisition"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', r: 4 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="cost"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: '#10b981', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Row 2, Col 1: Acquisition */}
              <div className="bg-white rounded-lg border border-black p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Acquisition</h3>
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">1,023</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Previous</span>
                  <span className="text-gray-500">Progress</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-700">870</span>
                  <span className="text-green-600">+17.59%</span>
                </div>
              </div>

              {/* Row 2, Col 2: Revenue */}
              <div className="bg-white rounded-lg border border-black p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Revenue</h3>
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">$</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">$18,765</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Previous</span>
                  <span className="text-gray-500">Progress</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-700">$15,432</span>
                  <span className="text-green-600">+21.67%</span>
                </div>
              </div>

              {/* Row 3, Col 1-2: Traffic Source Bar Chart (spans 2 columns) */}
              <div className="col-span-2 bg-white rounded-lg border border-black p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Source</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={trafficData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Bar dataKey="direct" stackId="a" fill="#10b981" />
                      <Bar dataKey="organic" stackId="a" fill="#86efac" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Row 3, Col 2: Budget by Platform */}
              <div className="bg-white rounded-lg border border-black p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget by Platform</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">f</span>
                      </div>
                      <span className="text-sm text-gray-700">Remaining: $12,345</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">𝕏</span>
                      </div>
                      <span className="text-sm text-gray-700">Remaining: $1,543</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">86%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '86%'}}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">G</span>
                      </div>
                      <span className="text-sm text-gray-700">Remaining: $5,678</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">67%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '67%'}}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">♪</span>
                      </div>
                      <span className="text-sm text-gray-700">Remaining: $3,456</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">21%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{width: '21%'}}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">♫</span>
                      </div>
                      <span className="text-sm text-gray-700">Remaining: $2,098</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-400 h-2 rounded-full" style={{width: '35%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Analytics Dashboard</h1>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Data Insights</h3>
              <p className="text-gray-600">View detailed analytics and reports</p>
            </div>
          </div>
        );
      case 'apps-email':
        return <EmailApp />;
      case 'apps-calendar':
      case 'apps-invoice':
      case 'apps-charts':
      case 'apps-widgets':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {currentSection.split('-')[1].charAt(0).toUpperCase() + currentSection.split('-')[1].slice(1)} App
            </h1>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
              <p className="text-gray-600">This application is under development</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} Dashboard</h1>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
              <p className="text-gray-600">This section is under development</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex bg-gray-100">
      <Sidebar 
        onSectionChange={handleSectionChange}
        currentSection={currentSection}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onSearch={handleSearch}
          onRefresh={handleRefresh}
        />
        <main className="flex-1 overflow-y-auto">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;