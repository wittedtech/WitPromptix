import React, { useState } from 'react';

interface GeneratedPromptProps {
  prompt: string;
  onBack: () => void;
}

const GeneratedPrompt: React.FC<GeneratedPromptProps> = ({ prompt, onBack }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 bg-secondary-bg rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-accent">Generated Prompt</h2>
      <textarea
        className="w-full p-4 dark:bg-gray-600 rounded text-primary-text mb-4"
        rows={10}
        value={prompt}
        readOnly
        aria-label="Generated prompt"
      />
      <div className="flex space-x-4">
        <button
          onClick={handleCopy}
          className="bg-accent bg-blue-700 text-white px-4 py-2 rounded hover:bg-teal-600 dark:hover:bg-teal-500 transition"
          aria-label="Copy prompt to clipboard"
        >
          {copied ? 'Copied!' : 'Copy Prompt'}
        </button>
        <button
          onClick={onBack}
          className="bg-gray-700 dark:bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-600 dark:hover:bg-gray-500 transition"
          aria-label="Go back to form"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default GeneratedPrompt;