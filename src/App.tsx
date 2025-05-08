import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import TabSelector from './components/TabSelector';
import Sidebar from './components/Sidebar';
import ArticleWritingForm from './components/ArticleWritingForm';
import LinkedInPostForm from './components/LinkedInPostForm';
import YouTubeScriptForm from './components/YouTubeScriptForm';
import ResearchPromptForm from './components/ResearchPromptForm';
import LearnTopicForm from './components/LearnTopicForm';
import XPostForm from './components/XPostForm';
import ArticlePromptForm from './components/ArticlePromptForm';
import GeneratedPrompt from './components/GeneratedPrompt';
import './index.css';

interface ArticleFormData {
  topic: string;
  tone: string;
  platform: string;
  isTechnical: boolean;
  features: string[];
  audience: string;
  length: string;
  objectives: string;
}

interface LinkedInFormData {
  topic: string;
  tone: string;
  audience: string;
  cta: string;
  elements: string[];
  crossPromotion: string;
  aiTool: string;
  objective: string;
}

interface YouTubeFormData {
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

interface ResearchFormData {
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

interface LearnTopicFormData {
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

interface XPostFormData {
  topic: string;
  tone: string;
  audience: string;
  cta: string;
  elements: string[];
  crossPromotion: string;
  aiTool: string;
  objective: string;
}

type FormData = ArticleFormData | LinkedInFormData | YouTubeFormData | ResearchFormData | LearnTopicFormData | XPostFormData | string;

const isArticleFormData = (data: FormData): data is ArticleFormData => {
  return typeof data === 'object' && 'platform' in data && 'isTechnical' in data && 'features' in data;
};

const isLinkedInFormData = (data: FormData): data is LinkedInFormData => {
  return typeof data === 'object' && 'elements' in data && 'cta' in data && !('platform' in data) && !('scope' in data) && !('knowledgeLevel' in data);
};

const isYouTubeFormData = (data: FormData): data is YouTubeFormData => {
  return typeof data === 'object' && 'elements' in data && 'cta' in data && 'length' in data && !('platform' in data);
};

const isResearchFormData = (data: FormData): data is ResearchFormData => {
  return typeof data === 'object' && 'scope' in data && 'purpose' in data && 'depth' in data;
};

const isLearnTopicFormData = (data: FormData): data is LearnTopicFormData => {
  return typeof data === 'object' && 'knowledgeLevel' in data && 'learningGoal' in data && 'learningStyle' in data;
};

const isXPostFormData = (data: FormData): data is XPostFormData => {
  return typeof data === 'object' && 'elements' in data && 'cta' in data && !('platform' in data) && !('scope' in data) && !('knowledgeLevel' in data) && !('length' in data);
};

const isStringPrompt = (data: FormData): data is string => {
  return typeof data === 'string';
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Grok');
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      try {
        let prompt: string;
        if (isArticleFormData(formData)) {
          prompt = `
            Write an exceptional, comprehensive, and unbeatable article on "${formData.topic}" for ${formData.platform}, targeting ${formData.audience}. The article should be ${formData.length.toLowerCase()} in length and written in a ${formData.tone.toLowerCase()} tone. ${
              formData.isTechnical ? 'The topic is technical, so include precise, accurate technical details and explanations.' : 'The topic is non-technical, so keep explanations accessible and engaging.'
            } The article must be the ultimate resource on the topic, covering all essential aspects to make it the best on the internet. Include the following elements only if they add significant value and enhance understanding: ${
              formData.features.join(', ').toLowerCase() || 'none'
            }. ${
              formData.objectives ? `Ensure the article addresses the following objectives: ${formData.objectives}.` : ''
            } Ensure the content is well-structured, engaging, and flows logically, avoiding unnecessary filler. Use clear examples, relatable analogies, and visuals (if applicable) to make complex ideas accessible. Optimize for readability and impact, making it a definitive guide that leaves no question unanswered.
          `;
        } else if (isLinkedInFormData(formData)) {
          const aiToolStyles: { [key: string]: string } = {
            Grok: "Optimize for Grok’s conversational and witty style to make the post stand out as the best on LinkedIn.",
            ChatGPT: "Leverage ChatGPT’s creative storytelling to craft a compelling and relatable post.",
            Gemini: "Use Gemini’s structured clarity to ensure the post is concise and impactful."
          };
          prompt = `
            Create an exceptional, highly engaging, and professional LinkedIn post about "${formData.topic}" targeting ${formData.audience}. The post should be written in a ${formData.tone.toLowerCase()} tone, optimized for LinkedIn’s professional audience to maximize likes, comments, and shares. Include a compelling hook to grab attention, a clear and insightful message, and the following elements only if they add significant value: ${
              formData.elements.join(', ').toLowerCase() || 'none'
            }. End with a strong call-to-action: ${formData.cta}. ${
              formData.crossPromotion ? `Subtly promote the following: ${formData.crossPromotion}.` : ''
            } ${
              formData.objective ? `Ensure the post achieves this objective: ${formData.objective}.` : ''
            } The post should be concise (150–300 words), feel personal and authentic, and position me as a knowledgeable expert. ${aiToolStyles[formData.aiTool] || aiToolStyles['Grok']}
          `;
        } else if (isYouTubeFormData(formData)) {
          const aiToolStyles: { [key: string]: string } = {
            Grok: "Optimize for Grok’s conversational and witty style to make the script stand out as the best on YouTube.",
            ChatGPT: "Leverage ChatGPT’s creative storytelling to craft a compelling and engaging script.",
            Gemini: "Use Gemini’s structured clarity to ensure the script is concise and impactful."
          };
          prompt = `
            Create an exceptional, highly engaging, and professional YouTube video script about "${formData.topic}" targeting ${formData.audience}. The script should be ${formData.tone.toLowerCase()} in tone, optimized for YouTube to maximize viewer engagement, retention, and interaction (likes, comments, subscriptions). The video should be ${formData.length.toLowerCase()} long, with a compelling hook in the first 5–10 seconds to grab attention, a clear and valuable main content section, and a strong call-to-action: ${formData.cta}. Include the following elements only if they add significant value: ${
              formData.elements.join(', ').toLowerCase() || 'none'
            }. ${
              formData.crossPromotion ? `Subtly promote the following: ${formData.crossPromotion}.` : ''
            } ${
              formData.objective ? `Ensure the script achieves this objective: ${formData.objective}.` : ''
            } The script should be concise, conversational, and structured for YouTube (e.g., intro, main content, outro), positioning me as a knowledgeable and relatable expert. ${aiToolStyles[formData.aiTool] || aiToolStyles['Grok']}
          `;
        } else if (isResearchFormData(formData)) {
          const aiToolStyles: { [key: string]: string } = {
            Grok: "Optimize for Grok’s analytical and conversational style to produce a research output that is both rigorous and engaging.",
            ChatGPT: "Leverage ChatGPT’s narrative clarity to craft a clear and comprehensive research output.",
            Gemini: "Use Gemini’s structured precision to ensure the research is concise and authoritative."
          };
          prompt = `
            Generate an exceptional, comprehensive, and authoritative research output on "${formData.topic}" with a ${formData.scope.toLowerCase()} scope, targeting ${formData.audience}. The research is intended for ${formData.purpose.toLowerCase()} and should be written at a ${formData.depth.toLowerCase()} level of complexity. The output must be the ultimate resource on the topic, covering all essential aspects, including background, current state, challenges, and future trends, to make it the best on the internet. Include the following elements only if they add significant value: ${
              formData.elements.join(', ').toLowerCase() || 'none'
            }. ${
              formData.crossReference ? `Integrate or reference the following: ${formData.crossReference}.` : ''
            } ${
              formData.objective ? `Ensure the research achieves this objective: ${formData.objective}.` : ''
            } The research should be well-structured, clear, and actionable, avoiding unnecessary filler. Use precise terminology, relevant examples, and data-driven insights to ensure credibility. ${aiToolStyles[formData.aiTool] || aiToolStyles['Grok']}
          `;
        } else if (isLearnTopicFormData(formData)) {
          const aiToolStyles: { [key: string]: string } = {
            Grok: "Optimize for Grok’s conversational and clear style to produce a learning guide that is both rigorous and engaging.",
            ChatGPT: "Leverage ChatGPT’s narrative depth to craft a compelling and accessible learning guide.",
            Gemini: "Use Gemini’s structured clarity to ensure the learning guide is concise and effective."
          };
          prompt = `
            Generate an exceptional, engaging, and comprehensive learning guide for "${formData.topic}" tailored for ${formData.audience} with a ${formData.knowledgeLevel.toLowerCase()} knowledge level. The guide should align with the learning goal of ${formData.learningGoal.toLowerCase()} and be optimized for a ${formData.learningStyle.toLowerCase()} learning style. The guide must be the ultimate resource for mastering the topic, covering all essential concepts, practical applications, and advanced insights to make it the best on the internet. Include the following elements only if they add significant value: ${
              formData.elements.join(', ').toLowerCase() || 'none'
            }. ${
              formData.crossReference ? `Integrate or reference the following: ${formData.crossReference}.` : ''
            } ${
              formData.objective ? `Ensure the guide achieves this objective: ${formData.objective}.` : ''
            } The guide should be well-structured, clear, and interactive, with step-by-step explanations, practical examples, and actionable exercises to ensure deep understanding and retention. Avoid unnecessary filler and use relatable analogies and real-world applications to make complex ideas accessible. ${aiToolStyles[formData.aiTool] || aiToolStyles['Grok']}
          `;
        } else if (isXPostFormData(formData)) {
          const aiToolStyles: { [key: string]: string } = {
            Grok: "Optimize for Grok’s witty and conversational style to make the post stand out as the best on X.",
            ChatGPT: "Leverage ChatGPT’s conversational flow to craft a compelling and relatable post.",
            Gemini: "Use Gemini’s structured clarity to ensure the post is concise and impactful."
          };
          prompt = `
            Create an exceptional, highly engaging, and concise X post about "${formData.topic}" targeting ${formData.audience}. The post should be written in a ${formData.tone.toLowerCase()} tone, optimized for X’s fast-paced audience to maximize likes, retweets, and replies within the 280-character limit. Include a compelling hook to grab attention, a clear and valuable message, and the following elements only if they add significant value: ${
              formData.elements.join(', ').toLowerCase() || 'none'
            }. End with a strong call-to-action: ${formData.cta}. ${
              formData.crossPromotion ? `Subtly promote the following: ${formData.crossPromotion}.` : ''
            } ${
              formData.objective ? `Ensure the post achieves this objective: ${formData.objective}.` : ''
            } The post should feel personal, authentic, and position me as a knowledgeable expert. ${aiToolStyles[formData.aiTool] || aiToolStyles['Grok']}
          `;
        } else if (isStringPrompt(formData)) {
          prompt = formData; // Direct prompt from ArticlePromptForm
        } else {
          throw new Error('Invalid form data');
        }
        setGeneratedPrompt(prompt.trim());
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to generate prompt. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  };

  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen bg-primary-bg text-primary-text">
        <Header />
        <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 p-6 overflow-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="flex flex-col items-center space-y-4">
                  <div className="gear-loader">
                    <div className="gear"></div>
                    <div className="gear"></div>
                  </div>
                  <p className="text-accent">Generating prompt...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-red-500">{error}</p>
              </div>
            ) : generatedPrompt ? (
              <GeneratedPrompt
                prompt={generatedPrompt}
                onBack={() => setGeneratedPrompt(null)}
              />
            ) : (
              <Routes>
                <Route
                  path="/"
                  element={
                    <div className="flex justify-center items-center h-full">
                      <p className="text-primary-text opacity-70">
                        Select a prompt option from the sidebar to begin.
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/article-writing-prompt"
                  element={<ArticleWritingForm onSubmit={handleFormSubmit} />}
                />
                <Route
                  path="/linkedin-post-generation-prompt"
                  element={<LinkedInPostForm onSubmit={handleFormSubmit} />}
                />
                <Route
                  path="/youtube-video-script-generation-prompt"
                  element={<YouTubeScriptForm onSubmit={handleFormSubmit} />}
                />
                <Route
                  path="/research-prompt"
                  element={<ResearchPromptForm onSubmit={handleFormSubmit} />}
                />
                <Route
                  path="/prompt-for-learning-specific-topic"
                  element={<LearnTopicForm onSubmit={handleFormSubmit} />}
                />
                <Route
                  path="/x-post-generator-prompt"
                  element={<XPostForm onSubmit={handleFormSubmit} />}
                />
                <Route
                  path="/comprehensive-article-prompt"
                  element={<ArticlePromptForm onSubmit={handleFormSubmit} initialPromptType="Comprehensive Article Prompt" />}
                />
                <Route
                  path="/engaging-linkedin-post-prompt"
                  element={<ArticlePromptForm onSubmit={handleFormSubmit} initialPromptType="Engaging LinkedIn Post Prompt" />}
                />
                <Route
                  path="/youtube-and-instagram-reel-prompt"
                  element={<ArticlePromptForm onSubmit={handleFormSubmit} initialPromptType="YouTube and Instagram Reel Prompt" />}
                />
                <Route
                  path="/social-media-promotion-scripts"
                  element={<ArticlePromptForm onSubmit={handleFormSubmit} initialPromptType="Social Media Promotion Scripts" />}
                />
              </Routes>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;