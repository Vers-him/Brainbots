import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, Filter, TrendingUp, Users, AlertTriangle } from 'lucide-react';

export function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('last-30-days');

  const reportTypes = [
    { id: 'overview', name: 'Overview Report', icon: TrendingUp },
    { id: 'risk-analysis', name: 'Risk Analysis', icon: AlertTriangle },
    { id: 'student-progress', name: 'Student Progress', icon: Users },
    { id: 'intervention', name: 'Intervention Effectiveness', icon: FileText },
  ];

  const mockReportData = {
    overview: {
      title: 'System Overview Report',
      summary: 'Comprehensive analysis of student performance and risk factors',
      metrics: [
        { label: 'Total Students Analyzed', value: '1,247' },
        { label: 'High Risk Students', value: '89' },
        { label: 'Successful Interventions', value: '156' },
        { label: 'Average Risk Reduction', value: '23%' },
      ],
      insights: [
        'Student engagement has improved by 15% over the last quarter',
        'Early intervention programs show 87% success rate',
        'Financial stress remains the top risk factor for dropout',
        'Students with regular counseling sessions show 40% better outcomes'
      ]
    },
    'risk-analysis': {
      title: 'Risk Analysis Report',
      summary: 'Detailed breakdown of dropout risk factors and predictions',
      metrics: [
        { label: 'Prediction Accuracy', value: '94.7%' },
        { label: 'False Positives', value: '3.2%' },
        { label: 'Early Detection Rate', value: '91.5%' },
        { label: 'Risk Factors Identified', value: '12' },
      ],
      insights: [
        'Academic performance is the strongest predictor of dropout risk',
        'Attendance patterns show early warning signs 6 weeks before critical point',
        'Stress levels correlate strongly with academic decline',
        'Family income impacts retention rates significantly'
      ]
    },
    'student-progress': {
      title: 'Student Progress Report',
      summary: 'Individual and cohort progress tracking and outcomes',
      metrics: [
        { label: 'Students Improved', value: '892' },
        { label: 'Average GPA Increase', value: '0.7' },
        { label: 'Attendance Improvement', value: '12%' },
        { label: 'Completion Rate', value: '88.3%' },
      ],
      insights: [
        'Students using the counseling system show 25% better retention',
        'Regular check-ins improve academic performance by 18%',
        'Peer support programs increase engagement significantly',
        'Personalized intervention plans are 60% more effective'
      ]
    },
    intervention: {
      title: 'Intervention Effectiveness Report',
      summary: 'Analysis of intervention strategies and their success rates',
      metrics: [
        { label: 'Interventions Deployed', value: '234' },
        { label: 'Success Rate', value: '78.2%' },
        { label: 'Average Response Time', value: '2.3 days' },
        { label: 'Cost per Intervention', value: '$127' },
      ],
      insights: [
        'Academic tutoring shows highest success rate at 89%',
        'Financial aid counseling prevents 73% of financial dropouts',
        'Mental health support reduces stress-related departures by 65%',
        'Combined interventions are 45% more effective than single approaches'
      ]
    }
  };

  const currentReport = mockReportData[selectedReport as keyof typeof mockReportData];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Reports & Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive insights and performance metrics
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Report Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Report Types
              </h3>
              <div className="space-y-2">
                {reportTypes.map((report) => {
                  const Icon = report.icon;
                  return (
                    <button
                      key={report.id}
                      onClick={() => setSelectedReport(report.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                        selectedReport === report.id
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{report.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Filters */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Date Range
                </h4>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="last-7-days">Last 7 days</option>
                  <option value="last-30-days">Last 30 days</option>
                  <option value="last-90-days">Last 90 days</option>
                  <option value="last-year">Last year</option>
                  <option value="all-time">All time</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Report Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Report Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {currentReport.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {currentReport.summary}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentReport.metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {metric.value}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {metric.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Insights */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Key Insights
              </h3>
              <div className="space-y-4">
                {currentReport.insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300">{insight}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chart Placeholder */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Trend Analysis
              </h3>
              <div className="h-64 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Interactive charts and visualizations would appear here
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    Connect to real data source for live analytics
                  </p>
                </div>
              </div>
            </div>

            {/* Action Items */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Recommended Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-400 mb-2">
                    Immediate Attention Required
                  </h4>
                  <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                    12 students identified as high-risk need immediate intervention
                  </p>
                </div>
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">
                    System Optimization
                  </h4>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    Update prediction model with latest performance data
                  </p>
                </div>
                <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20">
                  <h4 className="font-semibold text-green-800 dark:text-green-400 mb-2">
                    Success Stories
                  </h4>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    Document and replicate successful intervention strategies
                  </p>
                </div>
                <div className="p-4 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-400 mb-2">
                    Resource Allocation
                  </h4>
                  <p className="text-purple-700 dark:text-purple-300 text-sm">
                    Increase counseling capacity for high-demand periods
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}