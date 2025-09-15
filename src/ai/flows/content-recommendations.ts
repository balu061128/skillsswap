'use server';

/**
 * @fileOverview An AI agent that recommends learning materials and resources based on user skills and interests.
 *
 * - recommendContent - A function that recommends content based on user skills and interests.
 * - RecommendContentInput - The input type for the recommendContent function.
 * - RecommendContentOutput - The return type for the recommendContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendContentInputSchema = z.object({
  skills: z
    .array(z.string())
    .describe('A list of the user\'s current skills.'),
  interests: z
    .array(z.string())
    .describe('A list of the user\'s learning interests.'),
});
export type RecommendContentInput = z.infer<typeof RecommendContentInputSchema>;

const RecommendContentOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of recommended learning materials and resources.'),
});
export type RecommendContentOutput = z.infer<typeof RecommendContentOutputSchema>;

export async function recommendContent(input: RecommendContentInput): Promise<RecommendContentOutput> {
  return recommendContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendContentPrompt',
  input: {schema: RecommendContentInputSchema},
  output: {schema: RecommendContentOutputSchema},
  prompt: `You are a learning resource recommendation expert.

  Based on the user's skills and interests, recommend relevant learning materials and resources.

  Skills: {{#each skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Interests: {{#each interests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Recommendations:`,
});

const recommendContentFlow = ai.defineFlow(
  {
    name: 'recommendContentFlow',
    inputSchema: RecommendContentInputSchema,
    outputSchema: RecommendContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
