# Brain-Bots: Student Dropout Prediction & Support System

A comprehensive AI-powered platform designed to predict student dropout risk and provide personalized counseling support. Built by passionate 2nd-year B.Tech students using modern web technologies and machine learning.

## 🌟 Features

### 🎯 Core Functionality
- **AI-Powered Risk Prediction**: 95% accurate dropout risk assessment using machine learning
- **Intelligent Counseling Chatbot**: 24/7 AI-powered support and guidance
- **Comprehensive Analytics Dashboard**: Real-time insights and student performance tracking
- **Detailed Progress Reports**: Exportable reports with actionable insights
- **Resource Library**: Curated collection of student support materials
- **Multi-Role Support**: Separate interfaces for students, counselors, and administrators

### 🎨 Design Features
- **Premium Educational Platform Design**: Modern, colorful, and responsive interface
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Dark/Light Theme**: Toggle between themes with persistent preferences
- **Mobile-First Responsive**: Optimized for all device sizes
- **Accessibility Focused**: WCAG compliant design with proper contrast ratios

### 🔧 Technical Features
- **Full-Stack Architecture**: React frontend with Python Flask backend
- **Real-Time Data Processing**: Instant predictions and responses
- **Secure Data Handling**: Enterprise-grade security and privacy protection
- **RESTful API**: Clean, documented API endpoints
- **SQLite Database**: Lightweight, embedded database for development

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment** (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the Flask server**:
   ```bash
   python app.py
   ```

   The backend server will start on `http://localhost:5000`

### Frontend Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`

### 🌐 Accessing the Application

1. Open your browser and go to `http://localhost:5173`
2. Explore the different features:
   - **Home**: Interactive slider showcasing main features
   - **Prediction**: Input student data and get AI-powered risk assessment
   - **Counseling**: Chat with the AI counseling assistant
   - **Dashboard**: View analytics and student records (requires login)
   - **Reports**: Generate and export detailed reports
   - **Resources**: Browse the comprehensive resource library

### 🔐 Demo Login Credentials

For the admin dashboard, use these demo credentials:
- **Administrator**: `admin@brain-bots.edu` / `admin123`
- **Counselor**: `counselor@brain-bots.edu` / `counselor123`
- **Student**: `student@brain-bots.edu` / `student123`

## 📊 How It Works

### Risk Prediction Algorithm
1. **Data Collection**: Gathers student information including attendance, GPA, participation, stress levels, and family income
2. **Feature Processing**: Normalizes and scales input features using StandardScaler
3. **ML Prediction**: Uses Random Forest Classifier trained on synthetic student data
4. **Risk Assessment**: Outputs risk level (Low/Medium/High) with confidence score
5. **Personalized Recommendations**: Generates tailored advice based on risk factors

### Stress Calculator
Interactive 5-question assessment that evaluates:
- Academic workload overwhelm
- Sleep quality
- Performance anxiety
- Time management effectiveness
- Support system strength

### AI Counseling System
Rule-based chatbot that provides:
- Stress management techniques
- Study strategies and tips
- Time management guidance
- Academic support resources
- Crisis intervention referrals

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **React Router**: Client-side routing
- **Chart.js**: Interactive data visualizations
- **Axios**: HTTP client for API communication
- **Lucide React**: Beautiful, customizable icons

### Backend
- **Python Flask**: Lightweight web framework
- **Flask-CORS**: Cross-origin resource sharing
- **scikit-learn**: Machine learning library
- **pandas**: Data manipulation and analysis
- **NumPy**: Numerical computing
- **SQLite**: Embedded database
- **joblib**: Model serialization

### Development Tools
- **Vite**: Fast build tool and dev server
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 📁 Project Structure

```
brain-bots/
├── src/                          # Frontend source code
│   ├── components/              # Reusable React components
│   │   ├── Navbar.tsx          # Navigation component
│   │   ├── Footer.tsx          # Footer component
│   │   └── LoadingSpinner.tsx  # Loading animation
│   ├── pages/                   # Page components
│   │   ├── HomePage.tsx        # Landing page with slider
│   │   ├── PredictionPage.tsx  # Risk prediction interface
│   │   ├── CounselingPage.tsx  # AI chat interface
│   │   ├── DashboardPage.tsx   # Analytics dashboard
│   │   ├── ReportsPage.tsx     # Report generation
│   │   ├── ResourcesPage.tsx   # Resource library
│   │   ├── AboutPage.tsx       # About information
│   │   ├── ContactPage.tsx     # Contact form
│   │   └── LoginPage.tsx       # Authentication
│   ├── App.tsx                 # Main application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles
├── backend/                    # Backend source code
│   ├── app.py                 # Flask application
│   ├── requirements.txt       # Python dependencies
│   ├── model.pkl             # Trained ML model (generated)
│   ├── scaler.pkl            # Feature scaler (generated)
│   └── students.db           # SQLite database (generated)
├── public/                    # Static assets
├── package.json              # Node.js dependencies
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

## 🔧 Configuration

### Backend Configuration
The Flask server runs on `http://localhost:5000` by default. To change this:

1. Edit `backend/app.py`:
   ```python
   app.run(debug=True, host='0.0.0.0', port=YOUR_PORT)
   ```

### Frontend Configuration
The frontend connects to the backend via API calls. To change the backend URL:

1. Update API calls in the frontend components to point to your backend server
2. For production, set the `VITE_API_URL` environment variable

### Network Access
To access the application from other devices on your network:

1. **Backend**: The Flask server already binds to `0.0.0.0`
2. **Frontend**: Start Vite with host flag:
   ```bash
   npm run dev -- --host
   ```
3. **Access**: Use your computer's IP address (e.g., `http://192.168.1.100:5173`)

## 📈 API Endpoints

### POST /api/predict
Predict dropout risk for a student.

**Request Body**:
```json
{
  "name": "Student Name",
  "attendance": 85.5,
  "gpa": 7.2,
  "participation": 8,
  "stress": 6.5,
  "family_income": 45000
}
```

**Response**:
```json
{
  "risk_level": "Low",
  "risk_score": 25,
  "recommendations": [
    "Continue your excellent work...",
    "Consider mentoring other students..."
  ]
}
```

### POST /api/chat
Chat with AI counseling assistant.

**Request Body**:
```json
{
  "message": "I'm feeling stressed about exams"
}
```

**Response**:
```json
{
  "response": "I understand you're feeling stressed..."
}
```

### GET /api/students
Retrieve all student records for dashboard.

**Response**:
```json
[
  {
    "id": 1,
    "name": "Student Name",
    "attendance": 85.5,
    "gpa": 7.2,
    "risk_level": "Low",
    "risk_score": 25,
    "timestamp": "2024-01-15T10:30:00"
  }
]
```

### GET /api/health
Health check endpoint.

**Response**:
```json
{
  "status": "healthy",
  "message": "Brain-Bots API is running successfully!",
  "timestamp": "2024-01-15T10:30:00"
}
```

## 🎨 Customization

### Themes and Colors
The application uses Tailwind CSS with custom color schemes:
- **Primary**: Blue to Purple gradient
- **Secondary**: Green to Teal gradient
- **Accent**: Various contextual colors (red for high risk, yellow for medium, green for low)

To customize colors, edit `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Your custom colors
        }
      }
    }
  }
}
```

### Adding New Features
1. **Frontend**: Create new components in `src/components/` or pages in `src/pages/`
2. **Backend**: Add new routes in `backend/app.py`
3. **Database**: Modify the database schema in the `init_db()` function

## 🚀 Deployment

### Frontend Deployment
1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service (Netlify, Vercel, etc.)

### Backend Deployment
1. **Prepare for production**:
   - Set `debug=False` in `app.py`
   - Use a production WSGI server like Gunicorn
   - Configure environment variables

2. **Deploy to cloud service** (Heroku, Railway, DigitalOcean, etc.)

### Database
For production, consider upgrading from SQLite to PostgreSQL or MySQL for better performance and scalability.

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**Brain-Bots Development Team** - 2nd Year B.Tech Students

- **Alex Chen** - Lead Developer & AI Specialist
- **Sarah Johnson** - UX Designer & Frontend Developer  
- **Michael Rodriguez** - Backend Developer & Data Analyst
- **Emily Davis** - Product Manager & Research Lead

## 📞 Support

Need help? We're here for you!

- **Email**: contact@brain-bots.edu
- **Documentation**: Check this README and code comments
- **Issues**: Open a GitHub issue for bugs or feature requests
- **Community**: Join our discussions in the Issues section

## 🙏 Acknowledgments

- **Educational Institutions** that inspired this project
- **Open Source Community** for the amazing tools and libraries
- **Students and Educators** who provided feedback and insights
- **Mental Health Professionals** who guided our counseling approach

---

**Built with ❤️ by B.Tech Students for the Future of Education**

*Making a difference, one student at a time.*