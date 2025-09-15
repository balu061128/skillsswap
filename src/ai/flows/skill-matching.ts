'use server';

/**
 * @fileOverview Skill matching flow to suggest potential skill exchange partners.
 *
 * - skillMatching - A function that handles the skill matching process.
 * - SkillMatchingInput - The input type for the skillMatching function.
 * - SkillMatchingOutput - The return type for the skillMatching function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillMatchingInputSchema = z.object({
  userSkills: z
    .array(z.string())
    .describe('The skills possessed by the user.'),
  userInterests: z
    .array(z.string())
    .describe('The interests of the user.'),
  pastInteractions: z
    .string()
    .describe('A summary of the user\'s past skill exchange interactions.'),
  statedNeeds: z
    .string()
    .describe('The stated learning needs of the user.'),
});
export type SkillMatchingInput = z.infer<typeof SkillMatchingInputSchema>;

const SkillMatchingOutputSchema = z.object({
  suggestedPartners: z
    .array(z.string())
    .describe(
      'A list of user IDs who are good potential skill exchange partners.'
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the suggested partners, explaining why they are a good match.'
    ),
});
export type SkillMatchingOutput = z.infer<typeof SkillMatchingOutputSchema>;

export async function skillMatching(
  input: SkillMatchingInput
): Promise<SkillMatchingOutput> {
  return skillMatchingFlow(input);
}

const skillMatchingPrompt = ai.definePrompt({
  name: 'skillMatchingPrompt',
  input: {schema: SkillMatchingInputSchema},
  output: {schema: SkillMatchingOutputSchema},
  prompt: `You are an AI assistant designed to suggest skill exchange partners for a user.

  Consider the following information about the user:

  Skills: {{#each userSkills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Interests: {{#each userInterests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Past Interactions: {{{pastInteractions}}}
  Stated Needs: {{{statedNeeds}}}

  Based on this information, suggest a list of user IDs who would be good skill exchange partners for this user.
  Also, provide a brief explanation of why each suggested partner is a good match, referencing their complementary skills and shared interests.
  Ensure that the suggested partners have skills that align with the user's stated needs.

  Format your response as a JSON object with the following structure:
  {
    "suggestedPartners": ["user_id_1", "user_id_2", ...],
    "reasoning": "Explanation of why these partners are a good match."
  }
  `,
});

const skillMatchingFlow = ai.defineFlow(
  {
    name: 'skillMatchingFlow',
    inputSchema: SkillMatchingInputSchema,
    outputSchema: SkillMatchingOutputSchema,
  },
  async input => {
    const {output} = await skillMatchingPrompt(input);
    return output!;
  }
);
