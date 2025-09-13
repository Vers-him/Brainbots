import React, { useState } from 'react';
import { Calendar, Clock, User, Plus, CheckCircle, AlertCircle } from 'lucide-react';

export function AppointmentBooking() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCounselor, setSelectedCounselor] = useState('');
  const [appointmentType, setAppointmentType] = useState('');

  const upcomingAppointments = [
    {
      id: 1,
      counselor: 'Dr. Sarah Mitchell',
      date: '2024-01-15',
      time: '2:00 PM',
      type: 'Academic Support',
      status: 'confirmed'
    },
    {
      id: 2,
      counselor: 'Prof. David Lee',
      date: '2024-01-18',
      time: '10:30 AM',
      type: 'Career Guidance',
      status: 'pending'
    }
  ];

  const availableCounselors = [
    { id: '1', name: 'Dr. Sarah Mitchell', specialty: 'Academic Support', availability: 'High' },
    { id: '2', name: 'Prof. David Lee', specialty: 'Career Guidance', availability: 'Medium' },
    { id: '3', name: 'Dr. Emily Rodriguez', specialty: 'Mental Health', availability: 'High' },
    { id: '4', name: 'Mr. James Wilson', specialty: 'Financial Aid', availability: 'Low' },
  ];

  const appointmentTypes = [
    'Academic Support',
    'Career Guidance',
    'Mental Health',
    'Financial Aid',
    'Study Skills',
    'Personal Issues'
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Plus className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Book New Appointment</h2>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Appointment Type
              </label>
              <select
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select appointment type</option>
                {appointmentTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Counselor
              </label>
              <select
                value={selectedCounselor}
                onChange={(e) => setSelectedCounselor(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any available counselor</option>
                {availableCounselors.map((counselor) => (
                  <option key={counselor.id} value={counselor.id}>
                    {counselor.name} - {counselor.specialty}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Briefly describe what you'd like to discuss..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200"
            >
              Book Appointment
            </button>
          </form>
        </div>

        {/* Available Counselors */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <User className="h-5 w-5 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Available Counselors</h2>
          </div>

          <div className="space-y-4">
            {availableCounselors.map((counselor) => (
              <div key={counselor.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{counselor.name}</h3>
                  <div className={`px-2 py-1 text-xs rounded-full ${
                    counselor.availability === 'High' ? 'bg-green-100 text-green-800' :
                    counselor.availability === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {counselor.availability} Availability
                  </div>
                </div>
                <p className="text-sm text-gray-600">{counselor.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Calendar className="h-5 w-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
        </div>

        <div className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {appointment.status === 'confirmed' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      appointment.status === 'confirmed' ? 'text-green-700' : 'text-yellow-700'
                    }`}>
                      {appointment.status.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{appointment.counselor}</h3>
                    <p className="text-sm text-gray-600">{appointment.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{appointment.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 mt-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{appointment.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}