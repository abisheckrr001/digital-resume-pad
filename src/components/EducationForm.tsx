
import React, { useState } from 'react';
import { useResume, Education } from '../contexts/ResumeContext';
import { X } from 'lucide-react';

const EducationForm: React.FC = () => {
  const { resume, addEducation, updateEducation, removeEducation } = useResume();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    field: '',
    graduationYear: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.school && formData.degree) {
      addEducation(formData);
      setFormData({ school: '', degree: '', field: '', graduationYear: '' });
      setShowForm(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEducationUpdate = (id: string, field: string, value: string) => {
    updateEducation(id, { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Education</h3>
          <p className="text-sm text-gray-600">Add your educational background.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          {showForm ? 'Cancel' : 'Add Education'}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-4 rounded-md animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  School/Institution *
                </label>
                <input
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="University Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Degree *
                </label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Bachelor's, Master's, etc."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Field of Study
                </label>
                <input
                  type="text"
                  name="field"
                  value={formData.field}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Computer Science, Business, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Graduation Year
                </label>
                <input
                  type="text"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="2024"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
              >
                Add Education
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {resume.education.map((edu) => (
          <div key={edu.id} className="bg-white border border-gray-200 rounded-md p-4 animate-fade-in">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-medium text-gray-900">{edu.school}</h4>
              <button
                onClick={() => removeEducation(edu.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={edu.school}
                onChange={(e) => handleEducationUpdate(edu.id, 'school', e.target.value)}
                className="text-sm px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="School"
              />
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleEducationUpdate(edu.id, 'degree', e.target.value)}
                className="text-sm px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Degree"
              />
              <input
                type="text"
                value={edu.field}
                onChange={(e) => handleEducationUpdate(edu.id, 'field', e.target.value)}
                className="text-sm px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Field of Study"
              />
              <input
                type="text"
                value={edu.graduationYear}
                onChange={(e) => handleEducationUpdate(edu.id, 'graduationYear', e.target.value)}
                className="text-sm px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Year"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationForm;
