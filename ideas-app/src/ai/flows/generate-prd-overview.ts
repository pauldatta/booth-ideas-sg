'use server';

/**
 * @fileOverview A PRD overview generation AI agent.
 *
 * - generatePrdOverview - A function that generates a PRD overview from an application idea.
 * - GeneratePrdOverviewInput - The input type for the generatePrdOverview function.
 * - GeneratePrdOverviewOutput - The return type for the generatePrdOverview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePrdOverviewInputSchema = z.object({
  idea: z.string().describe('The application idea.'),
});
export type GeneratePrdOverviewInput = z.infer<typeof GeneratePrdOverviewInputSchema>;

const GeneratePrdOverviewOutputSchema = z.object({
  problemStatement: z.string().describe('A brief, one-sentence problem statement derived from the idea.'),
  backgroundContext: z.string().describe('A brief, one-sentence background context of the idea.'),
  targetUser: z.string().describe('A brief, one-sentence description of the target user for the application.'),
  solution: z.string().describe('A brief, one-sentence proposed solution.'),
  desiredOutcome: z.string().describe('A brief, one-sentence desired outcome of the application.'),
});
export type GeneratePrdOverviewOutput = z.infer<typeof GeneratePrdOverviewOutputSchema>;

export async function generatePrdOverview(input: GeneratePrdOverviewInput): Promise<GeneratePrdOverviewOutput> {
  return generatePrdOverviewFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePrdOverviewPrompt',
  input: {schema: GeneratePrdOverviewInputSchema},
  output: {schema: GeneratePrdOverviewOutputSchema},
  prompt: `You are a product manager expert in creating PRD overviews.

  Given the following application idea, generate a PRD overview including the problem statement, background context, target user, solution, and desired outcome.
  \n  Idea: {{{idea}}}
  \n  IMPORTANT: Each section must be extremely concise, limited to a single, clear sentence.
  `,
});

const generatePrdOverviewFlow = ai.defineFlow(
  {
    name: 'generatePrdOverviewFlow',
    inputSchema: GeneratePrdOverviewInputSchema,
    outputSchema: GeneratePrdOverviewOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
