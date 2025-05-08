import React, { useState } from 'react';

interface FormData {
  topic: string;
  tone: string;
  audience: string;
  cta: string;
  elements: string[];
  crossPromotion: string;
  aiTool: string;
  objective: string;
}

interface LinkedInPostFormProps {
  onSubmit: (formData: FormData) => void;
}

const LinkedInPostForm: React.FC<LinkedInPostFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    tone: 'Professional',
    audience: '',
    cta: 'Comment with thoughts',
    elements: [],
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
    if (!formData.topic || !formData.audience || !formData.tone || !formData.cta || !formData.aiTool) {
      alert('Please fill in all required fields.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-secondary-bg rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-accent">
        LinkedIn Post Prompt
      </h2>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Topic or Key Message *</label>
        <input
          type="text"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          className="w-full p-2 dark:bg-gray-600 rounded text-primary-text"
          placeholder="e.g., Why Java 21’s virtual threads are a game-changer"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Tone *</label>
        <select
          name="tone"
          value={formData.tone}
          onChange={handleChange}
          className="w-full p-2  dark:bg-gray-600 rounded text-primary-text"
          required
        >
          <option value="Professional">Professional</option>
          <option value="Witty">Witty</option>
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
          placeholder="e.g., Backend developers, Tech recruiters"
          required
        />
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
          <option value="Comment with thoughts">Comment with thoughts</option>
          <option value="Follow for more">Follow for more</option>
          <option value="Read my article">Read my article</option>
          <option value="Join my community">Join my community</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Content Elements (Optional)</label>
        <div className="flex flex-col gap-2">
          {['Anecdote', 'Statistic', 'Question', 'Technical Insight', 'Humor', 'Quote'].map(
            (element) => (
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
            ),
          )}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Cross-Promotion (Optional)</label>
        <input
          type="text"
          name="crossPromotion"
          value={formData.crossPromotion}
          onChange={handleChange}
          className="w-full p-2 dark:bg-gray-600 rounded text-primary-text"
          placeholder="e.g., Link to my Dev.to article"
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
          placeholder="e.g., Highlight Java 21’s benefits, Encourage discussion"
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

export default LinkedInPostForm;