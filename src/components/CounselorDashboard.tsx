import React, { useState } from 'react';
import { User } from '../App';
import { 
  Users, 
  AlertTriangle, 
  Calendar, 
  TrendingUp, 
  MessageSquare,
  FileText,
  Target,
  Clock
} from 'lucide-react';

interface CounselorDashboardProps {
  user: User;
}

export function CounselorDashboard({ user }: CounselorDashboardProps) {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const atRiskStudents = [
    {
      id: '1',
      name: 'Emily Chen',
      riskScore: 75,
      lastContact: '3 days ago',
      primaryConcerns: ['Academic Performance', 'Attendance'],
      gpa: 2.1,
      status: 'high-risk'
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      riskScore: 65,
      lastContact: '1 week ago',
      primaryConcerns: ['Financial Stress', 'Engagement'],
      gpa: 2.8,
      status: 'medium-risk'
    },
    {
      id: '3',
      name: 'Sarah Williams',
      riskScore: 45,
      lastContact: '2 days ago',
      primaryConcerns: ['Time Management'],
      gpa: 3.2,
      status: 'low-risk'
    }
  ];

  const upcomingAppointments = [
    {
      id: '1',
      student: 'Alex Johnson',
      time: '2:00 PM',
      type: 'Academic Support',
      status: 'confirmed'
    },
    {
      id: '2',
      student: 'Maria Garcia',
      time: '3:30 PM',
      type: 'Career Guidance',
      status: 'pending'
    },
    {
      id: '3',
      student: 'David Kim',
      time: '4:00 PM',
      type: 'Mental Health',
      status: 'confirmed'
    }
  ];

  const getRiskColor = (status: string) => {
    switch (status) {
      case 'high-risk': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', accent: 'text-red-600' };
      case 'medium-risk': return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', accent: 'text-yellow-600' };
      case 'low-risk': return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', accent: 'text-green-600' };
      default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-800', accent: 'text-gray-600' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome, {user.name}
        </h1>
        <p className="text-gray-600">
          {user.role === 'admin' ? 'System Overview Dashboard' : 'Counselor Dashboard - Manage and support your students'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">127</p>
              <p className="text-sm text-gray-600">Total Students</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">18</p>
              <p className="text-sm text-gray-600">At Risk</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">89%</p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Today's Sessions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* At-Risk Students */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">High Priority Students</h2>
          </div>

          <div className="space-y-4">
            {atRiskStudents.map((student) => {
              const riskColors = getRiskColor(student.status);
              return (
                <div key={student.id} className={`p-4 border rounded-lg ${riskColors.border} ${riskColors.bg}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-600">GPA: {student.gpa}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${riskColors.accent}`}>{student.riskScore}%</div>
                      <div className="text-xs text-gray-600">Risk Score</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="space-y-1">
                      <p className="text-gray-600">Primary Concerns:</p>
                      <div className="flex flex-wrap gap-1">
                        {student.primaryConcerns.map((concern, index) => (
                          <span key={index} className="px-2 py-1 bg-white rounded text-xs">
                            {concern}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600">Last Contact:</p>
                      <p className="font-medium">{student.lastContact}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                      Schedule Session
                    </button>
                    <button className="px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors">
                      <MessageSquare className="h-4 w-4" />
                    </button>
                    <button className="px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors">
                      <FileText className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Today's Appointments */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Today's Schedule</h2>
          </div>

          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{appointment.student}</h3>
                    <p className="text-sm text-gray-600">{appointment.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{appointment.time}</span>
                    </div>
                    <div className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                    Start Session
                  </button>
                  <button className="px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors">
                    Reschedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Performance Analytics</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Target className="h-6 w-6 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Intervention Success</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600 mb-1">87%</p>
            <p className="text-sm text-gray-600">Students improved after intervention</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Users className="h-6 w-6 text-green-600" />
              <h3 className="font-semibold text-gray-900">Retention Rate</h3>
            </div>
            <p className="text-2xl font-bold text-green-600 mb-1">94%</p>
            <p className="text-sm text-gray-600">Students completed the semester</p>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              <h3 className="font-semibold text-gray-900">Early Detection</h3>
            </div>
            <p className="text-2xl font-bold text-yellow-600 mb-1">72%</p>
            <p className="text-sm text-gray-600">At-risk students identified early</p>
          </div>
        </div>
      </div>
    </div>
  );
}