'use server';
/**
 * @fileOverview This file implements the Genkit flow for the Onboarding Empathy Gate.
 * It analyzes user emotional input during onboarding to detect harmful intent or emotional urgency,
 * guiding users gently into the community.
 *
 * - onboardingEmpathyGate - A function that handles the emotional input analysis.
 * - OnboardingEmpathyGateInput - The input type for the onboardingEmpathyGate function.
 * - OnboardingEmpathyGateOutput - The return type for the onboardingEmpathyGate function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const OnboardingEmpathyGateInputSchema = z.object({
  userEmotionalInput: z.string().describe("The user's initial emotional input or self-description during onboarding."),
});
export type OnboardingEmpathyGateInput = z.infer<typeof OnboardingEmpathyGateInputSchema>;

// Output Schema
const OnboardingEmpathyGateOutputSchema = z.object({
  hasHarmfulIntent: z.boolean().describe("True if the user's input indicates harmful intent towards themselves or others."),
  hasEmotionalUrgency: z.boolean().describe("True if the user's input indicates significant emotional urgency, requiring a sensitive response."),
  suggestedAction: z.string().describe("A suggested action or initial message based on the analysis (e.g., 'Welcome warmly', 'Suggest resources for mental health', 'Flag for human review due to high urgency')."),
  analysis: z.string().describe("A brief explanation of the AI's analysis of the input."),
});
export type OnboardingEmpathyGateOutput = z.infer<typeof OnboardingEmpathyGateOutputSchema>;

// Wrapper function to call the flow
export async function onboardingEmpathyGate(input: OnboardingEmpathyGateInput): Promise<OnboardingEmpathyGateOutput> {
  return onboardingEmpathyGateFlow(input);
}

// Define the Genkit Prompt
const onboardingEmpathyGatePrompt = ai.definePrompt({
  name: 'onboardingEmpathyGatePrompt',
  input: { schema: OnboardingEmpathyGateInputSchema },
  output: { schema: OnboardingEmpathyGateOutputSchema },
  prompt: `You are an AI assistant for "Amity", an emotional safe-space platform. Your role is to analyze a new user's initial emotional input during onboarding to ensure a safe and supportive entry into the community.

Carefully evaluate the user's input for two key aspects:
1.  **Harmful Intent:** Does the input express any intent to harm themselves or others, or promote hate speech, bullying, or illegal activities?
2.  **Emotional Urgency:** Does the input convey a strong sense of distress, crisis, or immediate need for support (e.g., severe anxiety, depression, suicidal ideation)?

Based on your analysis, determine the boolean values for 'hasHarmfulIntent' and 'hasEmotionalUrgency'.
Then, provide a 'suggestedAction' that guides the user appropriately. This could range from a warm welcome to recommending specific mental health resources or flagging the input for human review if the urgency or harmful intent is high.
Finally, provide a concise 'analysis' explaining your reasoning.

User's emotional input: "{{{userEmotionalInput}}}"`,
});

// Define the Genkit Flow
const onboardingEmpathyGateFlow = ai.defineFlow(
  {
    name: 'onboardingEmpathyGateFlow',
    inputSchema: OnboardingEmpathyGateInputSchema,
    outputSchema: OnboardingEmpathyGateOutputSchema,
  },
  async (input) => {
    const { output } = await onboardingEmpathyGatePrompt(input);
    if (!output) {
      throw new Error("No output received from the AI model.");
    }
    return output;
  }
);
