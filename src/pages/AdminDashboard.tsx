
import React, { useState } from 'react';
import { UserManagement } from '../components/admin/UserManagement';
import { RulesManagement } from '../components/admin/RulesManagement';
import { ModelManagement } from '../components/admin/ModelManagement';
import { Settings, Users, Shield, Database } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  const tabs = [
    { id: 'users', label: 'Управління користувачами', icon: Users, component: UserManagement },
    { id: 'rules', label: 'Управління правилами', icon: Shield, component: RulesManagement },
    { id: 'models', label: 'Управління моделями', icon: Database, component: ModelManagement },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || UserManagement;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <Settings className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">Адмін панель</h1>
          </div>
        </div>
        
        <nav className="mt-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
