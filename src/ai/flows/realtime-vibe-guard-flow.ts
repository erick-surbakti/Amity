'use server';
/**
 * @fileOverview A Genkit flow for real-time content moderation.
 *
 * - realtimeVibeGuard - A function that moderates user-generated content.
 * - RealtimeVibeGuardInput - The input type for the realtimeVibeGuard function.
 * - RealtimeVibeGuardOutput - The return type for the realtimeVibeGuard function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RealtimeVibeGuardInputSchema = z.object({
  content: z.string().describe('The user-generated content to be moderated.'),
});
export type RealtimeVibeGuardInput = z.infer<typeof RealtimeVibeGuardInputSchema>;

const RealtimeVibeGuardOutputSchema = z.object({
  moderationStatus: z.enum(['Safe', 'Warning', 'Block']).describe('The moderation status of the content. "Safe" if no issues, "Warning" for minor issues, "Block" for severe issues.'),
  reason: z.string().describe('A detailed explanation for the moderation status, especially if it is "Warning" or "Block".').optional(),
  categoriesDetected: z.array(z.enum(['Toxic Language', 'Triggering Content', 'Signs of Distress'])).describe('A list of specific harmful categories detected in the content.').optional(),
});
export type RealtimeVibeGuardOutput = z.infer<typeof RealtimeVibeGuardOutputSchema>;

export async function realtimeVibeGuard(input: RealtimeVibeGuardInput): Promise<RealtimeVibeGuardOutput> {
  return realtimeVibeGuardFlow(input);
}

const realtimeVibeGuardPrompt = ai.definePrompt({
  name: 'realtimeVibeGuardPrompt',
  input: { schema: RealtimeVibeGuardInputSchema },
  output: { schema: RealtimeVibeGuardOutputSchema },
  config: {
    // Ensure the model provides output even if it contains sensitive content,
    // as the purpose of this flow is to detect and categorize such content.
    safetySettings: [
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
    ],
  },
  prompt: `You are an AI content moderator for 'Amity', an emotional safe-space platform. Your primary goal is to maintain a supportive and safe environment for all users by identifying problematic content.

Analyze the following user-generated content carefully. Your analysis should focus on three main categories:
1.  **Toxic Language**: Any language that is offensive, hateful, derogatory, or abusive.
2.  **Triggering Content**: Content that might cause emotional distress, flashbacks, or negative reactions due to its sensitive nature (e.g., graphic descriptions, self-harm references, extreme negativity).
3.  **Signs of Distress**: Expressions that indicate a user might be struggling emotionally, feeling hopeless, or showing signs of self-harm ideation (e.g., explicit statements of sadness, despair, or intent).

Based on your assessment, provide a moderation status:
-   'Safe': The content is appropriate and contains no detectable issues.
-   'Warning': The content contains minor issues, such as mildly toxic language or subtle signs of distress, that warrant a flag but not an outright block.
-   'Block': The content contains severe issues, such as highly toxic language, explicit triggering content, or clear signs of severe distress or self-harm ideation, requiring immediate intervention or blocking.

Always provide a 'reason' explaining your decision. If categories are detected, list them in 'categoriesDetected'.

Content to moderate: {{{content}}}`,
});

const realtimeVibeGuardFlow = ai.defineFlow(
  {
    name: 'realtimeVibeGuardFlow',
    inputSchema: RealtimeVibeGuardInputSchema,
    outputSchema: RealtimeVibeGuardOutputSchema,
  },
  async (input) => {
    const { output } = await realtimeVibeGuardPrompt(input);
    return output!;
  }
);
