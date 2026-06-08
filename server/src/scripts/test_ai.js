import 'dotenv/config';
import { ProviderFactory } from '../providers/provider.factory.js';

async function testAI() {
  console.log('Testing Gemini AI Adapter with 10 questions...');
  
  const type = process.env.OPENAI_API_KEY ? 'openai' : 'gemini';
  const provider = ProviderFactory.get(type);

  const questions = [
    "What is React?",
    "Explain closure in JavaScript",
    "What are the benefits of TypeScript?",
    "How does Node.js event loop work?",
    "Why use MongoDB?",
    "What is JWT?",
    "Write a regex for email validation",
    "Explain the SOLID principles",
    "What is Docker used for?",
    "Tell me a programming joke"
  ];

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    try {
      console.log(`\nQ${i+1}: ${q}`);
      const response = await provider.generateText(q);
      console.log(`A${i+1}: ${response.substring(0, 100)}... (unique response generated)`);
    } catch (e) {
      console.error(`Error on Q${i+1}:`, e.message);
    }
  }
}

testAI().then(() => process.exit(0));
