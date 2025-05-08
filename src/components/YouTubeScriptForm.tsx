import React, { useState } from 'react';

interface FormData {
  topic: string;
  tone: string;
  audience: string;
  length: string;
  elements: string[];
  cta: string;
  crossPromotion: string;
  aiTool: string;
  objective: string;
}

interface YouTubeScriptFormProps {
  onSubmit: (formData: FormData) => void;
}

const YouTubeScriptForm: React.FC<YouTubeScriptFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    tone: 'Educational',
    audience: '',
    length: 'Medium',
    elements: [],
    cta: 'Like and subscribe',
    crossPromotion: '',
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
    if (!formData.topic || !formData.audience || !formData.tone || !formData.length || !formData.cta || !formData.aiTool) {
      alert('Please fill in all required fields.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-secondary-bg rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-accent">
        YouTube Video Script Prompt
      </h2>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Video Topic *</label>
        <input
          type="text"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          className="w-full p-2 dark:bg-gray-600 rounded text-primary-text"
          placeholder="e.g., Building a REST API with Spring Boot"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Tone *</label>
        <select
          name="tone"
          value={formData.tone}
          onChange={handleChange}
          className="w-full p-2 dark:bg-gray-600 rounded text-primary-text"
          required
        >
          <option value="Educational">Educational</option>
          <option value="Entertaining">Entertaining</option>
          <option value="Inspirational">Inspirational</option>
          <option value="Conversational">Conversational</option>
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
          placeholder="e.g., Beginner programmers"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Video Length *</label>
        <select
          name="length"
          value={formData.length}
          onChange={handleChange}
          className="w-full p-2 dark:bg-gray-600 rounded text-primary-text"
          required
        >
          <option value="Short">Short (3–5 minutes)</option>
          <option value="Medium">Medium (5–10 minutes)</option>
          <option value="Long">Long (10–20 minutes)</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Content Elements (Optional)</label>
        <div className="flex flex-col gap-2">
          {[
            'Hook',
            'Tutorial Segment',
            'Call-to-Action',
            'Humor',
            'Case Study',
            'Visual Cue Suggestions',
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
        <label className="block text-sm mb-1 text-primary-text">Call-to-Action *</label>
        <select
          name="cta"
          value={formData.cta}
          onChange={handleChange}
          className="w-full p-2 dark:bg-gray-600 rounded text-primary-text"
          required
        >
          <option value="Like and subscribe">Like and subscribe</option>
          <option value="Comment with your thoughts">Comment with your thoughts</option>
          <option value="Check out my article">Check out my article</option>
          <option value="Join my community">Join my community</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Cross-Promotion (Optional)</label>
        <input
          type="text"
          name="crossPromotion"
          value={formData.crossPromotion}
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
          placeholder="e.g., Teach Spring Boot basics, Promote my Java course"
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

export default YouTubeScriptForm;