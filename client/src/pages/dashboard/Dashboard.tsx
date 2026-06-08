import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Card } from '../../components/common/Card';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Briefcase, 
  Award, 
  AlertCircle, 
  Lightbulb, 
  FileEdit,
  Calendar as CalendarIcon,
  MonitorPlay,
  ArrowRight,
  X,
  MapPin,
  Clock
} from 'lucide-react';
import { useGetPlacementPredictionMutation, useGetSkillGapMutation } from '../../store/api';

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

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [prediction, setPrediction] = useState<any>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSkillGap, setShowSkillGap] = useState(false);
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [skillGapData, setSkillGapData] = useState<any>(null);
  const [analyzeGap, { isLoading: isAnalyzingGap }] = useGetSkillGapMutation();
  const [getPrediction] = useGetPlacementPredictionMutation();

  const handleAnalyzeGap = async () => {
    try {
      const res = await analyzeGap({ targetRole }).unwrap();
      setSkillGapData(res.data.gapAnalysis);
    } catch (err) {
      console.error(err);
      alert('Failed to analyze skill gap');
    }
  };

  useEffect(() => {
    getPrediction({}).unwrap().then(res => {
      setPrediction(res.data.prediction);
    }).catch(() => {
      setPrediction({ placementProbability: 87 });
    });
  }, [getPrediction]);

  const placementProbability = prediction?.placementProbability || 87;

  return (
    <motion.div 
      className="space-y-8 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold font-['Outfit'] text-white tracking-tight">
            Welcome back, <span className="text-gradient">{user?.firstName || 'User'}</span> 👋
          </h1>
          <p className="text-slate-400 mt-2 text-lg">Here's your campus intelligence overview for today.</p>
        </div>
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={itemVariants}>
          <Card hoverable className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center border border-blue-500/20">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-slate-400 text-sm font-medium">Placement Probability</h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold font-['Outfit'] text-white">{placementProbability}<span className="text-xl text-slate-400">%</span></p>
                </div>
              </div>
            </div>
            <div className="text-xs text-emerald-400 font-medium flex items-center gap-1 bg-emerald-500/10 w-fit px-2 py-1 rounded-md">
              <span>↑ 2.5% from last month</span>
            </div>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card hoverable className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-500/20">
                <Briefcase className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-slate-400 text-sm font-medium">Active Applications</h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold font-['Outfit'] text-white">12</p>
                </div>
              </div>
            </div>
            <div className="text-xs text-purple-400 font-medium flex items-center gap-1 bg-purple-500/10 w-fit px-2 py-1 rounded-md">
              <span>3 in interview stage</span>
            </div>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card hoverable className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center border border-emerald-500/20">
                <Award className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-slate-400 text-sm font-medium">Current CGPA</h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold font-['Outfit'] text-white">8.5</p>
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-300 font-medium flex items-center gap-1 bg-white/5 w-fit px-2 py-1 rounded-md">
              <span>Top 15% of batch</span>
            </div>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card hoverable className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center border border-amber-500/20">
                <AlertCircle className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-slate-400 text-sm font-medium">Skill Gap Alert</h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-xl font-bold font-['Outfit'] text-white truncate max-w-[120px]">System Design</p>
                </div>
              </div>
            </div>
            <div className="text-xs text-amber-400 font-medium flex items-center gap-1 bg-amber-500/10 w-fit px-2 py-1 rounded-md">
              <span>Required by top matches</span>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Main Content Area */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <Card className="border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-['Outfit'] text-white flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                AI Recommended Actions
              </h2>
              <button className="text-sm text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors" onClick={() => alert('View all recommendations coming soon!')}>
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="group p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all flex gap-5 cursor-pointer" onClick={() => { setShowSkillGap(true); setSkillGapData(null); }}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center shrink-0 border border-white/5 group-hover:border-blue-500/20 transition-colors">
                  <MonitorPlay className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg group-hover:text-blue-400 transition-colors">AI Skill Gap Analysis</h4>
                  <p className="text-slate-400 mt-1.5 leading-relaxed">Let Gemini analyze your current skills against your dream role and generate a personalized learning path.</p>
                </div>
              </div>
              <div className="group p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all flex gap-5 cursor-pointer" onClick={() => alert('Resume module available in your Profile!')}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center shrink-0 border border-white/5 group-hover:border-purple-500/20 transition-colors">
                  <FileEdit className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg group-hover:text-purple-400 transition-colors">Update Resume Keywords</h4>
                  <p className="text-slate-400 mt-1.5 leading-relaxed">Your ATS score for 'Backend Developer' roles dropped to 72%. Head over to your profile to fix it.</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-6">
          <Card className="border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-['Outfit'] text-white flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-blue-400" />
                Upcoming Events
              </h2>
            </div>
            <div className="space-y-5">
              <div className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5" onClick={() => alert('Event details coming soon!')}>
                <div className="flex flex-col items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl shrink-0 border border-blue-500/20">
                  <span className="text-[10px] text-blue-400 uppercase font-bold tracking-wider">Oct</span>
                  <span className="text-xl font-black text-white font-['Outfit']">15</span>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-white font-semibold line-clamp-1">Google Pre-Placement Talk</h4>
                  <p className="text-sm text-slate-400 mt-0.5">10:00 AM • Main Auditorium</p>
                </div>
              </div>
              
              <div className="w-full h-px bg-white/5"></div>
              
              <div className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5" onClick={() => alert('Event details coming soon!')}>
                <div className="flex flex-col items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl shrink-0 border border-purple-500/20">
                  <span className="text-[10px] text-purple-400 uppercase font-bold tracking-wider">Oct</span>
                  <span className="text-xl font-black text-white font-['Outfit']">18</span>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-white font-semibold line-clamp-1">Mock Interview Session</h4>
                  <p className="text-sm text-slate-400 mt-0.5">2:00 PM • AI Simulator</p>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-6 py-2.5 rounded-xl border border-white/10 text-sm font-semibold text-white hover:bg-white/5 hover:border-white/20 transition-all" onClick={() => setShowCalendar(true)}>
              View Full Calendar
            </button>
          </Card>
        </motion.div>
      </motion.div>
      {/* Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/80 backdrop-blur-sm overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8"
          >
            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5 sticky top-0 z-10">
              <h3 className="text-xl font-bold font-['Outfit'] text-white flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-blue-400" /> Placement Calendar
              </h3>
              <button onClick={() => setShowCalendar(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Visual Calendar Grid (Left) */}
                <div className="md:col-span-2 space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-white">October 2026</h4>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-sm text-slate-300">Prev</button>
                      <button className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-sm text-slate-300">Next</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-400 mb-2">
                    <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {/* Empty slots for prev month */}
                    <div className="aspect-square rounded-lg border border-white/5 bg-transparent opacity-20"></div>
                    <div className="aspect-square rounded-lg border border-white/5 bg-transparent opacity-20"></div>
                    <div className="aspect-square rounded-lg border border-white/5 bg-transparent opacity-20"></div>
                    <div className="aspect-square rounded-lg border border-white/5 bg-transparent opacity-20"></div>
                    {/* Days */}
                    {Array.from({ length: 31 }).map((_, i) => {
                      const day = i + 1;
                      const hasEvent = day === 15 || day === 18 || day === 22 || day === 28;
                      const isToday = day === 12;
                      return (
                        <div key={i} className={`aspect-square rounded-lg border flex items-center justify-center relative cursor-pointer transition-all ${
                          isToday ? 'border-blue-500 bg-blue-500/10 text-blue-400 font-bold' : 
                          hasEvent ? 'border-purple-500/30 bg-purple-500/5 text-white hover:border-purple-500/50' : 
                          'border-white/5 bg-white/[0.02] text-slate-400 hover:bg-white/5'
                        }`}>
                          {day}
                          {hasEvent && <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-purple-400"></span>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Event List (Right) */}
                <div className="space-y-4 border-l border-white/10 pl-0 md:pl-8">
                  <h4 className="text-lg font-semibold text-white mb-4">Upcoming Schedule</h4>
                  <div className="space-y-3">
                    
                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded">Oct 15</span>
                        <span className="text-[10px] text-blue-300">In 3 days</span>
                      </div>
                      <h5 className="text-white font-semibold mb-1">Google Pre-Placement Talk</h5>
                      <div className="space-y-1 mt-2">
                        <p className="text-xs text-slate-400 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> 10:00 AM - 12:00 PM</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5"/> Main Auditorium</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-purple-400 bg-purple-500/20 px-2 py-0.5 rounded">Oct 18</span>
                        <span className="text-[10px] text-purple-300">Mandatory</span>
                      </div>
                      <h5 className="text-white font-semibold mb-1">AI Mock Interview Drive</h5>
                      <div className="space-y-1 mt-2">
                        <p className="text-xs text-slate-400 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> 2:00 PM - 5:00 PM</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5"/> Digital Twin Portal</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">Oct 22</span>
                        <span className="text-[10px] text-emerald-300">Assessment</span>
                      </div>
                      <h5 className="text-white font-semibold mb-1">Amazon Coding Round</h5>
                      <div className="space-y-1 mt-2">
                        <p className="text-xs text-slate-400 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> 9:00 AM - 10:30 AM</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5"/> Online Proctored</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Skill Gap Analyzer Modal */}
      {showSkillGap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/80 backdrop-blur-sm overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8"
          >
            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5 sticky top-0 z-10">
              <h3 className="text-xl font-bold font-['Outfit'] text-white flex items-center gap-2">
                <MonitorPlay className="w-5 h-5 text-blue-400" /> AI Skill Gap Analyzer
              </h3>
              <button onClick={() => setShowSkillGap(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {!skillGapData ? (
                <div className="space-y-5">
                  <p className="text-sm text-slate-300">Enter your dream job role. Gemini will analyze your current skills and generate a structured learning path to bridge the gap.</p>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Target Job Role</label>
                    <input 
                      type="text" 
                      className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      placeholder="e.g. Full Stack Developer, Data Scientist"
                    />
                  </div>
                  <button 
                    onClick={handleAnalyzeGap} 
                    disabled={isAnalyzingGap || !targetRole.trim()}
                    className="w-full py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                  >
                    {isAnalyzingGap ? 'Analyzing Profile...' : 'Analyze My Gap'}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/5">
                    <div>
                      <p className="text-sm text-slate-400">Estimated Effort</p>
                      <h4 className="text-2xl font-bold text-white font-['Outfit']">{skillGapData.estimatedCompletionWeeks} Weeks</h4>
                    </div>
                    <Award className="w-8 h-8 text-purple-400 opacity-50" />
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                      <AlertCircle className="w-4 h-4 text-amber-400" /> Missing Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGapData.missingSkills?.map((skill: string, i: number) => (
                        <span key={i} className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                      <Lightbulb className="w-4 h-4 text-emerald-400" /> Recommended Action Plan
                    </h4>
                    <div className="space-y-3">
                      {skillGapData.learningPath?.map((step: string, i: number) => (
                        <div key={i} className="flex gap-3 text-sm text-slate-300 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">{i + 1}</span>
                          <p className="leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => setSkillGapData(null)}
                    className="w-full py-3 rounded-xl border border-white/10 text-white font-semibold hover:bg-white/5 transition-colors"
                  >
                    Analyze Another Role
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;
