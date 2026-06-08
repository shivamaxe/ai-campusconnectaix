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

import { InterviewSession } from '../models/InterviewSession.js';

export const startMockInterview = asyncHandler(async (req, res) => {
  const { type = 'technical', domain = 'Full-Stack JavaScript', difficulty = 'medium' } = req.body;
  
  try {
    console.log(`[AI Controller] startMockInterview called. Type: ${type}, Domain: ${domain}, Difficulty: ${difficulty}`);
    if (!process.env.GEMINI_API_KEY && !process.env.OPENAI_API_KEY) {
      throw new Error("Missing API Key configuration in server/.env");
    }

    const prompt = `Generate exactly 3 highly relevant interview questions for a student interviewing for a '${domain}' role of type '${type}' with '${difficulty}' difficulty. For each question, also specify 3 expected technical keywords. 
Format your response strictly as a JSON array of objects:
[
  {
    "questionText": "...",
    "expectedKeywords": ["...", "...", "..."]
  }
]`;

    const provider = getProvider();
    const questions = await provider.generateStructured(prompt, 'InterviewQuestions');
    
    // Create new interview session
    const session = await InterviewSession.create({
      studentId: req.user._id,
      type,
      domain,
      difficulty,
      questions: Array.isArray(questions) ? questions : []
    });

    console.log(`[AI Controller] startMockInterview success. Session ID: ${session._id}`);
    res.status(200).json(new ApiResponse(200, session, 'Mock interview session started'));
  } catch (error) {
    console.error(`[AI Controller] Error in startMockInterview:`, error.message);
    res.status(500).json(new ApiResponse(500, null, `AI Service Error: ${error.message}`));
  }
});

export const evaluateInterviewAnswer = asyncHandler(async (req, res) => {
  const { sessionId, questionId, userAnswer, timeTaken = 30 } = req.body;

  if (!sessionId || !questionId || !userAnswer) {
    return res.status(400).json(new ApiResponse(400, null, 'SessionId, QuestionId and UserAnswer are required'));
  }

  try {
    console.log(`[AI Controller] evaluateInterviewAnswer called. Session: ${sessionId}, Question: ${questionId}`);
    
    const session = await InterviewSession.findOne({ _id: sessionId, studentId: req.user._id });
    if (!session) {
      return res.status(404).json(new ApiResponse(404, null, 'Interview session not found'));
    }

    const question = session.questions.id(questionId);
    if (!question) {
      return res.status(404).json(new ApiResponse(404, null, 'Question not found in this session'));
    }

    const prompt = `Evaluate the student's answer to this interview question:
Question: "${question.questionText}"
Expected keywords: [${question.expectedKeywords.join(', ')}]
Student's Answer: "${userAnswer}"

Provide constructive feedback, a score out of 10, and identify which expected keywords they successfully used or missed.
Format your response strictly as a JSON object:
{
  "score": 8,
  "feedback": "...",
  "missingKeywords": ["keyword1", "keyword2"]
}`;

    const provider = getProvider();
    const evaluationResult = await provider.generateStructured(prompt, 'QuestionEvaluation');

    // Push answer
    session.answers.push({
      questionId,
      userAnswer,
      timeTaken
    });

    // Push evaluation
    session.evaluation.push({
      questionId,
      score: evaluationResult.score,
      feedback: evaluationResult.feedback,
      missingKeywords: evaluationResult.missingKeywords || []
    });

    // Check if session is completed (all questions answered)
    if (session.answers.length === session.questions.length) {
      const totalScore = session.evaluation.reduce((acc, curr) => acc + curr.score, 0);
      const avgScore = (totalScore / session.questions.length) * 10; // scale to 0-100
      session.readinessScore = Math.round(avgScore);

      // Ask AI for overall feedback summary
      const summaryPrompt = `Provide a concise overall feedback summary for a mock interview session. The student got an average score of ${session.readinessScore}/100 across ${session.questions.length} questions. Here is the individual feedback for each question:
${session.evaluation.map((ev, i) => `Q${i+1} Score: ${ev.score}/10. Feedback: ${ev.feedback}`).join('\n')}

Format your response as a simple text summary showing key strengths, weaknesses, and a final recommendation.`;
      
      const summaryText = await provider.generateText(summaryPrompt);
      session.overallFeedback = summaryText;
    }

    await session.save();

    console.log(`[AI Controller] evaluateInterviewAnswer success.`);
    res.status(200).json(new ApiResponse(200, { 
      evaluation: session.evaluation[session.evaluation.length - 1],
      isCompleted: session.answers.length === session.questions.length,
      readinessScore: session.readinessScore,
      overallFeedback: session.overallFeedback
    }, 'Question evaluated successfully'));
  } catch (error) {
    console.error(`[AI Controller] Error in evaluateInterviewAnswer:`, error.message);
    res.status(500).json(new ApiResponse(500, null, `AI Service Error: ${error.message}`));
  }
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
