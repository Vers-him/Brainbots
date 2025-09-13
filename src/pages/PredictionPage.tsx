import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Calculator, Download, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

interface PredictionResult {
  risk_level: 'Low' | 'Medium' | 'High';
  risk_score: number;
  recommendations: string[];
}

export function PredictionPage() {
  const [formData, setFormData] = useState({
    name: '',
    attendance: '',
    gpa: '',
    participation: '',
    stress: '',
    family_income: ''
  });
  const [showStressCalculator, setShowStressCalculator] = useState(false);
  const [stressAnswers, setStressAnswers] = useState<number[]>([]);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const stressQuestions = [
    "How often do you feel overwhelmed by your coursework? (1-10)",
    "How would you rate your sleep quality? (1-10, where 10 is excellent)",
    "How often do you feel anxious about your academic performance? (1-10)",
    "How well do you manage your time between studies and personal life? (1-10, where 10 is excellent)",
    "How often do you feel supported by family and friends? (1-10, where 10 is very supported)"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStressAnswer = (questionIndex: number, value: number) => {
    const newAnswers = [...stressAnswers];
    newAnswers[questionIndex] = value;
    setStressAnswers(newAnswers);
  };

  const calculateStress = () => {
    if (stressAnswers.length === 5) {
      // Reverse scoring for questions 2 and 4 (higher is better)
      const adjustedAnswers = stressAnswers.map((answer, index) => {
        if (index === 1 || index === 3 || index === 4) {
          return 11 - answer; // Reverse score
        }
        return answer;
      });
      
      const average = adjustedAnswers.reduce((sum, answer) => sum + answer, 0) / 5;
      setFormData(prev => ({ ...prev, stress: average.toFixed(1) }));
      setShowStressCalculator(false);
      setStressAnswers([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/predict', {
        name: formData.name,
        attendance: parseFloat(formData.attendance),
        gpa: parseFloat(formData.gpa),
        participation: parseFloat(formData.participation),
        stress: parseFloat(formData.stress),
        family_income: parseFloat(formData.family_income)
      });

      setPrediction(response.data);
    } catch (err) {
      setError('Failed to get prediction. Please make sure the backend server is running.');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = () => {
    window.print();
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low':
        return {
          bg: 'from-green-500 to-emerald-500',
          glow: 'shadow-green-500/50',
          animation: 'animate-pulse'
        };
      case 'Medium':
        return {
          bg: 'from-yellow-500 to-orange-500',
          glow: 'shadow-yellow-500/50',
          animation: 'animate-bounce'
        };
      case 'High':
        return {
          bg: 'from-red-500 to-pink-500',
          glow: 'shadow-red-500/50',
          animation: 'animate-pulse'
        };
      default:
        return {
          bg: 'from-gray-500 to-gray-600',
          glow: 'shadow-gray-500/50',
          animation: ''
        };
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low':
        return CheckCircle;
      case 'Medium':
        return AlertCircle;
      case 'High':
        return AlertTriangle;
      default:
        return AlertCircle;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <Target className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Dropout Risk Prediction
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                AI-powered analysis for early intervention
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Prediction Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Student Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Student Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter student name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Attendance (%)
                  </label>
                  <input
                    type="number"
                    name="attendance"
                    value={formData.attendance}
                    onChange={handleInputChange}
                    required
                    min="0"
                    max="100"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="0-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    GPA
                  </label>
                  <input
                    type="number"
                    name="gpa"
                    value={formData.gpa}
                    onChange={handleInputChange}
                    required
                    min="0"
                    max="10"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="0.0-10.0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Participation (1-10)
                  </label>
                  <input
                    type="number"
                    name="participation"
                    value={formData.participation}
                    onChange={handleInputChange}
                    required
                    min="1"
                    max="10"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="1-10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Stress Level (1-10)
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      name="stress"
                      value={formData.stress}
                      onChange={handleInputChange}
                      required
                      min="1"
                      max="10"
                      step="0.1"
                      className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="1-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowStressCalculator(true)}
                      className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Calculator className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Family Income (Annual)
                </label>
                <input
                  type="number"
                  name="family_income"
                  value={formData.family_income}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter annual family income"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  'Predict Risk Level'
                )}
              </button>
            </form>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {prediction && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Prediction Results
                </h2>

                {/* Risk Level Card */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`relative p-8 rounded-2xl bg-gradient-to-r ${getRiskColor(prediction.risk_level).bg} text-white mb-6 shadow-2xl ${getRiskColor(prediction.risk_level).glow}`}
                >
                  <div className={`absolute inset-0 rounded-2xl ${getRiskColor(prediction.risk_level).animation}`} />
                  <div className="relative z-10 text-center">
                    {React.createElement(getRiskIcon(prediction.risk_level), {
                      className: "h-16 w-16 mx-auto mb-4"
                    })}
                    <h3 className="text-3xl font-bold mb-2">
                      {prediction.risk_level} Risk
                    </h3>
                    <p className="text-xl opacity-90">
                      Risk Score: {prediction.risk_score}%
                    </p>
                  </div>
                </motion.div>

                {/* Recommendations */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recommendations
                  </h3>
                  <div className="space-y-2">
                    {prediction.recommendations.map((rec, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-gray-700 dark:text-gray-300">{rec}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleDownloadReport}
                  className="w-full mt-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Report</span>
                </button>
              </div>
            )}

            {/* Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                How It Works
              </h3>
              <div className="space-y-3 text-gray-600 dark:text-gray-400">
                <p>• Our AI model analyzes multiple factors including academic performance, attendance, and stress levels</p>
                <p>• Machine learning algorithms trained on thousands of student records</p>
                <p>• 95% accuracy in predicting dropout risk</p>
                <p>• Personalized recommendations based on individual risk factors</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stress Calculator Modal */}
        {showStressCalculator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Stress Level Calculator
              </h3>
              
              <div className="space-y-6">
                {stressQuestions.map((question, index) => (
                  <div key={index}>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      {index + 1}. {question}
                    </p>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                        <button
                          key={value}
                          onClick={() => handleStressAnswer(index, value)}
                          className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                            stressAnswers[index] === value
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={calculateStress}
                  disabled={stressAnswers.length !== 5}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Calculate Stress Level
                </button>
                <button
                  onClick={() => {
                    setShowStressCalculator(false);
                    setStressAnswers([]);
                  }}
                  className="px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}