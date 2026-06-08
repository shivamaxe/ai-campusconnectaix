import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Brain, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Play, 
  Loader2, 
  AlertCircle, 
  Award,
  ChevronRight,
  Clock,
  BookOpen
} from 'lucide-react';
import { useStartMockInterviewMutation, useEvaluateInterviewAnswerMutation } from '../../store/api';
import { useNavigate } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const MockInterview = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'setup' | 'loading' | 'interview' | 'evaluating' | 'feedback' | 'result'>('setup');
  
  // Setup States
  const [type, setType] = useState<'technical' | 'hr' | 'behavioral'>('technical');
  const [domain, setDomain] = useState('Full-Stack JavaScript');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  // Interview States
  const [session, setSession] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeTaken, setTimeTaken] = useState(0);
  const [timerInterval, setTimerInterval] = useState<any>(null);

  // Feedback/Result States
  const [evaluation, setEvaluation] = useState<any>(null);
  const [finalScore, setFinalScore] = useState(0);
  const [finalFeedback, setFinalFeedback] = useState('');

  // RTK Mutations
  const [startInterview, { isLoading: isStarting }] = useStartMockInterviewMutation();
  const [evaluateAnswer, { isLoading: isEvaluating }] = useEvaluateInterviewAnswerMutation();

  // Handle Timer
  useEffect(() => {
    if (step === 'interview') {
      const interval = setInterval(() => {
        setTimeTaken((prev) => prev + 1);
      }, 1000);
      setTimerInterval(interval);
      return () => clearInterval(interval);
    } else {
      if (timerInterval) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
    }
  }, [step]);

  const handleStart = async () => {
    setStep('loading');
    try {
      const res = await startInterview({ type, domain, difficulty }).unwrap();
      if (res.success && res.data) {
        setSession(res.data);
        setCurrentQuestionIndex(0);
        setTimeTaken(0);
        setUserAnswer('');
        setStep('interview');
      } else {
        throw new Error(res.message || 'Failed to start interview');
      }
    } catch (err: any) {
      alert(err?.data?.message || err.message || 'Error starting interview. Ensure your API Key is valid.');
      setStep('setup');
    }
  };

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) return;
    setStep('evaluating');
    try {
      const currentQuestion = session.questions[currentQuestionIndex];
      const res = await evaluateAnswer({
        sessionId: session._id,
        questionId: currentQuestion._id,
        userAnswer,
        timeTaken
      }).unwrap();

      if (res.success && res.data) {
        setEvaluation(res.data.evaluation);
        if (res.data.isCompleted) {
          setFinalScore(res.data.readinessScore);
          setFinalFeedback(res.data.overallFeedback);
        }
        setStep('feedback');
      } else {
        throw new Error(res.message || 'Failed to evaluate answer');
      }
    } catch (err: any) {
      alert(err?.data?.message || err.message || 'Error evaluating answer.');
      setStep('interview');
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < session.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setUserAnswer('');
      setTimeTaken(0);
      setStep('interview');
    } else {
      setStep('result');
    }
  };

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Title */}
      <div className="mb-8 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold font-['Outfit'] text-white tracking-tight">
            AI Mock <span className="text-gradient">Interview</span>
          </h1>
          <p className="text-slate-400 mt-1 text-sm font-medium">
            Practice coding and behavioral interviews in real-time with granular feedback.
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* SETUP STEP */}
        {step === 'setup' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
          >
            <Card className="p-8 border border-white/5 bg-[#0f172a]/60 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
              
              <h2 className="text-xl font-bold text-white font-['Outfit'] mb-6 flex items-center gap-2">
                Configure Interview Parameters
              </h2>

              <div className="space-y-6">
                {/* Interview Type */}
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-3">Interview Focus</label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'technical', label: 'Technical', desc: 'Coding, system design, tech stack' },
                      { id: 'behavioral', label: 'Behavioral', desc: 'STAR method, work ethics' },
                      { id: 'hr', label: 'HR / Fit', desc: 'Company culture, background' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setType(item.id as any)}
                        className={`p-4 rounded-xl border text-left transition-all relative ${
                          type === item.id 
                            ? 'bg-indigo-600/15 border-indigo-500/50 text-white shadow-lg shadow-indigo-900/10' 
                            : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10 hover:text-white'
                        }`}
                      >
                        <p className="font-semibold text-sm">{item.label}</p>
                        <p className="text-xs text-slate-400 mt-1 leading-normal">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Domain / Role */}
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">Target Role or Technology</label>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all text-sm font-medium"
                    placeholder="e.g. React Native Developer, Python Backend, Data Structures"
                  />
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-3">Difficulty Level</label>
                  <div className="grid grid-cols-3 gap-4">
                    {['easy', 'medium', 'hard'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setDifficulty(level as any)}
                        className={`py-3 rounded-xl border font-bold capitalize text-sm transition-all ${
                          difficulty === level
                            ? 'bg-indigo-600/15 border-indigo-500/50 text-white'
                            : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10 hover:text-white'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <Button 
                  onClick={handleStart} 
                  variant="primary" 
                  className="w-full py-4 rounded-xl shadow-lg shadow-indigo-500/20 text-base font-bold flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5 fill-current" /> Start AI Mock Interview
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* LOADING STEP */}
        {step === 'loading' && (
          <motion.div
            key="loading"
            className="flex flex-col items-center justify-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full border-4 border-indigo-500/10 border-t-indigo-500 animate-spin" />
              <Brain className="w-6 h-6 text-indigo-400 absolute" />
            </div>
            <h3 className="text-xl font-bold font-['Outfit'] text-white">Generating Interview Questions</h3>
            <p className="text-slate-400 mt-2 text-sm max-w-md text-center leading-relaxed">
              Our AI is tailoring questions for a {difficulty} {type} interview focusing on {domain}...
            </p>
          </motion.div>
        )}

        {/* INTERVIEW STEP */}
        {step === 'interview' && session && (
          <motion.div
            key="interview"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card className="p-8 border border-white/5 bg-[#0f172a]/60 backdrop-blur-xl relative">
              {/* Question Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                  Question {currentQuestionIndex + 1} of {session.questions.length}
                </span>
                <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold">
                  <Clock className="w-4 h-4 text-slate-400 animate-pulse" /> {formatTime(timeTaken)}
                </div>
              </div>

              {/* Question Text */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white leading-relaxed">
                  {session.questions[currentQuestionIndex].questionText}
                </h3>
              </div>

              {/* Answer Input */}
              <div className="space-y-4">
                <label className="block text-slate-300 text-sm font-semibold">Your Answer</label>
                <textarea
                  rows={8}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full p-4 border border-white/10 rounded-xl bg-white/5 text-white focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all text-sm leading-relaxed"
                  placeholder="Type your structured answer here. Take your time to cover all aspects..."
                />
              </div>

              {/* Actions */}
              <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
                <Button 
                  onClick={handleSubmitAnswer}
                  disabled={!userAnswer.trim()}
                  variant="primary"
                  className="px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-500/20"
                >
                  Submit Answer <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* EVALUATING STEP */}
        {step === 'evaluating' && (
          <motion.div
            key="evaluating"
            className="flex flex-col items-center justify-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader2 className="w-12 h-12 text-indigo-400 animate-spin mb-4" />
            <h3 className="text-xl font-bold font-['Outfit'] text-white">Analyzing Your Answer</h3>
            <p className="text-slate-400 mt-2 text-sm max-w-sm text-center leading-relaxed">
              Evaluating parameters, calculating score, and extracting missing tech concepts...
            </p>
          </motion.div>
        )}

        {/* FEEDBACK STEP */}
        {step === 'feedback' && evaluation && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Card className="p-8 border border-white/5 bg-[#0f172a]/60 backdrop-blur-xl relative">
              <div className="flex justify-between items-start mb-6 pb-6 border-b border-white/5">
                <div>
                  <h3 className="text-lg font-bold text-white font-['Outfit']">Question {currentQuestionIndex + 1} Evaluation</h3>
                  <p className="text-xs text-slate-400 mt-1">Review feedback before moving forward.</p>
                </div>
                
                {/* Score badge */}
                <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                  <span className="text-2xl font-black text-indigo-400 font-['Outfit']">{evaluation.score}</span>
                  <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">/ 10</span>
                </div>
              </div>

              <div className="space-y-6">
                {/* Feedback */}
                <div>
                  <h4 className="text-sm font-bold text-slate-300 mb-2">AI Feedback</h4>
                  <p className="text-sm text-slate-400 leading-relaxed bg-white/5 border border-white/5 p-4 rounded-xl">
                    {evaluation.feedback}
                  </p>
                </div>

                {/* Keywords */}
                {evaluation.missingKeywords && evaluation.missingKeywords.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-500" /> Improvement Area: Missing Keywords
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {evaluation.missingKeywords.map((kw: string, i: number) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
                <Button 
                  onClick={handleNext}
                  variant="primary"
                  className="px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-500/20 font-semibold"
                >
                  {currentQuestionIndex + 1 === session.questions.length ? 'Show Results' : 'Next Question'} 
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* RESULT STEP */}
        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-8 border border-white/5 bg-[#0f172a]/60 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="flex flex-col items-center justify-center text-center pb-8 border-b border-white/5 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-black font-['Outfit'] text-white">Interview Completed!</h2>
                <p className="text-slate-400 mt-1 text-sm font-medium">Here is your overall readiness report.</p>

                {/* Score */}
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-5xl font-black text-white font-['Outfit'] bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">{finalScore}</span>
                  <span className="text-lg text-slate-400 font-bold uppercase">/ 100</span>
                </div>
                <p className="text-xs text-slate-400 mt-2 font-bold uppercase tracking-wider">AI Placement Readiness Score</p>
              </div>

              {/* Summary */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-300 mb-2">Overall Recommendation Summary</h4>
                  <p className="text-sm text-slate-400 leading-relaxed bg-white/5 border border-white/5 p-5 rounded-xl whitespace-pre-wrap">
                    {finalFeedback}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 pt-6 border-t border-white/5 flex gap-4">
                <Button 
                  onClick={() => setStep('setup')} 
                  variant="outline"
                  className="w-full py-3 rounded-xl border border-white/10 hover:bg-white/5"
                >
                  Start New Interview
                </Button>
                <Button 
                  onClick={() => navigate('/dashboard')} 
                  variant="primary"
                  className="w-full py-3 rounded-xl shadow-lg shadow-indigo-500/20 font-semibold"
                >
                  Back to Dashboard
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MockInterview;
