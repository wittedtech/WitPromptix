import React, { useState } from 'react';

interface FormData {
  topic: string;
  tone: string;
  platform: string;
  isTechnical: boolean;
  features: string[];
  audience: string;
  length: string;
  objectives: string;
}

interface ArticleWritingFormProps {
  onSubmit: (formData: FormData) => void;
}

const ArticleWritingForm: React.FC<ArticleWritingFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    tone: 'Professional',
    platform: 'Dev.to',
    isTechnical: false,
    features: [],
    audience: '',
    length: 'Medium',
    objectives: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === 'checkbox' && name === 'features') {
      setFormData((prev) => ({
        ...prev,
        features: checked
          ? [...prev.features, value]
          : prev.features.filter((f) => f !== value),
      }));
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.topic || !formData.audience || !formData.tone || !formData.platform || !formData.length) {
      alert('Please fill in all required fields.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-secondary-bg rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-accent">
        Article Writing Prompt
      </h2>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Topic *</label>
        <input
          type="text"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          className="w-full p-2 dark:bg-gray-600 rounded text-primary-text"
          placeholder="e.g., Introduction to GraphQL"
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
          <option value="Professional">Professional</option>
          <option value="Casual">Casual</option>
          <option value="Humorous">Humorous</option>
          <option value="Inspirational">Inspirational</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Platform *</label>
        <div className="flex flex-wrap gap-4">
          {['Dev.to', 'Medium', 'Blog', 'Other'].map((platform) => (
            <label key={platform} className="flex items-center text-primary-text">
              <input
                type="radio"
                name="platform"
                value={platform}
                checked={formData.platform === platform}
                onChange={handleChange}
                className="mr-2"
                required
              />
              {platform}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="flex items-center text-primary-text">
          <input
            type="checkbox"
            name="isTechnical"
            checked={formData.isTechnical}
            onChange={handleChange}
            className="mr-2"
          />
          Is this a technical topic?
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Additional Features (Optional)</label>
        <div className="flex flex-col gap-2">
          {[
            'Storyline',
            'Humor',
            'Code Examples',
            'Diagrams (e.g., Venn, Flow Charts)',
            'Real-Life Examples',
            'Analogies',
          ].map((feature) => (
            <label key={feature} className="flex items-center text-primary-text">
              <input
                type="checkbox"
                name="features"
                value={feature}
                checked={formData.features.includes(feature)}
                onChange={handleChange}
                className="mr-2"
              />
              {feature}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Target Audience *</label>
        <input
          type="text"
          name="audience"
          value={formData.audience}
          onChange={handleChange}
          className="w-full p-2 dark:bg-gray-600 rounded text-primary-text"
          placeholder="e.g., Beginner developers, Tech enthusiasts"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Desired Length *</label>
        <select
          name="length"
          value={formData.length}
          onChange={handleChange}
          className="w-full p-2  dark:bg-gray-600 rounded text-primary-text"
          required
        >
          <option value="Short">Short (~500 words)</option>
          <option value="Medium">Medium (~1000–1500 words)</option>
          <option value="Long">Long (~2000+ words)</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1 text-primary-text">Key Objectives (Optional)</label>
        <textarea
          name="objectives"
          value={formData.objectives}
          onChange={handleChange}
          className="w-full p-2  dark:bg-gray-600 rounded text-primary-text"
          placeholder="e.g., Compare GraphQL vs. REST, Include a case study, Debunk myths"
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

export default ArticleWritingForm;