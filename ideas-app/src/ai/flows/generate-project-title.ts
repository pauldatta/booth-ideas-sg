'use server';

/**
 * @fileOverview A flow to generate a project title.
 *
 * - generateProjectTitle - A function that takes an application idea and suggests a title.
 * - GenerateProjectTitleInput - The input type for the generateProjectTitle function.
 * - GenerateProjectTitleOutput - The return type for the generateProjectTitle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectTitleInputSchema = z.object({
  idea: z.string().describe('The application idea provided by the user.'),
});
export type GenerateProjectTitleInput = z.infer<typeof GenerateProjectTitleInputSchema>;

const GenerateProjectTitleOutputSchema = z.object({
  projectTitle: z.string().describe('A descriptive project title, with title-case capitalization. For example: "Ingredient-Based Recipe Suggester".'),
});
export type GenerateProjectTitleOutput = z.infer<typeof GenerateProjectTitleOutputSchema>;

export async function generateProjectTitle(
  input: GenerateProjectTitleInput
): Promise<GenerateProjectTitleOutput> {
  return generateProjectTitleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectTitlePrompt',
  input: {schema: GenerateProjectTitleInputSchema},
  output: {schema: GenerateProjectTitleOutputSchema},
  prompt: `You are an expert in branding and naming applications.

  Based on the following idea, generate a descriptive project title. The title should be clear and suitable for a project name. It should be in title case.
  For example, if the idea is "an app that suggests recipes based on ingredients I have at home", a good title would be "Ingredient-Based Recipe Suggester".

  Idea: {{{idea}}}
  `,
});

const generateProjectTitleFlow = ai.defineFlow(
  {
    name: 'generateProjectTitleFlow',
    inputSchema: GenerateProjectTitleInputSchema,
    outputSchema: GenerateProjectTitleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
