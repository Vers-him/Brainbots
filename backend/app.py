from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib
import os
from datetime import datetime
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database setup
DATABASE = 'students.db'

def init_db():
    """Initialize the database with student table"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            attendance REAL NOT NULL,
            gpa REAL NOT NULL,
            participation REAL NOT NULL,
            stress REAL NOT NULL,
            family_income REAL NOT NULL,
            risk_level TEXT NOT NULL,
            risk_score REAL NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

def create_ml_model():
    """Create and train a simple ML model for dropout prediction"""
    # Generate synthetic training data
    np.random.seed(42)
    n_samples = 1000
    
    # Generate features
    attendance = np.random.normal(75, 15, n_samples)
    gpa = np.random.normal(6.5, 1.5, n_samples)
    participation = np.random.normal(6, 2, n_samples)
    stress = np.random.normal(5, 2, n_samples)
    family_income = np.random.normal(50000, 20000, n_samples)
    
    # Clip values to realistic ranges
    attendance = np.clip(attendance, 0, 100)
    gpa = np.clip(gpa, 0, 10)
    participation = np.clip(participation, 1, 10)
    stress = np.clip(stress, 1, 10)
    family_income = np.clip(family_income, 10000, 200000)
    
    # Create features matrix
    X = np.column_stack([attendance, gpa, participation, stress, family_income])
    
    # Generate target variable (risk score) based on features
    # Lower attendance, GPA, participation and higher stress = higher risk
    risk_score = (
        (100 - attendance) * 0.3 +  # Lower attendance = higher risk
        (10 - gpa) * 10 * 0.25 +    # Lower GPA = higher risk
        (10 - participation) * 10 * 0.2 +  # Lower participation = higher risk
        stress * 10 * 0.15 +         # Higher stress = higher risk
        (100000 - family_income) / 1000 * 0.1  # Lower income = higher risk
    )
    
    # Normalize risk score to 0-100 range
    risk_score = np.clip(risk_score, 0, 100)
    
    # Create risk levels
    y = np.where(risk_score < 30, 0,  # Low risk
                np.where(risk_score < 70, 1, 2))  # Medium risk, High risk
    
    # Train model
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_scaled, y)
    
    # Save model and scaler
    joblib.dump(model, 'model.pkl')
    joblib.dump(scaler, 'scaler.pkl')
    
    return model, scaler

def load_or_create_model():
    """Load existing model or create new one"""
    try:
        model = joblib.load('model.pkl')
        scaler = joblib.load('scaler.pkl')
        return model, scaler
    except FileNotFoundError:
        return create_ml_model()

def predict_risk(attendance, gpa, participation, stress, family_income):
    """Predict dropout risk for a student"""
    model, scaler = load_or_create_model()
    
    # Prepare features
    features = np.array([[attendance, gpa, participation, stress, family_income]])
    features_scaled = scaler.transform(features)
    
    # Predict
    risk_class = model.predict(features_scaled)[0]
    risk_proba = model.predict_proba(features_scaled)[0]
    
    # Convert to risk level and score
    risk_levels = ['Low', 'Medium', 'High']
    risk_level = risk_levels[risk_class]
    risk_score = int(risk_proba[risk_class] * 100)
    
    return risk_level, risk_score

def generate_recommendations(attendance, gpa, participation, stress, family_income, risk_level):
    """Generate personalized recommendations based on student data"""
    recommendations = []
    
    if attendance < 75:
        recommendations.append("Improve attendance by setting up a consistent daily routine and identifying barriers to class participation.")
    
    if gpa < 6.0:
        recommendations.append("Consider academic tutoring or study groups to improve your GPA and understanding of course material.")
    
    if participation < 5:
        recommendations.append("Increase class participation by preparing questions beforehand and engaging with course discussions.")
    
    if stress > 7:
        recommendations.append("Practice stress management techniques such as meditation, exercise, or speaking with a counselor.")
    
    if family_income < 30000:
        recommendations.append("Explore financial aid options, scholarships, and part-time work opportunities to reduce financial stress.")
    
    if risk_level == 'High':
        recommendations.append("Schedule an immediate meeting with an academic advisor to create a comprehensive support plan.")
    elif risk_level == 'Medium':
        recommendations.append("Consider joining study groups and utilizing campus support services proactively.")
    else:
        recommendations.append("Continue your excellent work and consider mentoring other students who may need support.")
    
    # Ensure we always have at least 3 recommendations
    if len(recommendations) < 3:
        general_recommendations = [
            "Maintain a healthy work-life balance to support your academic success.",
            "Build strong relationships with professors and classmates for academic and social support.",
            "Take advantage of campus resources such as the library, career center, and wellness programs.",
            "Set specific, measurable academic goals and track your progress regularly.",
            "Develop effective time management skills to balance coursework and personal responsibilities."
        ]
        recommendations.extend(general_recommendations[:3-len(recommendations)])
    
    return recommendations[:5]  # Return max 5 recommendations

@app.route('/api/predict', methods=['POST'])
def predict():
    """Predict dropout risk for a student"""
    try:
        data = request.get_json()
        
        # Extract features
        name = data.get('name', '')
        attendance = float(data.get('attendance', 0))
        gpa = float(data.get('gpa', 0))
        participation = float(data.get('participation', 0))
        stress = float(data.get('stress', 0))
        family_income = float(data.get('family_income', 0))
        
        # Validate inputs
        if not all([name, 0 <= attendance <= 100, 0 <= gpa <= 10, 1 <= participation <= 10, 1 <= stress <= 10, family_income > 0]):
            return jsonify({'error': 'Invalid input data'}), 400
        
        # Predict risk
        risk_level, risk_score = predict_risk(attendance, gpa, participation, stress, family_income)
        
        # Generate recommendations
        recommendations = generate_recommendations(attendance, gpa, participation, stress, family_income, risk_level)
        
        # Store in database
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO students (name, attendance, gpa, participation, stress, family_income, risk_level, risk_score)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (name, attendance, gpa, participation, stress, family_income, risk_level, risk_score))
        conn.commit()
        conn.close()
        
        return jsonify({
            'risk_level': risk_level,
            'risk_score': risk_score,
            'recommendations': recommendations
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/chat', methods=['POST'])
def chat():
    """Simple chatbot for counseling support"""
    try:
        data = request.get_json()
        message = data.get('message', '').lower()
        
        # Simple rule-based responses
        responses = {
            'stress': [
                "I understand you're feeling stressed. It's completely normal to feel overwhelmed sometimes. Here are some strategies that might help: 1) Take deep breaths and practice mindfulness, 2) Break large tasks into smaller, manageable steps, 3) Make sure you're getting enough sleep and exercise, 4) Don't hesitate to reach out to friends, family, or counselors for support.",
                "Stress is a common experience for students. Remember that it's okay to ask for help. Consider talking to a counselor, practicing relaxation techniques, or adjusting your study schedule to be more manageable."
            ],
            'exam': [
                "Exam anxiety is very common! Here are some tips: 1) Create a study schedule and stick to it, 2) Use active learning techniques like flashcards or teaching others, 3) Take regular breaks during study sessions, 4) Get plenty of sleep before the exam, 5) Practice relaxation techniques if you feel anxious.",
                "Preparing for exams can be challenging. Try breaking your study material into smaller chunks, use the Pomodoro technique (25 minutes study, 5 minutes break), and don't forget to take care of your physical health too."
            ],
            'dropout': [
                "I'm concerned to hear you're considering dropping out. This is a big decision that deserves careful consideration. Let's talk about what's making you feel this way. Are there specific challenges you're facing? Remember, there are often resources and support systems available to help you succeed. Would you like to discuss some alternatives or support options?",
                "Thinking about dropping out can be overwhelming. Before making this decision, let's explore what support is available to you. Many students face similar challenges, and there are often solutions we haven't considered yet. What specific issues are you dealing with?"
            ],
            'time': [
                "Time management is a crucial skill for academic success. Here are some strategies: 1) Use a planner or digital calendar, 2) Prioritize tasks using the Eisenhower Matrix (urgent/important), 3) Set specific goals for each study session, 4) Eliminate distractions during study time, 5) Don't forget to schedule breaks and self-care time.",
                "Managing time effectively can make a huge difference in your academic performance and stress levels. Try the time-blocking method: assign specific time slots for different activities, including study, meals, exercise, and relaxation."
            ],
            'help': [
                "I'm here to support you! I can help with academic stress, study strategies, time management, and general student concerns. What specific area would you like to discuss?",
                "You've taken a great step by reaching out for help. I'm here to listen and provide guidance on various topics including stress management, academic challenges, and personal concerns. What's on your mind today?"
            ]
        }
        
        # Find matching response
        response = "Thank you for sharing that with me. I'm here to support you through your academic journey. While I can provide general guidance and resources, please remember that for serious concerns, it's always best to speak with a human counselor or mental health professional. Is there a specific area you'd like to discuss, such as stress management, study techniques, or academic planning?"
        
        for keyword, possible_responses in responses.items():
            if keyword in message:
                response = random.choice(possible_responses)
                break
        
        return jsonify({'response': response})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/students', methods=['GET'])
def get_students():
    """Get all student records for dashboard"""
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, name, attendance, gpa, participation, stress, family_income, 
                   risk_level, risk_score, timestamp
            FROM students
            ORDER BY timestamp DESC
        ''')
        
        students = []
        for row in cursor.fetchall():
            students.append({
                'id': row[0],
                'name': row[1],
                'attendance': row[2],
                'gpa': row[3],
                'participation': row[4],
                'stress': row[5],
                'family_income': row[6],
                'risk_level': row[7],
                'risk_score': row[8],
                'timestamp': row[9]
            })
        
        conn.close()
        return jsonify(students)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Brain-Bots API is running successfully!',
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    # Initialize database and model
    init_db()
    load_or_create_model()
    
    print("🧠 Brain-Bots API Server Starting...")
    print("📊 Database initialized")
    print("🤖 ML Model loaded")
    print("🌐 Server running on http://localhost:5000")
    print("\n📋 Available endpoints:")
    print("  POST /api/predict - Predict dropout risk")
    print("  POST /api/chat - Chat with AI counselor")
    print("  GET /api/students - Get all student records")
    print("  GET /api/health - Health check")
    
    app.run(debug=True, host='0.0.0.0', port=5000)