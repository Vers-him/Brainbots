import React, { useState } from 'react';
import { User } from '../App';
import { RiskAssessment } from './RiskAssessment';
import { AcademicProgress } from './AcademicProgress';
import { AppointmentBooking } from './AppointmentBooking';
import { ResourceLibrary } from './ResourceLibrary';
import { MessageCenter } from './MessageCenter';
import { 
  Home, 
  TrendingUp, 
  Calendar, 
  BookOpen, 
  MessageCircle,
  Target,
  Award
} from 'lucide-react';

interface StudentDashboardProps {
  user: User;
}

type TabType = 'overview' | 'progress' | 'appointments' | 'resources' | 'messages';

export function StudentDashboard({ user }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: Home },
    { id: 'progress' as TabType, label: 'Progress', icon: TrendingUp },
    { id: 'appointments' as TabType, label: 'Appointments', icon: Calendar },
    { id: 'resources' as TabType, label: 'Resources', icon: BookOpen },
    { id: 'messages' as TabType, label: 'Messages', icon: MessageCircle },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
        <p className="text-gray-600">Here's your personalized support dashboard</p>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <nav className="flex space-x-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RiskAssessment />
            </div>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Current Goals</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Improve Math Grade</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Attend Study Groups</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Award className="h-5 w-5 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Recent Achievements</h3>
                </div>
                <div className="space-y-2">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800 font-medium">Completed 5 study sessions this week!</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800 font-medium">Improved attendance to 95%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && <AcademicProgress />}
        {activeTab === 'appointments' && <AppointmentBooking />}
        {activeTab === 'resources' && <ResourceLibrary />}
        {activeTab === 'messages' && <MessageCenter />}
      </div>
    </div>
  );
}