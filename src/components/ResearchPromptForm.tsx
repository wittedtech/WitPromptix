import React, { useState } from 'react';

interface FormData {
  topic: string;
  scope: string;
  audience: string;
  purpose: string;
  elements: string[];
  depth: string;
  crossReference: string;
  aiTool: string;
  objective: string;
}

interface ResearchPromptFormProps {
  onSubmit: (formData: FormData) => void;
}

const ResearchPromptForm: React.FC<ResearchPromptFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    scope: 'Overview',
    audience: '',
    purpose: 'Academic Paper',
    elements: [],
    depth: 'Intermediate',
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
    if (!formData.topic || !formData.audience || !formData.scope || !formData.purpose || !formData.depth || !formData.aiTool) {
      alert('Please fill in all required fields.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-secondary-bg rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-accent">
        Research Prompt
      </h2>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Research Topic *</label>
        <input
          type="text"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          className="w-full p-2 dark:bg-gray-600 rounded text-primary-text"
          placeholder="e.g., Impact of Java 21’s virtual threads"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Research Scope *</label>
        <select
          name="scope"
          value={formData.scope}
          onChange={handleChange}
          className="w-full p-2 dark:bg-gray-600 rounded text-primary-text"
          required
        >
          <option value="Overview">Overview</option>
          <option value="In-Depth Analysis">In-Depth Analysis</option>
          <option value="Comparative Study">Comparative Study</option>
          <option value="Historical Review">Historical Review</option>
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
          placeholder="e.g., Backend developers"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Research Purpose *</label>
        <select
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          className="w-full p-2 dark:bg-gray-600 rounded text-primary-text"
          required
        >
          <option value="Academic Paper">Academic Paper</option>
          <option value="Industry Report">Industry Report</option>
          <option value="Personal Learning">Personal Learning</option>
          <option value="Product Development">Product Development</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Content Elements (Optional)</label>
        <div className="flex flex-col gap-2">
          {[
            'Literature Review',
            'Data Analysis',
            'Case Studies',
            'Technical Details',
            'Future Trends',
            'Challenges',
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
        <label className="block text-sm mb-1 text-primary-text">Depth Level *</label>
        <select
          name="depth"
          value={formData.depth}
          onChange={handleChange}
          className="w-full p-2 dark:bg-gray-600 rounded text-primary-text"
          required
        >
          <option value="Basic">Basic</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
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
          placeholder="e.g., My Dev.to article"
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
          placeholder="e.g., Evaluate Java 21’s performance benefits"
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

export default ResearchPromptForm;