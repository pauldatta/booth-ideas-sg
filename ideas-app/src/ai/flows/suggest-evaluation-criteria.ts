'use server';

/**
 * @fileOverview A flow to suggest evaluation criteria for an application idea.
 *
 * - suggestEvaluationCriteria - A function that takes an application idea and suggests evaluation criteria.
 * - SuggestEvaluationCriteriaInput - The input type for the suggestEvaluationCriteria function.
 * - SuggestEvaluationCriteriaOutput - The return type for the suggestEvaluationCriteria function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestEvaluationCriteriaInputSchema = z.object({
  idea: z.string().describe('The application idea provided by the user.'),
});
export type SuggestEvaluationCriteriaInput = z.infer<typeof SuggestEvaluationCriteriaInputSchema>;

const SuggestEvaluationCriteriaOutputSchema = z.object({
  innovationInAI: z.string().describe('A concise, one-sentence evaluation criteria for innovation in AI.'),
  userValue: z.string().describe('A concise, one-sentence evaluation criteria for user value.'),
  businessValue: z.string().describe('A concise, one-sentence evaluation criteria for business value.'),
  proposedTechStack: z.string().describe('A concise, one-sentence evaluation criteria for the proposed tech stack.'),
  recommendedTeam: z.string().describe('A concise, one-sentence evaluation criteria for the recommended team.'),
  suggestedProductAreas: z.string().describe('A concise, one-sentence evaluation criteria for suggested product areas.'),
});
export type SuggestEvaluationCriteriaOutput = z.infer<typeof SuggestEvaluationCriteriaOutputSchema>;

export async function suggestEvaluationCriteria(
  input: SuggestEvaluationCriteriaInput
): Promise<SuggestEvaluationCriteriaOutput> {
  return suggestEvaluationCriteriaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestEvaluationCriteriaPrompt',
  input: {schema: SuggestEvaluationCriteriaInputSchema},
  output: {schema: SuggestEvaluationCriteriaOutputSchema},
  prompt: `You are an expert in evaluating application ideas.

  Based on the following idea, suggest evaluation criteria for the following categories:

  - Innovation in AI
  - User Value
  - Business Value
  - Proposed Tech Stack
  - Recommended Team
  - Suggested Product Areas

  Idea: {{{idea}}}
  \n  IMPORTANT: Provide each criterion as a single, clear sentence. Do not use lists.
  `,
});

const suggestEvaluationCriteriaFlow = ai.defineFlow(
  {
    name: 'suggestEvaluationCriteriaFlow',
    inputSchema: SuggestEvaluationCriteriaInputSchema,
    outputSchema: SuggestEvaluationCriteriaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
