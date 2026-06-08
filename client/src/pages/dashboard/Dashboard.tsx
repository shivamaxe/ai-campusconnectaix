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
  Calendar,
  MonitorPlay,
  ArrowRight
} from 'lucide-react';
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

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [getPrediction] = useGetPlacementPredictionMutation();
  const [prediction, setPrediction] = useState<any>(null);

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
              <div className="group p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all flex gap-5 cursor-pointer" onClick={() => alert('Recommendation module coming soon!')}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center shrink-0 border border-white/5 group-hover:border-blue-500/20 transition-colors">
                  <MonitorPlay className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg group-hover:text-blue-400 transition-colors">Complete System Design Module</h4>
                  <p className="text-slate-400 mt-1.5 leading-relaxed">Based on your target companies, you should focus on low-level design patterns this week to improve your matching score.</p>
                </div>
              </div>
              <div className="group p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all flex gap-5 cursor-pointer" onClick={() => alert('Resume module coming soon!')}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center shrink-0 border border-white/5 group-hover:border-purple-500/20 transition-colors">
                  <FileEdit className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg group-hover:text-purple-400 transition-colors">Update Resume Keywords</h4>
                  <p className="text-slate-400 mt-1.5 leading-relaxed">Your ATS score for 'Backend Developer' roles dropped to 72%. Add more quantifiable achievements to boost visibility.</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-6">
          <Card className="border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-['Outfit'] text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
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
            
            <button className="w-full mt-6 py-2.5 rounded-xl border border-white/10 text-sm font-semibold text-white hover:bg-white/5 hover:border-white/20 transition-all" onClick={() => alert('Full calendar view coming soon!')}>
              View Calendar
            </button>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
