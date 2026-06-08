import { OpenAIAdapter } from './openai.adapter.js';
import { GeminiAdapter } from './gemini.adapter.js';

export class ProviderFactory {
  /**
   * Get an LLM provider instance
   * @param {'openai' | 'gemini'} type - The provider type
   * @returns {LLMProvider}
   */
  static get(type = 'gemini') {
    switch (type.toLowerCase()) {
      case 'openai':
        return new OpenAIAdapter();
      case 'gemini':
      default:
        return new GeminiAdapter();
    }
  }
}
