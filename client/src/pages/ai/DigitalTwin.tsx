import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Card } from '../../components/common/Card';
import { motion } from 'framer-motion';
import { Cpu, Activity, ShieldCheck, Zap, Radar, Database, Network } from 'lucide-react';

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

            <h2 className="text-2xl font-bold text-white mb-2">{user?.firstName}'s Twin</h2>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-6">
              <Activity className="w-4 h-4" /> Synchronized Active
            </div>

            <div className="w-full space-y-4 text-left">
              <div className="bg-white/5 rounded-lg p-3 border border-white/5 flex justify-between items-center">
                <span className="text-slate-400 text-sm">Data Completeness</span>
                <span className="text-white font-bold">92%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
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
                  <div className="text-2xl font-bold text-purple-400">88<span className="text-sm text-slate-500 ml-1">/100 score</span></div>
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
            
            <button className="w-full mt-6 py-2.5 rounded-xl border border-white/10 text-sm font-semibold text-white hover:bg-white/5 transition-all">
              Configure Twin Settings
            </button>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DigitalTwin;
