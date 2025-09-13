import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Target, 
  MessageCircle, 
  BarChart3, 
  FileText, 
  ChevronLeft, 
  ChevronRight,
  Play,
  Users,
  Shield,
  Zap,
  Award,
  ArrowRight
} from 'lucide-react';

export function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "AI-Powered Risk Prediction",
      subtitle: "Early Detection, Better Outcomes",
      description: "Our advanced machine learning algorithms analyze student data to predict dropout risk with 95% accuracy, enabling proactive intervention.",
      icon: Target,
      color: "from-blue-600 to-cyan-600",
      link: "/prediction",
      image: "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 2,
      title: "Intelligent Counseling Chatbot",
      subtitle: "24/7 Support at Your Fingertips",
      description: "Get instant, personalized counseling support powered by AI. Our chatbot provides guidance, resources, and emotional support whenever you need it.",
      icon: MessageCircle,
      color: "from-purple-600 to-pink-600",
      link: "/counseling",
      image: "https://images.pexels.com/photos/8471916/pexels-photo-8471916.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 3,
      title: "Comprehensive Analytics Dashboard",
      subtitle: "Data-Driven Insights",
      description: "Visualize student performance, track trends, and make informed decisions with our powerful analytics dashboard and real-time reporting.",
      icon: BarChart3,
      color: "from-green-600 to-teal-600",
      link: "/dashboard",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 4,
      title: "Detailed Progress Reports",
      subtitle: "Track Every Step Forward",
      description: "Generate comprehensive reports on student progress, intervention effectiveness, and success metrics to continuously improve support strategies.",
      icon: FileText,
      color: "from-orange-600 to-red-600",
      link: "/reports",
      image: "https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  const features = [
    {
      icon: Users,
      title: "Student-Centric Design",
      description: "Built by students, for students. Our platform understands the unique challenges of academic life."
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Your data is protected with enterprise-grade security and complete privacy compliance."
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Get instant predictions and responses with our optimized machine learning pipeline."
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "95% accuracy in dropout prediction with measurable improvements in student retention."
    }
  ];

  const stats = [
    { number: "95%", label: "Prediction Accuracy" },
    { number: "1000+", label: "Students Helped" },
    { number: "24/7", label: "Support Available" },
    { number: "50+", label: "Partner Institutions" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Slider */}
      <section className="relative h-screen overflow-hidden">
        {slides.map((slide, index) => {
          const Icon = slide.icon;
          return (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ 
                opacity: index === currentSlide ? 1 : 0,
                x: index === currentSlide ? 0 : 100
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className={`absolute inset-0 bg-gradient-to-r ${slide.color}`}
              style={{ zIndex: index === currentSlide ? 1 : 0 }}
            >
              <div className="absolute inset-0 bg-black/20" />
              <div 
                className="absolute inset-0 bg-cover bg-center mix-blend-overlay"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      className="text-white"
                    >
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-white/80">{slide.subtitle}</h3>
                        </div>
                      </div>
                      
                      <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                        {slide.title}
                      </h1>
                      
                      <p className="text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
                        {slide.description}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                          to={slide.link}
                          className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          <Play className="h-5 w-5" />
                          <span>Learn More</span>
                        </Link>
                        
                        <Link
                          to="/about"
                          className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200"
                        >
                          <span>About Us</span>
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="hidden lg:block"
                    >
                      <div className="relative">
                        <div className="w-96 h-96 bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                          <div className="h-full bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center">
                            <Icon className="h-32 w-32 text-white/80" />
                          </div>
                        </div>
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-2xl font-bold text-gray-900">AI</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center space-x-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Brain-Bots?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI technology with student-centered design 
              to create the most effective dropout prevention system available.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-white"
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Student Success?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of students and educators who are already using Brain-Bots 
              to improve academic outcomes and prevent dropouts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/prediction"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Target className="h-5 w-5" />
                <span>Try Prediction</span>
              </Link>
              <Link
                to="/counseling"
                className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Start Counseling</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}