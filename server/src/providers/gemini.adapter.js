import { GoogleGenerativeAI } from '@google/generative-ai';
import { LLMProvider } from './llm.interface.js';

export class GeminiAdapter extends LLMProvider {
  constructor() {
    super();
    if (!process.env.GEMINI_API_KEY) {
      console.warn('WARNING: GEMINI_API_KEY is missing from environment variables.');
    }
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    this.model = 'gemini-1.5-flash';
  }

  async generateText(prompt, options = {}) {
    console.log(`[GeminiAdapter] Generating text for prompt: ${prompt.substring(0, 50)}...`);

    try {
      const model = this.genAI.getGenerativeModel({ model: options.model || this.model });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Failed to generate response from Gemini');
    }
  }

  async generateStructured(prompt, schemaName) {
    console.log(`[GeminiAdapter] Generating structured response for schema: ${schemaName}`);

    try {
      const model = this.genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash',
        generationConfig: {
          responseMimeType: "application/json",
        }
      });
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      console.error('[GeminiAdapter] API Error during generateStructured:', error.message);
      throw new Error(`Failed to generate structured response from Gemini: ${error.message}`);
    }
  }
}
