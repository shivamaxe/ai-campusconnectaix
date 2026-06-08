import React from 'react';
import { Card } from '../../components/common/Card';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { TrendingUp, Users, Building, Activity, Lightbulb } from 'lucide-react';

// Mock Data
const salaryData = [
  { year: '2020', average: 6.5, top: 12 },
  { year: '2021', average: 7.2, top: 15 },
  { year: '2022', average: 8.5, top: 24 },
  { year: '2023', average: 9.8, top: 32 },
  { year: '2024', average: 12.0, top: 45 },
];

const placementData = [
  { dept: 'Computer Science', placed: 95, unplaced: 5 },
  { dept: 'Information Tech', placed: 88, unplaced: 12 },
  { dept: 'Electronics', placed: 75, unplaced: 25 },
  { dept: 'Mechanical', placed: 65, unplaced: 35 },
];

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

const Analytics = () => {
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
            Campus <span className="text-gradient">Analytics</span>
          </h1>
          <p className="text-slate-400 mt-2 text-lg">AI-powered insights on university placements and performance.</p>
        </div>
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={itemVariants}>
          <Card hoverable className="border border-white/5 bg-gradient-to-br from-white/[0.05] to-transparent relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-slate-400 text-sm font-medium">Total Students</h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold font-['Outfit'] text-white">1,245</p>
                </div>
              </div>
            </div>
            <div className="text-xs text-blue-400 font-medium flex items-center gap-1 bg-blue-500/10 w-fit px-2 py-1 rounded-md">
              <span>Across 8 departments</span>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card hoverable className="border border-white/5 bg-gradient-to-br from-white/[0.05] to-transparent relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-slate-400 text-sm font-medium">Placement Rate</h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold font-['Outfit'] text-white">82<span className="text-xl text-slate-400">%</span></p>
                </div>
              </div>
            </div>
            <div className="text-xs text-emerald-400 font-medium flex items-center gap-1 bg-emerald-500/10 w-fit px-2 py-1 rounded-md">
              <span>↑ 4.2% from last year</span>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card hoverable className="border border-white/5 bg-gradient-to-br from-white/[0.05] to-transparent relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <Building className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-slate-400 text-sm font-medium">Active Partners</h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold font-['Outfit'] text-white">45</p>
                </div>
              </div>
            </div>
            <div className="text-xs text-purple-400 font-medium flex items-center gap-1 bg-purple-500/10 w-fit px-2 py-1 rounded-md">
              <span>12 Fortune 500s</span>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card hoverable className="border border-white/5 bg-gradient-to-br from-white/[0.05] to-transparent relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                <Activity className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-slate-400 text-sm font-medium">Platform Activity</h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold font-['Outfit'] text-white">8.2<span className="text-xl text-slate-400">k</span></p>
                </div>
              </div>
            </div>
            <div className="text-xs text-amber-400 font-medium flex items-center gap-1 bg-amber-500/10 w-fit px-2 py-1 rounded-md">
              <span>Daily AI Interactions</span>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="border border-white/5 h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-blue-400" /> Salary Trends
                </h3>
                <p className="text-xs text-slate-400 mt-1">Average vs Top CTC over 5 years (in LPA)</p>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salaryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorTop" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" stroke="#475569" tick={{fill: '#94a3b8', fontSize: 12}} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" tick={{fill: '#94a3b8', fontSize: 12}} tickLine={false} axisLine={false} />
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.5rem', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '14px', color: '#cbd5e1' }} />
                  <Area type="monotone" dataKey="average" name="Avg CTC" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAvg)" />
                  <Area type="monotone" dataKey="top" name="Top CTC" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorTop)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border border-white/5 h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-400" /> Placement by Department
                </h3>
                <p className="text-xs text-slate-400 mt-1">Percentage of students placed vs unplaced</p>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={placementData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="dept" type="category" width={120} stroke="#475569" tick={{fill: '#cbd5e1', fontSize: 12}} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    cursor={{ fill: '#1e293b' }}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.5rem', color: '#fff' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '14px', color: '#cbd5e1' }} />
                  <Bar dataKey="placed" name="Placed (%)" stackId="a" fill="#10b981" radius={[0, 4, 4, 0]} barSize={24} />
                  <Bar dataKey="unplaced" name="Seeking (%)" stackId="a" fill="#334155" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Analytics;
