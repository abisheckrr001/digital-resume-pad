
import React, { useState } from 'react';
import { useResume } from '../contexts/ResumeContext';
import { X } from 'lucide-react';

const SkillsForm: React.FC = () => {
  const { resume, updateSkills } = useResume();
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !resume.skills.includes(newSkill.trim())) {
      updateSkills([...resume.skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    updateSkills(resume.skills.filter(skill => skill !== skillToRemove));
  };

  const handleSkillsFromText = (text: string) => {
    const skillsArray = text.split(',').map(skill => skill.trim()).filter(skill => skill);
    const uniqueSkills = Array.from(new Set([...resume.skills, ...skillsArray]));
    updateSkills(uniqueSkills);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
        <p className="text-sm text-gray-600">Add your technical and professional skills.</p>
      </div>

      <form onSubmit={handleAddSkill} className="flex gap-3">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Add a skill (e.g., JavaScript, Project Management)"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Add
        </button>
      </form>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Or add multiple skills (comma-separated):
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="JavaScript, React, Node.js, Project Management, Team Leadership"
          onBlur={(e) => {
            if (e.target.value.trim()) {
              handleSkillsFromText(e.target.value);
              e.target.value = '';
            }
          }}
        />
      </div>

      {resume.skills.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Your Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 animate-fade-in"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-md">
        <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Skill Tips:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Include both technical and soft skills</li>
          <li>• Be specific (e.g., "React.js" instead of just "JavaScript")</li>
          <li>• Add skills that match job requirements you're targeting</li>
          <li>• Include relevant certifications and tools</li>
        </ul>
      </div>
    </div>
  );
};

export default SkillsForm;
