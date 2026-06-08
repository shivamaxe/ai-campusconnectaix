import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Card } from '../../components/common/Card';
import { motion } from 'framer-motion';
import { 
  UserCircle, 
  Mail, 
  MapPin, 
  GraduationCap, 
  Award, 
  Code, 
  Target,
  FileCheck,
  Briefcase,
  Github,
  Linkedin,
  X,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useAnalyzeResumeMutation } from '../../store/api';

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

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [showResumeAnalyzer, setShowResumeAnalyzer] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analyzeResume, { isLoading: isAnalyzing }] = useAnalyzeResumeMutation();

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;
    try {
      const res = await analyzeResume({ resumeText }).unwrap();
      setAnalysisResult(res.data.analysis);
    } catch (err) {
      console.error(err);
      alert('Failed to analyze resume');
    }
  };

  return (
    <motion.div 
      className="space-y-8 max-w-5xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Profile Section */}
      <motion.div variants={itemVariants}>
        <Card className="relative overflow-hidden p-0 border border-white/5">
          {/* Cover Photo */}
          <div className="h-48 w-full bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-blue-600/30 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHBhdGggZD0iTTAgMEw4IDhaTTAgOEw4IDBaIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjA1Ii8+Cjwvc3ZnPg==')] opacity-30"></div>
          </div>
          
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 relative z-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left">
                <div className="w-32 h-32 rounded-full border-4 border-[#0f172a] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-xl shadow-blue-500/20">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </div>
                <div className="mb-2">
                  <h1 className="text-3xl font-bold font-['Outfit'] text-white">
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <p className="text-slate-400 font-medium mt-1 flex items-center justify-center sm:justify-start gap-2">
                    <GraduationCap className="w-4 h-4" /> B.Tech Computer Science (3rd Year)
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 mb-2">
                <Button variant="outline" size="sm" className="bg-white/5 hover:bg-white/10" leftIcon={<Github className="w-4 h-4" />} onClick={() => alert('GitHub integration coming soon!')}>
                  GitHub
                </Button>
                <Button variant="outline" size="sm" className="bg-white/5 hover:bg-white/10" leftIcon={<Linkedin className="w-4 h-4" />} onClick={() => alert('LinkedIn integration coming soon!')}>
                  LinkedIn
                </Button>
                <Button variant="primary" size="sm" onClick={() => alert('Edit profile functionality coming soon!')}>
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Contact & About */}
        <motion.div variants={containerVariants} className="space-y-8">
          <motion.div variants={itemVariants}>
            <Card className="border border-white/5">
              <h3 className="text-lg font-bold font-['Outfit'] text-white mb-4">About Me</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Passionate software engineering student with a strong foundation in full-stack development and cloud architecture. Looking for internship opportunities in fast-paced product environments.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span>Bangalore, India</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Briefcase className="w-4 h-4 text-slate-500" />
                  <span className="capitalize">{user?.role} Role</span>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="border border-white/5 bg-gradient-to-br from-blue-500/10 to-purple-500/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center border border-blue-500/30 mb-4 shadow-lg shadow-blue-500/20">
                  <FileCheck className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold font-['Outfit'] text-white">AI Resume Score</h3>
                <div className="flex items-baseline gap-1 mt-2 mb-4">
                  <span className="text-5xl font-black font-['Outfit'] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">85</span>
                  <span className="text-slate-400 font-medium">/100</span>
                </div>
                <p className="text-sm text-slate-400 mb-6">Top 12% among peers for SDE roles.</p>
                <Button variant="primary" className="w-full" onClick={() => setShowResumeAnalyzer(true)}>Improve Resume</Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Right Column: Skills, Projects, Goals */}
        <motion.div variants={containerVariants} className="lg:col-span-2 space-y-8">
          <motion.div variants={itemVariants}>
            <Card className="border border-white/5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold font-['Outfit'] text-white flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-400" />
                  Top Skills
                </h3>
                <Button variant="ghost" size="sm" onClick={() => alert('Skill management coming soon!')}>Manage Skills</Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'TypeScript', 'React.js', 'Node.js', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS', 'GraphQL', 'Tailwind CSS'].map((skill, idx) => (
                  <span 
                    key={skill} 
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-slate-300 hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400 cursor-pointer transition-all duration-300"
                    onClick={() => alert(`Skill details for ${skill} coming soon!`)}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="border border-white/5">
              <h3 className="text-lg font-bold font-['Outfit'] text-white mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Career Goals
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/5">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0 border border-purple-500/20">
                    <Briefcase className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Target Roles</h4>
                    <p className="text-sm text-slate-400 mt-1">Backend Engineer, Full Stack Developer</p>
                  </div>
                </div>
                
                <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/20">
                    <MapPin className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Preferred Locations</h4>
                    <p className="text-sm text-slate-400 mt-1">Bangalore, Remote, Hyderabad</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="border border-white/5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold font-['Outfit'] text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  Certifications
                </h3>
                <Button variant="ghost" size="sm" onClick={() => alert('Add certification coming soon!')}>Add New</Button>
              </div>
              
              <div className="space-y-4">
                <div className="group p-4 rounded-xl border border-white/5 bg-white/5 hover:border-white/10 transition-colors flex justify-between items-center cursor-pointer">
                  <div>
                    <h4 className="text-white font-semibold group-hover:text-blue-400 transition-colors">AWS Certified Developer – Associate</h4>
                    <p className="text-sm text-slate-400 mt-1">Amazon Web Services • Issued Jan 2024</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => alert('Credential view coming soon!')}>View Credential</Button>
                </div>
                <div className="group p-4 rounded-xl border border-white/5 bg-white/5 hover:border-white/10 transition-colors flex justify-between items-center cursor-pointer">
                  <div>
                    <h4 className="text-white font-semibold group-hover:text-blue-400 transition-colors">Advanced React Patterns</h4>
                    <p className="text-sm text-slate-400 mt-1">Frontend Masters • Issued Nov 2023</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => alert('Credential view coming soon!')}>View Credential</Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Resume Analyzer Modal */}
      {showResumeAnalyzer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/80 backdrop-blur-sm overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8"
          >
            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5 sticky top-0 z-10">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-blue-400" /> AI Resume Analyzer
              </h3>
              <button onClick={() => { setShowResumeAnalyzer(false); setAnalysisResult(null); setResumeText(''); }} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {!analysisResult ? (
                <div className="space-y-4">
                  <p className="text-sm text-slate-300">Paste your resume text below to instantly get an ATS score and improvement suggestions powered by Google Gemini.</p>
                  <textarea 
                    className="w-full h-64 bg-[#0f172a] border border-white/10 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 custom-scrollbar resize-none"
                    placeholder="Paste your resume content here..."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                  />
                  <Button variant="primary" className="w-full flex justify-center items-center gap-2" onClick={handleAnalyze} disabled={isAnalyzing || !resumeText.trim()}>
                    {isAnalyzing ? 'Analyzing with AI...' : <><Sparkles className="w-4 h-4"/> Get AI Analysis</>}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Score Circular UI */}
                  <div className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-500/10 to-transparent p-6 rounded-2xl border border-blue-500/20">
                    <div className="text-sm text-blue-400 font-bold tracking-wider uppercase mb-2">ATS Match Score</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-6xl font-black font-['Outfit'] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{analysisResult.atsScore || 0}</span>
                      <span className="text-slate-400 font-medium text-xl">/100</span>
                    </div>
                  </div>

                  {/* Missing Keywords */}
                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4 text-amber-400" /> Missing Keywords
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.missingKeywords?.length > 0 ? analysisResult.missingKeywords.map((kw: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg text-sm font-medium">{kw}</span>
                      )) : <p className="text-sm text-slate-400">Great job! No critical keywords missing.</p>}
                    </div>
                  </div>

                  {/* Suggestions */}
                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-purple-400" /> Improvement Suggestions
                    </h4>
                    <ul className="space-y-3">
                      {(analysisResult.suggestions || []).map((sugg: string, i: number) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-300 bg-white/5 p-3 rounded-lg border border-white/5">
                          <span className="text-purple-400 font-bold">{i + 1}.</span> {sugg}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button variant="outline" className="w-full mt-4" onClick={() => setAnalysisResult(null)}>Analyze Another Resume</Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Profile;
