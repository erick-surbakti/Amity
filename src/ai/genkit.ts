import {genkit, GenerationCommonConfigSchema} from 'genkit';
import {groq} from 'genkitx-groq';
import {modelRef} from 'genkit/model';

// Define the GPT-OSS 120B model manually as it is a newer flagship model on Groq
export const gptOss120b = modelRef({
  name: 'groq/openai/gpt-oss-120b',
  info: {
    label: 'GPT-OSS 120B',
    supports: {
      multiturn: true,
      tools: true,
      media: false,
      systemRole: true,
      output: ['text', 'json'],
    },
  },
  configSchema: GenerationCommonConfigSchema,
  version: 'openai/gpt-oss-120b',
});

export const ai = genkit({
  plugins: [groq({apiKey: process.env.GROQ_API_KEY})],
  model: gptOss120b,
});
