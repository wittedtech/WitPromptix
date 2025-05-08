export const replacePlaceholders = (
  template: string,
  specificTopic: string,
  additionalPlaceholders: Record<string, string> = {}
): string => {
  // Replace [SPECIFIC TOPIC] with the provided topic
  let result = template.replace(/\[SPECIFIC TOPIC\]/g, specificTopic);

  // Find all other placeholders (e.g., [SOME_OTHER_PLACEHOLDER])
  const placeholderRegex = /\[([^\]]+)\]/g;
  const placeholders = [...result.matchAll(placeholderRegex)]
    .map(match => match[1])
    .filter(placeholder => placeholder !== 'SPECIFIC TOPIC');

  // Replace additional placeholders if provided
  placeholders.forEach(placeholder => {
    const replacement = additionalPlaceholders[placeholder] || `[${placeholder}]`; // Keep placeholder if no replacement provided
    result = result.replace(`[${placeholder}]`, replacement);
  });

  return result;
};

// Example usage (for testing):
const template = `
Write an article on [SPECIFIC TOPIC] that aims to be the most comprehensive, engaging, and authoritative resource on the internet.
...
Start with a hook: Use a surprising statistic, a thought-provoking question, or a vivid anecdote related to [SPECIFIC TOPIC] to grab attention.
`;

export const generateArticlePrompt = (topic: string): string => {
  return replacePlaceholders(template, topic);
};