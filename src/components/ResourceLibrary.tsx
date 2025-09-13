import React, { useState } from 'react';
import { BookOpen, Video, FileText, ExternalLink, Star, Search } from 'lucide-react';

export function ResourceLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const resources = [
    {
      id: 1,
      title: 'Effective Study Techniques for Success',
      type: 'article',
      category: 'study-skills',
      description: 'Learn proven methods to improve your learning and retention.',
      rating: 4.8,
      duration: '15 min read',
      recommended: true
    },
    {
      id: 2,
      title: 'Managing Academic Stress',
      type: 'video',
      category: 'mental-health',
      description: 'Practical strategies for handling academic pressure.',
      rating: 4.9,
      duration: '12 min',
      recommended: true
    },
    {
      id: 3,
      title: 'Financial Aid Application Guide',
      type: 'document',
      category: 'financial',
      description: 'Step-by-step guide to applying for financial assistance.',
      rating: 4.7,
      duration: '20 min read',
      recommended: false
    },
    {
      id: 4,
      title: 'Time Management Masterclass',
      type: 'video',
      category: 'study-skills',
      description: 'Learn to balance academics, work, and personal life.',
      rating: 4.6,
      duration: '25 min',
      recommended: true
    },
    {
      id: 5,
      title: 'Career Planning Workbook',
      type: 'document',
      category: 'career',
      description: 'Interactive workbook for planning your career path.',
      rating: 4.8,
      duration: '45 min read',
      recommended: false
    },
    {
      id: 6,
      title: 'Mindfulness for Students',
      type: 'article',
      category: 'mental-health',
      description: 'Introduction to mindfulness practices for better focus.',
      rating: 4.5,
      duration: '10 min read',
      recommended: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'study-skills', name: 'Study Skills' },
    { id: 'mental-health', name: 'Mental Health' },
    { id: 'financial', name: 'Financial' },
    { id: 'career', name: 'Career' }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'document': return FileText;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-600';
      case 'document': return 'bg-blue-100 text-blue-600';
      default: return 'bg-green-100 text-green-600';
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const recommendedResources = resources.filter(r => r.recommended);

  return (
    <div className="space-y-6">
      {/* Recommended Resources */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border border-blue-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Star className="h-5 w-5 text-yellow-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Recommended for You</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedResources.slice(0, 3).map((resource) => {
            const Icon = getTypeIcon(resource.type);
            return (
              <div key={resource.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(resource.type)}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{resource.rating}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{resource.duration}</span>
                  <button className="text-blue-600 hover:text-blue-700 transition-colors">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* All Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((resource) => {
            const Icon = getTypeIcon(resource.type);
            return (
              <div key={resource.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(resource.type)}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                      {resource.recommended && (
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600">{resource.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">{resource.duration}</span>
                      </div>
                      <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors text-sm">
                        <span>View</span>
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600">Try adjusting your search terms or category filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}