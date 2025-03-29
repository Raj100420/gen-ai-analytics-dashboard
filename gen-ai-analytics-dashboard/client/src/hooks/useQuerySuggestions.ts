import { useState, useEffect } from 'react';

// This hook simulates AI-powered query suggestions
export function useQuerySuggestions(input: string): string[] {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Default suggestions for empty or short inputs
  const defaultSuggestions = [
    'Show monthly revenue trends for 2023',
    'Compare user growth by region',
    'Calculate conversion rate by channel'
  ];

  // Business-related suggestion patterns based on input
  const suggestionPatterns = [
    {
      keywords: ['sales', 'revenue'],
      suggestions: [
        'Show monthly sales for Q1 2023',
        'Compare sales by product category',
        'Analyze sales pipeline conversion rates'
      ]
    },
    {
      keywords: ['user', 'customer'],
      suggestions: [
        'Show customer retention rate',
        'Compare user acquisition costs by channel',
        'Analyze user engagement metrics'
      ]
    },
    {
      keywords: ['marketing', 'campaign'],
      suggestions: [
        'Show ROI for recent marketing campaigns',
        'Compare conversion rates across marketing channels',
        'Analyze email campaign performance'
      ]
    }
  ];

  useEffect(() => {
    // If input is too short, use default suggestions
    if (!input || input.length < 3) {
      setSuggestions(defaultSuggestions);
      return;
    }

    // Simulate a delay to mimic AI processing
    const timer = setTimeout(() => {
      const inputLower = input.toLowerCase();
      
      // Check if input contains any keywords from our patterns
      for (const pattern of suggestionPatterns) {
        if (pattern.keywords.some(keyword => inputLower.includes(keyword))) {
          setSuggestions(pattern.suggestions);
          return;
        }
      }
      
      // If no specific pattern matches, provide context-aware suggestions
      const contextSuggestions = [
        `Analyze ${input} over the last 6 months`,
        `Compare ${input} by business unit`,
        `Show trends for ${input}`
      ];
      
      setSuggestions(contextSuggestions);
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);

  return suggestions;
}
