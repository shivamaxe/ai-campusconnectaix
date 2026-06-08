export class LLMProvider {
  /**
   * Generates a text response from the LLM
   * @param {string} prompt - The input prompt
   * @param {object} options - Optional configuration (temperature, maxTokens, etc.)
   * @returns {Promise<string>}
   */
  async generateText(prompt, options = {}) {
    throw new Error('Method not implemented.');
  }

  /**
   * Generates structured JSON data from the LLM
   * @param {string} prompt - The input prompt
   * @param {object} schema - The expected JSON schema
   * @returns {Promise<object>}
   */
  async generateStructured(prompt, schema) {
    throw new Error('Method not implemented.');
  }
}
