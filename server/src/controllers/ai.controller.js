import { ProviderFactory } from '../providers/provider.factory.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Student } from '../models/Student.js';

// Get AI provider based on environment config
const getProvider = () => {
  const type = process.env.OPENAI_API_KEY ? 'openai' : 'gemini';
  return ProviderFactory.get(type);
};

export const getCareerAdvice = asyncHandler(async (req, res) => {
  const { query } = req.body;
  const student = await Student.findById(req.user._id);
  
  const prompt = `You are an AI Career Coach. 
Student profile: CGPA: ${student.cgpa}, Skills: ${student.skills.join(', ')}.
Student asks: ${query}
Provide personalized career advice, project ideas, and next steps in a concise, structured way.`;

  const provider = getProvider();
  const response = await provider.generateText(prompt);

  res.status(200).json(new ApiResponse(200, { advice: response }, 'Career advice generated'));
});

export const analyzeResume = asyncHandler(async (req, res) => {
  // In a real app, parse PDF text here using pdf-parse
  const { resumeText } = req.body;
  
  const prompt = `Analyze this resume and provide JSON output.
Resume: ${resumeText}
Output format should have: atsScore (0-100), missingKeywords (array), formattingIssues (array), and suggestions (array of objects with category and feedback).`;

  const provider = getProvider();
  const analysis = await provider.generateStructured(prompt, 'ResumeAnalysis');

  res.status(200).json(new ApiResponse(200, { analysis }, 'Resume analyzed successfully'));
});

export const predictPlacement = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.user._id).lean();
  
  const prompt = `Predict placement probability for this student based on these metrics: ${JSON.stringify(student)}.
Return a JSON object with: placementProbability (0-100), riskAnalysis (string), readinessScore (0-100), and improvementPlan (array of steps).`;

  const provider = getProvider();
  const prediction = await provider.generateStructured(prompt, 'PlacementPrediction');

  res.status(200).json(new ApiResponse(200, { prediction }, 'Placement prediction generated'));
});

export const startMockInterview = asyncHandler(async (req, res) => {
  const { type, domain, difficulty } = req.body;
  
  const prompt = `Generate a ${difficulty} difficulty ${type} interview question for the domain: ${domain}.
Return JSON with: questionText (string), expectedKeywords (array of strings).`;

  const provider = getProvider();
  const questionData = await provider.generateStructured(prompt, 'InterviewQuestion');

  res.status(200).json(new ApiResponse(200, { question: questionData }, 'Interview question generated'));
});

export const evaluateInterviewAnswer = asyncHandler(async (req, res) => {
  const { question, answer, expectedKeywords } = req.body;
  
  const prompt = `Evaluate this interview answer.
Question: ${question}
Answer: ${answer}
Expected keywords: ${expectedKeywords.join(', ')}
Return JSON with: score (0-10), feedback (string), missingKeywords (array).`;

  const provider = getProvider();
  const evaluation = await provider.generateStructured(prompt, 'AnswerEvaluation');

  res.status(200).json(new ApiResponse(200, { evaluation }, 'Answer evaluated'));
});

export const analyzeSkillGap = asyncHandler(async (req, res) => {
  const { targetCompany } = req.body;
  const student = await Student.findById(req.user._id);
  
  const prompt = `Analyze skill gap for student aiming for ${targetCompany}.
Student skills: ${student.skills.join(', ')}.
Return JSON with: missingSkills (array), learningPath (array of steps), estimatedCompletionWeeks (number).`;

  const provider = getProvider();
  const gapAnalysis = await provider.generateStructured(prompt, 'SkillGap');

  res.status(200).json(new ApiResponse(200, { gapAnalysis }, 'Skill gap analyzed'));
});

export const getJobMatches = asyncHandler(async (req, res) => {
  // In a real app, we'd fetch jobs and rank them, here we mock the LLM ranking logic
  const student = await Student.findById(req.user._id);
  
  const prompt = `Based on student profile (Skills: ${student.skills.join(', ')}), what are 3 ideal job roles they should apply for?
Return JSON with: recommendations (array of objects with role, matchScore 0-100, and reason).`;

  const provider = getProvider();
  const matches = await provider.generateStructured(prompt, 'JobMatches');

  res.status(200).json(new ApiResponse(200, { matches }, 'Job matches generated'));
});
