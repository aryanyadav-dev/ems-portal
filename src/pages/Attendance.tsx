import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Camera, Calendar } from 'lucide-react';
import Webcam from 'react-webcam';

const Attendance = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const handlePunchIn = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
    // Handle punch in logic
  };

  const handlePunchOut = () => {
    // Handle punch out logic
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 max-w-7xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
          <div className="text-right">
            <p className="text-sm text-gray-600">Today's Date</p>
            <p className="text-lg font-semibold text-gray-900">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
            <Clock className="w-6 h-6 text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">Current Time</p>
              <p className="text-xl font-semibold text-gray-900">
                {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
            <MapPin className="w-6 h-6 text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="text-xl font-semibold text-gray-900">
                {location ? `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}` : 'Not detected'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={handlePunchIn}
            className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
          >
            Punch In
          </button>
          <button
            onClick={handlePunchOut}
            className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
          >
            Punch Out
          </button>
        </div>

        {showCamera && (
          <div className="mb-8">
            <Webcam
              audio={false}
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
          </div>
        )}

        <button
          onClick={() => setShowCamera(!showCamera)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
        >
          <Camera className="w-5 h-5" />
          {showCamera ? 'Hide Camera' : 'Show Camera'}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Attendance</h2>
        <div className="space-y-4">
          {[
            { date: '2024-03-18', punchIn: '09:00 AM', punchOut: '05:30 PM', status: 'Present' },
            { date: '2024-03-17', punchIn: '09:15 AM', punchOut: '05:45 PM', status: 'Late' },
            { date: '2024-03-16', punchIn: '08:55 AM', punchOut: '05:30 PM', status: 'Present' },
          ].map((record, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-gray-900">{record.date}</span>
              </div>
              <div className="flex gap-6">
                <span className="text-gray-600">{record.punchIn} - {record.punchOut}</span>
                <span className={`font-medium ${
                  record.status === 'Present' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {record.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Attendance;