// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import RecruiterDashboard from './pages/RecruiterDashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import ProfilePage from './pages/ProfilePage';
import AnalyticsAndMetricsPage from './pages/AnalyticsAndMetricsPage';
import InterviewsPage from './pages/InterviewsPage';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
        <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/analytics" element={<AnalyticsAndMetricsPage />} />
        <Route path="/interviews" element={<InterviewsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
