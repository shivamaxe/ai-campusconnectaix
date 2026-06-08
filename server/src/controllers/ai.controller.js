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
  const { query, history = [] } = req.body;
  const student = await Student.findById(req.user._id);
  
  try {
    console.log(`[AI Controller] getCareerAdvice called. Query: "${query}"`);
    if (!process.env.GEMINI_API_KEY && !process.env.OPENAI_API_KEY) {
      throw new Error("Missing API Key configuration in server/.env");
    }

    const historyString = history.map(h => `${h.role === 'user' ? 'Student' : 'Coach'}: ${h.text}`).join('\n');
    const prompt = `You are an AI Career Coach. Student profile: CGPA: ${student?.cgpa || 'N/A'}, Skills: ${student?.skills?.join(', ') || 'None'}. 
Previous Conversation:
${historyString}

Student asks: ${query}`;
    const provider = getProvider();
    
    const response = await provider.generateText(prompt);
    console.log(`[AI Controller] getCareerAdvice success.`);
    res.status(200).json(new ApiResponse(200, { advice: response }, 'Career advice generated'));
  } catch (error) {
    console.error(`[AI Controller] Error in getCareerAdvice:`, error.message);
    res.status(500).json(new ApiResponse(500, null, `AI Service Error: ${error.message}`));
  }
});

export const analyzeResume = asyncHandler(async (req, res) => {
  const { resumeText } = req.body;
  if (!resumeText) {
    return res.status(400).json(new ApiResponse(400, null, 'Resume text is required'));
  }

  try {
    console.log(`[AI Controller] analyzeResume called.`);
    const prompt = `Analyze this resume for a software engineering role. Return a JSON object with: atsScore (number 0-100), missingKeywords (array of strings), formattingIssues (array of strings), and suggestions (array of strings). Resume: ${resumeText}`;
    const provider = getProvider();
    const analysis = await provider.generateStructured(prompt, 'ResumeAnalysis');
    console.log(`[AI Controller] analyzeResume success.`);
    res.status(200).json(new ApiResponse(200, { analysis }, 'Resume analysis completed'));
  } catch (error) {
    console.error(`[AI Controller] Error in analyzeResume:`, error.message);
    res.status(500).json(new ApiResponse(500, null, `AI Service Error: ${error.message}`));
  }
});

export const predictPlacement = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.user._id).lean();
  if (!student) {
    return res.status(404).json(new ApiResponse(404, null, 'Student not found'));
  }
  try {
    console.log(`[AI Controller] predictPlacement called for student ID: ${student._id}`);
    const prompt = `Predict placement probability for ${JSON.stringify(student)}. Return JSON with placementProbability (number 0-100), riskAnalysis (string), readinessScore (number 0-100), improvementPlan (array of strings).`;
    const provider = getProvider();
    const prediction = await provider.generateStructured(prompt, 'PlacementPrediction');
    console.log(`[AI Controller] predictPlacement success.`);
    res.status(200).json(new ApiResponse(200, { prediction }, 'Placement prediction generated'));
  } catch (error) {
    console.error(`[AI Controller] Error in predictPlacement:`, error.message);
    res.status(500).json(new ApiResponse(500, null, `AI Service Error: ${error.message}`));
  }
});

export const startMockInterview = asyncHandler(async (req, res) => {
  console.log(`[AI Controller] startMockInterview called.`);
  res.status(501).json(new ApiResponse(501, null, 'Mock Interview not implemented fully yet.'));
});

export const evaluateInterviewAnswer = asyncHandler(async (req, res) => {
  console.log(`[AI Controller] evaluateInterviewAnswer called.`);
  res.status(501).json(new ApiResponse(501, null, 'Interview Evaluation not implemented fully yet.'));
});

export const analyzeSkillGap = asyncHandler(async (req, res) => {
  const { targetRole } = req.body;
  const student = await Student.findById(req.user._id).lean();
  if (!student) {
    return res.status(404).json(new ApiResponse(404, null, 'Student not found'));
  }
  
  try {
    console.log(`[AI Controller] analyzeSkillGap called for targetRole: ${targetRole}`);
    const prompt = `Analyze the skill gap for student with skills [${student?.skills?.join(', ') || 'None'}] targeting the role "${targetRole || 'Software Engineer'}". Return JSON with: missingSkills (array of strings), learningPath (array of strings with actionable steps), estimatedCompletionWeeks (number).`;
    const provider = getProvider();
    const gapAnalysis = await provider.generateStructured(prompt, 'SkillGapAnalysis');
    console.log(`[AI Controller] analyzeSkillGap success.`);
    res.status(200).json(new ApiResponse(200, { gapAnalysis }, 'Gap analysis completed'));
  } catch (error) {
    console.error(`[AI Controller] Error in analyzeSkillGap:`, error.message);
    res.status(500).json(new ApiResponse(500, null, `AI Service Error: ${error.message}`));
  }
});

export const getJobMatches = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { 
    matches: [{ role: 'Software Engineer', matchScore: 90, reason: 'Good fit' }]
  }, 'Fallback matches'));
});
