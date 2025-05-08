import React from 'react';

interface TabSelectorProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ['Grok', 'ChatGPT', 'Gemini'];

  return (
    <div className="bg-secondary-bg p-2 flex space-x-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded transition ${
            activeTab === tab
              ? 'bg-accent text-green-500'
              : 'text-primary-text hover:bg-gray-700 dark:hover:bg-gray-600'
          }`}
          aria-pressed={activeTab === tab}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabSelector;