
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AuthProvider } from '../contexts/AuthContext';
import { ResumeProvider } from '../contexts/ResumeContext';
import AuthForm from '../components/AuthForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ResumeEditor from '../components/ResumeEditor';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  if (!user) {
    return <AuthForm mode={authMode} onToggleMode={toggleAuthMode} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ResumeEditor />
      </main>
      <Footer />
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <AuthProvider>
      <ResumeProvider>
        <AppContent />
      </ResumeProvider>
    </AuthProvider>
  );
};

export default Index;
