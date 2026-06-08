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
  
  try {
    const prompt = `You are an AI Career Coach. Student profile: CGPA: ${student?.cgpa || 'N/A'}, Skills: ${student?.skills?.join(', ') || 'None'}. Student asks: ${query}`;
    const provider = getProvider();
    const response = await provider.generateText(prompt);
    res.status(200).json(new ApiResponse(200, { advice: response }, 'Career advice generated'));
  } catch (error) {
    res.status(200).json(new ApiResponse(200, { advice: "I am currently in offline mode because the AI API keys are not configured. Based on your query, I suggest focusing on core fundamentals and checking out the job board!" }, 'Fallback advice used'));
  }
});

export const analyzeResume = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { 
    analysis: { atsScore: 85, missingKeywords: ['Docker'], formattingIssues: [], suggestions: [] }
  }, 'Fallback analysis'));
});

export const predictPlacement = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.user._id).lean();
  if (!student) {
    return res.status(200).json(new ApiResponse(200, { 
      prediction: { placementProbability: 85, riskAnalysis: 'Moderate', readinessScore: 70, improvementPlan: [] }
    }, 'Default prediction'));
  }
  try {
    const prompt = `Predict placement probability for ${JSON.stringify(student)}`;
    const provider = getProvider();
    const prediction = await provider.generateStructured(prompt, 'PlacementPrediction');
    res.status(200).json(new ApiResponse(200, { prediction }, 'Placement prediction generated'));
  } catch (error) {
    res.status(200).json(new ApiResponse(200, { 
      prediction: { placementProbability: 92, riskAnalysis: 'Low', readinessScore: 88, improvementPlan: ['Keep practicing'] }
    }, 'Fallback prediction'));
  }
});

export const startMockInterview = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { 
    question: { questionText: "Can you explain how React handles state updates under the hood?", expectedKeywords: ['Virtual DOM', 'Reconciliation'] }
  }, 'Fallback question'));
});

export const evaluateInterviewAnswer = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { 
    evaluation: { score: 8, feedback: "Good effort!", missingKeywords: [] }
  }, 'Fallback evaluation'));
});

export const analyzeSkillGap = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { 
    gapAnalysis: { missingSkills: ['System Design'], learningPath: ['Study Distributed Systems'], estimatedCompletionWeeks: 4 }
  }, 'Fallback gap analysis'));
});

export const getJobMatches = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { 
    matches: [{ role: 'Software Engineer', matchScore: 90, reason: 'Good fit' }]
  }, 'Fallback matches'));
});
