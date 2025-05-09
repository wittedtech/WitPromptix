import React, { useState } from 'react';
import { replacePlaceholders } from '../config/replacePlaceholders';

interface FormData {
  promptType: string;
  topic: string;
  platform: string;
  additionalPlaceholders: Record<string, string>;
}

interface ArticlePromptFormProps {
  onSubmit: (prompt: string) => void;
  initialPromptType?: string;
}

const promptTemplates: Record<string, string> = {
  'Comprehensive Article Prompt': `
Write an article on [SPECIFIC TOPIC] that aims to be the most comprehensive, engaging, and authoritative resource on the internet. The article should be structured to maximize clarity, retention, and practical value for readers of all levels (beginner to advanced). Ensure the content is well-organized, flows naturally, and incorporates the following elements only when they add meaningful value to the reader's understanding and engagement. Avoid forcing elements that feel unnatural or irrelevant to the topic.
1. Compelling Introduction:
    ◦ Start with a hook: Use a surprising statistic, a thought-provoking question, or a vivid anecdote related to [SPECIFIC TOPIC] to grab attention.
    ◦ Briefly explain why [SPECIFIC TOPIC] is important in the real world, including its relevance to the reader’s personal or professional life.
    ◦ Set expectations by outlining what the reader will learn and why this article is the ultimate resource.
2. Storyline:
    ◦ Weave a narrative thread throughout the article to maintain engagement. For example, follow a hypothetical learner’s journey, a historical evolution of [SPECIFIC TOPIC], or a problem-solution arc.
    ◦ Ensure the storyline connects emotionally with the reader and ties back to the topic’s practical applications.
3. Comprehensive Coverage:
    ◦ Break down [SPECIFIC TOPIC] into clear, logical sections that progress from foundational concepts to advanced techniques.
    ◦ Cover all essential subtopics, including common misconceptions, FAQs, and edge cases.
    ◦ Use subheadings to organize content for easy navigation and skimming.
4. Humor (When Appropriate):
    ◦ Incorporate light, topic-relevant humor to make the content relatable and memorable (e.g., playful analogies, witty remarks, or funny scenarios).
    ◦ Ensure humor is inclusive, professional, and enhances understanding rather than distracts.
5. Code Examples (If Applicable):
    ◦ For technical topics, include well-commented code snippets that demonstrate key concepts.
    ◦ Provide examples in the most relevant programming language(s) for [SPECIFIC TOPIC].
    ◦ Explain each code snippet step-by-step, highlighting its purpose and real-world use case.
6. Visual Aids (Use Sparingly and Purposefully, Do Not use unnecessary type of visual only use those visuals which are suitable fo better explanations):
    ◦ Venn Diagram: Include a Venn diagram if [SPECIFIC TOPIC] involves comparing overlapping concepts (e.g., technologies, methodologies). Ensure it’s simple, labeled clearly, and accompanied by an explanation.
    ◦ Flow Chart: Create a flow chart to illustrate processes, workflows, or decision-making paths related to [SPECIFIC TOPIC]. Keep it clean and intuitive, with a brief description.
    ◦ Ensure visuals are high-quality, relevant, and enhance comprehension rather than clutter the article.
    ◦ When trying to compare the [SPECIFIC TOPIC] with any rival or parallel option Use Tabular Format or Visuals.
7. Examples and Real-Life Case Studies:
    ◦ Provide clear, practical examples for each major concept to show how it applies in practice.
    ◦ Include 1-2 real-life case studies or success stories (e.g., how a company/individual used [SPECIFIC TOPIC] to solve a problem or achieve a goal).
    ◦ Highlight lessons learned and actionable takeaways from each case study.
8. Technical Analogies:
    ◦ Use relatable analogies to explain complex or abstract concepts (e.g., comparing a technical process to a familiar real-world activity).
    ◦ Ensure analogies are accurate, easy to understand, and directly tied to [SPECIFIC TOPIC].
9. Actionable Takeaways:
    ◦ End each section with practical tips, best practices, or next steps for applying the knowledge.
    ◦ Include a “Quick Reference” section or checklist summarizing key points for readers to revisit.
10. Engaging and Accessible Tone:
    ◦ Write in a conversational yet authoritative tone, balancing technical accuracy with approachability.
    ◦ Avoid jargon unless clearly defined, and cater to both beginners and experts by layering information (e.g., basic explanations with optional “deep dive” sidebars).
11. Conclusion:
    ◦ Recap the key points and their importance.
    ◦ Inspire action with a motivational call-to-action (e.g., “Start experimenting with [SPECIFIC TOPIC] today!”).
    ◦ Provide additional resources (books, tools, communities) for further learning.
12. Supplementary Elements:
    ◦ Include a FAQ section addressing common questions about [SPECIFIC TOPIC].
    ◦ Add a glossary for key terms if the topic is technical or jargon-heavy.
    ◦ Suggest tools, frameworks, or platforms relevant to [SPECIFIC TOPIC], with brief pros and cons.
13. SEO and Readability Optimization:
    ◦ Use clear, descriptive subheadings and bullet points for scannability.
    ◦ Incorporate relevant keywords naturally to improve search engine visibility.
    ◦ Keep paragraphs short and focused, with a mix of sentence lengths for rhythm.
14. Length and Depth:
    ◦ Aim for a word count of 2,000–5,000 words, depending on the complexity of [SPECIFIC TOPIC], ensuring every section adds value without fluff.
    ◦ Balance depth with conciseness, prioritizing clarity and actionable insights.
15. Code Language:
    - Primarily Use Java
    - But sometime if using any other language can explain [SPECIFIC TOPIC] better and is more suitable, You can choose any Language You Want.
By thoughtfully integrating these elements, ensure the article is not a jumbled collection but a cohesive, engaging, and unparalleled resource that educates, entertains, and empowers readers to master [SPECIFIC TOPIC].
`,
  'Engaging LinkedIn Post Prompt': `
Write a LinkedIn post about [SPECIFIC TOPIC] that captivates a broad audience, sparks genuine interest, and compels readers to engage, follow, and read your accompanying article. The post should be concise (150–300 words), highly engaging, and tailored to resonate with professionals, enthusiasts, and learners across various experience levels (beginner to expert). Ensure the post feels personal, relatable, and authentic while driving massive reach and connection. Incorporate the following elements thoughtfully, only when they enhance impact and relevance:
1. Attention-Grabbing Hook:
   - Start with a bold statement, surprising fact, relatable question, or vivid scenario related to [SPECIFIC TOPIC] that instantly draws readers in (e.g., “Ever wondered how [SPECIFIC TOPIC] powers your favorite apps?”).
   - Make it universally appealing to professionals, students, or hobbyists in the field.
2. Relatable Storytelling:
   - Share a brief, authentic anecdote (personal experience, hypothetical scenario, or industry example) that connects [SPECIFIC TOPIC] to real-world impact or a common pain point.
   - Infuse a touch of humor or wit to make it memorable and approachable, ensuring it resonates with both local (e.g., Indian) and global audiences.
3. Value-Driven Content:
   - Highlight 1–2 key insights, tips, or benefits of [SPECIFIC TOPIC] that spark curiosity and demonstrate immediate value (e.g., “This one trick in [SPECIFIC TOPIC] boosted my app’s performance by 50%!”).
   - Keep it jargon-free or explain technical terms briefly to ensure accessibility.
4. Call-to-Action (CTA):
   - Include a clear, enthusiastic CTA encouraging readers to:
     - Read your in-depth article (e.g., “Dive into my article on [PLATFORM] for the full scoop!” with a link).
     - Share their thoughts in the comments (e.g., “Drop your favorite [SPECIFIC TOPIC] tip below!”).
     - Follow you for more insights (e.g., “Follow me for weekly [SPECIFIC TOPIC] hacks!”).
   - Make the CTA feel like an invitation to join a community, not a sales pitch.
5. Emotional Connection:
   - Use an inspiring or relatable tone to make readers feel empowered, curious, or motivated (e.g., “Let’s master [SPECIFIC TOPIC] together and build something epic!”).
   - Address the reader directly (e.g., “You’ve got this!”) to foster a sense of connection.
6. Visual and Formatting Appeal:
   - Use emojis sparingly to add personality and break up text (e.g., 🚀, 😎, 💡).
   - Include short sentences and line breaks for readability on mobile devices.
   - If relevant, mention a visual in your article (e.g., “Check out the flow chart in my article!”) to pique interest.
7. Hashtags and Reach:
   - Add 3–5 relevant hashtags to boost discoverability (e.g., #[SPECIFIC TOPIC], #TechCareer, #LearnToCode, #Innovation, #CareerGrowth).
   - Choose hashtags that align with [SPECIFIC TOPIC] and appeal to your target audience (e.g., developers, professionals, students).
8. Cross-Platform Promotion (Optional):
   - Subtly promote your presence on other platforms (e.g., “Catch more [SPECIFIC TOPIC] tips on my Dev.to/YouTube!”) to drive traffic to your broader content ecosystem.
   - Ensure this feels natural and secondary to the main CTA.
9. Tone and Voice:
   - Maintain a conversational, confident, and slightly humorous tone that feels like a friendly expert sharing knowledge.
   - Balance professionalism with warmth to appeal to LinkedIn’s career-oriented audience while staying engaging.
10. Article Teaser:
    - Tease your article’s unique value (e.g., “My article breaks down [SPECIFIC TOPIC] with code examples, real-world cases, and a Venn diagram you’ll wish you saw sooner!”).
    - Highlight what sets your article apart (e.g., depth, visuals, practical tips) without giving everything away.
By crafting the post with these elements, ensure it’s not a generic shout-out but a magnetic, value-packed invitation that makes every reader—whether a newbie or a seasoned pro—feel compelled to engage, follow, and dive into your article on [SPECIFIC TOPIC]. The post should foster a sense of community, inspire action, and position you as a go-to expert.
`,
  'YouTube and Instagram Reel Prompt': `
Write a detailed script for a YouTube video and a complementary 60-second (or shorter/longer, as needed) Instagram Reel on [SPECIFIC TOPIC]. Both scripts should aim to create unbeatable, highly engaging, and authoritative content that stands out as the most comprehensive and relatable resource on the internet. The content should connect with a broad audience (beginners to experts), maximize viewer retention, and inspire action (e.g., liking, subscribing, or visiting a linked article). Incorporate elements like storytelling, humor, and visuals only when they add value and enhance understanding, ensuring a natural flow and deep connection with viewers.

### YouTube Video Script Requirements
1. Video Length:
   - Tailor the length to [SPECIFIC TOPIC]’s complexity (e.g., 8–20 minutes for in-depth topics, 5–8 minutes for simpler ones). Ensure every minute is packed with value, avoiding fluff.
   - Structure the video to maintain engagement with clear segments (intro, main content, conclusion).
2. Engaging Introduction (0:00–0:30):
   - Open with a hook: Use a surprising fact, bold question, or relatable story about [SPECIFIC TOPIC] to grab attention (e.g., “Did you know [SPECIFIC TOPIC] powers 80% of your favorite apps?”).
   - Briefly state the video’s purpose and why it’s the ultimate resource (e.g., “Today, I’m breaking down [SPECIFIC TOPIC] like no other video on YouTube!”).
   - Include a quick preview of what viewers will learn (e.g., “Code examples, real-world cases, and a flow chart you’ll love!”).
3. Storyline:
   - Weave a narrative arc (e.g., your journey with [SPECIFIC TOPIC], a problem-solution story, or a historical evolution) to keep viewers hooked.
   - Make the story relatable to both technical and non-technical viewers, tying it to real-world applications.
4. Comprehensive Content:
   - Divide [SPECIFIC TOPIC] into 3–5 logical segments, each with clear explanations, examples, and takeaways.
   - Cover foundational concepts, advanced techniques, common mistakes, and FAQs to ensure no stone is left unturned.
   - Use on-screen visuals (e.g., code snippets, diagrams, animations) to clarify complex ideas, with verbal explanations for accessibility.
5. Humor and Personality:
   - Inject light, topic-relevant humor (e.g., funny analogies, witty asides) to make the content memorable and approachable.
   - Keep humor inclusive and professional, ensuring it enhances rather than distracts from the topic.
6. Visual Aids (When Relevant):
   - Venn Diagram: Include a simple, labeled Venn diagram for comparing concepts (e.g., tools, frameworks), shown on-screen with a clear explanation.
   - Flow Chart: Display a flow chart for processes or decision-making paths, ensuring it’s intuitive and paired with narration.
   - Use animations, screen recordings, or live demos (e.g., coding) to make technical content engaging.
7. Examples and Real-Life Case Studies:
   - Provide 2–3 practical examples per segment to show [SPECIFIC TOPIC] in action (e.g., code demos, use cases).
   - Include 1–2 real-world case studies (e.g., how a company used [SPECIFIC TOPIC] to solve a problem), highlighting lessons learned.
   - Use on-screen text or visuals to reinforce key points.
8. Technical Analogies:
   - Explain complex concepts with relatable analogies (e.g., comparing a technical process to cooking or driving).
   - Ensure analogies are accurate and resonate with a global audience.
9. Call-to-Action (CTA):
   - Mid-video CTA: Encourage likes, comments, or subscriptions (e.g., “Hit that like button if this tip saves you time!”).
   - End-video CTA: Invite viewers to subscribe, comment with their thoughts, or check out a linked article/resource (e.g., “Read my full guide on [PLATFORM]!”).
   - Promote community engagement (e.g., “Tell me your [SPECIFIC TOPIC] struggles in the comments!”).
10. Tone and Delivery:
    - Use a conversational, enthusiastic, and confident tone, like a knowledgeable friend explaining [SPECIFIC TOPIC].
    - Balance technical depth with accessibility, defining jargon and layering info for beginners and experts.
11. Conclusion:
    - Recap key takeaways in 30–60 seconds, emphasizing their real-world value.
    - Inspire action (e.g., “Start experimenting with [SPECIFIC TOPIC] today!”) and tease future content (e.g., “Next week: [RELATED TOPIC]!”).
    - End with a warm, memorable sign-off (e.g., “Thanks for watching—let’s keep learning together!”).
12. Production Notes:
    - Include cues for visuals (e.g., “[Show code snippet at 2:30]”), transitions, or sound effects to guide editing.
    - Suggest background music (e.g., upbeat lo-fi for technical topics) to enhance mood without overpowering narration.

### Instagram Reel Script Requirements
1. Video Length:
   - Default to 60 seconds, but adjust (30–90 seconds) based on [SPECIFIC TOPIC]’s needs. Prioritize concise, high-impact content.
   - Ensure the reel is self-contained but teases the YouTube video or article for deeper learning.
2. Hook (0:00–0:05):
   - Start with a quick, attention-grabbing question, stat, or bold statement (e.g., “Want to master [SPECIFIC TOPIC] in 60 seconds?”).
   - Use text overlays and energetic delivery to stop scrollers.
3. Core Content (0:05–0:50):
   - Deliver 1–2 key insights or tips about [SPECIFIC TOPIC] in a concise, engaging way (e.g., “Here’s the #1 mistake in [SPECIFIC TOPIC] and how to fix it!”).
   - Use quick visuals (e.g., code snippet, mini flow chart, or text overlays) to reinforce points.
   - Include a micro-example or analogy to make the concept stick (e.g., “Think of [SPECIFIC TOPIC] like a recipe!”).
4. Humor and Relatability:
   - Add a touch of humor (e.g., a funny reaction or meme-style text) to make the reel shareable.
   - Keep it relatable to a broad audience, avoiding niche jargon.
5. Call-to-Action (0:50–1:00):
   - End with a clear CTA: “Want the full breakdown? Watch my YouTube video!” or “Read my article on [PLATFORM]!” (include link in bio or swipe-up if available).
   - Encourage likes, follows, or comments (e.g., “Drop a 💡 if this helped!”).
6. Visual and Audio Appeal:
   - Use vibrant visuals, quick cuts, and text overlays for maximum engagement.
   - Suggest trending audio or upbeat music to align with Instagram’s algorithm and audience preferences.
   - Include captions or on-screen text for accessibility and silent viewers.
7. Tone and Delivery:
   - Use a high-energy, friendly tone to convey excitement and expertise.
   - Keep language simple and universal to connect with global viewers.
8. Hashtags and Reach:
   - Include 5–7 hashtags in the caption (e.g., #[SPECIFIC TOPIC], #TechTips, #LearnWithMe, #ReelItFeelIt) to boost discoverability.
   - Write a caption that summarizes the reel and includes a CTA (e.g., “Master [SPECIFIC TOPIC] with my full YouTube guide! Link in bio! 🚀”).

### General Guidelines for Both Scripts
- Audience Connection: Craft content that resonates with diverse viewers (e.g., students, professionals, hobbyists) by addressing universal pain points, goals, or curiosities related to [SPECIFIC TOPIC].
- Unbeatable Value: Ensure the YouTube video is the most comprehensive resource on the platform, covering angles no other video does (e.g., unique examples, visuals, or case studies). The reel should tease this depth.
- Cultural Sensitivity: Use examples, humor, and analogies that are inclusive and relatable to a global audience, including Indian and other diverse viewers.
- Engagement Optimization: Structure both scripts to maximize watch time (YouTube) and shares/saves (Instagram) by delivering value early and often.
- Cross-Promotion: Subtly tie the reel to the YouTube video and any linked article, creating a content ecosystem that drives traffic across platforms.
- SEO and Discoverability: Use relevant keywords in the YouTube title, description, and tags (e.g., “[SPECIFIC TOPIC] tutorial 2025”). For the reel, leverage trending audio and hashtags.
By integrating these elements thoughtfully, ensure the YouTube video and Instagram Reel are not just informative but magnetic, shareable, and unmatched in depth, making viewers feel connected, inspired, and eager to engage with your content on [SPECIFIC TOPIC].
`,
  'Social Media Promotion Scripts': `
Write a set of scripts for an X post, an Instagram Story, and additional promotional strategies to promote an article on [SPECIFIC TOPIC]. The goal is to create humorous, professional, and elegant content that connects with a massive, diverse audience, maximizes engagement, and builds a vibrant community around [SPECIFIC TOPIC]. Each piece should drive traffic to the article, encourage interaction, and position you as a relatable, authoritative voice. Incorporate storytelling, humor, and calls-to-action (CTAs) only when they add value, ensuring a natural and compelling flow that resonates globally, including with Indian and other diverse audiences.

### X Post Script Requirements
1. Length: 100–280 characters (concise yet impactful, respecting X’s character limit).
2. Hook: Start with a witty or surprising opener about [SPECIFIC TOPIC] (e.g., “Tired of [SPECIFIC TOPIC] feeling like rocket science? 🚀 I’ve got you!”).
3. Content:
   - Share a quick, valuable insight or teaser from the article (e.g., “This one [SPECIFIC TOPIC] trick saved me hours!”).
   - Use light humor or a relatable quip to make it shareable (e.g., “My code was a mess until [SPECIFIC TOPIC] came to the rescue 😅”).
4. CTA:
   - Include a clear CTA to read the article (e.g., “Read my full guide: [LINK]”).
   - Encourage engagement (e.g., “Quote this with your [SPECIFIC TOPIC] tip!”).
5. Tone: Conversational, humorous, and professional, like a witty expert sharing a gem.
6. Hashtags: Use 2–4 relevant hashtags (e.g., #[SPECIFIC TOPIC], #TechTips, #LearnWithMe) for discoverability.
7. Example Structure:
   - Hook + Insight + Humor + CTA + Hashtags
   - E.g., “Ever fumbled with [SPECIFIC TOPIC]? 😬 My article breaks it down with code & real-world hacks! 🚀 Read it: [LINK] | Share your tips! #[SPECIFIC TOPIC] #TechLife”

### Instagram Story Script Requirements
1. Length: 15–30 seconds (1–2 slides, optimized for quick consumption).
2. Visual and Text Elements:
   - Slide 1 (Hook): Use a vibrant background or article screenshot with bold text (e.g., “Ready to master [SPECIFIC TOPIC]? 🤩”). Add a quirky sticker or GIF for humor.
   - Slide 2 (CTA): Show a teaser (e.g., “My article has code, stories & a flow chart!”) with a “Swipe Up” or “Link in Bio” button. Include a poll or question sticker (e.g., “What’s your [SPECIFIC TOPIC] struggle?”).
3. Narration (Optional):
   - If using voiceover, keep it energetic and relatable (e.g., “Hey, I just dropped the ultimate [SPECIFIC TOPIC] guide! It’s got everything you need, plus a few laughs! 😄 Check it out!”).
4. Content:
   - Highlight one key article feature (e.g., a unique analogy, case study, or visual).
   - Use humor to connect (e.g., “I used to think [SPECIFIC TOPIC] was a nightmare… until this! 😅”).
5. CTA:
   - Direct viewers to the article via link in bio or swipe-up (e.g., “Tap to read the full guide!”).
   - Boost engagement with interactive stickers (e.g., poll: “Beginner or Pro at [SPECIFIC TOPIC]?”).
6. Tone: Playful, elegant, and inviting, balancing professionalism with warmth.
7. Music: Suggest a trending or upbeat track to enhance mood (e.g., lo-fi or pop instrumental).

### Additional Promotional Strategies
1. Twitter Thread (X Thread):
   - Create a 3–5 post thread diving deeper into [SPECIFIC TOPIC].
   - Post 1: Hook with a question or stat (e.g., “Why does [SPECIFIC TOPIC] trip everyone up? 🤔”).
   - Posts 2–4: Share bite-sized tips or article snippets (e.g., “Tip #1: Use this [SPECIFIC TOPIC] hack for 2x efficiency!”).
   - Post 5: CTA to read the article and join the conversation (e.g., “Get the full scoop: [LINK] | What’s your [SPECIFIC TOPIC] go-to?”).
   - Use humor and emojis sparingly (e.g., 😎, 🚀) for personality.
2. LinkedIn Comment Strategy:
   - Engage with relevant LinkedIn posts about [SPECIFIC TOPIC] by leaving thoughtful comments.
   - Subtly promote your article (e.g., “Great point! I dive deeper into this in my article on [SPECIFIC TOPIC]: [LINK]”).
   - Keep comments professional yet warm, encouraging discussion (e.g., “What’s your take on this?”).
3. Reddit Community Engagement:
   - Post in relevant subreddits (e.g., r/[SPECIFIC TOPIC], r/learnprogramming).
   - Share a concise summary of your article’s value (e.g., “I wrote a guide on [SPECIFIC TOPIC] with code, case studies, and a flow chart!”).
   - Include a humble CTA (e.g., “Check it out if you’re curious: [LINK]”) and engage with comments to build rapport.
   - Avoid overt self-promotion; focus on adding value to the community.
4. Discord/Community Forum Posts:
   - Share your article in Discord servers or forums related to [SPECIFIC TOPIC].
   - Write a friendly post with a humorous twist (e.g., “Spent hours untangling [SPECIFIC TOPIC]? My guide’s got your back! 😄”).
   - Include a brief teaser and link, then actively respond to questions to foster community.
5. Email Newsletter Snippet:
   - If you have a newsletter, include a short, engaging blurb about the article.
   - Use a storytelling hook (e.g., “I once bombed at [SPECIFIC TOPIC]… here’s what I learned!”).
   - Add a CTA to read the article and reply with feedback (e.g., “Hit reply with your [SPECIFIC TOPIC] tips!”).
6. Collaborative Live Stream (YouTube/Twitch):
   - Host a live Q&A or demo session on [SPECIFIC TOPIC], teasing the article’s content.
   - Invite a guest expert for credibility and banter, keeping it humorous yet informative.
   - Share the article link in the description and chat, encouraging viewers to join your community.

### General Guidelines for All Promotional Content
- Audience Connection: Craft content that resonates with diverse audiences (e.g., students, professionals, hobbyists) by addressing universal challenges or aspirations tied to [SPECIFIC TOPIC].
- Humor and Elegance: Use light, inclusive humor (e.g., relatable tech mishaps, witty analogies) to make content memorable, while maintaining a polished, professional tone.
- Community Building: Encourage interaction (e.g., comments, polls, shares) to foster a sense of belonging. Respond to comments promptly to strengthen connections.
- Cultural Sensitivity: Ensure humor, examples, and references are globally relatable, avoiding niche or region-specific slang unless targeting a specific audience (e.g., Indian tech enthusiasts).
- Cross-Platform Synergy: Tie all promotions to the article, creating a cohesive content ecosystem that drives traffic and builds your brand as a [SPECIFIC TOPIC] expert.
- SEO and Discoverability: Use relevant keywords (e.g., [SPECIFIC TOPIC] guide, tutorial) in captions, descriptions, and hashtags to boost visibility.
- Engagement Optimization: Front-load value in each piece to capture attention within 3–5 seconds, ensuring high retention and shares.
By thoughtfully integrating these scripts and strategies, ensure each promotional piece is not just a shout-out but a magnetic, community-driven invitation that makes viewers feel connected, entertained, and eager to engage with your article and join your [SPECIFIC TOPIC] community.
`,
};

const ArticlePromptForm: React.FC<ArticlePromptFormProps> = ({
  onSubmit,
  initialPromptType = 'Comprehensive Article Prompt',
}) => {
  const [formData, setFormData] = useState<FormData>({
    promptType: initialPromptType,
    topic: '',
    platform: '',
    additionalPlaceholders: {},
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Get the selected template
  const selectedTemplate = promptTemplates[formData.promptType] || promptTemplates['Comprehensive Article Prompt'];

  // Detect placeholders (excluding [SPECIFIC TOPIC] and [PLATFORM])
  const placeholderRegex = /\[([^\]]+)\]/g;
  const placeholders = [...selectedTemplate.matchAll(placeholderRegex)]
    .map(match => match[1])
    .filter(placeholder => placeholder !== 'SPECIFIC TOPIC' && placeholder !== 'PLATFORM')
    .filter((value, index, self) => self.indexOf(value) === index); // Unique placeholders

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.promptType) newErrors.promptType = 'Prompt type is required';
    if (!formData.topic) newErrors.topic = 'Topic is required';
    if (
      ['Engaging LinkedIn Post Prompt', 'YouTube and Instagram Reel Prompt'].includes(formData.promptType) &&
      !formData.platform
    ) {
      newErrors.platform = 'Platform is required for this prompt';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name.startsWith('placeholder_')) {
      const placeholderKey = name.replace('placeholder_', '');
      setFormData((prev) => ({
        ...prev,
        additionalPlaceholders: {
          ...prev.additionalPlaceholders,
          [placeholderKey]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const prompt = replacePlaceholders(
        selectedTemplate,
        formData.topic,
        { PLATFORM: formData.platform, ...formData.additionalPlaceholders }
      );
      onSubmit(prompt);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-secondary-bg rounded-lg shadow-lg max-w-2xl mx-auto"
      aria-label="Multi-Prompt Form"
    >
      <h2 className="text-xl font-semibold mb-4 text-accent">
        {formData.promptType}
      </h2>
      <div className="mb-4">
        <label htmlFor="promptType" className="block text-sm mb-1 text-primary-text">
          Prompt Type *
        </label>
        <select
          id="promptType"
          name="promptType"
          value={formData.promptType}
          onChange={handleChange}
          className={`w-full p-2  rounded text-primary-text ${
            errors.promptType ? 'border-red-500' : ''
          }`}
          aria-required="true"
          aria-invalid={!!errors.promptType}
        >
          {Object.keys(promptTemplates).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.promptType && (
          <p className="text-red-500 text-sm mt-1">{errors.promptType}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="topic" className="block text-sm mb-1 text-primary-text">
          Topic *
        </label>
        <input
          id="topic"
          type="text"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          className={`w-full p-2  rounded text-primary-text ${
            errors.topic ? 'border-red-500' : ''
          }`}
          placeholder="e.g., JavaScript Async/Await"
          aria-required="true"
          aria-invalid={!!errors.topic}
        />
        {errors.topic && (
          <p className="text-red-500 text-sm mt-1">{errors.topic}</p>
        )}
      </div>
      {['Engaging LinkedIn Post Prompt', 'YouTube and Instagram Reel Prompt'].includes(formData.promptType) && (
        <div className="mb-4">
          <label htmlFor="platform" className="block text-sm mb-1 text-primary-text">
            Platform *
          </label>
          <input
            id="platform"
            type="text"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className={`w-full p-2 rounded text-primary-text ${
              errors.platform ? 'border-red-500' : ''
            }`}
            placeholder="e.g., Medium, Dev.to"
            aria-required="true"
            aria-invalid={!!errors.platform}
          />
          {errors.platform && (
            <p className="text-red-500 text-sm mt-1">{errors.platform}</p>
          )}
        </div>
      )}
      {placeholders.map((placeholder) => (
        <div key={placeholder} className="mb-4">
          <label
            htmlFor={`placeholder_${placeholder}`}
            className="block text-sm mb-1 text-primary-text"
          >
            {placeholder} (Optional)
          </label>
          <input
            id={`placeholder_${placeholder}`}
            type="text"
            name={`placeholder_${placeholder}`}
            value={formData.additionalPlaceholders[placeholder] || ''}
            onChange={handleChange}
            className="w-full p-2 rounded text-primary-text"
            placeholder={`Enter value for ${placeholder}`}
          />
        </div>
      ))}
      <button
        type="submit"
        className="bg-accent text-white px-4 py-2 bg-gray-700 rounded hover:bg-teal-600 dark:hover:bg-teal-500 transition"
        aria-label={`Generate ${formData.promptType.toLowerCase()}`}
      >
        Generate Prompt
      </button>
    </form>
  );
};

export default ArticlePromptForm;