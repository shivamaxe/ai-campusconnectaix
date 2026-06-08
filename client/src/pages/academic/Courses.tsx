import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { motion } from 'framer-motion';
import { BookOpen, Clock, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';

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

const Courses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock fetch courses
    setTimeout(() => {
      setCourses([
        { id: 1, code: 'CS301', name: 'Database Management Systems', credits: 4, attendance: 85, nextAssignment: 'Oct 20', progress: 65, status: 'on-track' },
        { id: 2, code: 'CS302', name: 'Operating Systems', credits: 4, attendance: 92, nextAssignment: 'Oct 22', progress: 40, status: 'warning' },
        { id: 3, code: 'CS303', name: 'Computer Networks', credits: 3, attendance: 78, nextAssignment: 'Oct 25', progress: 80, status: 'critical' },
        { id: 4, code: 'CS304', name: 'Web Technologies', credits: 3, attendance: 95, nextAssignment: 'Oct 18', progress: 95, status: 'excellent' },
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

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
            My <span className="text-gradient">Courses</span>
          </h1>
          <p className="text-slate-400 mt-2 text-lg">Manage your academic progress and assignments.</p>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="h-64 bg-slate-800/30 border-white/5" />
          ))}
        </div>
      ) : (
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
            >
              <Card hoverable className="flex flex-col h-full border border-white/5 bg-gradient-to-b from-white/[0.05] to-transparent group cursor-pointer relative overflow-hidden">
                {/* Status Indicator Line */}
                <div className={`absolute top-0 left-0 w-full h-1 ${
                  course.status === 'excellent' ? 'bg-emerald-500' :
                  course.status === 'on-track' ? 'bg-blue-500' :
                  course.status === 'warning' ? 'bg-amber-500' :
                  'bg-red-500'
                }`} />

                <div className="flex justify-between items-start mb-6 mt-2">
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${
                      course.status === 'excellent' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                      course.status === 'on-track' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                      course.status === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                      'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}>
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">{course.name}</h3>
                      <p className="text-slate-400 font-medium text-sm mt-0.5">{course.code} • {course.credits} Credits</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-slate-300 mt-auto">
                  <div className="bg-white/5 border border-white/5 rounded-xl p-4 transition-colors group-hover:bg-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Attendance</p>
                      {course.attendance >= 80 ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    <div className="flex items-end gap-2">
                      <p className={`text-2xl font-black font-['Outfit'] ${course.attendance >= 80 ? 'text-white' : 'text-red-400'}`}>
                        {course.attendance}%
                      </p>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3">
                      <div className={`h-1.5 rounded-full ${course.attendance >= 80 ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${course.attendance}%` }}></div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/5 rounded-xl p-4 transition-colors group-hover:bg-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Next Due</p>
                      <Clock className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="flex flex-col justify-center h-[calc(100%-24px)] mt-1">
                      <p className="text-sm font-semibold text-white">Assignment 3</p>
                      <p className="text-amber-400 text-xs mt-0.5">{course.nextAssignment}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex gap-3">
                  <Button variant="outline" className="w-full bg-white/5 border-white/10 hover:bg-white/10">
                    Course Overview <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Courses;
