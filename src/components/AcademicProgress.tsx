import React from 'react';
import { TrendingUp, BookOpen, Clock, Award } from 'lucide-react';

export function AcademicProgress() {
  const courses = [
    { name: 'Calculus II', grade: 'B+', progress: 85, credits: 4, status: 'on-track' },
    { name: 'Physics I', grade: 'A-', progress: 92, credits: 4, status: 'excellent' },
    { name: 'Computer Science', grade: 'A', progress: 95, credits: 3, status: 'excellent' },
    { name: 'English Literature', grade: 'C+', progress: 70, credits: 3, status: 'needs-attention' },
    { name: 'Statistics', grade: 'B', progress: 80, credits: 3, status: 'on-track' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800' };
      case 'on-track': return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800' };
      case 'needs-attention': return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800' };
      default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-800' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">3.4</p>
              <p className="text-sm text-gray-600">Current GPA</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">17</p>
              <p className="text-sm text-gray-600">Credits Enrolled</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">95%</p>
              <p className="text-sm text-gray-600">Attendance Rate</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Award className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">72</p>
              <p className="text-sm text-gray-600">Credits Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Progress */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Current Courses</h2>
        <div className="space-y-4">
          {courses.map((course, index) => {
            const statusColors = getStatusColor(course.status);
            return (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{course.name}</h3>
                    <p className="text-sm text-gray-600">{course.credits} Credits</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{course.grade}</div>
                    <div className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors.bg} ${statusColors.text}`}>
                      {course.status.replace('-', ' ')}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{course.progress}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Academic Insights */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Academic Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Strengths</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Excellent performance in STEM subjects</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Consistent attendance pattern</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Strong analytical skills</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Areas for Improvement</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-700">English Literature needs more attention</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Consider writing support services</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Time management for multiple assignments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}