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

interface XPostFormProps {
  onSubmit: (formData: FormData) => void;
}

const XPostForm: React.FC<XPostFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    tone: 'Witty',
    audience: '',
    cta: 'Reply with your take',
    elements: [],
    crossPromotion: '',
    aiTool: 'Grok',
    objective: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.topic) newErrors.topic = 'Topic is required';
    if (!formData.audience) newErrors.audience = 'Audience is required';
    if (!formData.tone) newErrors.tone = 'Tone is required';
    if (!formData.cta) newErrors.cta = 'CTA is required';
    if (!formData.aiTool) newErrors.aiTool = 'AI Tool is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-secondary-bg rounded-lg shadow-lg max-w-2xl mx-auto" aria-label="X Post Prompt Form">
      <h2 className="text-xl font-semibold mb-4 text-accent">X Post Prompt</h2>
      <div className="mb-4">
        <label htmlFor="topic" className="block text-sm mb-1 text-primary-text">Post Topic *</label>
        <input
          id="topic"
          type="text"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          className={`w-full p-2 dark:bg-gray-600 rounded text-primary-text ${errors.topic ? 'border-red-500' : ''}`}
          placeholder="e.g., Why Java 21’s virtual threads rock"
          aria-required="true"
          aria-invalid={!!errors.topic}
        />
        {errors.topic && <p className="text-red-500 text-sm mt-1">{errors.topic}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="tone" className="block text-sm mb-1 text-primary-text">Tone *</label>
        <select
          id="tone"
          name="tone"
          value={formData.tone}
          onChange={handleChange}
          className={`w-full p-2 dark:bg-gray-600 rounded text-primary-text ${errors.tone ? 'border-red-500' : ''}`}
          aria-required="true"
          aria-invalid={!!errors.tone}
        >
          <option value="Witty">Witty</option>
          <option value="Informative">Informative</option>
          <option value="Provocative">Provocative</option>
          <option value="Inspirational">Inspirational</option>
        </select>
        {errors.tone && <p className="text-red-500 text-sm mt-1">{errors.tone}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="audience" className="block text-sm mb-1 text-primary-text">Target Audience *</label>
        <input
          id="audience"
          type="text"
          name="audience"
          value={formData.audience}
          onChange={handleChange}
          className={`w-full p-2 dark:bg-gray-600 rounded text-primary-text ${errors.audience ? 'border-red-500' : ''}`}
          placeholder="e.g., Backend developers"
          aria-required="true"
          aria-invalid={!!errors.audience}
        />
        {errors.audience && <p className="text-red-500 text-sm mt-1">{errors.audience}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="cta" className="block text-sm mb-1 text-primary-text">Call-to-Action *</label>
        <select
          id="cta"
          name="cta"
          value={formData.cta}
          onChange={handleChange}
          className={`w-full p-2 dark:bg-gray-600 rounded text-primary-text ${errors.cta ? 'border-red-500' : ''}`}
          aria-required="true"
          aria-invalid={!!errors.cta}
        >
          <option value="Reply with your take">Reply with your take</option>
          <option value="Follow for more">Follow for more</option>
          <option value="Check my article">Check my article</option>
          <option value="Join my community">Join my community</option>
        </select>
        {errors.cta && <p className="text-red-500 text-sm mt-1">{errors.cta}</p>}
      </div>
      <div className="mb-4">
        <fieldset>
          <legend className="block text-sm mb-1 text-primary-text">Content Elements (Optional)</legend>
          <div className="flex flex-col gap-2">
            {[
              'Statistic',
              'Question',
              'Code Snippet',
              'Humor',
              'Hot Take',
              'Emoji',
            ].map((element) => (
              <label key={element} className="flex items-center text-primary-text">
                <input
                  type="checkbox"
                  name="elements"
                  value={element}
                  checked={formData.elements.includes(element)}
                  onChange={handleChange}
                  className="mr-2"
                  aria-label={`Include ${element}`}
                />
                {element}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="mb-4">
        <label htmlFor="crossPromotion" className="block text-sm mb-1 text-primary-text">Cross-Promotion (Optional)</label>
        <input
          id="crossPromotion"
          type="text"
          name="crossPromotion"
          value={formData.crossPromotion}
          onChange={handleChange}
          className="w-full p-2 dark:bg-gray-600 rounded text-primary-text"
          placeholder="e.g., My YouTube video"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="aiTool" className="block text-sm mb-1 text-primary-text">AI Tool *</label>
        <select
          id="aiTool"
          name="aiTool"
          value={formData.aiTool}
          onChange={handleChange}
          className={`w-full p-2 dark:bg-gray-600 rounded text-primary-text ${errors.aiTool ? 'border-red-500' : ''}`}
          aria-required="true"
          aria-invalid={!!errors.aiTool}
        >
          <option value="Grok">Grok</option>
          <option value="ChatGPT">ChatGPT</option>
          <option value="Gemini">Gemini</option>
        </select>
        {errors.aiTool && <p className="text-red-500 text-sm mt-1">{errors.aiTool}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="objective" className="block text-sm mb-1 text-primary-text">Key Objective (Optional)</label>
        <textarea
          id="objective"
          name="objective"
          value={formData.objective}
          onChange={handleChange}
          className="w-full p-2 dark:bg-gray-600 rounded text-primary-text"
          placeholder="e.g., Spark discussion on Java 21"
          rows={4}
          aria-label="Key objective"
        />
      </div>
      <button
        type="submit"
        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-teal-600 dark:hover:bg-teal-500"
        aria-label="Generate X post prompt"
      >
        Generate Prompt
      </button>
    </form>
  );
};

export default XPostForm;