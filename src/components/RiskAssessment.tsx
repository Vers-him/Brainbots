import React from 'react';
import { AlertTriangle, CheckCircle, TrendingDown, Brain } from 'lucide-react';

export function RiskAssessment() {
  const riskScore = 25; // Low risk (0-30 low, 31-70 medium, 71-100 high)
  
  const factors = [
    { name: 'Academic Performance', status: 'good', value: 85, trend: 'up' },
    { name: 'Attendance Rate', status: 'excellent', value: 95, trend: 'up' },
    { name: 'Engagement Level', status: 'moderate', value: 65, trend: 'stable' },
    { name: 'Support System', status: 'good', value: 80, trend: 'up' },
    { name: 'Financial Stress', status: 'moderate', value: 60, trend: 'down' },
  ];

  const getRiskColor = (score: number) => {
    if (score <= 30) return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', accent: 'text-green-600' };
    if (score <= 70) return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', accent: 'text-yellow-600' };
    return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', accent: 'text-red-600' };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-green-500';
      case 'moderate': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const riskColors = getRiskColor(riskScore);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <Brain className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">AI Risk Assessment</h2>
          <p className="text-sm text-gray-600">Real-time dropout risk analysis</p>
        </div>
      </div>

      {/* Risk Score */}
      <div className={`${riskColors.bg} ${riskColors.border} border rounded-lg p-6 mb-6`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className={`h-5 w-5 ${riskColors.accent}`} />
            <span className={`font-semibold ${riskColors.text}`}>Low Risk</span>
          </div>
          <div className={`text-2xl font-bold ${riskColors.accent}`}>{riskScore}%</div>
        </div>
        <p className={`${riskColors.text} text-sm`}>
          Great job! Your current indicators suggest you're on track for success. Keep up the excellent work!
        </p>
      </div>

      {/* Risk Factors */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Success Factors</h3>
        {factors.map((factor, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${
                factor.status === 'excellent' ? 'bg-green-500' :
                factor.status === 'good' ? 'bg-green-400' :
                factor.status === 'moderate' ? 'bg-yellow-400' : 'bg-red-400'
              }`}></div>
              <span className="font-medium text-gray-900">{factor.name}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`text-sm font-medium capitalize ${getStatusColor(factor.status)}`}>
                {factor.status}
              </span>
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${factor.value}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 w-8">{factor.value}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">AI Recommendations</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Consider joining a study group to boost engagement levels</li>
          <li>• Schedule a financial aid consultation to reduce stress</li>
          <li>• Maintain your excellent attendance pattern</li>
        </ul>
      </div>
    </div>
  );
}