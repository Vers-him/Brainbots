import React, { useState } from 'react';
import { Brain, Users, GraduationCap, Shield } from 'lucide-react';
import { User } from '../App';

interface LoginFormProps {
  onLogin: (user: User) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [selectedRole, setSelectedRole] = useState<'student' | 'counselor' | 'admin' | null>(null);

  const handleRoleLogin = (role: 'student' | 'counselor' | 'admin') => {
    const mockUsers = {
      student: {
        id: '1',
        name: 'Alex Johnson',
        email: 'alex.johnson@university.edu',
        role: role,
      },
      counselor: {
        id: '2',
        name: 'Dr. Sarah Mitchell',
        email: 'sarah.mitchell@university.edu',
        role: role,
      },
      admin: {
        id: '3',
        name: 'Michael Chen',
        email: 'michael.chen@university.edu',
        role: role,
      },
    };

    onLogin(mockUsers[role] as User);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mx-auto mb-4">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">EduSupport AI</h1>
          <p className="text-gray-600">AI-Powered Dropout Prevention & Counselling System</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-center text-gray-800 mb-6">Select Your Role</h2>
          
          <button
            onClick={() => handleRoleLogin('student')}
            className="w-full flex items-center space-x-4 p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-all hover:shadow-md group"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Student</h3>
              <p className="text-sm text-gray-600">Access your progress, get counselling, and receive AI-powered support</p>
            </div>
          </button>

          <button
            onClick={() => handleRoleLogin('counselor')}
            className="w-full flex items-center space-x-4 p-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl transition-all hover:shadow-md group"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Counselor</h3>
              <p className="text-sm text-gray-600">Manage students, track interventions, and provide support</p>
            </div>
          </button>

          <button
            onClick={() => handleRoleLogin('admin')}
            className="w-full flex items-center space-x-4 p-4 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition-all hover:shadow-md group"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Administrator</h3>
              <p className="text-sm text-gray-600">System oversight, analytics, and institutional management</p>
            </div>
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Demo system - Click any role to explore the platform</p>
        </div>
      </div>
    </div>
  );
}