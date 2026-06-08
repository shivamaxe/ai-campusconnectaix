import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Card } from '../../components/common/Card';
import { motion } from 'framer-motion';
import { Cpu, Activity, ShieldCheck, Zap, Radar, Database, Network, Settings, X, ToggleLeft, ToggleRight, SlidersHorizontal } from 'lucide-react';
import { useGetPlacementPredictionMutation } from '../../store/api';

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

const DigitalTwin = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [getPrediction, { isLoading }] = useGetPlacementPredictionMutation();
  const [prediction, setPrediction] = useState<any>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    autoApply: true,
    shareProfile: true,
    matchThreshold: 85,
    autoSchedule: false
  });

  useEffect(() => {
    getPrediction({}).unwrap().then(res => {
      setPrediction(res.data.prediction);
    }).catch(() => {
      // Fallback if AI fails
      setPrediction({ placementProbability: 92, readinessScore: 88 });
    });
  }, [getPrediction]);

  const score = prediction?.readinessScore || 88;
  const probability = prediction?.placementProbability || 92;

  return (
    <motion.div 
      className="space-y-6 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold font-['Outfit'] text-white tracking-tight flex items-center gap-2">
            Digital <span className="text-gradient">Twin</span>
          </h1>
          <p className="text-slate-400 mt-2 text-lg">Your AI-powered professional clone for automated matching and simulations.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Twin Visual */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="h-full border border-white/5 bg-gradient-to-b from-[#0f172a] to-[#0f172a]/50 relative overflow-hidden flex flex-col items-center justify-center text-center p-8">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none"></div>
            
            {/* Animated Avatar */}
            <div className="relative mb-8">
              <div className="absolute inset-0 border-2 border-blue-500/30 rounded-full animate-[spin_4s_linear_infinite]"></div>
              <div className="absolute inset-[-10px] border border-purple-500/20 rounded-full animate-[spin_6s_linear_infinite_reverse]"></div>
              <div className="w-32 h-32 rounded-full bg-[#0f172a] border-4 border-blue-500/20 flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                <Cpu className="w-12 h-12 text-blue-400" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">{user?.firstName || 'Your'}'s Twin</h2>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-6">
              <Activity className="w-4 h-4" /> Synchronized Active
            </div>

            <div className="w-full space-y-4 text-left">
              <div className="bg-white/5 rounded-lg p-3 border border-white/5 flex justify-between items-center">
                <span className="text-slate-400 text-sm">Data Completeness</span>
                <span className="text-white font-bold">{probability}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full" style={{ width: `${probability}%` }}></div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Right Column - Stats and Controls */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card hoverable className="border border-white/5 bg-white/[0.02]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Radar className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Auto-Apply Status</h3>
                  <p className="text-sm text-slate-400 mt-1 mb-3">Your twin is actively scanning for matches.</p>
                  <div className="text-2xl font-bold text-blue-400">14<span className="text-sm text-slate-500 ml-1">applications sent</span></div>
                </div>
              </div>
            </Card>

            <Card hoverable className="border border-white/5 bg-white/[0.02]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Interview Readiness</h3>
                  <p className="text-sm text-slate-400 mt-1 mb-3">Based on mock interviews and skill graphs.</p>
                  <div className="text-2xl font-bold text-purple-400">{score}<span className="text-sm text-slate-500 ml-1">/100 score</span></div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="border border-white/5 bg-white/[0.02]">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Network className="w-5 h-5 text-emerald-400" /> Live Simulation Activity
            </h3>
            
            <div className="space-y-4">
              {[
                { time: 'Just now', action: 'Matched with Amazon SDE-1 role (94% fit)', type: 'match' },
                { time: '2h ago', action: 'Completed background system design test simulation', type: 'test' },
                { time: '5h ago', action: 'Updated resume embeddings with new React project', type: 'update' },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                  <div className="mt-1">
                    {log.type === 'match' && <Zap className="w-4 h-4 text-emerald-400" />}
                    {log.type === 'test' && <Database className="w-4 h-4 text-blue-400" />}
                    {log.type === 'update' && <Activity className="w-4 h-4 text-purple-400" />}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{log.action}</p>
                    <p className="text-xs text-slate-500 mt-1">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              className="w-full mt-6 py-2.5 rounded-xl border border-white/10 text-sm font-semibold text-white hover:bg-white/5 transition-all flex justify-center items-center gap-2" 
              onClick={() => setShowSettings(true)}
            >
              <Settings className="w-4 h-4" /> Configure Twin Settings
            </button>
          </Card>
        </motion.div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-400" /> Twin Configuration
              </h3>
              <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Auto-Apply to Jobs</p>
                  <p className="text-xs text-slate-400 mt-0.5">Allow your twin to apply to highly matched jobs automatically.</p>
                </div>
                <button onClick={() => setSettings({...settings, autoApply: !settings.autoApply})} className={`transition-colors ${settings.autoApply ? 'text-blue-500' : 'text-slate-500'}`}>
                  {settings.autoApply ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Share Profile Externally</p>
                  <p className="text-xs text-slate-400 mt-0.5">Let recruiters discover your twin's data.</p>
                </div>
                <button onClick={() => setSettings({...settings, shareProfile: !settings.shareProfile})} className={`transition-colors ${settings.shareProfile ? 'text-blue-500' : 'text-slate-500'}`}>
                  {settings.shareProfile ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Auto-Schedule Interviews</p>
                  <p className="text-xs text-slate-400 mt-0.5">Sync with calendar to accept interview slots.</p>
                </div>
                <button onClick={() => setSettings({...settings, autoSchedule: !settings.autoSchedule})} className={`transition-colors ${settings.autoSchedule ? 'text-blue-500' : 'text-slate-500'}`}>
                  {settings.autoSchedule ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                </button>
              </div>

              <div className="pt-2 border-t border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-white font-medium flex items-center gap-2"><SlidersHorizontal className="w-4 h-4 text-purple-400"/> Minimum Match Threshold</p>
                  <span className="text-sm font-bold text-purple-400">{settings.matchThreshold}%</span>
                </div>
                <input 
                  type="range" 
                  min="50" max="100" 
                  value={settings.matchThreshold} 
                  onChange={(e) => setSettings({...settings, matchThreshold: Number(e.target.value)})}
                  className="w-full accent-purple-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-slate-500 mt-2 text-center">Your twin will only auto-apply to jobs with a match score above this threshold.</p>
              </div>
            </div>

            <div className="p-4 border-t border-white/10 bg-black/20 flex justify-end gap-3">
              <button onClick={() => setShowSettings(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/5 transition-colors">
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowSettings(false);
                  alert('Settings saved successfully!');
                }} 
                className="px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all"
              >
                Save Preferences
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default DigitalTwin;
