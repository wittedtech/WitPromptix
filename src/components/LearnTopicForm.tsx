import React, { useState } from 'react';

interface FormData {
  topic: string;
  knowledgeLevel: string;
  learningGoal: string;
  audience: string;
  elements: string[];
  learningStyle: string;
  crossReference: string;
  aiTool: string;
  objective: string;
}

interface LearnTopicFormProps {
  onSubmit: (formData: FormData) => void;
}

const LearnTopicForm: React.FC<LearnTopicFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    knowledgeLevel: 'Beginner',
    learningGoal: 'Understand Concepts',
    audience: '',
    elements: [],
    learningStyle: 'Text-Based',
    crossReference: '',
    aiTool: 'Grok',
    objective: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === 'checkbox' && name === 'elements') {
      setFormData((prev) => ({
        ...prev,
        elements: checked
          ? [...prev.elements, value]
          : prev.elements.filter((f) => f !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.topic ||
      !formData.audience ||
      !formData.knowledgeLevel ||
      !formData.learningGoal ||
      !formData.learningStyle ||
      !formData.aiTool
    ) {
      alert('Please fill in all required fields.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-secondary-bg rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-accent">
        Learn Specific Topic Prompt
      </h2>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Topic to Learn *</label>
        <input
          type="text"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          className="w-full p-2 dark:bg-gray-600 rounded text-primary-text"
          placeholder="e.g., Spring Boot for REST API development"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Current Knowledge Level *</label>
        <select
          name="knowledgeLevel"
          value={formData.knowledgeLevel}
          onChange={handleChange}
          className="w-full p-2 dark:bg-gray-600 rounded text-primary-text"
          required
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Learning Goal *</label>
        <select
          name="learningGoal"
          value={formData.learningGoal}
          onChange={handleChange}
          className="w-full p-2 dark:bg-gray-600 rounded text-primary-text"
          required
        >
          <option value="Understand Concepts">Understand Concepts</option>
          <option value="Build a Project">Build a Project</option>
          <option value="Prepare for Certification">Prepare for Certification</option>
          <option value="Apply Professionally">Apply Professionally</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Target Audience *</label>
        <input
          type="text"
          name="audience"
          value={formData.audience}
          onChange={handleChange}
          className="w-full p-2 dark:bg-gray-600 rounded text-primary-text"
          placeholder="e.g., Aspiring backend developers"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Learning Elements (Optional)</label>
        <div className="flex flex-col gap-2">
          {[
            'Explanations',
            'Examples',
            'Exercises',
            'Quizzes',
            'Analogies',
            'Real-World Applications',
          ].map((element) => (
            <label key={element} className="flex items-center text-primary-text">
              <input
                type="checkbox"
                name="elements"
                value={element}
                checked={formData.elements.includes(element)}
                onChange={handleChange}
                className="mr-2"
              />
              {element}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Preferred Learning Style *</label>
        <select
          name="learningStyle"
          value={formData.learningStyle}
          onChange={handleChange}
          className="w-full p-2 dark:bg-gray-600 rounded text-primary-text"
          required
        >
          <option value="Visual">Visual</option>
          <option value="Hands-On">Hands-On</option>
          <option value="Text-Based">Text-Based</option>
          <option value="Interactive">Interactive</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Cross-Reference (Optional)</label>
        <input
          type="text"
          name="crossReference"
          value={formData.crossReference}
          onChange={handleChange}
          className="w-full p-2 dark:bg-gray-600 rounded text-primary-text"
          placeholder="e.g., My YouTube video"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">AI Tool *</label>
        <select
          name="aiTool"
          value={formData.aiTool}
          onChange={handleChange}
          className="w-full p-2 dark:bg-gray-600 rounded text-primary-text"
          required
        >
          <option value="Grok">Grok</option>
          <option value="ChatGPT">ChatGPT</option>
          <option value="Gemini">Gemini</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Key Objective (Optional)</label>
        <textarea
          name="objective"
          value={formData.objective}
          onChange={handleChange}
          className="w-full p-2 dark:bg-gray-600 rounded text-primary-text"
          placeholder="e.g., Master Spring Boot configuration"
          rows={4}
        />
      </div>
      <button
        type="submit"
        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-teal-600 dark:hover:bg-teal-500"
      >
        Generate Prompt
      </button>
    </form>
  );
};

export default LearnTopicForm;