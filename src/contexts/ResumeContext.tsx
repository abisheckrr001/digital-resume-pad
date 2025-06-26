
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  graduationYear: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
  };
  education: Education[];
  experience: Experience[];
  skills: string[];
}

interface ResumeContextType {
  resume: ResumeData;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  updateSkills: (skills: string[]) => void;
  clearResume: () => void;
  saveResume: () => void;
}

const defaultResume: ResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    address: '',
    summary: ''
  },
  education: [],
  experience: [],
  skills: []
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resume, setResume] = useState<ResumeData>(defaultResume);

  useEffect(() => {
    const savedResume = localStorage.getItem('resumeBuilderData');
    if (savedResume) {
      setResume(JSON.parse(savedResume));
    }
  }, []);

  const saveResume = () => {
    localStorage.setItem('resumeBuilderData', JSON.stringify(resume));
  };

  const updatePersonalInfo = (info: Partial<ResumeData['personalInfo']>) => {
    setResume(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  };

  const addEducation = (education: Omit<Education, 'id'>) => {
    const newEducation = { ...education, id: Date.now().toString() };
    setResume(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const updateEducation = (id: string, education: Partial<Education>) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, ...education } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addExperience = (experience: Omit<Experience, 'id'>) => {
    const newExperience = { ...experience, id: Date.now().toString() };
    setResume(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }));
  };

  const updateExperience = (id: string, experience: Partial<Experience>) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, ...experience } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const updateSkills = (skills: string[]) => {
    setResume(prev => ({
      ...prev,
      skills
    }));
  };

  const clearResume = () => {
    setResume(defaultResume);
    localStorage.removeItem('resumeBuilderData');
  };

  // Auto-save whenever resume changes
  useEffect(() => {
    const timer = setTimeout(() => {
      saveResume();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [resume]);

  return (
    <ResumeContext.Provider value={{
      resume,
      updatePersonalInfo,
      addEducation,
      updateEducation,
      removeEducation,
      addExperience,
      updateExperience,
      removeExperience,
      updateSkills,
      clearResume,
      saveResume
    }}>
      {children}
    </ResumeContext.Provider>
  );
};
