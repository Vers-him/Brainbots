import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Filter, ExternalLink, Download, Star, Clock, Users } from 'lucide-react';

export function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'academic', name: 'Academic Support' },
    { id: 'mental-health', name: 'Mental Health' },
    { id: 'financial', name: 'Financial Aid' },
    { id: 'career', name: 'Career Guidance' },
    { id: 'study-skills', name: 'Study Skills' },
    { id: 'time-management', name: 'Time Management' },
  ];

  const resourceTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'article', name: 'Articles' },
    { id: 'video', name: 'Videos' },
    { id: 'guide', name: 'Guides' },
    { id: 'tool', name: 'Tools' },
    { id: 'course', name: 'Courses' },
  ];

  const resources = [
    {
      id: 1,
      title: 'Effective Study Techniques for College Success',
      description: 'Comprehensive guide covering proven study methods, note-taking strategies, and memory techniques.',
      category: 'study-skills',
      type: 'guide',
      rating: 4.8,
      duration: '25 min read',
      downloads: 1247,
      featured: true,
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Managing Academic Stress and Anxiety',
      description: 'Learn practical strategies to cope with academic pressure and maintain mental well-being.',
      category: 'mental-health',
      type: 'video',
      rating: 4.9,
      duration: '18 min',
      downloads: 892,
      featured: true,
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Financial Aid Application Masterclass',
      description: 'Step-by-step guide to applying for scholarships, grants, and student loans.',
      category: 'financial',
      type: 'course',
      rating: 4.7,
      duration: '2 hours',
      downloads: 634,
      featured: false,
      image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      title: 'Time Management for Students',
      description: 'Master the art of balancing academics, work, and personal life with proven time management techniques.',
      category: 'time-management',
      type: 'article',
      rating: 4.6,
      duration: '15 min read',
      downloads: 1156,
      featured: true,
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 5,
      title: 'Career Planning Workbook',
      description: 'Interactive workbook to help you explore career options and create a professional development plan.',
      category: 'career',
      type: 'tool',
      rating: 4.8,
      duration: '45 min',
      downloads: 723,
      featured: false,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 6,
      title: 'Academic Writing Excellence',
      description: 'Improve your writing skills with this comprehensive guide to academic writing and research.',
      category: 'academic',
      type: 'guide',
      rating: 4.5,
      duration: '30 min read',
      downloads: 945,
      featured: false,
      image: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 7,
      title: 'Mindfulness and Meditation for Students',
      description: 'Learn mindfulness techniques to reduce stress, improve focus, and enhance overall well-being.',
      category: 'mental-health',
      type: 'video',
      rating: 4.9,
      duration: '22 min',
      downloads: 1089,
      featured: true,
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 8,
      title: 'Study Group Organization Tool',
      description: 'Digital tool to help you organize and manage effective study groups with your peers.',
      category: 'study-skills',
      type: 'tool',
      rating: 4.4,
      duration: '10 min setup',
      downloads: 567,
      featured: false,
      image: 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const featuredResources = resources.filter(r => r.featured);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥';
      case 'guide': return '📖';
      case 'tool': return '🛠️';
      case 'course': return '🎓';
      default: return '📄';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'academic': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'mental-health': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'financial': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      'career': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      'study-skills': 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400',
      'time-management': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  };

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
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Resource Library
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive collection of student support materials
              </p>
            </div>
          </div>
        </motion.div>

        {/* Featured Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <Star className="h-8 w-8 text-yellow-400" />
              <h2 className="text-3xl font-bold">Featured Resources</h2>
            </div>
            <p className="text-blue-100 mb-6">
              Hand-picked resources to help you succeed academically and personally
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredResources.slice(0, 4).map((resource) => (
                <motion.div
                  key={resource.id}
                  whileHover={{ y: -5 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all"
                >
                  <div className="text-2xl mb-2">{getTypeIcon(resource.type)}</div>
                  <h3 className="font-semibold text-white mb-2 line-clamp-2">
                    {resource.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-blue-100 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{resource.duration}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {resourceTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-48 object-cover"
                />
                {resource.featured && (
                  <div className="absolute top-4 left-4">
                    <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                      <Star className="h-3 w-3" />
                      <span>Featured</span>
                    </div>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <div className="text-2xl bg-white/90 rounded-lg p-2">
                    {getTypeIcon(resource.type)}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(resource.category)}`}>
                    {categories.find(c => c.id === resource.category)?.name}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{resource.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {resource.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{resource.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{resource.downloads}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                    <ExternalLink className="h-4 w-4" />
                    <span>View</span>
                  </button>
                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No resources found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Our AI counseling assistant is available 24/7 
            to provide personalized guidance and support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Chat with AI Counselor
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all">
              Request New Resource
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}