'use server';

/**
 * @fileOverview A flow to generate a suggested application name.
 *
 * - generateAppName - A function that takes an application idea and suggests a name.
 * - GenerateAppNameInput - The input type for the generateAppName function.
 * - GenerateAppNameOutput - The return type for the generateAppName function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAppNameInputSchema = z.object({
  idea: z.string().describe('The application idea provided by the user.'),
});
export type GenerateAppNameInput = z.infer<typeof GenerateAppNameInputSchema>;

const GenerateAppNameOutputSchema = z.object({
  appName: z.string().describe('A short, catchy, and unique application name in PascalCase or camelCase.'),
});
export type GenerateAppNameOutput = z.infer<typeof GenerateAppNameOutputSchema>;

export async function generateAppName(
  input: GenerateAppNameInput
): Promise<GenerateAppNameOutput> {
  return generateAppNameFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAppNamePrompt',
  input: {schema: GenerateAppNameInputSchema},
  output: {schema: GenerateAppNameOutputSchema},
  prompt: `You are an expert in branding and naming applications.

  Based on the following idea, generate a short, catchy, and unique application name. The name should be suitable for a tech product and should be in PascalCase or camelCase so it can be used in code.

  Idea: {{{idea}}}
  
  Examples of good names: "DogParkFinder", "RateMySpot", "PhotoSphere".
  Do not include spaces or special characters.
  `,
});

const generateAppNameFlow = ai.defineFlow(
  {
    name: 'generateAppNameFlow',
    inputSchema: GenerateAppNameInputSchema,
    outputSchema: GenerateAppNameOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
