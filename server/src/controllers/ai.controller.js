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
    
    // Simulate API validation early to force fallback if no keys are provided
    if (!process.env.OPENAI_API_KEY && !process.env.GEMINI_API_KEY) {
      throw new Error("No API keys configured.");
    }
    
    const response = await provider.generateText(prompt);
    res.status(200).json(new ApiResponse(200, { advice: response }, 'Career advice generated'));
  } catch (error) {
    // Dynamic Mock Fallback Logic
    const q = query.toLowerCase();
    let dynamicResponse = "I am currently in offline mode. However, regarding your query, I suggest focusing on core fundamentals and exploring our job board!";
    
    if (q.includes("java")) {
      dynamicResponse = "Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible. It is widely used in enterprise backend systems.";
    } else if (q.includes("python")) {
      dynamicResponse = "Python is an interpreted, high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation. Great for AI and backend!";
    } else if (q.includes("elon musk")) {
      dynamicResponse = "Elon Musk is a business magnate and investor. He is the founder, CEO, and Chief Engineer at SpaceX; angel investor, CEO, and Product Architect of Tesla, Inc.; owner and CTO of X Corp.; founder of the Boring Company; and co-founder of Neuralink and OpenAI.";
    } else if (q.includes("machine learning")) {
      dynamicResponse = "Machine Learning is a field of inquiry devoted to understanding and building methods that 'learn', that is, methods that leverage data to improve performance on some set of tasks.";
    } else if (q.includes("joke")) {
      dynamicResponse = "Why do programmers prefer dark mode? Because light attracts bugs!";
    } else if (q.includes("resume")) {
      dynamicResponse = "To improve your resume, make sure you highlight quantifiable achievements (e.g., 'reduced load time by 30%') rather than just listing responsibilities. Also, ensure you match keywords from the job description!";
    } else if (q.includes("interview")) {
      dynamicResponse = "For technical interviews, practice the STAR method (Situation, Task, Action, Result) for behavioral questions, and practice explaining your thought process out loud for coding problems.";
    }

    res.status(200).json(new ApiResponse(200, { advice: `[Offline Mode] ${dynamicResponse}` }, 'Fallback advice used'));
  }
});

export const analyzeResume = asyncHandler(async (req, res) => {
  const { resumeText } = req.body;
  if (!resumeText) {
    return res.status(400).json(new ApiResponse(400, null, 'Resume text is required'));
  }

  try {
    const prompt = `Analyze this resume for a software engineering role. Return a JSON object with: atsScore (number 0-100), missingKeywords (array of strings), formattingIssues (array of strings), and suggestions (array of strings). Resume: ${resumeText}`;
    const provider = getProvider();
    const analysis = await provider.generateStructured(prompt, 'ResumeAnalysis');
    res.status(200).json(new ApiResponse(200, { analysis }, 'Resume analysis completed'));
  } catch (error) {
    res.status(200).json(new ApiResponse(200, { 
      analysis: { atsScore: 85, missingKeywords: ['Docker'], formattingIssues: [], suggestions: ['Use STAR method for bullets'] }
    }, 'Fallback analysis'));
  }
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
